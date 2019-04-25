import { TestBed } from '@angular/core/testing';

import { DecodeMasterService } from './decode-master.service';

describe('DecodeMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecodeMasterService = TestBed.get(DecodeMasterService);
    expect(service).toBeTruthy();
  });
});
