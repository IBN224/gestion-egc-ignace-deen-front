import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TimeAppointmentService} from '../../services/time-appointment.service';
import {TimeAppointment} from '../../model/time-appointment';
import {formatDate} from '@angular/common';
import {PatientService} from '../../services/patient.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PatientAppointmentService} from '../../services/patient-appointment.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';


declare const $: any;
@Component({
  selector: 'app-confirm-schedule',
  templateUrl: './confirm-schedule.component.html',
  styleUrls: ['./confirm-schedule.component.css']
})
export class ConfirmScheduleComponent implements OnInit {

  @ViewChild('htmlData', { static: true }) htmlData:ElementRef;
  @ViewChild('confirm', { static: false }) confirmDiv: ElementRef;
  @ViewChild('afterSave', { static: false }) afterSaveDiv: ElementRef;

  date?: string;
  time?: string;
  mode: number;
  service?: string;
  specialiste?: string;
  status?: string;
  heure?: string;
  modeAlert: number;
  confirmScheduleFormGroup?:FormGroup;
  timeAppointmentResponse: Array<TimeAppointment> = [];
  submitted = false;
  numbers: any;
  doctorId: number;
  phoneInvalid: boolean;
  pointer=1;
  USERS = [
    {
      "id": 1,
      "name": "Leanne Graham",
      "email": "sincere@april.biz",
      "phone": "1-770-736-8031 x56442"
    },
    {
      "id": 2,
      "name": "Ervin Howell",
      "email": "shanna@melissa.tv",
      "phone": "010-692-6593 x09125"
    },
    {
      "id": 3,
      "name": "Clementine Bauch",
      "email": "nathan@yesenia.net",
      "phone": "1-463-123-4447",
    },
    {
      "id": 4,
      "name": "Patricia Lebsack",
      "email": "julianne@kory.org",
      "phone": "493-170-9623 x156"
    },
    {
      "id": 5,
      "name": "Chelsey Dietrich",
      "email": "lucio@annie.ca",
      "phone": "(254)954-1289"
    },
    {
      "id": 6,
      "name": "Mrs. Dennis",
      "email": "karley@jasper.info",
      "phone": "1-477-935-8478 x6430"
    }
  ];

  constructor(private activatedRoute:ActivatedRoute,
              private timeAppointmentService:TimeAppointmentService,
              private patientService:PatientService,
              private fb:FormBuilder,
              private patientAppointmentService:PatientAppointmentService) {

    this.doctorId=activatedRoute.snapshot.params.doctor;
    this.date = formatDate(new Date(activatedRoute.snapshot.params.year+"/"+
                                          activatedRoute.snapshot.params.month+"/"+
                                          activatedRoute.snapshot.params.day), 'yyyy-MM-dd', 'en-US');
  }

  ngOnInit() {
    $(document).ready(function(){
      $(":input").inputmask();
      /*or
      Inputmask().mask(document.querySelectorAll("input"));*/
    });
    this.getTimeAppointment();
    this.initConfirmSchedule();
    this.loadInfo();

  }


  getTimeAppointment(){
    this.timeAppointmentService.getTimeAppointmentBy(this.doctorId,this.date)
      .subscribe(data=>{
        this.timeAppointmentResponse = data;
        this.service = this.timeAppointmentResponse[0].appointment.specialiste.departement.name;
       // this.status = this.timeAppointmentResponse[0].appointment.specialiste.status;
        this.specialiste = this.timeAppointmentResponse[0].appointment.specialiste.lastName+" "+
          this.timeAppointmentResponse[0].appointment.specialiste.firstName;
      },err=>{
        console.log(err);
      });
  }

  getTimeInfo(id:number){
    for (let time of this.timeAppointmentResponse) {
      if (time.id==id) return time;
    }
  }

  confirmSchedule() {
    this.heure=this.getTimeInfo(this.confirmScheduleFormGroup.value.timeAppId).time;
        this.patientAppointmentService.addPatientAppointment(this.confirmScheduleFormGroup.value)
          .subscribe(data=>{

            this.mode=2;
            this.afterSaveDiv.nativeElement.scrollIntoView();
            window.scrollTo(0, 0);
          },err => {
         this.modeAlert=2;
         console.log(err.error.message);
          });

  }

  initConfirmSchedule(){
    this.confirmScheduleFormGroup = this.fb.group({
      nom:["", Validators.required],
      prenom:["", Validators.required],
      telephone:["", Validators.required],
      adresse:["", Validators.required],
      age:[0, Validators.required],
      genre:["", Validators.required],
      timeAppId:["", Validators.required],
    });
  }

  onContinue() {
    this.submitted = true;
    if (this.confirmScheduleFormGroup.invalid) return;

    this.patientService.checkPatientPhone(this.confirmScheduleFormGroup.value.telephone)
      .subscribe(data=>{

      },err=>{
        if (err.error.text=='Contact good!'){
          this.mode = 1;
          this.confirmDiv.nativeElement.scrollIntoView();
          window.scrollTo(0, 0);
          this.phoneInvalid=false;
          console.log('goodddddddddddd');
        }else {
          this.phoneInvalid=true;
          console.log('errorrrrrrrrrrrr')
        }
      });
  }

  loadInfo(){
    this.mode = 0;
    this.phoneInvalid=false;
  }

  print() {

    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);

      PDF.save('rendez-vous.pdf');
    });

  }


}
