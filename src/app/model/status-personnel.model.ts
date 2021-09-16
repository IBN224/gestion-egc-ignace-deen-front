import {Specialiste} from './specialiste.model';

export interface StatusPersonnel {
  id:number;
  name: string;
  specialistes: Array<Specialiste>;
}
