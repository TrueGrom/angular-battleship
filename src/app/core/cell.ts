import { CellTypes } from '@core/cell-types.enum';

export class Cell {
  readonly type: CellTypes;

  constructor({ type }: { type: CellTypes }) {
    this.type = type;
  }

  static createCell(type: CellTypes): Cell {
    return new Cell({ type });
  }

  static createDefaultCell() {
    return Cell.createCell(CellTypes.EMPTY);
  }

  static createSunkCell(): Cell {
    return Cell.createCell(CellTypes.SUNK);
  }

  static createShip(): Cell {
    return Cell.createCell(CellTypes.SHIP);
  }

  static createMissedCell(): Cell {
    return Cell.createCell(CellTypes.MISS);
  }

  isEmpty(): boolean {
    return this.type === CellTypes.EMPTY;
  }

  isShip(): boolean {
    return this.type === CellTypes.SHIP;
  }

  isMiss(): boolean {
    return this.type === CellTypes.MISS;
  }

  isSunk(): boolean {
    return this.type === CellTypes.SUNK;
  }

  clone(): Cell {
    return new Cell({ type: this.type });
  }

  getShotResult(): Cell {
    if (this.isEmpty()) {
      return Cell.createMissedCell();
    }
    if (this.isShip()) {
      return Cell.createSunkCell();
    }
    return this;
  }
}
