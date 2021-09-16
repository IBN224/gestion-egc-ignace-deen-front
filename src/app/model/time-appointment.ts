import {Appointment} from './appointment.model';
import {PatientAppointment} from './patient-appointment.model';

export interface TimeAppointment {
  id: number;
  time: string;
  max: number;
  appointment: Appointment;
  patientAppointments: Array<PatientAppointment>;
}
