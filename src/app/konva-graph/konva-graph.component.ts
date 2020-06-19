import { AfterViewInit, Component } from '@angular/core';
import Konva from 'konva';
import { generateGraphPoints } from '../utils';

@Component({
  selector: 'app-konva-graph',
  templateUrl: './konva-graph.component.html',
  styleUrls: ['./konva-graph.component.scss'],
})
export class KonvaGraphComponent implements AfterViewInit {
  elementID = `konva-graph-container-${Math.random()}`;

  stage: Konva.Stage;
  graphLayer: Konva.Layer;
  graphWidth: number;
  graphHeight: number;

  ngAfterViewInit(): void {
    this.stage = this.stage = new Konva.Stage({
      container: this.elementID,
      width: 800,
      height: 300,
    });
    this.graphWidth = (this.stage.width() / 100) * 80;
    this.graphHeight = (this.stage.height() / 100) * 80;
    this.graphLayer = new Konva.Layer();
    this.graphLayer.position({
      x: (this.stage.width() / 100) * 10,
      y: (this.stage.height() / 100) * 10,
    });
    this.stage.add(this.graphLayer);

    this.drawGraphLines();
    this.stage.draw();
  }

  drawGraphLines(): void {
    const genPoints = generateGraphPoints(
      20,
      this.graphWidth,
      this.graphHeight,
    ).reduce((accumulator, currentValue) => {
      return [...accumulator, currentValue[0], currentValue[1]];
    }, []);

    const graphMainLine = new Konva.Line({
      points: genPoints,
      strokeWidth: 2,
      strokeLinearGradientColorStops: [
        0,
        'orange',
        0.33,
        'orange',
        0.33,
        'red',
        0.66,
        'red',
        0.66,
        'blue',
        0.85,
        'blue',
        0.85,
        'green',
        1,
        'green',
      ],
      strokeLinearGradientStartPoint: { x: 0, y: this.graphHeight / 2 },
      strokeLinearGradientEndPoint: {
        x: this.graphWidth,
        y: this.graphHeight / 2,
      },
    });
    this.graphLayer.add(graphMainLine);
  }
}
