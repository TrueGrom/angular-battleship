import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorRowComponent } from './sector-row.component';

describe('SectorRowComponent', () => {
  let component: SectorRowComponent;
  let fixture: ComponentFixture<SectorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorRowComponent ]
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
