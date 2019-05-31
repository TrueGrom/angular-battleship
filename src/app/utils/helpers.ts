import { COLS, ROWS } from '@constants';
import { Direction } from '@core/common.enum';
import { TargetCoordinates } from '@core/types';


import random from 'lodash/random';
import uniq from 'lodash/uniq';

export function getRandomItem<T>(items: Array<T> | ReadonlyArray<T>): T {
  return items[random(items.length - 1)];
}

export function getRandomCoordinates(): TargetCoordinates {
  const row: number = getRandomItem(ROWS);
  const col: number = getRandomItem(COLS);
  return [row, col];
}

export function getValidLast<T>(index: number, items: T[] | ReadonlyArray<T>): number {
  return index === items.length - 1 ? index : index + 1;
}

export function getValidFirst(index: number): number {
  return index === 0 ? 0 : index - 1;
}

export function getValidCoordinates<T>(index: number, items: T[] | ReadonlyArray<T>) {
  return uniq([getValidFirst(index), index, getValidLast(index, items)]);
}

export function getNeighbors([row, col]: TargetCoordinates): TargetCoordinates[] {
  const result = [];
  for (const rowIndex of getValidCoordinates(row, ROWS)) {
    for (const colIndex of getValidCoordinates(col, COLS)) {
      result.push([rowIndex, colIndex]);
    }
  }
  return result;
}

export function getNextCell([row, col]: TargetCoordinates): TargetCoordinates {
  const lastRow = row === ROWS.length - 1;
  const lastCol = col === COLS.length - 1;
  if (lastCol) {
    return [row + 1, 0];
  }
  if (lastRow && lastCol) {
    return [0, 0];
  }
  return [row, col + 1];
}

export function getCoordinatesByDirection(start: TargetCoordinates, length: number, direction: Direction): TargetCoordinates[] {
  if (direction === Direction.TOP) {
    return getTopCoordinates(start, length);
  }
  if (direction === Direction.RIGHT) {
    return getRightCoordinates(start, length);
  }
  if (direction === Direction.BOTTOM) {
    return getBottomCoordinates(start, length);
  }
  return getLeftCoordinates(start, length);
}

export function getTopCoordinates(start: TargetCoordinates, length: number): TargetCoordinates[] {
  const result = [start];
  const [row, col] = start;
  for (let i = 1; i < length; i++) {
    result.push([row - i, col]);
  }
  return result;
}

export function getRightCoordinates(start: TargetCoordinates, length: number): TargetCoordinates[] {
  const result = [start];
  const [row, col] = start;
  for (let i = 1; i < length; i++) {
    result.push([row, col + i]);
  }
  return result;
}

export function getLeftCoordinates(start: TargetCoordinates, length: number): TargetCoordinates[] {
  const result = [start];
  const [row, col] = start;
  for (let i = 1; i < length; i++) {
    result.push([row, col - i]);
  }
  return result;
}

export function getBottomCoordinates(start: TargetCoordinates, length: number): TargetCoordinates[] {
  const result = [start];
  const [row, col] = start;
  for (let i = 1; i < length; i++) {
    result.push([row + i, col]);
  }
  return result;
}

export function getPossibleDirections([row, col]: TargetCoordinates, length: number): Direction[] {
  const directions: Direction[] = [];
  if (row + length < ROWS.length - 1) {
    directions.push(Direction.BOTTOM);
  }
  if (row + 1 - length >= 0) {
    directions.push(Direction.TOP);
  }
  if (col + length < COLS.length - 1) {
    directions.push(Direction.RIGHT);
  }
  if (col + 1 - length >= 0) {
    directions.push(Direction.LEFT);
  }
  return directions;
}

export function getLshapedDirection(mainDirection: Direction): Direction {
  if (mainDirection === Direction.TOP) {
    return Direction.RIGHT;
  }
  if (mainDirection === Direction.RIGHT) {
    return Direction.BOTTOM;
  }
  if (mainDirection === Direction.BOTTOM) {
    return Direction.LEFT;
  }
  return Direction.TOP;
}

export function getReverseDirection(direction: Direction): Direction {
  if (direction === Direction.TOP) {
    return Direction.BOTTOM;
  }
  if (direction === Direction.RIGHT) {
    return Direction.LEFT;
  }
  if (direction === Direction.BOTTOM) {
    return Direction.TOP;
  }
  return Direction.RIGHT;
}
