import {Specialiste} from './specialiste.model';

export interface Departement {
  id: number;
  name: string;
  specialistes: Array<Specialiste>;
  isDeleted: boolean;
}
