import { CellTypes } from '@core/cell-types.enum';
import { TargetCoordinates } from '@core/types';

export class Cell {
  readonly type: CellTypes;
  private _coordinates: TargetCoordinates;

  constructor({ type }: { type: CellTypes }) {
    this.type = type;
  }

  static withCoordinates(coordinates: TargetCoordinates): Function {
    return function (cell: Cell) {
      cell.coordinates = coordinates;
      return cell;
    };
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

  get coordinates(): TargetCoordinates {
    return this._coordinates;
  }

  set coordinates(value: TargetCoordinates) {
    this._coordinates = value;
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
      return Cell.withCoordinates(this.coordinates)(Cell.createMissedCell());
    }
    if (this.isShip()) {
      return Cell.withCoordinates(this.coordinates)(Cell.createSunkCell());
    }
    return this;
  }
}
