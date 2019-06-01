import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Players } from '@core/common.enum';
import { GameService } from '@core/game.service';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameOverComponent {
  winner$: Observable<Players>;

  constructor(private gameService: GameService) {
    this.winner$ = this.gameService.state$.pipe(pluck('winner'));
  }


  restart(): void {
    this.gameService.startGame();
  }

}
