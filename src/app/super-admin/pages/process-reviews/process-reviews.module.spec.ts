import { ProcessReviewsModule } from './process-reviews.module';

describe('ProcessReviewsModule', () => {
  let processReviewsModule: ProcessReviewsModule;

  beforeEach(() => {
    processReviewsModule = new ProcessReviewsModule();
  });

  it('should create an instance', () => {
    expect(processReviewsModule).toBeTruthy();
  });
});
