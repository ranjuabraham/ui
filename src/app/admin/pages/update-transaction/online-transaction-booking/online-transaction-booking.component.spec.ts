import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineTransactionBookingComponent } from './online-transaction-booking.component';

describe('OnlineTransactionBookingComponent', () => {
  let component: OnlineTransactionBookingComponent;
  let fixture: ComponentFixture<OnlineTransactionBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineTransactionBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineTransactionBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
