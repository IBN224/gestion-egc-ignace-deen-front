import {Patient} from './patient.model';
import {Document} from './document.model';
import {Specialiste} from './specialiste.model';

export interface TestResult {
  id: number;
  categorie: boolean;
  description: string;
  date: Date;
  specialiste: Specialiste;
  personnel: Specialiste;
  patient: Patient;
  documents: Array<Document>;
  isDeleted: boolean;
}
