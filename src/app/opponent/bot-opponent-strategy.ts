import { Injectable } from '@angular/core';

import { Cell } from '@core/cell';
import { Sector } from '@core/sector';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { getRandomCoordinates } from '@helpers';
import { OpponentResult, OpponentStrategy } from '@opponent/opponent-strategy';
import { ShipService } from '@ship/ship.service';

import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BotOpponentStrategy implements OpponentStrategy {
  private sector: Sector;
  private visiblePlacement: SectorPlacement;

  constructor(
    private shipService: ShipService
  ) {
    this.sector = Sector.generateOpponentSector();
    this.visiblePlacement = this.sector.placement;
    const ships: TargetCoordinates[] = this.shipService.getRandomShipCoordinates();
    for (const ship of ships) {
      this.sector.insertShip(ship);
    }
  }

  nextStep(shotCoordinates: [number, number]): Observable<OpponentResult> {
    const backfire: TargetCoordinates = this.takeAimAtPlayer();
    const shotResult: Cell = this.sector.calculateHit(shotCoordinates);
    this.visiblePlacement = Sector.updateSector(this.visiblePlacement, shotCoordinates, shotResult);
    return of({ backfire, sectorPlacement: this.visiblePlacement });
  }

  private takeAimAtPlayer(): TargetCoordinates {
    return getRandomCoordinates();
  }
 }
