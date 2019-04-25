import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricalReservationsComponent } from './historical-reservations.component';

describe('HistoricalReservationsComponent', () => {
  let component: HistoricalReservationsComponent;
  let fixture: ComponentFixture<HistoricalReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricalReservationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricalReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
