import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { KonvaComponent } from './konva/konva.component';
import { PixiComponent } from './pixi/pixi.component';
import { GoComponent } from './go/go.component';
import { PaperComponent } from './paper/paper.component';
import { PaperGraphComponent } from './paper-graph/paper-graph.component';
import { KonvaGraphComponent } from './konva-graph/konva-graph.component';

@NgModule({
  declarations: [
    AppComponent,
    KonvaComponent,
    PixiComponent,
    GoComponent,
    PaperComponent,
    PaperGraphComponent,
    KonvaGraphComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
