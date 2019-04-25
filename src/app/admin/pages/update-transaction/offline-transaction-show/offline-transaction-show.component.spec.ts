import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfflineTransactionShowComponent } from './offline-transaction-show.component';

describe('OfflineTransactionShowComponent', () => {
  let component: OfflineTransactionShowComponent;
  let fixture: ComponentFixture<OfflineTransactionShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfflineTransactionShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfflineTransactionShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
