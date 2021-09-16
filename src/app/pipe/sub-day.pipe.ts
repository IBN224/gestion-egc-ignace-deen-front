import {Pipe, PipeTransform} from '@angular/core';
import {AppointmentService} from '../services/appointment.service';
import {StateAppointment} from '../model/state-appointment.model';
import {Appointment} from '../model/appointment.model';

@Pipe({
  name: 'subDay',
  pure: true
})
export class SubDayPipe implements PipeTransform {

  appointmentResponse?: Array<Appointment>;

  constructor(private appointmentService:AppointmentService){}

  transform(firt: any, day: any, nMonthValue: any, nYearValue: any, id:number, ...args: any[]): any {

    let d = new Date(nYearValue+"/"+nMonthValue+"/"+day).toLocaleDateString();
    //console.log(d);

    return new Promise(resolve=>{
      if (id!=undefined){

     this.appointmentService.getAppointmentBySpecialiste(id)
        .subscribe(data=>{  this.appointmentResponse = data;

        this.appointmentResponse.forEach(val=>{
         let avDate = new Date(val.date).toLocaleDateString();

         if (avDate == d && val.stateAppointment == StateAppointment.AVAILABLE){
          // console.log('000000000000 '+avDate);
           resolve(0);
         }else if (avDate == d && val.stateAppointment == StateAppointment.PASSED){
           //console.log('1111111111111 '+avDate);
           resolve(1);
         }else if (avDate == d && val.stateAppointment == StateAppointment.FULL){
           //console.log('2222222222222222 '+avDate);
           resolve(2);
         }
       });
      });
    }
    });

  }

}
