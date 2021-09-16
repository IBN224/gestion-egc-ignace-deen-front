import {StateAppointment} from './state-appointment.model';
import {TimeAppointment} from './time-appointment';
import {Specialiste} from './specialiste.model';

export interface Appointment {
  id: number;
  date: Date;
  stateAppointment: StateAppointment;
  max: number;
  specialiste: Specialiste
  timeAppointments: Array<TimeAppointment>;
  isDeleted: boolean;
}
