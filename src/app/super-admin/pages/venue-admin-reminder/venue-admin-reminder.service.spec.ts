import { TestBed, inject } from '@angular/core/testing';

import { VenueAdminReminderService } from './venue-admin-reminder.service';

describe('VenueAdminReminderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VenueAdminReminderService]
    });
  });

  it('should be created', inject([VenueAdminReminderService], (service: VenueAdminReminderService) => {
    expect(service).toBeTruthy();
  }));
});
