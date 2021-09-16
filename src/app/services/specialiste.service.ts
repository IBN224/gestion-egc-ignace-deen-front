import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Specialiste} from '../model/specialiste.model';

@Injectable({
  providedIn: 'root'
})
export class SpecialisteService {

  constructor(private http:HttpClient) { }


  getAllSpecialistes():Observable<Specialiste[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<Specialiste[]>(environment.API_URL+"/specialiste");
  }

  getAllPersonnelNoCompte():Observable<Specialiste[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<Specialiste[]>(environment.API_URL+"/personnelNoCompte");
  }

  getSpecialiste(id:number):Observable<Specialiste>{
    return this.http.get<Specialiste>(environment.API_URL+"/specialiste/"+id);
  }

  getSpecialistesByDepartement(id:number):Observable<Specialiste>{
    return this.http.get<Specialiste>(environment.API_URL+"/specialisteByDepartement?id="+id);
  }

  getEntites():Observable<Specialiste[]>{
    return this.http.get<Specialiste[]>(environment.API_URL+"/entite");
  }

  addSpecialiste(specialiste:Specialiste):Observable<Specialiste>{
    return this.http.post<Specialiste>(environment.API_URL+"/specialiste", specialiste);
  }

  updateSpecialiste(specialiste:Specialiste):Observable<Specialiste>{
    return this.http.put<Specialiste>(environment.API_URL+"/specialiste/"+specialiste.id, specialiste);
  }

  delete(specialiste:Specialiste):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removeSpecialiste/"+specialiste.id);
  }
}
