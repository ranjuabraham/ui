import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTransactionReservationComponent } from './online-transaction-reservation.component';

describe('OnlineTransactionReservationComponent', () => {
  let component: OnlineTransactionReservationComponent;
  let fixture: ComponentFixture<OnlineTransactionReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineTransactionReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineTransactionReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
