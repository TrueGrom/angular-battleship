import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorCellComponent } from '@battlefield/sector-cell/sector-cell.component';

describe('SectorCellComponent', () => {
  let component: SectorCellComponent;
  let fixture: ComponentFixture<SectorCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
