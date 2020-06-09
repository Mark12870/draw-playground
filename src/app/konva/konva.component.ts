import { AfterViewInit, Component, Input } from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-konva',
  templateUrl: './konva.component.html',
  styleUrls: ['./konva.component.scss'],
})
export class KonvaComponent implements AfterViewInit {
  @Input() scale = 1;

  elementID = `konva-container-${Math.random()}`;

  stage: Konva.Stage;
  layer: Konva.Layer;
  arc: Konva.Arc;
  text: Konva.Text;

  ngAfterViewInit(): void {
    this.drawElements();
    this.addEvents();
  }

  drawElements(): void {
    this.stage = new Konva.Stage({
      container: this.elementID,
      height: 400,
      width: 400,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    const circle = new Konva.Circle({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
      radius: 160,
      fill: 'red',
      stroke: 'black',
      strokeWidth: 4,
      dash: [20, 10],
    });

    this.arc = new Konva.Arc({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
      innerRadius: 120,
      outerRadius: 150,
      angle: 270,
      rotation: 135,
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 4,
    });

    this.text = new Konva.Text({
      x: this.stage.width() / 2,
      y: this.stage.height() / 2,
      text: 'Sample Text',
      fontSize: 24,
    });
    this.text.offsetX(this.text.width() / 2);

    this.layer.add(circle, this.arc, this.text);

    this.stage.width(this.stage.width() * this.scale);
    this.stage.height(this.stage.height() * this.scale);
    this.stage.scale({ x: this.scale, y: this.scale });

    this.layer.draw();
  }

  addEvents(): void {
    this.arc.on('mouseover', event => {
      this.stage.container().style.cursor = 'pointer';
      const shape = event.target;
      shape.setAttr('fill', 'orange');
      this.layer.draw();
    });
    this.arc.on('mouseout', event => {
      this.stage.container().style.cursor = 'default';
      const shape = event.target;
      shape.setAttr('fill', 'yellow');
      this.layer.draw();
    });

    // Scale Animations
    let scale = 1;
    const scaleUpAnim = new Konva.Animation(() => {
      scale = scale + 0.05;
      this.text.scale({ x: scale, y: scale });
      if (scale > 1.5) {
        scaleUpAnim.stop();
      }
    }, this.layer);

    const scaleDownAnim = new Konva.Animation(() => {
      scale = scale - 0.05;
      this.text.scale({ x: scale, y: scale });
      if (scale <= 1) {
        scaleDownAnim.stop();
      }
    }, this.layer);

    this.arc.on('click', () => {
      if (scale === 1) {
        scaleUpAnim.start();
      } else {
        scaleDownAnim.start();
      }
    });
  }
}
