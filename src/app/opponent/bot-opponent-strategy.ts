import { Sector } from '@core/sector';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { OpponentResult, OpponentStrategy } from '@opponent/opponent-strategy';
import { Observable, of } from 'rxjs';

export class BotOpponentStrategy implements OpponentStrategy {
  private sector: Sector;

  constructor() {
    this.sector = Sector.generateOpponentSector();
  }

  nextStep(shotCoordinates: [number, number]): Observable<OpponentResult> {
    const backfire: TargetCoordinates = this.takeAimAtPlayer();
    const sectorPlacement: SectorPlacement = this.sector.getResultAfterShot(shotCoordinates);
    return of({ backfire, sectorPlacement });
  }

  private takeAimAtPlayer(): TargetCoordinates {
    return [1, 2];
  }
 }
