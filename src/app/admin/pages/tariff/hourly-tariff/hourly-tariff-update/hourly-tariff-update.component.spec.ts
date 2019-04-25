import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyTariffUpdateComponent } from './hourly-tariff-update.component';

describe('HourlyTariffUpdateComponent', () => {
  let component: HourlyTariffUpdateComponent;
  let fixture: ComponentFixture<HourlyTariffUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyTariffUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyTariffUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
