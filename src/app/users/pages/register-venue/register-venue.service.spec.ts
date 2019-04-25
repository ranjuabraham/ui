import { TestBed, inject } from '@angular/core/testing';

import { RegisterVenueService } from './register-venue.service';

describe('RegisterVenueService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterVenueService]
    });
  });

  it('should be created', inject([RegisterVenueService], (service: RegisterVenueService) => {
    expect(service).toBeTruthy();
  }));
});
