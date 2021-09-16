import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientRendezVousComponent } from './patient-rendez-vous.component';

describe('PatientRendezVousComponent', () => {
  let component: PatientRendezVousComponent;
  let fixture: ComponentFixture<PatientRendezVousComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientRendezVousComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
