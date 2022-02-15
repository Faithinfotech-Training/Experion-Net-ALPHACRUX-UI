import { TestBed } from '@angular/core/testing';

import { PatientListServiceService } from './patient-list-service.service';

describe('PatientListServiceService', () => {
  let service: PatientListServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientListServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
