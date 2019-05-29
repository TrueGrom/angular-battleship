import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BattlefieldService } from '@battlefield/battlefield.service';
import { Sector } from '@battlefield/types';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlefieldComponent implements OnInit {
  playerSector$: Observable<Sector>;
  opponentSector$: Observable<Sector>;

  constructor(
    private battlefieldService: BattlefieldService
  ) {
  }

  ngOnInit() {
    this.playerSector$ = this.battlefieldService.playerSector$;
    this.opponentSector$ = this.battlefieldService.opponentSector$;
  }

}
