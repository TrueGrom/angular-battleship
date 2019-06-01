import { Cell } from '@core/cell';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { AppSettings } from '@settings';

import cloneDeep from 'lodash/cloneDeep';
import flatten from 'lodash/flatten';

export class Sector {
  private sector: SectorPlacement;

  static generatePlayerSector(): Sector {
    return new Sector(Cell.createDefaultCell());
  }

  static generateOpponentSector(): Sector {
    return new Sector(Cell.createDefaultCell());
  }

  static generateOpponentInitialPlacement(): SectorPlacement {
    return Sector.generateBaseSectorPlacement(Cell.createDefaultCell());
  }

  static generateBaseSectorPlacement(initialCell: Cell): SectorPlacement {
    const sector: SectorPlacement = [];
    for (let i = 0; i < AppSettings.ROWS; i++) {
      sector[i] = [];
      for (let j = 0; j < AppSettings.COLS; j++) {
        sector[i][j] = Cell.withCoordinates([i, j])(initialCell.clone());
      }
    }
    return sector;
  }

  static getCellByCoordinates(sector: SectorPlacement, [row, cell]: TargetCoordinates): Cell {
    return sector[row][cell];
  }

  static updateSector(sector: SectorPlacement, updatedCell: Cell): SectorPlacement {
    const [row, col] = updatedCell.coordinates;
    sector[row].splice(col, 1, updatedCell);
    sector[row] = [...sector[row]];
    return sector;
  }

  static isAllSunk(sector: SectorPlacement, shipCount: number): boolean {
    const sunkCell: Cell[] = flatten(sector).filter(cell => cell.isSunk());
    return sunkCell.length === shipCount;
  }

  constructor(private initialCell: Cell) {
    this.sector = Sector.generateBaseSectorPlacement(initialCell);
  }

  get placement(): SectorPlacement {
    return cloneDeep(this.sector);
  }

  getPlacementAfterShot(coordinates: TargetCoordinates): SectorPlacement {
    const shotResult = this.calculateHit(coordinates);
    const updatedSector = Sector.updateSector(this.placement, shotResult);
    this.sector = updatedSector;
    return updatedSector;
  }

  insertShip([row, col]: TargetCoordinates): void {
    this.sector[row][col] = Cell.withCoordinates([row, col])(Cell.createShip());
  }

  calculateHit(coordinates: TargetCoordinates): Cell {
    const target = Sector.getCellByCoordinates(this.placement, coordinates);
    return target.getShotResult();
  }

}

