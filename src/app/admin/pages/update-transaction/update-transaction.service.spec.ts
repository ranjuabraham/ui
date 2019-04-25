import { TestBed } from '@angular/core/testing';

import { UpdateTransactionService } from './update-transaction.service';

describe('UpdateTransactionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateTransactionService = TestBed.get(UpdateTransactionService);
    expect(service).toBeTruthy();
  });
});
