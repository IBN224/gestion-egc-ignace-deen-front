export interface Patient {
  idpatient:number;
  nom: string;
  prenom: string;
  telephone: string;
  adresse: string;
  age:number;
  genre:string;
  patientAppointments: Array<any>;
  isDeleted: boolean;
}
