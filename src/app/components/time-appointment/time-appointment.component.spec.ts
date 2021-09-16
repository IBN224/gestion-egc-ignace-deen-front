import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeAppointmentComponent } from './time-appointment.component';

describe('TimeAppointmentComponent', () => {
  let component: TimeAppointmentComponent;
  let fixture: ComponentFixture<TimeAppointmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeAppointmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
