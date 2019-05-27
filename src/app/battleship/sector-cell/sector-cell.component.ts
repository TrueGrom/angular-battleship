import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector-cell',
  templateUrl: './sector-cell.component.html',
  styleUrls: ['./sector-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorCellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
