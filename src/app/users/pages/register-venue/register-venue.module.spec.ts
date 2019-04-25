import { RegisterVenueModule } from './register-venue.module';

describe('RegisterVenueModule', () => {
  let registerVenueModule: RegisterVenueModule;

  beforeEach(() => {
    registerVenueModule = new RegisterVenueModule();
  });

  it('should create an instance', () => {
    expect(registerVenueModule).toBeTruthy();
  });
});
