import { Component, OnInit } from '@angular/core';
import {AppDataState, DataStateEnum} from '../../state/appointment.state';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable, of} from 'rxjs';
import {Specialiste} from '../../model/specialiste.model';
import {DepartementService} from '../../services/departement.service';
import {StatusPersonnelService} from '../../services/status-personnel.service';
import {SpecialisteService} from '../../services/specialiste.service';
import Swal from "sweetalert2";
import {catchError, map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.css']
})
export class PersonnelComponent implements OnInit {

  readonly DataSateEnum = DataStateEnum;
  responsePersonnelInfo?: any;
  mode:number;
  modeUpdate: number;
  personnelFormGroup?:FormGroup;
  submitted:boolean = false;
  fonctionResponse: any;
  departementResponse: any;
  isDoctorOption: number;
  personnels$: Observable<AppDataState<Specialiste[]>>;
  searchCatOption: number;
  searchPersonnel: string;
  searchInvalid: boolean;
  currentPage:number;
  pageSize:number;
  selectValues:{value:string}[];



  constructor(private fb:FormBuilder,
              private departementService:DepartementService,
              private statusPersonnelService:StatusPersonnelService,
              private personnelService:SpecialisteService) { }

  ngOnInit() {
    this.loadInfos();
    this.getPersonnels();
  }


  getPersonnels(){
    this.personnels$ = this.personnelService.getAllSpecialistes().pipe(
      map(data=>{
        //console.log(data)
        return ({dataState:DataStateEnum.LOADED,data:data});
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }

  savePersonnel() {
    this.submitted = true;
    if (this.personnelFormGroup.invalid) return;
    if (this.isDoctorOption==0) {
      this.personnelFormGroup.controls['departement'].setValue(null);
      this.personnelFormGroup.controls['statusPersonnel'].setValue({"id":this.personnelFormGroup.value.statusPersonnel});
      this.personnelFormGroup.controls['isDoctor'].setValue(false);
    }else if (this.isDoctorOption==1){
      this.personnelFormGroup.controls['isDoctor'].setValue(true);
      this.personnelFormGroup.controls['statusPersonnel'].setValue({"id":this.personnelFormGroup.value.statusPersonnel});
      this.personnelFormGroup.controls['departement'].setValue({"id":this.personnelFormGroup.value.departement});
    }

    if (this.modeUpdate==1){
      this.personnelService.updateSpecialiste(this.personnelFormGroup.value)
        .subscribe(data=>{
          this.getPersonnels();
          this.mode=0;
          Swal.fire('Modification', 'Modification effectué avec succès', 'success');
        },err=>{
          Swal.fire('Erreur', 'Erreur de modification '+err.name, 'error');
          console.log(err);
        })
    } else if (this.modeUpdate==0){
      this.personnelService.addSpecialiste(this.personnelFormGroup.value)
        .subscribe(data=>{

          Swal.fire('Enregistrement', 'Enregistrement effectué avec succès', 'success');
          this.initPersonnel();
        },err=>{
          Swal.fire('Erreur', 'Erreur d\'enregistrement '+err.name, 'error');
          console.log(err);
        });
    }
  }

  isDocteurChanged(value) {
    this.isDoctorOption=value;
  }

  newPersonnel() {
    this.mode=1;
    this.modeUpdate=0;
    this.initPersonnel();
  }

  goToUpdate(personnel) {
    this.mode=1;
    this.modeUpdate=1;
    if (personnel.isDoctor) this.isDoctorOption=1;
    else this.isDoctorOption=0;

    this.personnelFormGroup = this.fb.group({
      id:[personnel.id],
      firstName:[personnel.firstName, Validators.required],
      lastName:[personnel.lastName, Validators.required],
      statusPersonnel:[personnel.statusPersonnel.id, Validators.required],
      isDoctor:[personnel.isDoctor?1:0, Validators.required],
      departement:[personnel.isDoctor?personnel.departement.id:'undefined'],
      isDeleted:[false]
    });
  }

  showInfo(personnel) {
    this.responsePersonnelInfo=personnel;
    this.mode=2;

  }

  goToList() {
    this.mode=0;
  }

  getAllDepartements(){
    this.departementService.getAllDepartements().subscribe(data=>{
      this.departementResponse=data;
    },err=>{
      console.log(err);
    })
  }

  getAllFonction(){
    this.statusPersonnelService.getAllStatusPersonnels().subscribe(data=>{
      this.fonctionResponse=data;
    },err=>{
      console.log(err);
    })
  }

  initPersonnel(){
    this.personnelFormGroup = this.fb.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      statusPersonnel:['undefined', Validators.required],
      isDoctor:['undefined', Validators.required],
      departement:['undefined', Validators.required],
      isDeleted:[false]
    });
  }

  loadInfos(){
    this.currentPage=1;
    this.pageSize=10;
    this.loadSizeValues();
    this.mode=0;
    this.initPersonnel();
    this.getAllDepartements();
    this.getAllFonction();
  }

  loadSizeValues(){
    this.selectValues=[
      {value: '10'}, {value: '20'},
      {value: '50'}, {value: '100'}];
  }

  sizeChanged(value){
    this.pageSize=value;
  }

  pageChanged(event){
    if(!isNaN(event)){
      this.currentPage=event;
    }
  }


}
