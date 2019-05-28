import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from '@app/app.component';
import { BattlefieldModule } from '@battlefield/battlefield.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BattlefieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
