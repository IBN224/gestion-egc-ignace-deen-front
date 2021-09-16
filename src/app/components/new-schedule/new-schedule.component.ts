import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {formatDate} from '@angular/common';
import Swal from 'sweetalert2';
import {AppointmentService} from '../../services/appointment.service';
import {Observable, of} from 'rxjs';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {Appointment} from '../../model/appointment.model';
import {catchError, map, startWith} from 'rxjs/operators';
import {Router} from '@angular/router';
import {TimeAppointment} from '../../model/time-appointment';
import {environment} from '../../../environments/environment';
import {SpecialisteService} from '../../services/specialiste.service';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.css']
})
export class NewScheduleComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  dateInfo?: string;
  maxInfo?: number;
  timeAppointment: Array<TimeAppointment>;
  specialisteResponse: any;
  mode:number;
  modeUpdate: number;
  scheduleFormGroup?:FormGroup;
  submitted:boolean = false;
  appointments$: Observable<AppDataState<Appointment[]>>;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];



  constructor(private fb:FormBuilder,
              private appointmentService:AppointmentService,
              private router:Router,
              private specialisteService:SpecialisteService,
              private authService:AuthenticationService) { }

  ngOnInit() {
    this.initSchedule();
    this.loadInfos();
    this.getAppointments();
  }


  getAppointments(){
    this.appointments$ = this.appointmentService.getAppointmentBySpecialiste(this.authService.getEntite()).pipe(
      map(data=>{
        //console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  saveSchedule() {
    this.submitted = true;
    if (this.scheduleFormGroup.invalid) return;
    if(this.modeUpdate==1){
      this.appointmentService.updateAppointment(this.scheduleFormGroup.value)
        .subscribe(data=>{

          Swal.fire('Modification', 'Modification effectué avec succès', 'success');
        },err=>{
          Swal.fire('Erreur', 'Erreur d"modification '+err.error.message, 'error');
        });
    }else if (this.modeUpdate==0){
      this.appointmentService.addAppointment(this.scheduleFormGroup.value)
        .subscribe(data=>{

          Swal.fire('Enregistrement', 'Enregistrement effectué avec succès', 'success');
          this.initSchedule();
        },err=>{
          Swal.fire('Erreur', 'Erreur d"enregistrement '+err.error.message, 'error');
        });
    }

  }

  goToList() {
    this.mode=0;
  }

  newSchedule() {
    this.mode=1;
    this.modeUpdate=0;
    this.initSchedule();
  }

  showInfo(appointment) {
    this.mode = 2;
    this.timeAppointment = appointment.timeAppointments;
    this.dateInfo = appointment.date;
    this.maxInfo = appointment.max;
  }

  goToUpdate(appointment) {
    this.mode=1;
    this.modeUpdate=1;
    this.scheduleFormGroup = this.fb.group({
      id:[appointment.id, Validators.required],
      date:[appointment.date, Validators.required],
      max:[appointment.max, Validators.required],
      specialiste:[this.specialisteResponse],
      isDeleted:[appointment.isDeleted, Validators.required],
      stateAppointment:[appointment.stateAppointment]
    });
  }

  onGoToTime(appointment) {
    this.router.navigateByUrl('/time-appointment/'+appointment.id+'/1'+'/0');
  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.loadSizeValues();
    this.mode=0;
    this.getSpecialiste();
  }

  getSpecialiste(){
    this.specialisteService.getSpecialiste(this.authService.getEntite())
      .subscribe(data=>{
        this.specialisteResponse = data;
      },err=>{
        console.log(err);
      })
  }

  initSchedule(){
    this.scheduleFormGroup = this.fb.group({
      date:[formatDate(new Date(), 'yyyy-MM-dd', 'en-US'), Validators.required],
      max:[0, Validators.required],
      specialiste:[this.specialisteResponse],
      isDeleted:[false],
      stateAppointment:[0]
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



}
