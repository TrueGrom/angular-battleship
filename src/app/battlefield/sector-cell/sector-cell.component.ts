import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';

import { Cell } from '@core/cell';

import { fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-sector-cell',
  templateUrl: './sector-cell.component.html',
  styleUrls: ['./sector-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectorCellComponent implements OnInit, OnChanges, OnDestroy {
  currentClass: string;

  @Input() index: number;
  @Input() cell: Cell;
  @Input() opponent: boolean;
  @Output() shot: EventEmitter<number> = new EventEmitter<number>();

  private clickSubscription: Subscription;

  constructor(
    private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.clickSubscription = fromEvent(this.elementRef.nativeElement, 'click')
      .subscribe(() => this.fire());
  }

  ngOnDestroy() {
    if (this.clickSubscription) {
      this.clickSubscription.unsubscribe();
    }
  }

  ngOnChanges() {
    this.currentClass = this.getClass();
  }

  private getClass(): string {
    if (this.cell.isSunk()) {
      return 'sunk';
    }
    if (this.cell.isShip()) {
      return 'ship';
    }
    if (this.cell.isMiss()) {
      return 'miss';
    }
    return 'empty';
  }

  private fire(): void {
    this.shot.emit(this.index);
  }

}
