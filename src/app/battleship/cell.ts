import { CellTypes } from 'src/app/battleship/cell-types.enum';

export interface Cell {
  type: CellTypes;
  display: boolean;
}
