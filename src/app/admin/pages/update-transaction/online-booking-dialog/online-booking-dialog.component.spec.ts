import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineBookingDialogComponent } from './online-booking-dialog.component';

describe('OnlineBookingDialogComponent', () => {
  let component: OnlineBookingDialogComponent;
  let fixture: ComponentFixture<OnlineBookingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineBookingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
