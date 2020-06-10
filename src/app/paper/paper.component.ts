import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { Project, Point, Shape, Color, Path, PointText } from 'paper';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
})
export class PaperComponent implements AfterViewInit {
  @Input() scale = 1;

  @ViewChild('paperCanvas') paperCanvas: ElementRef;

  project: paper.Project;
  arc: paper.Path.Arc;
  arcFill: paper.Path.Arc;
  text: paper.PointText;

  ngAfterViewInit(): void {
    this.drawElements();
    this.addEvents();
  }

  drawElements(): void {
    this.project = new Project(this.paperCanvas.nativeElement);
    this.project.view.viewSize.width = 400 * this.scale;
    this.project.view.viewSize.height = 400 * this.scale;

    this.project.view.scaling.set(this.scale);

    const circle = new Shape.Circle(
      new Point(
        this.project.view.viewSize.width / 2,
        this.project.view.viewSize.height / 2,
      ),
      160,
    );
    circle.strokeColor = new Color('black');
    circle.strokeWidth = 4;
    circle.dashArray = [16, 8];
    circle.fillColor = new Color('red');

    this.arc = new Path.Arc(
      this.generateArcInfo(
        (270 * Math.PI) / 180,
        {
          x: this.project.view.viewSize.width / 2,
          y: this.project.view.viewSize.height / 2,
        },
        135,
        35,
        'black',
      ),
    );
    this.arc.rotate(135);

    this.arcFill = new Path.Arc(
      this.generateArcInfo(
        ((270 - 4) * Math.PI) / 180,
        {
          x: this.project.view.viewSize.width / 2,
          y: this.project.view.viewSize.height / 2,
        },
        135,
        26,
        'yellow',
      ),
    );
    this.arcFill.rotate(135 + 2);

    this.text = new PointText(new Point(0, 0));
    this.text.justification = 'center';
    this.text.fillColor = new Color('black');
    this.text.content = 'Sample Text';
    this.text.fontSize = 24;
    this.text.translate(
      new Point(
        this.project.view.viewSize.width / 2,
        this.project.view.viewSize.height / 2 - this.text.position.y * 2,
      ),
    );
  }
  addEvents(): void {
    this.arc.onMouseEnter = () => this.arcFillOrange();
    this.arc.onMouseLeave = () => this.arcFillYellow();
    this.arcFill.onMouseEnter = () => this.arcFillOrange();
    this.arcFill.onMouseLeave = () => this.arcFillYellow();

    this.arc.onClick = () => this.startTextScaleAnimation();
    this.arcFill.onClick = () => this.startTextScaleAnimation();
  }

  startTextScaleAnimation(): void {
    if (this.text.scaling.x === 1) {
      this.text.onFrame = () => this.scaleUpAnimation();
    } else {
      this.text.onFrame = () => this.scaleDownAnimation();
    }
  }

  scaleUpAnimation(): void {
    this.text.scaling.set(this.text.scaling.x + 0.05);
    if (this.text.scaling.x >= 1.5) {
      this.text.onFrame = undefined;
    }
  }

  scaleDownAnimation() {
    this.text.scaling.set(this.text.scaling.x - 0.05);
    if (this.text.scaling.x <= 1) {
      this.text.onFrame = undefined;
    }
  }

  arcFillOrange(): void {
    this.arcFill.strokeColor = new Color('orange');
    this.paperCanvas.nativeElement.style.cursor = 'pointer';
  }

  arcFillYellow(): void {
    this.arcFill.strokeColor = new Color('yellow');
    this.paperCanvas.nativeElement.style.cursor = 'default';
  }

  generateArcInfo(
    radiansRange: number,
    center: { x: number; y: number },
    radius: number,
    width: number,
    color: string,
  ): object {
    return {
      from: {
        x: center.x + radius,
        y: center.y,
      },
      through: {
        x: center.x + Math.cos(radiansRange / 2) * radius,
        y: center.y + Math.sin(radiansRange / 2) * radius,
      },
      to: {
        x: center.x + Math.cos(radiansRange) * radius,
        y: center.y + Math.sin(radiansRange) * radius,
      },
      strokeColor: color,
      strokeWidth: width,
    };
  }
}
