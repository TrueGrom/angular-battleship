import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';

import { Cell } from '@core/cell';
import { GameService } from '@core/game.service';

@Component({
  selector: 'app-sector-cell',
  templateUrl: './sector-cell.component.html',
  styleUrls: ['./sector-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorCellComponent implements OnChanges {
  currentClass: string;

  @Input() cell: Cell;
  @Input() opponent: boolean;

  constructor(
    private gameService: GameService,
  ) {}

  ngOnChanges() {
    this.currentClass = this.getClass();
  }

  private getClass(): string {
    if (this.cell.isSunk()) {
      return 'sunk';
    }
    if (this.cell.isShip()) {
      return 'ship';
    }
    if (this.cell.isMiss()) {
      return 'miss';
    }
    return 'empty';
  }

  private fire(): void {
    if (this.opponent && !this.gameService.isStopped()) {
      this.gameService.shootAsPlayer(this.cell.coordinates);
    }
  }

}
