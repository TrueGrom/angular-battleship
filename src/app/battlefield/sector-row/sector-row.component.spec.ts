import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorCellComponent } from '@battlefield/sector-cell/sector-cell.component';
import { SectorRowComponent } from '@battlefield/sector-row/sector-row.component';

describe('SectorRowComponent', () => {
  let component: SectorRowComponent;
  let fixture: ComponentFixture<SectorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SectorRowComponent,
        SectorCellComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
