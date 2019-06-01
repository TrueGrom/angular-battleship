import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldSectorComponent } from '@battlefield/battlefield-sector/battlefield-sector.component';
import { BattlefieldComponent } from '@battlefield/battlefield/battlefield.component';
import { SectorCellComponent } from '@battlefield/sector-cell/sector-cell.component';
import { SectorRowComponent } from '@battlefield/sector-row/sector-row.component';


describe('BattlefieldComponent', () => {
  let component: BattlefieldComponent;
  let fixture: ComponentFixture<BattlefieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        BattlefieldComponent,
        BattlefieldSectorComponent,
        SectorRowComponent,
        SectorCellComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
