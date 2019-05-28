import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BattlefieldService } from 'src/app/battleship/battlefield.service';

import { BattlefieldComponent } from './battlefield/battlefield.component';
import { BattlefieldSectorComponent } from './battlefield-sector/battlefield-sector.component';
import { SectorRowComponent } from './sector-row/sector-row.component';
import { SectorCellComponent } from './sector-cell/sector-cell.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    BattlefieldComponent
  ],
  providers: [BattlefieldService],
  declarations: [BattlefieldComponent, BattlefieldSectorComponent, SectorRowComponent, SectorCellComponent]
})
export class BattleshipModule { }
