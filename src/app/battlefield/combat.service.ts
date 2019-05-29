import { Injectable } from '@angular/core';

import { Cell } from '@battlefield/cell';
import { CombatStrategy } from '@battlefield/combat-strategy';
import { BattleCoordinates, Sector } from '@battlefield/types';

@Injectable({
  providedIn: 'root'
})
export class CombatService {
  private strategy: CombatStrategy;

  constructor() { }

  setCombatStrategy(strategy: CombatStrategy) {
    this.strategy = strategy;
  }

  getShotResult(cell: Cell): Cell {
    if (cell.isEmpty()) {
      return Cell.createMissedCell();
    }
    if (cell.isShip()) {
      return Cell.createSunkCell();
    }
    return cell;
  }

  takeAimAtEnemy(sector: Sector): BattleCoordinates {
    return this.strategy.takeAimAtEnemy(sector);
  }

}
