import { CellTypes } from '@core/cell-types.enum';

export class Cell {
  readonly type: CellTypes;
  readonly visible: boolean;

  constructor({ type, visible = true }: { type: CellTypes, visible: boolean }) {
    this.type = type;
    this.visible = visible;
  }

  static createCell(type: CellTypes): Cell {
    return new Cell({ type, visible: true });
  }

  static createDefaultCell() {
    return Cell.createCell(CellTypes.EMPTY);
  }

  static createDefaultInvisibleCell(): Cell {
    return new Cell({ type: CellTypes.EMPTY, visible: false });
  }

  static createSunkCell(): Cell {
    return Cell.createCell(CellTypes.SUNK);
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
    return new Cell({ type: this.type, visible: this.visible });
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
