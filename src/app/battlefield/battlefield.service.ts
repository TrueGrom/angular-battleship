import { Injectable } from '@angular/core';

import { Cell } from '@battlefield/cell';
import { CombatService } from '@headquarters/combat.service';
import { BattleCoordinates, Sector } from '@battlefield/types';
import { AppSettings } from '@settings';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BattlefieldService {
  playerSector$: Observable<Sector>;
  opponentSector$: Observable<Sector>;
  private playerSector: BehaviorSubject<Sector>;
  private opponentSector: BehaviorSubject<Sector>;

  static generateBaseSector(cellConstructor: () => Cell): Sector  {
    const sector: Sector = [];
    for (let i = 0; i < AppSettings.ROWS; i++) {
      sector[i] = [];
      for (let j = 0; j < AppSettings.COLS; j++) {
        sector[i][j] = cellConstructor();
      }
    }
    return sector;
  }

  static getCellByCoordinates(sector: Sector, [row, cell]: BattleCoordinates): Cell {
    return sector[row][cell];
  }

  static updateSector(sector: Sector, [row, cell]: BattleCoordinates, updatedCell: Cell): Sector {
    sector[row].splice(cell, 1, updatedCell);
    sector[row] = [...sector[row]];
    return sector;
  }

  static cloneSector(sector: Sector): Sector {
    return sector.map(row => row.map(cell => cell.clone()));
  }

  constructor(
    private combatService: CombatService
  ) {
    this.generateSectors();
    this.playerSector$ = this.playerSector.asObservable();
    this.opponentSector$ = this.opponentSector.asObservable();
  }

  get playerSectorValue(): Sector {
    return BattlefieldService.cloneSector(this.playerSector.getValue());
  }

  set playerSectorValue(sector: Sector) {
    this.playerSector.next(sector);
  }

  get opponentSectorValue(): Sector {
    return  BattlefieldService.cloneSector(this.opponentSector.getValue());
  }

  set opponentSectorValue(sector: Sector) {
    this.opponentSector.next(sector);
  }

  generateSectors(): void {
    this.playerSector = new BehaviorSubject(this.generatePlayerSector());
    this.opponentSector = new BehaviorSubject(this.generateOpponentSector());
  }

  generatePlayerSector(): Sector {
    return BattlefieldService.generateBaseSector(() => Cell.createDefaultCell());
  }

  generateOpponentSector(): Sector {
    return BattlefieldService.generateBaseSector(() => Cell.createDefaultInvisibleCell());
  }

  fire(toOpponent: boolean, targetCoordinates: BattleCoordinates): void {
    if (toOpponent) {
      this.opponentSectorValue = this.getSectorAfterHit(this.opponentSectorValue, targetCoordinates);
      this.shootBack();
    } else {
      this.playerSectorValue = this.getSectorAfterHit(this.playerSectorValue, targetCoordinates);
    }
  }

  shootBack(): void {
    const targetCoordinates: BattleCoordinates = this.combatService.takeAimAtEnemy(this.playerSectorValue);
    this.fire(false, targetCoordinates);
  }

  private getSectorAfterHit(sector: Sector, coordinates: BattleCoordinates): Sector {
    const target = BattlefieldService.getCellByCoordinates(sector, coordinates);
    const shotResult: Cell = this.combatService.getShotResult(target);
    return BattlefieldService.updateSector(sector, coordinates, shotResult);
  }

}
