import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabTestReportComponent } from './lab-test-report.component';

describe('LabTestReportComponent', () => {
  let component: LabTestReportComponent;
  let fixture: ComponentFixture<LabTestReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabTestReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabTestReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
