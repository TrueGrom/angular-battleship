import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Cell } from '@battlefield/cell';

@Component({
  selector: 'app-sector-cell',
  templateUrl: './sector-cell.component.html',
  styleUrls: ['./sector-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorCellComponent implements OnInit {
  @Input() cell: Cell;

  constructor() { }

  ngOnInit() {
  }

}
