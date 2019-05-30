import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Cell } from '@core/cell';
import { TargetCoordinates } from '@core/types';

@Component({
  selector: 'app-sector-row',
  templateUrl: './sector-row.component.html',
  styleUrls: ['./sector-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorRowComponent implements OnInit {
  @Input() index: number;
  @Input() row: Cell[];
  @Input() opponent: boolean;
  @Output() shot: EventEmitter<TargetCoordinates> = new EventEmitter<TargetCoordinates>();

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
