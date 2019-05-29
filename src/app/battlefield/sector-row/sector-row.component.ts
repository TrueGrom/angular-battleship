import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Cell } from '@battlefield/cell';
import { BattleCoordinates } from '@battlefield/types';

@Component({
  selector: 'app-sector-row',
  templateUrl: './sector-row.component.html',
  styleUrls: ['./sector-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorRowComponent implements OnInit {
  @Input() index: number;
  @Input() row: Cell[];
  @Output() shot: EventEmitter<BattleCoordinates> = new EventEmitter<BattleCoordinates>();

  constructor() { }

  ngOnInit() {
  }

  onCellShot(cellIndex: number) {
    this.shot.emit([this.index, cellIndex]);
  }

  trackByFn(index: number, cell: Cell) {
    return cell.type;
  }

}
