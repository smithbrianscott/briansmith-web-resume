import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterDemoComponent } from './toaster-demo.component';

describe('ToasterDemoComponent', () => {
  let component: ToasterDemoComponent;
  let fixture: ComponentFixture<ToasterDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToasterDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToasterDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
