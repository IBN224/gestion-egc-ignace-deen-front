import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Patient} from '../model/patient.model';
import {environment} from '../../environments/environment';
import {User} from '../model/user.model';
import {UserStatusForm} from '../model/user-status.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }


  getAllUsersBy(categorie:string, personnelId:number, patientId:number):Observable<User[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<User[]>(environment.API_URL+"/api/auth/userAllBy?categorie="+categorie+"&personnelId="+personnelId+"&patientId="+patientId);
  }

  getUserByUsername(username:string):Observable<User>{
    return this.http.get<User>(environment.API_URL+"/api/auth/user?username="+username);
  }

  getUsersByEntite(entite:number):Observable<User[]>{
    return this.http.get<User[]>(environment.API_URL+"/api/auth/userByEntite?id="+entite);
  }

  addUser(user:User):Observable<string>{
    return this.http.post<string>(environment.API_URL+"/api/auth/signup", user);
  }

  updateStatus(statusForm:UserStatusForm):Observable<User>{
    return this.http.put<User>(environment.API_URL+"/api/auth/status/"+statusForm.id, statusForm);
  }

  updatePatient(patient:Patient):Observable<Patient>{
    return this.http.put<Patient>(environment.API_URL+"/patient/"+patient.idpatient, patient);
  }

  delete(patient:Patient):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removePatient/"+patient.idpatient);
  }
}
