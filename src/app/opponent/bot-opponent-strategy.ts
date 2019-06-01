import { Injectable } from '@angular/core';

import { Cell } from '@core/cell';
import { Sector } from '@core/sector';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { createCoordinatesMatrix, getNotUsedFromMatrix } from '@helpers';
import { OpponentResult, OpponentStrategy } from '@opponent/opponent-strategy';
import { ShipService } from '@ship/ship.service';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BotOpponentStrategy implements OpponentStrategy {
  private sector: Sector;
  private visiblePlacement: SectorPlacement;
  private usedCoordinates: boolean[][];

  constructor(
    private shipService: ShipService
  ) {
    this.initStrategy();
  }

  nextStep(shotCoordinates: TargetCoordinates): Observable<OpponentResult> {
    const backfire = this.takeAimAtPlayer();
    const shotResult: Cell = this.sector.calculateHit(shotCoordinates);
    this.visiblePlacement = Sector.updateSector(this.visiblePlacement, shotResult);
    return of({backfire, sectorPlacement: this.visiblePlacement});
  }

  finishGame(): void {
    this.initStrategy();
  }

  private initStrategy() {
    this.usedCoordinates = createCoordinatesMatrix();
    this.sector = Sector.generateOpponentSector();
    this.visiblePlacement = this.sector.placement;
    const ships: TargetCoordinates[] = this.shipService.getRandomShipCoordinates();
    for (const ship of ships) {
      this.sector.insertShip(ship);
    }
  }

  private takeAimAtPlayer(): TargetCoordinates {
    const nextShot = getNotUsedFromMatrix(this.usedCoordinates);
    const [row, col] = nextShot;
    this.usedCoordinates[row][col] = true;
    return nextShot;
  }
}
