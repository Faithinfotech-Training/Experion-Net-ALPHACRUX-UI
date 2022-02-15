import { TestBed } from '@angular/core/testing';

import { AddpatientService } from './addpatient.service';

describe('AddpatientService', () => {
  let service: AddpatientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddpatientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
