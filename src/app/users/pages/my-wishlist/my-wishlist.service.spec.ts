import { TestBed, inject } from '@angular/core/testing';

import { MyWishlistService } from './my-wishlist.service';

describe('MyWishlistService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyWishlistService]
    });
  });

  it('should be created', inject([MyWishlistService], (service: MyWishlistService) => {
    expect(service).toBeTruthy();
  }));
});
