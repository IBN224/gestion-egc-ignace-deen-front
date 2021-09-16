import {Patient} from './patient.model';
import {Specialiste} from './specialiste.model';

export interface User {
  id:number;
  username: string;
  password: string;
  roles: Array<any>;
  patient: Patient;
  personnel: Specialiste;
  entite: Specialiste;
  isActive: boolean;
}
