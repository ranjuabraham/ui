import { CookiesModule } from './cookies.module';

describe('CookiesModule', () => {
  let cookiesModule: CookiesModule;

  beforeEach(() => {
    cookiesModule = new CookiesModule();
  });

  it('should create an instance', () => {
    expect(cookiesModule).toBeTruthy();
  });
});
