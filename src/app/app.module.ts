import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SubDayPipe } from './pipe/sub-day.pipe';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ConfirmScheduleComponent } from './components/confirm-schedule/confirm-schedule.component';
import { NewScheduleComponent } from './components/new-schedule/new-schedule.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { TimeAppointmentComponent } from './components/time-appointment/time-appointment.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PatientRendezVousComponent } from './components/patient-rendez-vous/patient-rendez-vous.component';
import { HomeComponent } from './components/site/home/home.component';
import { HeaderComponent } from './components/site/header/header.component';
import { FooterComponent } from './components/site/footer/footer.component';
import { PatientVisiteurComponent } from './components/site/patient-visiteur/patient-visiteur.component';
import { CentreHospitalierComponent } from './components/site/centre-hospitalier/centre-hospitalier.component';
import { TestResultComponent } from './components/test-result/test-result.component';
import { TestResultSiteComponent } from './components/site/test-result-site/test-result-site.component';
import {NgSelect2Module} from 'ng-select2';
import { LoginSiteComponent } from './components/site/login-site/login-site.component';
import {BasicAuthHtppInterceptorService} from './services/basic-auth-interceptor.service';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { UserComponent } from './components/user/user.component';
import { GetRoleNamePipe } from './pipe/get-role-name.pipe';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { PatientComponent } from './components/patient/patient.component';


@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    SubDayPipe,
    ConfirmScheduleComponent,
    NewScheduleComponent,
    TimeAppointmentComponent,
    NavBarComponent,
    PatientRendezVousComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PatientVisiteurComponent,
    CentreHospitalierComponent,
    TestResultComponent,
    TestResultSiteComponent,
    LoginSiteComponent,
    LoginAdminComponent,
    UserComponent,
    GetRoleNamePipe,
    PersonnelComponent,
    PatientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgSelect2Module
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
