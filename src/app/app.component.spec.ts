import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from '@app/app.component';
import { BattlefieldModule } from '@battlefield/battlefield.module';
import { GameOverComponent } from '@core/game-over/game-over.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameOverComponent,
      ],
      imports: [BattlefieldModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
