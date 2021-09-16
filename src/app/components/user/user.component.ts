import { Component, OnInit } from '@angular/core';
import {Select2OptionData} from 'ng-select2';
import {Options} from 'select2';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {catchError, map, startWith} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';
import {SpecialisteService} from '../../services/specialiste.service';
import {ROLES} from '../../../environments/environment';
import {PatientService} from '../../services/patient.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  user$: Observable<AppDataState<User[]>>;
  mode:number;
  modeUpdate: number;
  userFormGroup?:FormGroup;
  userStatusFormGroup?:FormGroup;
  submitted:boolean = false;
  entiteResponse: any;
  patientResponse: any;
  patientFormResponse: any;
  personnelResponse: any;
  personnelFormResponse: any;
  catOption: number;
  searchCategorie: string;
  searchCatOption: number;
  searchPatient: string;
  searchPersonnel: string;
  searchInvalid: boolean;
  roleUser: string;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];
  /***ngSelect2*****/
  dataSearchPatient: Array<Select2OptionData>;
  listSearchPatient:any[]=[];
  dataSearchPersonnel: Array<Select2OptionData>;
  listSearchPersonnel:any[]=[];
  dataPatient: Array<Select2OptionData>;
  listPatient:any[]=[];
  dataPersonnel: Array<Select2OptionData>;
  listPersonnel:any[]=[];
  options: Options;
  ROLES: any;
  /***end ngSelect2*****/


  constructor(private userService:UserService,
              private authService:AuthenticationService,
              private fb:FormBuilder,
              private specialisteService:SpecialisteService,
              private patientService:PatientService) { }

  ngOnInit() {
    this.loadInfos();
    this.getEntites();
    this.getPatients();
    this.getPersonnels();
  }


  getUsersBy(){
    this.user$ = this.userService.getUsersByEntite(this.authService.getEntite()).pipe(
      map(data=>{
        //console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  getAllUsersBy(){
    this.user$ = this.userService.getAllUsersBy(this.searchCategorie,
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

  onSearch() {
    if (this.searchCatOption==undefined) {
      this.searchInvalid=true;
    } else{
      this.searchInvalid=false;
      this.getAllUsersBy();
    }
  }

  getPatientSearch(){
    // this.spinner.show();
    this.listSearchPatient=[];
    this.dataSearchPatient=[];
    this.patientService.getAllPatients().subscribe(data=>{
      for(let patient of data){
        const certif= {id: patient.idpatient.toString(), text: patient.telephone+' / '+patient.nom+' '+patient.prenom};
        this.listSearchPatient.push(certif);
        this.dataSearchPatient=this.listSearchPatient;
      }
      //this.spinner.hide();
    },err=>{
      console.log(err);
      // this.spinner.hide();
    })
  }

  getPersonnelSearch(){
    // this.spinner.show();
    this.listSearchPersonnel=[];
    this.dataSearchPersonnel=[];
    this.specialisteService.getAllSpecialistes().subscribe(data=>{
      for(let personnel of data){
        const certif= {id: personnel.id.toString(), text: personnel.lastName+' '+personnel.firstName};
        this.listSearchPersonnel.push(certif);
        this.dataSearchPersonnel=this.listSearchPersonnel;
      }
      //this.spinner.hide();
    },err=>{
      console.log(err);
      // this.spinner.hide();
    })
  }

  searchCategorieChanged(value) {
    this.searchCatOption=value;
    this.searchPersonnel='0';
    this.searchPatient='0';
    this.user$=null;
  }

  getPatientsForm(){
    this.patientService.getAllPatients().subscribe(data=>{
      this.patientFormResponse=data;
    },err=>{
      console.log(err);
    })
  }

  getPersonnelForm(){
    this.specialisteService.getAllSpecialistes().subscribe(data=>{
      this.personnelFormResponse=data;
    },err=>{
      console.log(err);
    })
  }

 /* getPatientObject(id:number){
    for (let patient of this.patientFormResponse) {
      if (patient.idpatient==id) {
        patient.patientAppointments=[];
        patient.testResults=[];
        return patient;
      }
    }
  }

  getPersonnelOrEntiteObject(id:number){
    for (let personnel of this.personnelFormResponse) {
      if (personnel.id==id) return personnel;
    }
  }*/

  saveUser() {

    if(this.modeUpdate==1){

      /*this.appointmentService.updateAppointment(this.scheduleFormGroup.value)
        .subscribe(data=>{

          Swal.fire('Modification', 'Modification effectué avec succès', 'success');
        },err=>{
          Swal.fire('Erreur', 'Erreur d"modification '+err.error.message, 'error');
        });*/
    }else if (this.modeUpdate==0){
      if (this.roleUser==ROLES.ROLE_SUPER_ADMIN){
        if (this.catOption==0){
          this.userFormGroup.controls['patient'].setValue({'idpatient':this.userFormGroup.value.patient});
          this.userFormGroup.controls['role'].setValue(this.userFormGroup.value.role);
          this.userFormGroup.controls['personnel'].setValue(null);
          this.userFormGroup.controls['entite'].setValue(null);
        }else if (this.catOption==1){
          this.userFormGroup.controls['patient'].setValue(null);
          this.userFormGroup.controls['role'].setValue(this.userFormGroup.value.role);
          this.userFormGroup.controls['personnel'].setValue({'id':this.userFormGroup.value.personnel});
          this.userFormGroup.controls['entite'].setValue({'id':this.userFormGroup.value.entite});
        }
      } else {
          this.userFormGroup.controls['role'].setValue(this.userFormGroup.value.role);
          this.userFormGroup.controls['personnel'].setValue({'id':this.userFormGroup.value.personnel});
          this.userFormGroup.controls['patient'].setValue(null);
          this.userFormGroup.controls['entite'].setValue({'id':this.userFormGroup.value.entite});

      }

      this.userService.addUser(this.userFormGroup.value)
        .subscribe(data=>{

        },err=>{
          if (err.error.text=='User registered successfully!'){
            Swal.fire('Enregistrement', 'Enregistrement effectué avec succès', 'success');
            this.initUser();
          }else {
            console.log(err.error);
             Swal.fire('Erreur', 'Erreur d\'enregistrement '+err.error, 'error');
          }
        });
    }
  }

  initUser(){
    this.userFormGroup = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
      role:['undefined'],
      patient:[0],
      personnel:[0],
      entite:['undefined'],
      isActive:[true]
    });
  }

  getEntites(){
    this.specialisteService.getEntites().subscribe(data=>{
      this.entiteResponse=data;
    },err=>{
      console.log(err);
    })
  }

  getPatients(){
    // this.spinner.show();
    this.listPatient=[];
    this.dataPatient=[];
    this.patientService.getAllPatientNoCompte().subscribe(data=>{
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
    this.specialisteService.getAllPersonnelNoCompte().subscribe(data=>{
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

  categorieChanged(value) {
    this.catOption = value;
    this.userFormGroup.controls['patient'].setValue(0);
    this.userFormGroup.controls['personnel'].setValue(0);
  }

  Status(user) {

    let statVal, statTitle;
    if(user.isActive){
      statVal="Désactivé";
      statTitle="Désactivation !";
      this.userStatusFormGroup = this.fb.group({
        id:[user.id],
        isActive:[false]
      });
    }else{
      statVal="Activé";
      statTitle="Activation !";
      this.userStatusFormGroup = this.fb.group({
        id:[user.id],
        isActive:[true]
      });
    }

    Swal.fire({
      title: 'Êtes-vous sûr?',
      width: 500,
      html: "Voulez-vous vraiment "+statVal+" cet utilisateur "+user.username+" ???",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'red',
      cancelButtonColor: 'default',
      confirmButtonText: 'OUI',
      cancelButtonText: 'NON',
      buttonsStyling: true
    }).then((result) => {
      if (result.value) {

        this.userService.updateStatus(this.userStatusFormGroup.value)
          .subscribe(data=>{

            if (this.roleUser!=ROLES.ROLE_SUPER_ADMIN) this.getUsersBy();
            else if (this.roleUser==ROLES.ROLE_SUPER_ADMIN) this.onSearch();
            Swal.fire(statTitle, statTitle+' effectué avec succès', 'success');
          },err=>{
            Swal.fire('Erreur', 'Erreur de '+statTitle +err, 'error');
          });

      }

    });

  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.mode=0;
    this.roleUser=this.authService.getRole();
    this.ROLES=ROLES;
    this.loadSizeValues();
    this.initUser();
    this.getPatientsForm();
    this.getPersonnelForm();
    this.getPatientSearch();
    this.getPersonnelSearch();
    if (this.roleUser!=ROLES.ROLE_SUPER_ADMIN) {
      this.getUsersBy();
    }

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

  newUser() {
    this.mode=1;
    this.modeUpdate=0;
  }

  goToList() {
    this.mode=0;
  }


}
