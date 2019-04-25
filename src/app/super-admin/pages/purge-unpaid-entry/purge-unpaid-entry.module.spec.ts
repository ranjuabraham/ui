import { PurgeUnpaidEntryModule } from './purge-unpaid-entry.module';

describe('PurgeUnpaidEntryModule', () => {
  let purgeUnpaidEntryModule: PurgeUnpaidEntryModule;

  beforeEach(() => {
    purgeUnpaidEntryModule = new PurgeUnpaidEntryModule();
  });

  it('should create an instance', () => {
    expect(purgeUnpaidEntryModule).toBeTruthy();
  });
});
