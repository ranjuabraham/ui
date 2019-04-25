import { TestBed } from '@angular/core/testing';

import { HallDetailsService } from './hall-details.service';

describe('HallDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HallDetailsService = TestBed.get(HallDetailsService);
    expect(service).toBeTruthy();
  });
});
