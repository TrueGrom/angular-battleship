import { BattleshipModule } from './battleship.module';

describe('BattleshipModule', () => {
  let battleshipModule: BattleshipModule;

  beforeEach(() => {
    battleshipModule = new BattleshipModule();
  });

  it('should create an instance', () => {
    expect(battleshipModule).toBeTruthy();
  });
});
