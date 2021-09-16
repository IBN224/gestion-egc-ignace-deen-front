import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreHospitalierComponent } from './centre-hospitalier.component';

describe('CentreHospitalierComponent', () => {
  let component: CentreHospitalierComponent;
  let fixture: ComponentFixture<CentreHospitalierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CentreHospitalierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CentreHospitalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
