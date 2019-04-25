import { TestBed, inject } from '@angular/core/testing';

import { RemoveTestBookingsService } from './remove-test-bookings.service';

describe('RemoveTestBookingsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RemoveTestBookingsService]
    });
  });

  it('should be created', inject([RemoveTestBookingsService], (service: RemoveTestBookingsService) => {
    expect(service).toBeTruthy();
  }));
});
