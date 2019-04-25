import { TestBed } from '@angular/core/testing';

import { FoodTypeService } from './food-type.service';

describe('FoodTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FoodTypeService = TestBed.get(FoodTypeService);
    expect(service).toBeTruthy();
  });
});
