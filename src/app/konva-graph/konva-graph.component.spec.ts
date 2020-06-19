import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KonvaGraphComponent } from './konva-graph.component';

describe('KonvaGraphComponent', () => {
  let component: KonvaGraphComponent;
  let fixture: ComponentFixture<KonvaGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KonvaGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KonvaGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
