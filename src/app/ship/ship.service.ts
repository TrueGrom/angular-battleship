import { Injectable } from '@angular/core';

import { Direction } from '@core/common.enum';
import { TargetCoordinates } from '@core/types';
import {
  createCoordinatesMatrix,
  getCoordinatesByDirection,
  getLshapedDirection,
  getNeighbors,
  getNextCell,
  getNotUsedFromMatrix,
  getPossibleDirections,
  getRandomItem
} from '@helpers';

import flatten from 'lodash/flatten';
import shuffle from 'lodash/shuffle';
import times from 'lodash/times';

export enum Ship {
  L,
  I,
  DOT
}

const ShipCells = {
  [Ship.DOT]: 1,
  [Ship.I]: 4,
  [Ship.L]: 4
};

const ShipCount = {
  [Ship.DOT]: 2,
  [Ship.I]: 1,
  [Ship.L]: 1
};

@Injectable({
  providedIn: 'root'
})
export class ShipService {

  private coordinates: boolean[][];

  constructor() {
  }

  getRandomShipCoordinates(): TargetCoordinates[] {
    this.initCoordinates();
    const shipsDotShaped = this.getAllDotShipCoordinates();
    const shipsLShaped = this.getAllLshapedShipCoordinates();
    const shipsIShaped = this.getAllIshipCoordinates();
    return [...shipsDotShaped, ...shipsLShaped, ...shipsIShaped];
  }

  private getRandomCoordinatesWithoutNeighbors(): TargetCoordinates {
    const coordinates = this.getRandomNotOccupiedCoordinates();
    if (this.isEmptyNeighbors(coordinates)) {
      return coordinates;
    }
    return this.getRandomCoordinatesWithoutNeighbors();
  }

  private generateDotShip(): TargetCoordinates {
    const coordinates = this.getRandomCoordinatesWithoutNeighbors();
    this.addOccupiedCoordinates(coordinates);
    return coordinates;
  }

  private generateLshapedShip(start?: TargetCoordinates): TargetCoordinates[] {
    const mainLength = ShipCells[Ship.L] - 1;
    const coordinates = start || this.getRandomCoordinatesWithoutNeighbors();
    const startDirections: Direction[] = this.getFreeDirections(coordinates, mainLength);
    if (startDirections.length === 1) {
      return this.generateLshapedShip(getNextCell(coordinates));
    }
    for (const currentDirection of shuffle(startDirections)) {
      const additionalDirections: Direction[] = this.getFreeDirections(coordinates, 2);
      if (additionalDirections.includes(getLshapedDirection(currentDirection))) {
        const mainCoordinates = getCoordinatesByDirection(coordinates, mainLength, currentDirection);
        const additionalCoordinates = getCoordinatesByDirection(coordinates, 2, getLshapedDirection(currentDirection));
        const allCoordinates = [...mainCoordinates, ...additionalCoordinates.slice(1)];
        this.addOccupiedCoordinates(...allCoordinates);
        return allCoordinates;
      }
    }
    return this.generateLshapedShip(getNextCell(coordinates));
  }

  private getAllIshipCoordinates(): TargetCoordinates[] {
    return flatten(times(ShipCount[Ship.I], () => this.generateIShapedShip()));
  }

  private generateIShapedShip(): TargetCoordinates[] {
    const startCoordinates = this.getRandomCoordinatesWithoutNeighbors();
    const allCoordinates = this.findPossibleCoordinates(startCoordinates, ShipCells[Ship.I]);
    this.addOccupiedCoordinates(...allCoordinates);
    return allCoordinates;
  }

  private getAllDotShipCoordinates(): TargetCoordinates[] {
    return times(ShipCount[Ship.DOT], () => this.generateDotShip());
  }

  private getAllLshapedShipCoordinates(): TargetCoordinates[] {
    return flatten(times(ShipCount[Ship.L], () => this.generateLshapedShip()));
  }

  private addOccupiedCoordinates(...coordinates: TargetCoordinates[]): void {
    const allCoordinates = flatten(coordinates.map(getNeighbors));
    for (const [row, col] of allCoordinates) {
      this.coordinates[row][col] = true;
    }
  }

  private isEmptyNeighbors(coordinates: TargetCoordinates): boolean {
    const neighbors = getNeighbors(coordinates);
    return neighbors.every(neighbor => !this.isOccupiedCoordinates(neighbor));
  }

  private getRandomNotOccupiedCoordinates(): TargetCoordinates {
    return getNotUsedFromMatrix(this.coordinates);
  }

  private isOccupiedCoordinates([row, col]: TargetCoordinates): boolean {
    return this.coordinates[row][col];
  }

  private initCoordinates(): void {
    this.coordinates = createCoordinatesMatrix();
  }

  private findPossibleCoordinates(start: TargetCoordinates, length: number): TargetCoordinates[] {
    const directions = this.getFreeDirections(start, length);
    if (directions.length) {
      return getCoordinatesByDirection(start, length, getRandomItem(directions));
    }
    return this.findPossibleCoordinates(getNextCell(start), length);
  }

  private getFreeDirections(start: TargetCoordinates, length: number): Direction[] {
    return getPossibleDirections(start, length)
      .filter(direction => this.isFreeCoordinates(getCoordinatesByDirection(start, length, direction)));
  }

  private isFreeCoordinates(coordinates: TargetCoordinates[]): boolean {
    return coordinates.every(item => !this.isOccupiedCoordinates(item));
  }

}
