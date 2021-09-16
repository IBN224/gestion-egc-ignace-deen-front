import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient.model';
import {environment} from '../../environments/environment';
import {Appointment} from '../model/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }


  getAllAppointments():Observable<Appointment[]>{
    //let host = (Math.random()<0.2)?environment.API_URL:environment.UnreachAPI_URL;
    return this.http.get<Appointment[]>(environment.API_URL+"/appointment");
  }

  getAppointmentBySpecialiste(id:number):Observable<Appointment[]>{
    return this.http.get<Appointment[]>(environment.API_URL+"/appointmentBy?id="+id);
  }

  getAppointment(id:number):Observable<Appointment>{
    return this.http.get<Appointment>(environment.API_URL+"/appointment/"+id);
  }

  addAppointment(appointment:Appointment):Observable<Appointment>{
    return this.http.post<Appointment>(environment.API_URL+"/appointment", appointment);
  }

  updateAppointment(appointment:Appointment):Observable<Appointment>{
    return this.http.put<Appointment>(environment.API_URL+"/appointment/"+appointment.id, appointment);
  }

  delete(appointment:Appointment):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removeAppointment/"+appointment.id);
  }

}
