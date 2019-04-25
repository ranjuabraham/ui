import { TestBed } from '@angular/core/testing';

import { BookingManagementService } from './booking-management.service';

describe('BookingManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookingManagementService = TestBed.get(BookingManagementService);
    expect(service).toBeTruthy();
  });
});
