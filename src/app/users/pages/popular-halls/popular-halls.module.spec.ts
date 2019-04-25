import { PopularHallsModule } from './popular-halls.module';

describe('PopularHallsModule', () => {
  let popularHallsModule: PopularHallsModule;

  beforeEach(() => {
    popularHallsModule = new PopularHallsModule();
  });

  it('should create an instance', () => {
    expect(popularHallsModule).toBeTruthy();
  });
});
