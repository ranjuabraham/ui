import { MyWishlistModule } from './my-wishlist.module';

describe('MyWishlistModule', () => {
  let myWishlistModule: MyWishlistModule;

  beforeEach(() => {
    myWishlistModule = new MyWishlistModule();
  });

  it('should create an instance', () => {
    expect(myWishlistModule).toBeTruthy();
  });
});
