import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BattlefieldSectorComponent } from '@battlefield/battlefield-sector/battlefield-sector.component';
import { BattlefieldComponent } from '@battlefield/battlefield/battlefield.component';
import { SectorCellComponent } from '@battlefield/sector-cell/sector-cell.component';
import { SectorRowComponent } from '@battlefield/sector-row/sector-row.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BattlefieldComponent
  ],
  declarations: [BattlefieldComponent, BattlefieldSectorComponent, SectorRowComponent, SectorCellComponent]
})
export class BattlefieldModule { }
