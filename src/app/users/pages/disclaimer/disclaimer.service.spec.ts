import { TestBed, inject } from '@angular/core/testing';

import { DisclaimerService } from './disclaimer.service';

describe('DisclaimerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisclaimerService]
    });
  });

  it('should be created', inject([DisclaimerService], (service: DisclaimerService) => {
    expect(service).toBeTruthy();
  }));
});
