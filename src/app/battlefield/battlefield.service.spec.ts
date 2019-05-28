import { TestBed } from '@angular/core/testing';

import { BattlefieldService } from '@battlefield/battlefield.service';

describe('BattlefieldService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BattlefieldService = TestBed.get(BattlefieldService);
    expect(service).toBeTruthy();
  });
});
