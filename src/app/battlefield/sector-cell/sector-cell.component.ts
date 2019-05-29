import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Cell } from '@battlefield/cell';

@Component({
  selector: 'app-sector-cell',
  templateUrl: './sector-cell.component.html',
  styleUrls: ['./sector-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorCellComponent implements OnInit {
  @Input() index: number;
  @Input() cell: Cell;
  @Output() shot: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  fire(): void {
    this.shot.emit(this.index);
  }

}
