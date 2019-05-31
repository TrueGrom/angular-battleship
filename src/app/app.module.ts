import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '@app/app.component';
import { ShipModule } from '@app/ship/ship.module';
import { BattlefieldModule } from '@battlefield/battlefield.module';
import { CoreModule } from '@core/core.module';
import { OpponentModule } from '@opponent/opponent.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    BattlefieldModule,
    SharedModule,
    OpponentModule,
    ShipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
