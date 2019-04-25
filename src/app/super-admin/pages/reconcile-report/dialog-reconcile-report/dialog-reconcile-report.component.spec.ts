import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogReconcileReportComponent } from './dialog-reconcile-report.component';

describe('DialogReconcileReportComponent', () => {
  let component: DialogReconcileReportComponent;
  let fixture: ComponentFixture<DialogReconcileReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogReconcileReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogReconcileReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
