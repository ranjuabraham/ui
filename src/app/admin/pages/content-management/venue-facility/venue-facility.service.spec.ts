import { TestBed } from '@angular/core/testing';

import { VenueFacilityService } from './venue-facility.service';

describe('VenueFacilityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VenueFacilityService = TestBed.get(VenueFacilityService);
    expect(service).toBeTruthy();
  });
});
