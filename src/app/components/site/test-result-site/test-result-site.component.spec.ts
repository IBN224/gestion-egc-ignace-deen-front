import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultSiteComponent } from './test-result-site.component';

describe('TestResultSiteComponent', () => {
  let component: TestResultSiteComponent;
  let fixture: ComponentFixture<TestResultSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestResultSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestResultSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
