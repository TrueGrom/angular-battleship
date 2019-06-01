import { SectorPlacement, TargetCoordinates } from '@core/types';
import { Observable } from 'rxjs';

export interface OpponentResult {
  backfire: TargetCoordinates;
  sectorPlacement: SectorPlacement;
}

export interface OpponentStrategy {
  nextStep(shotCoordinates: TargetCoordinates): Observable<OpponentResult>;
  finishGame(): void;
}
