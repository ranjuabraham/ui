import { TestBed } from '@angular/core/testing';

import { VenueProfileService } from './venue-profile.service';

describe('VenueProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenueProfileService = TestBed.get(VenueProfileService);
    expect(service).toBeTruthy();
  });
});
