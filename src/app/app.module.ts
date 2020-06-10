import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KonvaComponent } from './konva/konva.component';
import { PixiComponent } from './pixi/pixi.component';
import { GoComponent } from './go/go.component';
import { PaperComponent } from './paper/paper.component';

@NgModule({
  declarations: [
    AppComponent,
    KonvaComponent,
    PixiComponent,
    GoComponent,
    PaperComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
