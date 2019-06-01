import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { GameService } from '@core/game.service';
import { SectorPlacement } from '@core/types';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlefieldComponent implements OnInit {
  playerSector$: Observable<SectorPlacement>;
  opponentSector$: Observable<SectorPlacement>;

  constructor(
    private gameService: GameService
  ) {
  }

  ngOnInit() {
    this.playerSector$ = this.gameService.state$.pipe(pluck('playerSector'));
    this.opponentSector$ = this.gameService.state$.pipe(pluck('opponentSector'));
  }

}
