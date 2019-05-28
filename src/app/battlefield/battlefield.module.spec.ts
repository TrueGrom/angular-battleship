import { BattlefieldModule } from '@battlefield/battlefield.module';

describe('BattlefieldModule', () => {
  let battleshipModule: BattlefieldModule;

  beforeEach(() => {
    battleshipModule = new BattlefieldModule();
  });

  it('should create an instance', () => {
    expect(battleshipModule).toBeTruthy();
  });
});
