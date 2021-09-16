import { Injectable } from '@angular/core';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {TestResult} from '../model/test-result.model';

@Injectable({
  providedIn: 'root'
})
export class TestResultService {

  constructor(private http:HttpClient) { }



  getTestResultsBy(entite:number, categorie:string, personnelId:number, patientId:number):Observable<TestResult[]>{
    //let host = (Math.random()<0.2)?environment.host:environment.UnreachHost;
    return this.http.get<TestResult[]>(environment.API_URL+"/testResultBy?specialisteId="+entite
      +"&categorie="+categorie+"&personnelId="+personnelId+"&patientId="+patientId);
  }

  getTestByPatient(id:number):Observable<TestResult[]>{
    return this.http.get<TestResult[]>(environment.API_URL+"/testResultByPatient?id="+id);
  }

  getTestByPersonnel(id:number):Observable<TestResult[]>{
    return this.http.get<TestResult[]>(environment.API_URL+"/testResultByPersonnel?id="+id);
  }

  addTestResult(testResult:TestResult):Observable<TestResult>{
    return this.http.post<TestResult>(environment.API_URL+"/testResult", testResult);
  }

  updateTestResult(testResult:TestResult):Observable<TestResult>{
    return this.http.put<TestResult>(environment.API_URL+"/testResult/"+testResult.id, testResult);
  }

  delete(testResult:TestResult):Observable<void>{
    return this.http.delete<void>(environment.API_URL+"/removeTestResult/"+testResult.id);
  }

  uploadDocumentResultTest(file:File, resultId:number){
    let formData:FormData = new FormData();
    formData.append('file',file);
    //if (this.jwToken==null) this.loadToken();
    const req = new HttpRequest('POST', environment.API_URL+'/documentTestResult/'+resultId, formData,{
      reportProgress: true,
      responseType: 'text'
      //headers:new HttpHeaders({'Authorization':this.jwToken})
    });
    return this.http.request(req);
  }

}
