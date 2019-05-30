import { Cell } from '@core/cell';
import { SectorPlacement, TargetCoordinates } from '@core/types';
import { AppSettings } from '@settings';

export class Sector {
  private sector: SectorPlacement;

  static generatePlayerSector(): Sector {
    return new Sector(Cell.createDefaultCell());
  }

  static generateOpponentSector(): Sector {
    return new Sector(Cell.createDefaultInvisibleCell());
  }

  static generateOpponentInitialPlacement(): SectorPlacement {
    return Sector.generateBaseSectorPlacement(Cell.createDefaultInvisibleCell());
  }

  static generateBaseSectorPlacement(initialCell: Cell): SectorPlacement {
    const sector: SectorPlacement = [];
    for (let i = 0; i < AppSettings.ROWS; i++) {
      sector[i] = [];
      for (let j = 0; j < AppSettings.COLS; j++) {
        sector[i][j] = initialCell.clone();
      }
    }
    return sector;
  }

  static getCellByCoordinates(sector: SectorPlacement, [row, cell]: TargetCoordinates): Cell {
    return sector[row][cell];
  }

  static updateSector(sector: SectorPlacement, [row, cell]: TargetCoordinates, updatedCell: Cell): SectorPlacement {
    sector[row].splice(cell, 1, updatedCell);
    sector[row] = [...sector[row]];
    return sector;
  }

  constructor(private initialCell: Cell) {
    this.sector = Sector.generateBaseSectorPlacement(initialCell);
  }

  get placement(): SectorPlacement {
    return this.sector;
  }

  getResultAfterShot(coordinates: TargetCoordinates): SectorPlacement {
    const sectorValue: SectorPlacement = this.placement;
    const target = Sector.getCellByCoordinates(sectorValue, coordinates);
    const updatedSector = Sector.updateSector(sectorValue, coordinates, target.getShotResult());
    this.sector = updatedSector;
    return updatedSector;
  }

}

