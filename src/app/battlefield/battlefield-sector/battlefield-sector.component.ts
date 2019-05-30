import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { TargetCoordinates } from '@core/types';
import { Cell } from '@core/cell';
import { GameService } from '@core/game.service';

@Component({
  selector: 'app-battlefield-sector',
  templateUrl: './battlefield-sector.component.html',
  styleUrls: ['./battlefield-sector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlefieldSectorComponent implements OnInit {
  @Input() sector: Cell[][];
  @Input() opponent: boolean;

  constructor(private gameService: GameService) { }

  ngOnInit() {
  }

  onShot(coordinates: TargetCoordinates): void {
    this.gameService.shootAsPlayer(coordinates);
  }

}
