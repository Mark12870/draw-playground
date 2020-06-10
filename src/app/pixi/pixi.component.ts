import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Application, Graphics, Text, TextStyle, Ticker } from 'pixi.js';

@Component({
  selector: 'app-pixi',
  templateUrl: './pixi.component.html',
  styleUrls: ['./pixi.component.scss'],
})
export class PixiComponent implements AfterViewInit {
  @Input() scale = 1;
  @ViewChild('pixiContainer') pixiContainer: ElementRef;

  app: Application;
  arcFill: Graphics;
  text: Text;

  constructor() {}

  ngAfterViewInit(): void {
    this.drawElements();
    this.addEvents();
    this.app.view.style.width = `${400 * this.scale}px`;
    this.app.resize();
  }

  drawElements(): void {
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
    arc.lineStyle(34, 0x000000);
    arc.arc(
      this.app.view.width / 2,
      this.app.view.height / 2,
      135,
      (135 * Math.PI) / 180,
      (45 * Math.PI) / 180,
    );
    this.app.stage.addChild(arc);

    this.arcFill = new Graphics();
    this.drawArcFill(this.arcFill, 0xffff00);
    this.app.stage.addChild(this.arcFill);

    this.text = new Text(
      'Sample Text',
      new TextStyle({
        fontSize: 24,
        fontFamily: 'Roboto',
      }),
    );
    this.text.x = this.app.view.width / 2;
    this.text.y = this.app.view.height / 2;
    this.text.anchor.set(0.5, 0);
    this.app.stage.addChild(this.text);
  }

  addEvents(): void {
    this.arcFill.hitArea = this.arcFill.getBounds();
    this.arcFill.interactive = true;
    this.arcFill.buttonMode = true;
    this.arcFill.on('mouseover', () => {
      this.arcFill.clear();
      this.drawArcFill(this.arcFill, 0xffa500);
    });
    this.arcFill.on('mouseout', () => {
      this.arcFill.clear();
      this.drawArcFill(this.arcFill, 0xffff00);
    });

    const tickerUp = new Ticker();
    tickerUp.add(() => {
      this.text.style.fontSize = this.text.style.fontSize + 1;
      if (this.text.style.fontSize === 36) {
        tickerUp.stop();
      }
    });
    const tickerDown = new Ticker();
    tickerDown.add(() => {
      this.text.style.fontSize = this.text.style.fontSize - 1;
      if (this.text.style.fontSize === 24) {
        tickerDown.stop();
      }
    });

    this.arcFill.on('click', () => {
      if (this.text.style.fontSize === 24) {
        tickerDown.stop();
        tickerUp.start();
      } else {
        tickerUp.stop();
        tickerDown.start();
      }
    });
  }

  drawArcFill(arc: Graphics, color: number): void {
    arc.lineStyle(25, color);
    arc.arc(
      this.app.view.width / 2,
      this.app.view.height / 2,
      135,
      (135 * Math.PI) / 180 + 0.03,
      (45 * Math.PI) / 180 - 0.03,
    );
  }
}
