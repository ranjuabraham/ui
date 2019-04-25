import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineTransactionUpdateComponent } from './offline-transaction-update.component';

describe('OfflineTransactionUpdateComponent', () => {
  let component: OfflineTransactionUpdateComponent;
  let fixture: ComponentFixture<OfflineTransactionUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineTransactionUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineTransactionUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
