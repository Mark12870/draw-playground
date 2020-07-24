import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Application, Container, Graphics, RENDERER_TYPE } from 'pixi.js';
import { generateGraphPoints } from '../utils';

@Component({
  selector: 'app-pixi-graph',
  templateUrl: './pixi-graph.component.html',
  styleUrls: ['./pixi-graph.component.scss'],
})
export class PixiGraphComponent implements AfterViewInit {
  @ViewChild('pixiContainer') pixiContainer: ElementRef;

  app: Application;
  pointsCount = 20;
  graphWidth: number;
  graphHeight: number;
  graphPoints: number[][];
  graphLines: Container;
  avgFps: number;
  minFps: number;
  maxFps: number;

  constructor() {}

  ngAfterViewInit(): void {
    this.app = new Application({
      width: 800,
      height: 300,
      transparent: true,
      antialias: true,
      forceCanvas: true,
    });
    this.pixiContainer.nativeElement.appendChild(this.app.view);
    this.graphWidth = (this.app.view.width / 100) * 80;
    this.graphHeight = (this.app.view.height / 100) * 80;

    this.graphLines = new Container();
    this.graphLines.x = (this.app.view.width / 100) * 10;
    this.graphLines.y = (this.app.view.height / 100) * 10;

    this.detectRenderer();
  }

  start() {
    let i = 0;
    const previousFrames: number[] = [];

    const redraw = frame => {
      if (this.graphLines.children) {
        this.graphLines.removeChildren();
      }
      this.graphPoints = generateGraphPoints(
        this.pointsCount,
        this.graphWidth,
        this.graphHeight,
      );
      this.drawGraphLines();

      if (frame !== 0) {
        previousFrames.push(frame);
      }
      const fpsArray = previousFrames
        .map((val, index) => val - previousFrames[index - 1])
        .slice(1, previousFrames.length)
        .map(val => 1 / (val / 1000));
      this.avgFps =
        fpsArray.reduce((acc, currentValue) => acc + currentValue, 0) /
        fpsArray.length;
      this.minFps = Math.min(...fpsArray);
      this.maxFps = Math.max(...fpsArray);
      i++;
      if (i < 100) {
        requestAnimationFrame(redraw);
      } else {
        this.detectRenderer();
      }
    };

    redraw(0);
  }

  drawGraphLines(): void {
    const graphMainLine = new Graphics()
      .lineStyle(2, Math.random() * 0xffffff)
      .beginFill(Math.random() * 0xffffff, 0.5);
    this.graphPoints.forEach((points, index) => {
      index > 0
        ? graphMainLine.lineTo(points[0], points[1])
        : graphMainLine.moveTo(points[0], points[1]);
    });
    graphMainLine.endFill();
    this.graphLines.addChild(graphMainLine);

    this.app.stage.addChild(this.graphLines);
  }

  detectRenderer(): void {
    if (this.app.renderer.type == RENDERER_TYPE.WEBGL) {
      console.log('webgl');
    }
    if (this.app.renderer.type == RENDERER_TYPE.CANVAS) {
      console.log('canvas');
    }
  }
}
