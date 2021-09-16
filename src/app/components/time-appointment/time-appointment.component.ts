import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Appointment} from '../../model/appointment.model';
import {formatDate} from '@angular/common';
import {AppointmentService} from '../../services/appointment.service';
import {TimeAppointment} from '../../model/time-appointment';
import {TimeAppointmentService} from '../../services/time-appointment.service';
import Swal from "sweetalert2";
import {catchError, map, startWith} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-time-appointment',
  templateUrl: './time-appointment.component.html',
  styleUrls: ['./time-appointment.component.css']
})
export class TimeAppointmentComponent implements OnInit {

  appointmentId: number;
  readonly DataSateEnum = DataStateEnum;
  mode:number;
  modeUpdate: number;
  appointmentResponse: Appointment;
  timeAppointmentResponse: Array<TimeAppointment> = [];
  searchDateApp?:string;
  timeFormGroup?:FormGroup;
  submitted:boolean = false;
  timeAppointments$: Observable<AppDataState<TimeAppointment[]>>;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];


  constructor(private activetedRoute:ActivatedRoute,
              private fb:FormBuilder,
              private appointmentService:AppointmentService,
              private timeAppointmentService:TimeAppointmentService,
              private authService:AuthenticationService) {
    this.appointmentId = activetedRoute.snapshot.params.id;
    this.mode = activetedRoute.snapshot.params.mode;
    this.modeUpdate = activetedRoute.snapshot.params.modeUpdate;
    this.getAppointment();
  }

  ngOnInit() {
    this.loadInfos();
    this.initTimeAppointment();
  }


  getTimeAppointmentByApp(){
    this.timeAppointments$ = this.timeAppointmentService.getTimeAppointmentBy(this.authService.getEntite(),
                                                                              this.searchDateApp).pipe(
      map(data=>{
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  onSearch() {
    this.getTimeAppointmentByApp();
  }

  getAppointment(){
    if (this.mode==1){
      this.appointmentService.getAppointment(this.appointmentId)
        .subscribe(data=>{
          this.appointmentResponse = data;
        });
    }
  }

  saveTime() {
    this.submitted = true;
    if (this.timeFormGroup.invalid) return;
    if (this.modeUpdate==0){

      this.timeFormGroup.controls['appointment'].setValue(this.appointmentResponse);
      this.timeAppointmentService.addTimeAppointment(this.timeFormGroup.value)
        .subscribe(data=>{
          this.timeAppointmentResponse.push(data);

          Swal.fire('Enregistrement', 'Enregistrement effectué avec succès', 'success');
          this.initTimeAppointment();
        },err=>{
          Swal.fire('Erreur', 'Erreur d"enregistrement '+err.error.message, 'error');
        });
    } else if (this.modeUpdate==1){

      this.timeAppointmentService.updateTimeAppointment(this.timeFormGroup.value)
        .subscribe(data=>{

          Swal.fire('Modification', 'Modification effectué avec succès', 'success');
        },err=>{
          Swal.fire('Erreur', 'Erreur de modification '+err.error.message, 'error');
        });
    }

  }

  deleteTimeApp(index, timeApp) {
    this.timeAppointmentResponse.splice(index, 1);
    //if (this.modeUpdate==1){
      //
      this.timeAppointmentService.delete(timeApp)
        .subscribe(data=>{

        },err=>{
          console.log(err)
        });
    //}

  }

  goToList() {
    this.mode=0;
    this.modeUpdate=1;
  }

  goToUpdate(time) {
    this.mode=1;
    this.modeUpdate=1;
    this.timeFormGroup = this.fb.group({
      id:[time.id, Validators.required],
      time:[time.time, Validators.required],
      max:[time.max, Validators.required],
      appointment:[time.appointment]
    });
  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.loadSizeValues();
    this.searchDateApp=formatDate(new Date(), 'yyyy-MM-dd', 'en-US');
    //this.mode=0;
  }

  initTimeAppointment(){
    this.timeFormGroup = this.fb.group({
      time:[Validators.required],
      max:[0, Validators.required],
      appointment:[this.appointmentResponse]
    });
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

  /*newTime() {
    this.mode=1;
    this.modeUpdate=0;
    //this.initSchedule();
  }*/


}
