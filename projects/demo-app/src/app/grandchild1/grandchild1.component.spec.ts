import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Grandchild1Component } from './grandchild1.component';

describe('Grandchild1Component', () => {
  let component: Grandchild1Component;
  let fixture: ComponentFixture<Grandchild1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Grandchild1Component]
    });
    fixture = TestBed.createComponent(Grandchild1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
