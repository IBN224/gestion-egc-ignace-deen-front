import { Component, OnInit } from '@angular/core';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {TestResult} from '../../model/test-result.model';
import {formatDate} from '@angular/common';
import {environment} from '../../../environments/environment';
import Swal from "sweetalert2";
import {Select2OptionData} from 'ng-select2';
import {PatientService} from '../../services/patient.service';
import {SpecialisteService} from '../../services/specialiste.service';
import {TestResultService} from '../../services/test-result.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-test-result',
  templateUrl: './test-result.component.html',
  styleUrls: ['./test-result.component.css']
})
export class TestResultComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  dateInfo?: string;
  descriptionInfo?: number;
  nomSpeciaInfo?: string;
  prenomSpeciaInfo?: string;
  statusSpeciaInfo?: string;
  nomPatientInfo?: string;
  prenomPatientInfo?: string;
  telephonePatientInfo?: string;
  adressePatientInfo?: string;
  nomPersonnelInfo?: string;
  prenomPersonnelInfo?: string;
  statusPersonnelInfo?: string;
  responseDocumentInfo: any;
  mode:number;
  modeUpdate: number;
  testResultFormGroup?:FormGroup;
  submitted:boolean = false;
  specialisteResponse: any;
  patientResponse: any;
  personnelResponse: any;
  catOption: number;
  testResult$: Observable<AppDataState<TestResult[]>>;
  searchCategorie: string;
  searchCatOption: number;
  searchPatient: string;
  searchPersonnel: string;
  searchInvalid: boolean;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];
  selectedFiles: Array<File> = [];
  /***ngSelect2*****/
  dataPatient: Array<Select2OptionData>;
  listPatient:any[]=[];
  dataPersonnel: Array<Select2OptionData>;
  listPersonnel:any[]=[];
  /***end ngSelect2*****/


  constructor(private fb:FormBuilder,
              private patientService:PatientService,
              private specialisteService:SpecialisteService,
              private testResultService:TestResultService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.initTestResult();
    this.loadInfos();
    this.getPatients();
    this.getPersonnels();


  }


  getTestResults(){
    this.testResult$ = this.testResultService.getTestResultsBy(this.authService.getEntite(),
                                                               this.searchCategorie,
                                                                parseInt(this.searchPersonnel),
                                                                parseInt(this.searchPatient)).pipe(
      map(data=>{
        //console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  searchCategorieChanged(value) {
    this.searchCatOption=value;
    this.searchPersonnel='0';
    this.searchPatient='0';
    this.testResult$=null;
  }

  onSearch() {
    if (this.searchCatOption==undefined) {
      this.searchInvalid=true;
    } else{
      this.searchInvalid=false;
      this.getTestResults();
    }
  }

  getSpecialiste(){
    this.specialisteService.getSpecialiste(this.authService.getEntite())
      .subscribe(data=>{
        this.specialisteResponse = data;
      },err=>{
        console.log(err);
      })
  }

 /* getPatient(id:number){
    for (let patient of this.patientResponse) {
      if (patient.idpatient==id) {
        patient.patientAppointments=[];
        patient.testResults=[];
        return patient;
      }
    }
  }

  getPersonnel(id:number){
    for (let personnel of this.personnelResponse) {
      if (personnel.id==id) return personnel;
    }
  }*/

  saveTestResult() {
    this.submitted = true;
    if (this.testResultFormGroup.invalid) return;
    if(this.modeUpdate==1){

      /*this.appointmentService.updateAppointment(this.scheduleFormGroup.value)
        .subscribe(data=>{

          Swal.fire('Modification', 'Modification effectué avec succès', 'success');
        },err=>{
          Swal.fire('Erreur', 'Erreur d"modification '+err.error.message, 'error');
        });*/
    }else if (this.modeUpdate==0){
      if (this.catOption==0){
        this.testResultFormGroup.controls['categorie'].setValue(false);
        this.testResultFormGroup.controls['personnel'].setValue(null);
        this.testResultFormGroup.controls['patient'].setValue({'idpatient':this.testResultFormGroup.value.patient});
      }else if (this.catOption==1){
        this.testResultFormGroup.controls['categorie'].setValue(true);
        this.testResultFormGroup.controls['patient'].setValue(null);
        this.testResultFormGroup.controls['personnel'].setValue({'id':this.testResultFormGroup.value.personnel});
      }

      this.testResultService.addTestResult(this.testResultFormGroup.value)
        .subscribe(data=>{

          /**************** ajout de document ********************/
          if(this.selectedFiles.length>0){
            this.selectedFiles.forEach(item=>{
              this.testResultService.uploadDocumentResultTest(item, data.id)
                .subscribe(resp=>{

                },err=>{
                  Swal.fire('Erreur', 'Erreur d\'upload des fichiers'+err.error.message, 'error');
                });
            });
            this.selectedFiles=[];
          }
          /********************* end *****************************/
          Swal.fire('Enregistrement', 'Enregistrement effectué avec succès', 'success');
         this.initTestResult();
        },err=>{
          Swal.fire('Erreur', 'Erreur d\'enregistrement '+err.error.message, 'error');
        });
    }
  }

  getPatients(){
    // this.spinner.show();
    this.listPatient=[];
    this.dataPatient=[];
    this.patientService.getAllPatients().subscribe(data=>{
      this.patientResponse=data;
      for(let patient of data){
        const certif= {id: patient.idpatient.toString(), text: patient.telephone+' / '+patient.nom+' '+patient.prenom};
        this.listPatient.push(certif);
        this.dataPatient=this.listPatient;
      }
      //this.spinner.hide();
    },err=>{
      console.log(err);
      // this.spinner.hide();
    })
  }

  getPersonnels(){
    // this.spinner.show();
    this.listPersonnel=[];
    this.dataPersonnel=[];
    this.specialisteService.getAllSpecialistes().subscribe(data=>{
      this.personnelResponse=data;
      for(let personnel of data){
        const certif= {id: personnel.id.toString(), text: personnel.lastName+' '+personnel.firstName};
        this.listPersonnel.push(certif);
        this.dataPersonnel=this.listPersonnel;
      }
      //this.spinner.hide();
    },err=>{
      console.log(err);
      // this.spinner.hide();
    })
  }

  goToList() {
    this.mode=0;
  }

  newTestResult() {
    this.mode=1;
    this.modeUpdate=0;
    this.initTestResult();
  }

  categorieChanged(value) {
    this.catOption = value;
    this.testResultFormGroup.controls['patient'].setValue(0);
    this.testResultFormGroup.controls['personnel'].setValue(0);
  }

  goToUpdate(testResult) {

  }

  showInfo(testResult) {
    this.responseDocumentInfo=testResult.documents;
    this.mode=2;
    this.dateInfo=testResult.date;
    this.descriptionInfo=testResult.description;
    this.nomSpeciaInfo=testResult.specialiste.lastName;
    this.prenomSpeciaInfo=testResult.specialiste.firstName;
    this.statusSpeciaInfo=testResult.specialiste.status;

    if (this.searchCatOption==1){
      this.nomPersonnelInfo=testResult.personnel.lastName;
      this.prenomPersonnelInfo=testResult.personnel.firstName;
      this.statusPersonnelInfo=testResult.personnel.status;
    } else if (this.searchCatOption==0){
      this.nomPatientInfo=testResult.patient.nom;
      this.prenomPatientInfo=testResult.patient.prenom;
      this.telephonePatientInfo=testResult.patient.telephone;
      this.adressePatientInfo=testResult.patient.adresse;
    }
  }

  showDocument(path:string){
    window.open(environment.SERVER_DOC+path, '_blank');
  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.searchPatient='0';
    this.searchPersonnel='0';
    this.searchInvalid=false;
    this.loadSizeValues();
    this.mode=0;
    this.getSpecialiste();
  }

  initTestResult(){
    this.testResultFormGroup = this.fb.group({
      categorie:['undefined', Validators.required],
      description:['', Validators.required],
      date:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required],
      specialiste:[this.specialisteResponse],
      personnel:[0],
      patient:[0],
      isDeleted:[false]
    });
  }

  /**** Ajout d'un document à la liste *****/
  onSelectFileOut (event) {
    if (event.target.files && event.target.files.length > 0) {
      if(event.target.files.item(0).size<=environment.FILE_SIZE){
        this.selectedFiles[this.selectedFiles.length] = event.target.files.item(0);
      }else {
        Swal.fire('Ajout impossible',
                  'Impossible d\'ajouter ce fichier la taille est trop grande \n la taille maximal est de 5MB (5000KB)',
                  'error'
        );
      }
    }

    event.target.value = ''
  }

  /**** Suppression d'un document de la liste ****/
  removeFileItem(i){
    this.selectedFiles = this.selectedFiles.filter( item => i != item)
  }

  loadSizeValues(){
    this.selectValues=[
      {value: '10'}, {value: '20'},
      {value: '50'}, {value: '100'}];
  }

  sizeChanged(value){
    this.pageSize=value;
  }

  pageChanged(event){
    if(!isNaN(event)){
      this.currentPage=event;
    }
  }


}
