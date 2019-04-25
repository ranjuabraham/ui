import { TestBed } from '@angular/core/testing';

import { BuffetItemsService } from './buffet-items.service';

describe('BuffetItemsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuffetItemsService = TestBed.get(BuffetItemsService);
    expect(service).toBeTruthy();
  });
});
