import { Component, OnInit } from '@angular/core';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {PatientService} from '../../services/patient.service';
import {Patient} from '../../model/patient.model';
import Swal from "sweetalert2";

declare const $: any;
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  responsePersonnelInfo?: any;
  mode:number;
  modeUpdate: number;
  patientFormGroup?:FormGroup;
  submitted:boolean = false;
  fonctionResponse: any;
  departementResponse: any;
  isDoctorOption: number;
  patients$: Observable<AppDataState<Patient[]>>;
  searchCatOption: number;
  searchPersonnel: string;
  searchInvalid: boolean;
  phoneInvalid: boolean;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];


  constructor(private patientService:PatientService,
              private fb:FormBuilder) { }

  ngOnInit() {
    $(document).ready(function(){
      $(":input").inputmask();
    });
    this.loadInfos();
    this.getPatients();
  }


  getPatients(){
    this.patients$ = this.patientService.getAllPatients().pipe(
      map(data=>{
        //console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  savePatient() {
    this.submitted = true;
    if (this.patientFormGroup.invalid) return;

    if (this.modeUpdate==0){
      this.patientService.addPatient(this.patientFormGroup.value)
        .subscribe(data=>{

        },err=>{
          if (err.error.text=='Patient registered successfully!'){
            Swal.fire('Enregistrement', 'Enregistrement effectué avec succès', 'success');
            this.phoneInvalid=false;
            this.initPatient();
          }else {
            console.log(err.error);
            this.phoneInvalid=true;
            Swal.fire('Erreur', 'Erreur d\'enregistrement '+err.error, 'error');
          }
        });
    } else if (this.modeUpdate==1){
      this.patientService.updatePatient(this.patientFormGroup.value)
        .subscribe(data=>{

        },err=>{
          if (err.error.text=='Patient updated successfully!'){
            Swal.fire('Modification', 'Modification effectué avec succès', 'success');
            this.phoneInvalid=false;
            //this.initPatient();
          }else {
            console.log(err.error);
            this.phoneInvalid=true;
            Swal.fire('Erreur', 'Erreur de modification '+err.error, 'error');
          }
        });
    }


  }

  goToUpdate(patient) {
    this.mode=1;
    this.modeUpdate=1;
    this.patientFormGroup = this.fb.group({
      idpatient:[patient.idpatient],
      nom:[patient.nom, Validators.required],
      prenom:[patient.prenom, Validators.required],
      telephone:[patient.telephone, Validators.required],
      adresse:[patient.adresse, Validators.required],
      age:[patient.age, Validators.required],
      genre:[patient.genre, Validators.required],
      isDeleted:[false]
    });
  }

  newPatient() {
    this.mode=1;
    this.modeUpdate=0;
    this.initPatient();
  }

  goToList() {
    this.mode=0;
  }

  initPatient(){
    this.patientFormGroup = this.fb.group({
      nom:['', Validators.required],
      prenom:['', Validators.required],
      telephone:['', Validators.required],
      adresse:['', Validators.required],
      age:[0, Validators.required],
      genre:['undefined', Validators.required],
      isDeleted:[false]
    });
  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.loadSizeValues();
    this.mode=0;
    this.phoneInvalid=false;
    this.initPatient();
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
