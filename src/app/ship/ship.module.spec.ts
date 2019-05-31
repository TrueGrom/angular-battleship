import { ShipModule } from './ship.module';

describe('ShipModule', () => {
  let shipModule: ShipModule;

  beforeEach(() => {
    shipModule = new ShipModule();
  });

  it('should create an instance', () => {
    expect(shipModule).toBeTruthy();
  });
});
