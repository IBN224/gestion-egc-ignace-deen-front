import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Departement} from '../model/departement.model';

@Injectable({
  providedIn: 'root'
})
export class DepartementService {

  constructor(private http:HttpClient) { }


  getAllDepartements():Observable<Departement[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<Departement[]>(environment.API_URL+"/departement");
  }

  getAllDepartementsForSchedule():Observable<Departement[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<Departement[]>(environment.API_URL+"/departementSchedule");
  }

  getDepartement(id:number):Observable<Departement>{
    return this.http.get<Departement>(environment.API_URL+"/departement/"+id);
  }

  addDepartement(departement:Departement):Observable<Departement>{
    return this.http.post<Departement>(environment.API_URL+"/departement", departement);
  }

  updateDepartement(departement:Departement):Observable<Departement>{
    return this.http.put<Departement>(environment.API_URL+"/departement/"+departement.id, departement);
  }

  delete(departement:Departement):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removePatient/"+departement.id);
  }
}
