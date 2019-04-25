import { ReconcileReportModule } from './reconcile-report.module';

describe('ReconcileReportModule', () => {
  let reconcileReportModule: ReconcileReportModule;

  beforeEach(() => {
    reconcileReportModule = new ReconcileReportModule();
  });

  it('should create an instance', () => {
    expect(reconcileReportModule).toBeTruthy();
  });
});
