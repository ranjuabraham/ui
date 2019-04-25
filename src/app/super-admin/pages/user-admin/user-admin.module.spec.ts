import { UserAdminModule } from './user-admin.module';

describe('UserAdminModule', () => {
  let userAdminModule: UserAdminModule;

  beforeEach(() => {
    userAdminModule = new UserAdminModule();
  });

  it('should create an instance', () => {
    expect(userAdminModule).toBeTruthy();
  });
});
