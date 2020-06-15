import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Project, Path, Color, Group, Point, PointText } from 'paper';

@Component({
  selector: 'app-paper-graph',
  templateUrl: './paper-graph.component.html',
  styleUrls: ['./paper-graph.component.scss'],
})
export class PaperGraphComponent implements AfterViewInit {
  @ViewChild('paperCanvas') paperCanvas: ElementRef;

  project: paper.Project;
  graphWidth: number;
  graphHeight: number;
  graphLines: paper.Group;
  graphLegend: paper.Group;

  ngAfterViewInit(): void {
    this.project = new Project(this.paperCanvas.nativeElement);
    this.project.view.viewSize.width = 800;
    this.project.view.viewSize.height = 300;
    this.graphWidth = (this.project.view.viewSize.width / 100) * 80;
    this.graphHeight = (this.project.view.viewSize.height / 100) * 80;

    this.drawGraphLegend();
    this.drawGraphLines();
  }

  drawGraphLines(): void {
    const graphMainLine = new Path({
      segments: this.generateGraphPaths(200),
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

  generateGraphPaths(pathsCount: number): number[][] {
    const pathsArray: number[][] = [];

    for (let currentCount = 0; currentCount <= pathsCount - 1; currentCount++) {
      const x = (this.graphWidth / (pathsCount - 1)) * currentCount;
      let y = this.getRandomInt(this.graphHeight - 20, 20);
      if (currentCount == 0 || currentCount == pathsCount - 1) {
        y = this.graphHeight;
      }
      pathsArray.push([x, y]);
    }
    return pathsArray;
  }

  getRandomInt(max: number, min: number): number {
    return Math.floor(Math.random() * (max - min) + min);
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

    const topPoint = new Point([0, (this.graphHeight / 100) * 20]);
    const topText = new PointText({
      point: [topPoint.x - 24, topPoint.y],
      content: this.graphHeight - (this.graphHeight / 100) * 20,
      fillColor: 'grey',
      fontSize: 16,
      justification: 'center',
    });
    const topLine = new Path({
      strokeWidth: legendStrokeWidth,
      strokeColor: legendStrokeColor,
      segments: [topPoint, [this.graphWidth, topPoint.y]],
    });

    const middlePoint = new Point([
      0,
      ((this.graphHeight / 100) * 20 + this.graphHeight) / 2,
    ]);
    const middleText = new PointText({
      point: [middlePoint.x - 24, middlePoint.y],
      content:
        this.graphHeight -
        ((this.graphHeight / 100) * 20 + this.graphHeight) / 2,
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
