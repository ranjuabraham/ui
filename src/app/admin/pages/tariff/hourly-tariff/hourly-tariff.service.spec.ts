import { TestBed } from '@angular/core/testing';

import { HourlyTariffService } from './hourly-tariff.service';

describe('HourlyTariffService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HourlyTariffService = TestBed.get(HourlyTariffService);
    expect(service).toBeTruthy();
  });
});
