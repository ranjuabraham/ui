import { MyReviewsModule } from './my-reviews.module';

describe('MyReviewsModule', () => {
  let myReviewsModule: MyReviewsModule;

  beforeEach(() => {
    myReviewsModule = new MyReviewsModule();
  });

  it('should create an instance', () => {
    expect(myReviewsModule).toBeTruthy();
  });
});
