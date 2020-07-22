import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Project, Path, Color, Group, Point, PointText } from 'paper';
import { max } from 'rxjs/operators';
import { generateGraphPoints } from '../utils';

@Component({
  selector: 'app-paper-graph',
  templateUrl: './paper-graph.component.html',
  styleUrls: ['./paper-graph.component.scss'],
})
export class PaperGraphComponent implements AfterViewInit {
  @ViewChild('paperCanvas') paperCanvas: ElementRef;

  pointsCount = 1000;
  project: paper.Project;
  graphWidth: number;
  graphHeight: number;
  graphLines: paper.Group;
  graphLegend: paper.Group;
  graphPoints: number[][];
  avgFps: number;
  minFps: number;
  maxFps: number;

  ngAfterViewInit(): void {
    this.project = new Project(this.paperCanvas.nativeElement);
    this.project.view.viewSize.width = 800;
    this.project.view.viewSize.height = 300;
    this.graphWidth = (this.project.view.viewSize.width / 100) * 80;
    this.graphHeight = (this.project.view.viewSize.height / 100) * 80;
  }

  start() {
    let i = 0;
    const previousFrames: number[] = [];

    const redraw = frame => {
      this.project.clear();
      this.graphPoints = generateGraphPoints(
        this.pointsCount,
        this.graphWidth,
        this.graphHeight,
      );
      this.drawGraphLines();
      this.drawGraphLegend();

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
      }
    };

    redraw(0);
  }

  drawGraphLines(): void {
    const graphMainLine = new Path({
      segments: this.graphPoints,
      strokeColor: 'black',
      strokeWidth: 2,
    });
    graphMainLine.smooth({ type: 'catmull-rom' });
    graphMainLine.fillColor = new Color({
      gradient: {
        stops: [
          [new Color(150, 165, 180, 0.2), 0.2],
          [new Color(0, 0, 0, 0.5), 1],
        ],
      },
      origin: graphMainLine.bounds.topCenter,
      destination: graphMainLine.bounds.bottomCenter,
    });

    const graphStrokeColor = new Color({
      gradient: {
        stops: [
          ['orange', 0],
          ['orange', 0.33],
          ['red', 0.33],
          ['red', 0.66],
          ['blue', 0.66],
          ['blue', 0.85],
          ['green', 0.85],
          ['green', 1],
        ],
      },
      origin: graphMainLine.bounds.leftCenter,
      destination: graphMainLine.bounds.rightCenter,
    });

    graphMainLine.strokeColor = graphStrokeColor;

    const graphBottomLine = new Path({
      segments: [
        [0, this.graphHeight],
        [this.graphWidth, this.graphHeight],
      ],
      strokeWidth: 8,
      strokeColor: graphStrokeColor,
    });

    this.graphLines = new Group();
    this.graphLines.addChildren([graphMainLine, graphBottomLine]);
    this.graphLines.translate(
      new Point(
        (this.project.view.viewSize.width / 100) * 10,
        (this.project.view.viewSize.height / 100) * 10,
      ),
    );
  }

  drawGraphLegend(): void {
    const legendStrokeWidth = 1;
    const legendStrokeColor = new Color('grey');

    const zeroPoint = new Point([0, this.graphHeight]);
    const zeroText = new PointText({
      point: [zeroPoint.x - 24, zeroPoint.y],
      content: '0',
      fillColor: 'grey',
      fontSize: 16,
      justification: 'center',
    });
    const zeroLine = new Path({
      strokeWidth: legendStrokeWidth,
      strokeColor: legendStrokeColor,
      segments: [zeroPoint, [this.graphWidth, this.graphHeight]],
    });

    const graphYMaxPointShift = 20;
    const graphYMaxPoint =
      Math.min(...this.graphPoints.map(point => point[1])) +
      graphYMaxPointShift;
    const topPoint = new Point([0, graphYMaxPoint]);
    const topText = new PointText({
      point: [topPoint.x - 24, topPoint.y],
      content: this.graphHeight - topPoint.y,
      fillColor: 'grey',
      fontSize: 16,
      justification: 'center',
    });
    const topLine = new Path({
      strokeWidth: legendStrokeWidth,
      strokeColor: legendStrokeColor,
      segments: [topPoint, [this.graphWidth, topPoint.y]],
    });

    const middlePoint = new Point([0, (topPoint.y + this.graphHeight) / 2]);
    const middleText = new PointText({
      point: [middlePoint.x - 24, middlePoint.y],
      content: this.graphHeight - middlePoint.y,
      fillColor: 'grey',
      fontSize: 16,
      justification: 'center',
    });
    const middleLine = new Path({
      strokeWidth: legendStrokeWidth,
      strokeColor: legendStrokeColor,
      segments: [middlePoint, [this.graphWidth, middlePoint.y]],
    });

    this.graphLegend = new Group();
    this.graphLegend.addChildren([
      zeroLine,
      zeroText,
      topLine,
      topText,
      middleText,
      middleLine,
    ]);
    this.graphLegend.translate(
      new Point(
        (this.project.view.viewSize.width / 100) * 10,
        (this.project.view.viewSize.height / 100) * 10,
      ),
    );
  }
}
