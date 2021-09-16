import {Departement} from './departement.model';
import {StatusPersonnel} from './status-personnel.model';

export interface Specialiste {
  id: number;
  firstName: string;
  lastName: string;
  statusPersonnel: StatusPersonnel;
  isDoctor: boolean;
  departement: Departement;
  isDeleted: boolean;
}
