import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyTariffCreateComponent } from './hourly-tariff-create.component';

describe('HourlyTariffCreateComponent', () => {
  let component: HourlyTariffCreateComponent;
  let fixture: ComponentFixture<HourlyTariffCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HourlyTariffCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyTariffCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
