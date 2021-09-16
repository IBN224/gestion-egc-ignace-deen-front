import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient.model';
import {environment} from '../../environments/environment';
import {PatientAppointment} from '../model/patient-appointment.model';
import {PatientAppointmentModel} from '../model/patient-app.model';

@Injectable({
  providedIn: 'root'
})
export class PatientAppointmentService {

  constructor(private http: HttpClient) { }


  getAllPatientAppointments(entite:number, date:string):Observable<PatientAppointment[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<PatientAppointment[]>(environment.API_URL+"/patient-appointment?date="+date+"&id="+entite);
  }

  /*getProduct(id:number):Observable<Product>{
    return this.http.get<Product>(environment.host+"/products/"+id);
  }*/

  addPatientAppointment(patientAppointment:PatientAppointmentModel):Observable<PatientAppointmentModel>{
    return this.http.post<PatientAppointmentModel>(environment.API_URL+"/patient-appointment-schedule", patientAppointment);
  }

  updatePatientAppointment(patientAppointment:PatientAppointment):Observable<PatientAppointment>{
    return this.http.put<PatientAppointment>(environment.API_URL+"/patient-appointment/"+patientAppointment.id, patientAppointment);
  }

  delete(patientAppointment:PatientAppointment):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removePatientAppointment/"+patientAppointment.id);
  }

}
