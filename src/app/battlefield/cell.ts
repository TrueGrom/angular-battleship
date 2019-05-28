import { CellTypes } from '@battlefield/cell-types.enum';

export class Cell {
  type: CellTypes;
  visible: boolean;

  static createCell(type: CellTypes): Cell {
    return { type, visible: true };
  }

  static createDefaultCell() {
    return Cell.createCell(CellTypes.EMPTY);
  }

  static createDefaultInvisibleCell(): Cell {
    return { ...Cell.createDefaultCell(), visible: false };
  }
}
