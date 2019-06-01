import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldSectorComponent } from '@battlefield/battlefield-sector/battlefield-sector.component';
import { SectorCellComponent } from '@battlefield/sector-cell/sector-cell.component';
import { SectorRowComponent } from '@battlefield/sector-row/sector-row.component';


describe('BattlefieldSectorComponent', () => {
  let component: BattlefieldSectorComponent;
  let fixture: ComponentFixture<BattlefieldSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BattlefieldSectorComponent,
        SectorRowComponent,
        SectorCellComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldSectorComponent);
    component = fixture.componentInstance;
    component.sector = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
