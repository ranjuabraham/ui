import { DisclaimerModule } from './disclaimer.module';

describe('DisclaimerModule', () => {
  let disclaimerModule: DisclaimerModule;

  beforeEach(() => {
    disclaimerModule = new DisclaimerModule();
  });

  it('should create an instance', () => {
    expect(disclaimerModule).toBeTruthy();
  });
});
