import { TestBed } from '@angular/core/testing';

import { MedicinedocService } from './medicinedoc.service';

describe('MedicinedocService', () => {
  let service: MedicinedocService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicinedocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
