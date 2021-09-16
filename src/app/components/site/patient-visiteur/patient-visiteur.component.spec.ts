import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVisiteurComponent } from './patient-visiteur.component';

describe('PatientVisiteurComponent', () => {
  let component: PatientVisiteurComponent;
  let fixture: ComponentFixture<PatientVisiteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientVisiteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientVisiteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
