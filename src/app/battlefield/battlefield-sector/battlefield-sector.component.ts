import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SectorPlacement } from '@core/types';

@Component({
  selector: 'app-battlefield-sector',
  templateUrl: './battlefield-sector.component.html',
  styleUrls: ['./battlefield-sector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BattlefieldSectorComponent {
  @Input() sector: SectorPlacement;
  @Input() opponent: boolean;

  constructor() { }

}
