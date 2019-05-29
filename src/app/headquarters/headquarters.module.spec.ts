import { HeadquartersModule } from './headquarters.module';

describe('HeadquartersModule', () => {
  let headquartersModule: HeadquartersModule;

  beforeEach(() => {
    headquartersModule = new HeadquartersModule();
  });

  it('should create an instance', () => {
    expect(headquartersModule).toBeTruthy();
  });
});
