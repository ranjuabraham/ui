import { TestBed, inject } from '@angular/core/testing';

import { MyReviewsService } from './my-reviews.service';

describe('MyReviewsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyReviewsService]
    });
  });

  it('should be created', inject([MyReviewsService], (service: MyReviewsService) => {
    expect(service).toBeTruthy();
  }));
});
