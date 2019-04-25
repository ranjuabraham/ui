import { RemoveTestBookingsModule } from './remove-test-bookings.module';

describe('RemoveTestBookingsModule', () => {
  let removeTestingBookingsModule: RemoveTestBookingsModule;

  beforeEach(() => {
    removeTestingBookingsModule = new RemoveTestBookingsModule();
  });

  it('should create an instance', () => {
    expect(removeTestingBookingsModule).toBeTruthy();
  });
});
