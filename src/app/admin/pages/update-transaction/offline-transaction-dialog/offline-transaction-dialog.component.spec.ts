import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineTransactionDialogComponent } from './offline-transaction-dialog.component';

describe('OfflineTransactionDialogComponent', () => {
  let component: OfflineTransactionDialogComponent;
  let fixture: ComponentFixture<OfflineTransactionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineTransactionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineTransactionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
