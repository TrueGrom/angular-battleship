import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Cell } from '@battlefield/cell';

@Component({
  selector: 'app-sector-row',
  templateUrl: './sector-row.component.html',
  styleUrls: ['./sector-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorRowComponent implements OnInit {
  @Input() row: Cell[];

  constructor() { }

  ngOnInit() {
  }

  trackByFn(index: number, cell: Cell) {
    return cell.type;
  }

}
