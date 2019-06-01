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
    this.currentClass = this.getClasses();
  }

  fire(): void {
    if (this.opponent && !this.gameService.isStopped()) {
      this.gameService.shootAsPlayer(this.cell.coordinates);
    }
  }

  private getClasses(): string {
    const classes = [];
    if (this.opponent) {
      classes.push('opponent');
    }
    if (this.cell.isSunk()) {
      classes.push('sunk');
    } else if (this.cell.isShip()) {
      classes.push('ship');
    } else if (this.cell.isMiss()) {
      classes.push('miss');
    } else if (this.cell.isEmpty()) {
      classes.push('empty');
    }
    return classes.join(' ');
  }

}
