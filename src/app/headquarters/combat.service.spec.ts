import { TestBed } from '@angular/core/testing';

import { CombatService } from 'app/headquarters/combat.service';

describe('CombatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CombatService = TestBed.get(CombatService);
    expect(service).toBeTruthy();
  });
});
