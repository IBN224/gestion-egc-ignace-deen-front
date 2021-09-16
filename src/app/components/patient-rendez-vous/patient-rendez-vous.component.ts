import { Component, OnInit } from '@angular/core';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {formatDate} from '@angular/common';
import {PatientAppointment} from '../../model/patient-appointment.model';
import {catchError, map, startWith} from 'rxjs/operators';
import {PatientAppointmentService} from '../../services/patient-appointment.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-patient-rendez-vous',
  templateUrl: './patient-rendez-vous.component.html',
  styleUrls: ['./patient-rendez-vous.component.css']
})
export class PatientRendezVousComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  mode:number;
  modeUpdate: number;
  scheduleFormGroup?:FormGroup;
  submitted:boolean = false;
  searchDateApp?:string;
  patientAppointment$: Observable<AppDataState<PatientAppointment[]>>;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];


  constructor(private patientAppointmentService:PatientAppointmentService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.loadInfos();
    this.getPatientAppointments();
  }


  getPatientAppointments(){
    this.patientAppointment$ = this.patientAppointmentService.getAllPatientAppointments(this.authService.getEntite(),
                                                                                        this.searchDateApp).pipe(
      map(data=>{
        //console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch() {
    this.getPatientAppointments();
  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.loadSizeValues();
    this.searchDateApp=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
  }

  /*initSchedule(){
    this.scheduleFormGroup = this.fb.group({
      date:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required],
      max:[0, Validators.required],
      isDeleted:[false],
      stateAppointment:[0]
    });
  }*/

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
