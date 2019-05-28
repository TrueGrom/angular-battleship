import { Injectable } from '@angular/core';

import { Cell } from '@battlefield/cell';
import { Sector } from '@battlefield/types';
import { AppSettings } from '@settings';

import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BattlefieldService {
  playerSector: Observable<Sector>;
  opponentSector: Observable<Sector>;
  private _playerSector: BehaviorSubject<Sector>;
  private _opponentSector: BehaviorSubject<Sector>;

  constructor(
  ) {
    this.generateSectors();
    this.playerSector = this._playerSector.asObservable();
    this.opponentSector = this._opponentSector.asObservable();
  }

  generateSectors(): void {
    this._playerSector = new BehaviorSubject(this.generatePlayerSector());
    this._opponentSector = new BehaviorSubject(this.generateOpponentSector());
  }

  generatePlayerSector(): Sector {
    return this.generateBaseSector(() => Cell.createDefaultCell());
  }

  generateOpponentSector(): Sector {
    return this.generateBaseSector(() => Cell.createDefaultInvisibleCell());
  }

  private generateBaseSector(fabric: () => Cell): Sector  {
    const sector: Sector = [];
    for (let i = 0; i < AppSettings.ROWS; i++) {
      sector[i] = [];
      for (let j = 0; j < AppSettings.COLS; j++) {
        sector[i][j] = fabric();
      }
    }
    return sector;
  }

}
