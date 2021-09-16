import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-visiteur',
  templateUrl: './patient-visiteur.component.html',
  styleUrls: ['./patient-visiteur.component.css']
})
export class PatientVisiteurComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {

  }

}
