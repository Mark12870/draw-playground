import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Application, Graphics } from 'pixi.js';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss'],
})
export class PixiComponent implements AfterViewInit {
  @ViewChild('pixiContainer') pixiContainer: ElementRef;

  app: Application;

  constructor() {}

  ngAfterViewInit(): void {
    this.app = new Application({
      width: 400,
      height: 400,
      transparent: true,
      antialias: true,
    });
    this.pixiContainer.nativeElement.appendChild(this.app.view);

    const circle = new Graphics();
    circle.lineStyle(4, 0x000000);
    circle.beginFill(0xff0000);
    circle.drawCircle(this.app.view.width / 2, this.app.view.height / 2, 160);
    circle.endFill();
    this.app.stage.addChild(circle);

    const arc = new Graphics();
    arc.lineStyle(30, 0x000000, 1);
    arc.arc(
      this.app.view.width / 2,
      this.app.view.height / 2,
      135,
      Math.PI,
      2 * Math.PI,
    );
    this.app.stage.addChild(arc);
  }
}
