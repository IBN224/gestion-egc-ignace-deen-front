import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Appointment} from '../model/appointment.model';
import {environment} from '../../environments/environment';
import {TimeAppointment} from '../model/time-appointment';

@Injectable({
  providedIn: 'root'
})
export class TimeAppointmentService {

  constructor(private http:HttpClient) { }


  getAllTimeAppointments():Observable<TimeAppointment[]>{
    //let host = (Math.random()<0.2)?environment.API_URL:environment.UnreachAPI_URL;
    return this.http.get<TimeAppointment[]>(environment.API_URL+"/time-appointment");
  }

  getTimeAppointmentBy(entite:number, date:string):Observable<TimeAppointment[]>{
    return this.http.get<TimeAppointment[]>(environment.API_URL+"/time-appointmentByspecialiste?date="+date+"&id="+entite);
  }

  /*getTimeAppointmentBy(date:string):Observable<TimeAppointment[]>{
    return this.http.get<TimeAppointment[]>(environment.API_URL+"/time-appointmentBy?date="+date);
  }*/

  addTimeAppointment(timeAppointment:TimeAppointment):Observable<TimeAppointment>{
    return this.http.post<TimeAppointment>(environment.API_URL+"/time-appointment", timeAppointment);
  }

  updateTimeAppointment(timeAppointment:TimeAppointment):Observable<TimeAppointment>{
    return this.http.put<TimeAppointment>(environment.API_URL+"/time-appointment/"+timeAppointment.id, timeAppointment);
  }

  delete(timeAppointment:TimeAppointment):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/time-appointment/"+timeAppointment.id);
  }

}
