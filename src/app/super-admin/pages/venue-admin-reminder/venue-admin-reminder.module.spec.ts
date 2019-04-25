import { VenueAdminReminderModule } from './venue-admin-reminder.module';

describe('VenueAdminReminderModule', () => {
  let venueAdminReminderModule: VenueAdminReminderModule;

  beforeEach(() => {
    venueAdminReminderModule = new VenueAdminReminderModule();
  });

  it('should create an instance', () => {
    expect(venueAdminReminderModule).toBeTruthy();
  });
});
