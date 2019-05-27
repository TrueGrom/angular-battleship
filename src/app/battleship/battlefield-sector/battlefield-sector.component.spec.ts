import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BattlefieldSectorComponent } from './battlefield-sector.component';

describe('BattlefieldSectorComponent', () => {
  let component: BattlefieldSectorComponent;
  let fixture: ComponentFixture<BattlefieldSectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BattlefieldSectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BattlefieldSectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
