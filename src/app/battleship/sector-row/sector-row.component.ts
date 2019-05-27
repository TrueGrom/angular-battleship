import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sector-row',
  templateUrl: './sector-row.component.html',
  styleUrls: ['./sector-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorRowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
