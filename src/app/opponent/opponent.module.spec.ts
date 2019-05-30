import { OpponentModule } from './opponent.module';

describe('OpponentModule', () => {
  let opponentModule: OpponentModule;

  beforeEach(() => {
    opponentModule = new OpponentModule();
  });

  it('should create an instance', () => {
    expect(opponentModule).toBeTruthy();
  });
});
