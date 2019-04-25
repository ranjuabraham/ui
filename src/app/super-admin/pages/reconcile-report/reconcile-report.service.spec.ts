import { TestBed, inject } from '@angular/core/testing';

import { ReconcileReportService } from './reconcile-report.service';

describe('ReconcileReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReconcileReportService]
    });
  });

  it('should be created', inject([ReconcileReportService], (service: ReconcileReportService) => {
    expect(service).toBeTruthy();
  }));
});
