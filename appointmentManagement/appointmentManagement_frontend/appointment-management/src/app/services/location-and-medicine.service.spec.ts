import { TestBed } from '@angular/core/testing';

import { LocationAndMedicineService } from './location-and-medicine.service';

describe('LocationAndMedicineService', () => {
  let service: LocationAndMedicineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocationAndMedicineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
