import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Cell } from '@core/cell';
import { TargetCoordinates } from '@core/types';

@Component({
  selector: 'app-sector-row',
  templateUrl: './sector-row.component.html',
  styleUrls: ['./sector-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorRowComponent {
  @Input() row: Cell[];
  @Input() opponent: boolean;
  @Output() shot: EventEmitter<TargetCoordinates> = new EventEmitter<TargetCoordinates>();

  constructor() { }

  trackByFn(index: number, cell: Cell) {
    return cell.type;
  }

}
