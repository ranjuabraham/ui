import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyTariffShowComponent } from './hourly-tariff-show.component';

describe('HourlyTariffShowComponent', () => {
  let component: HourlyTariffShowComponent;
  let fixture: ComponentFixture<HourlyTariffShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyTariffShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyTariffShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
