import {Component, OnInit} from '@angular/core';
import {PatientAppointmentService} from '../../services/patient-appointment.service';
import {Router} from '@angular/router';
import {DepartementService} from '../../services/departement.service';
import {SpecialisteService} from '../../services/specialiste.service';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {

  daysOfMonth =[];
  nMonthValue: number;
  nYearValue: number;
  nameMonth?: string;
  searchDepartement: number;
  searchDocteur: number;
  responseDepartement: any;
  responseSpecialiste: any;
  daysAvailable = [13, 21, 27, 20, 1, 17, 8];
  finalDaysOf = [
    {
      "Sunday": "",
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    },
    {
      "Sunday": "",
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    },
    {
      "Sunday": "",
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    },
    {
      "Sunday": "",
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    },
    {
      "Sunday": "",
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    },
    {
      "Sunday": "",
      "Monday": "",
      "Tuesday": "",
      "Wednesday": "",
      "Thursday": "",
      "Friday": "",
      "Saturday": ""
    }
  ];



  constructor(private patientAppointmentService:PatientAppointmentService,
              private router:Router,
              private departementService:DepartementService,
              private specialisteService:SpecialisteService) { }

  ngOnInit() {
    this.loadInfo();
    //console.log(this.daysAvailable);
    this.getAllDepartements();
  }



  getAllDepartements(){
    this.departementService.getAllDepartementsForSchedule()
      .subscribe(data=>{
        this.responseDepartement = data;
      },err=>{
        console.log(err);
      })
  }

  departementChanged(value) {
    this.responseSpecialiste = [];
    this.searchDocteur = undefined;
    this.specialisteService.getSpecialistesByDepartement(value)
      .subscribe(data=>{
        this.responseSpecialiste = data;
      },err=>{
        console.log(err)
      })
  }

  loadInfo(){
    const nowDate = new Date();
    this.nMonthValue = nowDate.getUTCMonth()+1;
    this.nYearValue = nowDate.getFullYear();
    this.getCalendar();
    this.getNameMonth(this.nMonthValue);
  }

  nMonthChanged(value) {
    this.getCalendar();
    this.getNameMonth(value);
  }

  nYearChanged(value) {
    this.getCalendar();
  }

  getCalendar(){

    this.daysOfMonth = [];
    this.finalDaysOf = [
      {
        "Sunday": "",
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      },
      {
        "Sunday": "",
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      },
      {
        "Sunday": "",
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      },
      {
        "Sunday": "",
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      },
      {
        "Sunday": "",
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      },
      {
        "Sunday": "",
        "Monday": "",
        "Tuesday": "",
        "Wednesday": "",
        "Thursday": "",
        "Friday": "",
        "Saturday": ""
      }
    ];

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let numberOfMonth = new Date(this.nYearValue, this.nMonthValue, 0).getDate();
    //console.log('nbre of month '+numberOfMonth);
    let subVal = 0;

    for (let i=1; i<=numberOfMonth; i++){
      let d = new Date(this.nYearValue+"/"+this.nMonthValue+"/"+i);
      let dayName = days[d.getDay()];

      if (i==1 && dayName!='Sunday') subVal = days.indexOf(dayName);

      if (dayName=='Sunday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Sunday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Sunday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Sunday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Sunday = i.toString();
        }else if(i>=29-subVal && i<=32-subVal){
          this.finalDaysOf[4].Sunday = i.toString();
        }else if(i>=33-subVal){
          this.finalDaysOf[5].Sunday = i.toString();
        }
      } else if (dayName=='Monday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Monday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Monday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Monday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Monday = i.toString();
        }else if(i>=29-subVal && i<=32-subVal){
          this.finalDaysOf[4].Monday = i.toString();
        }else if(i>=33-subVal){
          this.finalDaysOf[5].Monday = i.toString();
        }
      } else if (dayName=='Tuesday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Tuesday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Tuesday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Tuesday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Tuesday = i.toString();
        }else if(i>=29-subVal && i<=32-subVal){
          this.finalDaysOf[4].Tuesday = i.toString();
        }else if(i>=33-subVal){
          this.finalDaysOf[5].Tuesday = i.toString();
        }
      } else if (dayName=='Wednesday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Wednesday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Wednesday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Wednesday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Wednesday = i.toString();
        }else if(i>=29-subVal && i<=32-subVal){
          this.finalDaysOf[4].Wednesday = i.toString();
        }else if(i>=33-subVal){
          this.finalDaysOf[5].Wednesday = i.toString();
        }
      } else if (dayName=='Thursday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Thursday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Thursday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Thursday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Thursday = i.toString();
        }else if(i>=29-subVal && i<=33-subVal){
          this.finalDaysOf[4].Thursday = i.toString();
        }else if(i>=34-subVal){
          this.finalDaysOf[5].Thursday = i.toString();
        }
      } else if (dayName=='Friday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Friday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Friday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Friday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Friday = i.toString();
        }else if(i>=29-subVal && i<=34-subVal){
          this.finalDaysOf[4].Friday = i.toString();
        }else if(i>=35-subVal){
          this.finalDaysOf[5].Friday = i.toString();
        }
      } else if (dayName=='Saturday'){
        if (i<=7-subVal){//first week
          this.finalDaysOf[0].Saturday = i.toString();
        }else if(i>=8-subVal && i<=14-subVal){
          this.finalDaysOf[1].Saturday = i.toString();
        }else if(i>=15-subVal && i<=21-subVal){
          this.finalDaysOf[2].Saturday = i.toString();
        }else if(i>=22-subVal && i<=28-subVal){
          this.finalDaysOf[3].Saturday = i.toString();
        }else if(i>=29-subVal && i<=35-subVal){
          this.finalDaysOf[4].Saturday = i.toString();
        }else if(i>=36-subVal){
          this.finalDaysOf[5].Saturday = i.toString();
        }
      }

     /* switch (dayName) {
        case "Sunday": this.daysOfMonth.push({'Sunday':i});break;
        case "Monday": this.daysOfMonth.push({'Monday':i});break;
        case "Tuesday": this.daysOfMonth.push({'Tuesday':i});break;
        case "Wednesday": this.daysOfMonth.push({'Wednesday':i});break;
        case "Thursday": this.daysOfMonth.push({'Thursday':i});break;
        case "Friday": this.daysOfMonth.push({'Friday':i});break;
        case "Saturday": this.daysOfMonth.push({'Saturday':+i});break;
      }*/

    }

    //console.log(this.daysOfMonth);
    //console.log(this.finalDaysOf);

  }

  getNameMonth(val:number){
    if (val==1){
      this.nameMonth = 'Janvier';
    } else if (val==2){
      this.nameMonth = 'Février'
    } else if (val==3){
      this.nameMonth = 'Mars'
    } else if (val==4){
      this.nameMonth = 'Avril'
    } else if (val==5){
      this.nameMonth = 'Mai'
    } else if (val==6){
      this.nameMonth = 'Juin'
    } else if (val==7){
      this.nameMonth = 'Juillet'
    } else if (val==8){
      this.nameMonth = 'Août'
    } else if (val==9){
      this.nameMonth = 'Septembre'
    } else if (val==10){
      this.nameMonth = 'Octobre'
    } else if (val==11){
      this.nameMonth = 'Novembre'
    } else if (val==12){
      this.nameMonth = 'Décembre'
    }
  }

  /*getAvalidateDate(day) {
    return this.daysAvailable.find(x => x == day);
  }*/

  onGetSchedule(day: string) {
    this.router.navigateByUrl('confirm-schedule/'+day+'/'+this.nMonthValue+'/'+this.nYearValue+'/'+this.searchDocteur);
  }


}
