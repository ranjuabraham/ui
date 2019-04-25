import { TestBed } from '@angular/core/testing';

import { CostMappingService } from './cost-mapping.service';

describe('CostMappingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CostMappingService = TestBed.get(CostMappingService);
    expect(service).toBeTruthy();
  });
});
