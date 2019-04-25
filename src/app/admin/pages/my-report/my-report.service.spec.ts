import { TestBed } from '@angular/core/testing';

import { MyReportService } from './my-report.service';

describe('MyReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyReportService = TestBed.get(MyReportService);
    expect(service).toBeTruthy();
  });
});
