import { TestBed } from '@angular/core/testing';

import { BuffetMasterService } from './buffet-master.service';

describe('BuffetMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuffetMasterService = TestBed.get(BuffetMasterService);
    expect(service).toBeTruthy();
  });
});
