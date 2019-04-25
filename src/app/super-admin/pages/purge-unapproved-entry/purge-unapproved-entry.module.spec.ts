import { PurgeUnapprovedEntryModule } from './purge-unapproved-entry.module';

describe('PurgeUnapprovedEntryModule', () => {
  let purgeUnapprovedEntryModule: PurgeUnapprovedEntryModule;

  beforeEach(() => {
    purgeUnapprovedEntryModule = new PurgeUnapprovedEntryModule();
  });

  it('should create an instance', () => {
    expect(purgeUnapprovedEntryModule).toBeTruthy();
  });
});
