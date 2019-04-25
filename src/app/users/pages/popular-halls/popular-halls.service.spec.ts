import { TestBed, inject } from '@angular/core/testing';

import { PopularHallsService } from './popular-halls.service';

describe('PopularHallsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopularHallsService]
    });
  });

  it('should be created', inject([PopularHallsService], (service: PopularHallsService) => {
    expect(service).toBeTruthy();
  }));
});
