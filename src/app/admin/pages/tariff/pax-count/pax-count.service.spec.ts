import { TestBed } from '@angular/core/testing';

import { PaxCountService } from './pax-count.service';

describe('PaxCountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaxCountService = TestBed.get(PaxCountService);
    expect(service).toBeTruthy();
  });
});
