import { Injectable } from '@angular/core';

import { Sector } from '@core/sector';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { BotOpponentStrategy } from '@opponent/bot-opponent-strategy';
import { OpponentResult, OpponentStrategy } from '@opponent/opponent-strategy';
import { ShipService } from '@ship/ship.service';

import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playerSectorPlacement$: Observable<SectorPlacement>;
  opponentSectorPlacement$: Observable<SectorPlacement>;
  private playerSectorPlacement: BehaviorSubject<SectorPlacement>;
  private opponentSectorPlacement: BehaviorSubject<SectorPlacement>;
  private player: Sector;
  private strategy: OpponentStrategy;

  constructor(
    private shipService: ShipService,
    private botOpponent: BotOpponentStrategy,
  ) {
    this.startGame();
    this.setStrategy(this.botOpponent);
  }

  setStrategy(strategy: OpponentStrategy): void {
    this.strategy = strategy;
  }

  startGame(): void {
    this.player = Sector.generatePlayerSector();
    this.generateRandomPlayerShips();
    this.playerSectorPlacement = new BehaviorSubject(this.player.placement);
    this.opponentSectorPlacement = new BehaviorSubject(Sector.generateOpponentInitialPlacement());
    this.playerSectorPlacement$ = this.playerSectorPlacement.asObservable();
    this.opponentSectorPlacement$ = this.opponentSectorPlacement.asObservable();
  }

  shootAsPlayer(opponentCoordinates: TargetCoordinates) {
    this.strategy.nextStep(opponentCoordinates)
      .subscribe(({ backfire, sectorPlacement }: OpponentResult) => {
        this.opponentSectorPlacement.next(sectorPlacement);
        this.shootAsOpponent(backfire);
      });
  }

  shootAsOpponent(coordinates: TargetCoordinates) {
    const shotResult: SectorPlacement = this.player.getPlacementAfterShot(coordinates);
    this.playerSectorPlacement.next(shotResult);
  }

  private generateRandomPlayerShips(): void {
    const ships: TargetCoordinates[] = this.shipService.getRandomShipCoordinates();
    for (const ship of ships) {
      this.player.insertShip(ship);
    }
  }
}
