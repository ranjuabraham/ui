import { TestBed } from '@angular/core/testing';

import { BuffetCategoryService } from './buffet-category.service';

describe('BuffetCategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuffetCategoryService = TestBed.get(BuffetCategoryService);
    expect(service).toBeTruthy();
  });
});
