import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RealTyperModule } from '@real-typer/angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RealTyperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
