import {Patient} from './patient.model';
import {TimeAppointment} from './time-appointment';

export interface PatientAppointment {
  id: number;
  patient: Patient;
  timeAppointment: TimeAppointment;
}
