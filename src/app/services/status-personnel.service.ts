import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Departement} from '../model/departement.model';
import {environment} from '../../environments/environment';
import {StatusPersonnel} from '../model/status-personnel.model';

@Injectable({
  providedIn: 'root'
})
export class StatusPersonnelService {

  constructor(private http:HttpClient) { }


  getAllStatusPersonnels():Observable<StatusPersonnel[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<StatusPersonnel[]>(environment.API_URL+"/statusPersonnel");
  }

  getStatutPersonnel(id:number):Observable<StatusPersonnel>{
    return this.http.get<StatusPersonnel>(environment.API_URL+"/statusPersonnel/"+id);
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
