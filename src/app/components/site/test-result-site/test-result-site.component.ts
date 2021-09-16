import { Component, OnInit } from '@angular/core';
import {catchError, map, startWith} from 'rxjs/operators';
import {AppDataState, DataStateEnum} from '../../../state/appointment.state';
import {Observable, of} from 'rxjs';
import {TestResultService} from '../../../services/test-result.service';
import {TestResult} from '../../../model/test-result.model';
import {environment} from '../../../../environments/environment';
import {UserService} from '../../../services/user.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-test-result-site',
  templateUrl: './test-result-site.component.html',
  styleUrls: ['./test-result-site.component.css']
})
export class TestResultSiteComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  testResult$: Observable<AppDataState<TestResult[]>>;
  categorie: number;

  constructor(private testResultService:TestResultService,
              private userService:UserService,
              private authService:AuthenticationService,
              private activetedRoute:ActivatedRoute) {
    this.categorie = activetedRoute.snapshot.params.categorie;
  }

  ngOnInit() {
    this.getTestPatients();
  }


  getTestPatients(){
    let user = sessionStorage.getItem("username");
    this.userService.getUserByUsername(user)
      .subscribe(resp=>{

        if (this.categorie==0){
          this.testResult$ = this.testResultService.getTestByPatient(resp.patient.idpatient).pipe(
            map(data=>{
              //console.log(data)
              return ({dataState:DataStateEnum.LOADED,data:data});
            }),
            startWith({dataState:DataStateEnum.LOADING}),
            catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
          );
        } else if (this.categorie==1){
          this.testResult$ = this.testResultService.getTestByPersonnel(resp.personnel.id).pipe(
            map(data=>{
              //console.log(data)
              return ({dataState:DataStateEnum.LOADED,data:data});
            }),
            startWith({dataState:DataStateEnum.LOADING}),
            catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
          );
        }else {/***** if user is already connected **********/
          let role = sessionStorage.getItem("authority");
          if (role=='ROLE_PATIENT'){
            this.testResult$ = this.testResultService.getTestByPatient(resp.patient.idpatient).pipe(
              map(data=>{
                //console.log(data)
                return ({dataState:DataStateEnum.LOADED,data:data});
              }),
              startWith({dataState:DataStateEnum.LOADING}),
              catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
            );
          } else {
            this.testResult$ = this.testResultService.getTestByPersonnel(resp.personnel.id).pipe(
              map(data=>{
                //console.log(data)
                return ({dataState:DataStateEnum.LOADED,data:data});
              }),
              startWith({dataState:DataStateEnum.LOADING}),
              catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
            );
          }

        }

      },err=>{
        console.log(err.error.message);
      });

  }

  showDocument(path) {
    window.open(environment.SERVER_DOC+path, '_blank');
  }

  logOut() {
    this.authService.logOut();
  }
}
