import { BattleCoordinates, Sector } from '@battlefield/types';

export interface CombatStrategy {
  takeAimAtEnemy(sector: Sector): BattleCoordinates;
}
