import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

declare const $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }


  onGetPatientVisiteur() {
   this.route.navigate(['patient-visiteur'], {fragment:'patient-visiteur'});
   this.hideCollapse();
  }

  onGetCentreHospitalier() {
    this.route.navigate(['centre-hospitalier'], {fragment:'centre-hospitalier'});
    this.hideCollapse();
    /*[routerLink]="['centre-hospitalier']" [queryParams]="{debug: true}" fragment="centre-hospitalier"*/
  }

  hideCollapse() {
    if ($(window).width() <= 768) {
      $('#navbarCollapse').collapse ('hide');
    }

  }

  onGetTestResult() {
    this.hideCollapse();
    this.route.navigate(['test-result'], {fragment:''});
  }

}
