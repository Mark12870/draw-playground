import { AfterViewInit, Component } from '@angular/core';
import { Diagram, GraphObject, Shape } from 'gojs';

@Component({
  selector: 'app-go',
  templateUrl: './go.component.html',
  styleUrls: ['./go.component.scss'],
})
export class GoComponent implements AfterViewInit {
  elementID = `go-container-${Math.random()}`;

  diagram;

  ngAfterViewInit(): void {
    this.drawElements();
  }

  drawElements(): void {
    this.diagram = GraphObject.make(Diagram, this.elementID);
    this.diagram.div.style.width = '400px';
    this.diagram.div.style.height = '400px';
    this.diagram.requestUpdate();
    this.diagram.toolManager.clickSelectingTool.isEnabled = false;
    this.diagram.toolManager.panningTool.isEnabled = false;
    this.diagram.toolManager.dragSelectingTool.isEnabled = false;
    this.diagram.toolManager.draggingTool.isEnabled = false;

    this.diagram.add(Shape, { figure: 'Circle', fill: 'green' });
  }
}
