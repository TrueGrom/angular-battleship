import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Cell } from 'src/app/battleship/cell';

@Component({
  selector: 'app-battlefield-sector',
  templateUrl: './battlefield-sector.component.html',
  styleUrls: ['./battlefield-sector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlefieldSectorComponent implements OnInit {
  @Input() sector: Cell[][];

  constructor() { }

  ngOnInit() {
  }

}
