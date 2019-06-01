import { Injectable } from '@angular/core';

import { Players } from '@core/common.enum';
import { Sector } from '@core/sector';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { BotOpponentStrategy } from '@opponent/bot-opponent-strategy';
import { OpponentResult, OpponentStrategy } from '@opponent/opponent-strategy';
import { ShipService } from '@ship/ship.service';

import { BehaviorSubject, Observable } from 'rxjs';

export interface GameState {
  winner: Players;
  stopped: boolean;
  playerSector: SectorPlacement;
  opponentSector: SectorPlacement;
}

const INITIAL_STATE = {
  winner: Players.None,
  stopped: false,
  playerSector: [],
  opponentSector: []
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  state$: Observable<GameState>;
  private player: Sector;
  private strategy: OpponentStrategy;
  private shipCount: number;
  private state: BehaviorSubject<GameState>;

  constructor(
    private shipService: ShipService,
    private botOpponent: BotOpponentStrategy,
  ) {
    this.state = new BehaviorSubject(INITIAL_STATE);
    this.state$ = this.state.asObservable();
    this.startGame();
    this.setStrategy(this.botOpponent);
  }

  setStrategy(strategy: OpponentStrategy): void {
    this.strategy = strategy;
  }

  startGame(): void {
    this.player = Sector.generatePlayerSector();
    this.generateRandomPlayerShips();
    const state = {
      ...INITIAL_STATE,
      stopped: false,
      playerSector: this.player.placement,
      opponentSector: Sector.generateOpponentInitialPlacement()
    };
    this.pathState<GameState>(state);
  }

  shootAsPlayer(opponentCoordinates: TargetCoordinates) {
    this.strategy.nextStep(opponentCoordinates)
      .subscribe(({ backfire, sectorPlacement }: OpponentResult) => {
        if (this.isGameOver(sectorPlacement)) {
          this.strategy.finishGame();
          this.pathState<GameState>({ winner: Players.Player, stopped: true });
        } else {
          this.pathState<GameState>({opponentSector: sectorPlacement});
          this.shootAsOpponent(backfire);
        }
      });
  }

  shootAsOpponent(coordinates: TargetCoordinates) {
    const playerPlacement: SectorPlacement = this.player.getPlacementAfterShot(coordinates);
    if (this.isGameOver(playerPlacement)) {
      this.strategy.finishGame();
      this.pathState<GameState>({ playerSector: playerPlacement, winner: Players.Opponent, stopped: true });
    }
    this.pathState<GameState>({ playerSector: playerPlacement });
  }

  isStopped(): boolean {
    const { stopped } = this.state.getValue();
    return stopped;
  }

  private generateRandomPlayerShips(): void {
    this.shipCount = 0;
    const ships: TargetCoordinates[] = this.shipService.getRandomShipCoordinates();
    for (const ship of ships) {
      this.shipCount += 1;
      this.player.insertShip(ship);
    }
  }


  private isGameOver(sector: SectorPlacement): boolean {
    return Sector.isAllSunk(sector, this.shipCount);
  }

  private pathState<T>(patch: { [P in keyof T]?: T[P] }): void {
    this.state.next({ ...this.state.getValue(), ...<object>patch });
  }
}
