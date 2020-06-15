import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperGraphComponent } from './paper-graph.component';

describe('PaperGraphComponent', () => {
  let component: PaperGraphComponent;
  let fixture: ComponentFixture<PaperGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
