import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient.model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }


  getAllPatients():Observable<Patient[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<Patient[]>(environment.API_URL+"/patient");
  }

  getAllPatientNoCompte():Observable<Patient[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<Patient[]>(environment.API_URL+"/patientNoCompte");
  }

  checkPatientPhone(phone:string):Observable<string>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<string>(environment.API_URL+"/checkPatientTelephone?tele="+phone);
  }

  addPatient(patient:Patient):Observable<string>{
    return this.http.post<string>(environment.API_URL+"/patient", patient);
  }

  updatePatient(patient:Patient):Observable<string>{
    return this.http.put<string>(environment.API_URL+"/patient/"+patient.idpatient, patient);
  }

  delete(patient:Patient):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removePatient/"+patient.idpatient);
  }

}
