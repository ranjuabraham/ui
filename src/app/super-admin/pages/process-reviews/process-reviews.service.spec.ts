import { TestBed, inject } from '@angular/core/testing';

import { ProcessReviewsService } from './process-reviews.service';

describe('ProcessReviewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessReviewsService]
    });
  });

  it('should be created', inject([ProcessReviewsService], (service: ProcessReviewsService) => {
    expect(service).toBeTruthy();
  }));
});
