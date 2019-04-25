import { HowItWorksModule } from './how-it-works.module';

describe('HowItWorksModule', () => {
  let howItWorksModule: HowItWorksModule;

  beforeEach(() => {
    howItWorksModule = new HowItWorksModule();
  });

  it('should create an instance', () => {
    expect(howItWorksModule).toBeTruthy();
  });
});
