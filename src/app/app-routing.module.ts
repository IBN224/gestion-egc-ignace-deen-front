import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ScheduleComponent} from './components/schedule/schedule.component';
import {ConfirmScheduleComponent} from './components/confirm-schedule/confirm-schedule.component';
import {NewScheduleComponent} from './components/new-schedule/new-schedule.component';
import {TimeAppointmentComponent} from './components/time-appointment/time-appointment.component';
import {PatientRendezVousComponent} from './components/patient-rendez-vous/patient-rendez-vous.component';
import {HomeComponent} from './components/site/home/home.component';
import {PatientVisiteurComponent} from './components/site/patient-visiteur/patient-visiteur.component';
import {CentreHospitalierComponent} from './components/site/centre-hospitalier/centre-hospitalier.component';
import {TestResultComponent} from './components/test-result/test-result.component';
import {TestResultSiteComponent} from './components/site/test-result-site/test-result-site.component';
import {LoginSiteComponent} from './components/site/login-site/login-site.component';
import {AuthGaurdService} from './services/auth-gaurd.service';
import {LoginAdminComponent} from './components/login-admin/login-admin.component';
import {AuthGaurdAdminService} from './services/auth-gaurd-admin.service';
import {UserComponent} from './components/user/user.component';
import {PersonnelComponent} from './components/personnel/personnel.component';
import {PatientComponent} from './components/patient/patient.component';


const routes: Routes = [
  /***************** site url *******************/
  {path:"", component:HomeComponent},
  {path:"schedule", component:ScheduleComponent},
  {path:"confirm-schedule/:day/:month/:year/:doctor", component:ConfirmScheduleComponent},
  {path:"patient-visiteur", component:PatientVisiteurComponent},
  {path:"centre-hospitalier", component:CentreHospitalierComponent},
  {path:"test-result", component:TestResultSiteComponent, canActivate:[AuthGaurdService]},
  {path:"login", component:LoginSiteComponent},
  /***************** end *******************/
  /***************** back office url *******************/
  {path:"new-schedule", component:NewScheduleComponent, canActivate:[AuthGaurdAdminService]},
  {path:"rendez-vous-patient", component:PatientRendezVousComponent, canActivate:[AuthGaurdAdminService]},
  {path:"time-appointment/:id/:mode/:modeUpdate", component:TimeAppointmentComponent, canActivate:[AuthGaurdAdminService]},
  {path:"time-appointment/:mode", component:TimeAppointmentComponent, canActivate:[AuthGaurdAdminService]},
  {path:"test-result/:categorie", component:TestResultSiteComponent, canActivate:[AuthGaurdService]},
  {path:"test-result-admin", component:TestResultComponent, canActivate:[AuthGaurdAdminService]},
  {path:"login-admin", component:LoginAdminComponent},
  {path:"utilisateur", component:UserComponent},
  {path:"personnel", component:PersonnelComponent},
  {path:"patient", component:PatientComponent},
  /***************** end *******************/

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    scrollOffset: [0, 64]
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
