import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { GameService } from '@core/game.service';
import { SectorPlacement } from '@core/types';

import { Observable } from 'rxjs';

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
    this.playerSector$ = this.gameService.playerSectorPlacement$;
    this.opponentSector$ = this.gameService.opponentSectorPlacement$;
  }

}
