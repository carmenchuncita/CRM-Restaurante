import { TestBed } from '@angular/core/testing';

import { ReservationsService } from '../services/reservations.service';

describe('ReservationsService', () => {
  let service: ReservationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
