import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndiviualreportComponent } from './indiviualreport.component';

describe('IndiviualreportComponent', () => {
  let component: IndiviualreportComponent;
  let fixture: ComponentFixture<IndiviualreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndiviualreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndiviualreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
