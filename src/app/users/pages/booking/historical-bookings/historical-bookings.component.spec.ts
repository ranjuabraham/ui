import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalBookingsComponent } from './historical-bookings.component';

describe('HistoricalBookingsComponent', () => {
  let component: HistoricalBookingsComponent;
  let fixture: ComponentFixture<HistoricalBookingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalBookingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
