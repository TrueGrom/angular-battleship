import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BattlefieldService } from '@battlefield/battlefield.service';

import { Cell } from '@battlefield/cell';
import { BattleCoordinates } from '@battlefield/types';

@Component({
  selector: 'app-battlefield-sector',
  templateUrl: './battlefield-sector.component.html',
  styleUrls: ['./battlefield-sector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlefieldSectorComponent implements OnInit {
  @Input() sector: Cell[][];
  @Input() opponent: boolean;

  constructor(private battleFieldService: BattlefieldService) { }

  ngOnInit() {
  }

  onShot(coordinates: BattleCoordinates): void {
    this.battleFieldService.fire(this.opponent, coordinates);
  }

}
