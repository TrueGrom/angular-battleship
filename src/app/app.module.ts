import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattleshipModule } from 'src/app/battleship/battleship.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BattleshipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
