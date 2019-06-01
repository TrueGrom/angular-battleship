import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GameService } from '@core/game.service';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  stopped$: Observable<boolean>;

  constructor(private gameService: GameService) {
    this.stopped$ = this.gameService.state$.pipe(pluck('stopped'));
  }
}
