import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxSimpleBreadcrumbComponent } from './ngx-simple-breadcrumb.component';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';

@Component({
  template: `
  <ngx-simple-breadcrumb>
      <ng-template let-breadcrumb>
        <span class="crumb">{{ breadcrumb.label }}</span>
      </ng-template>     
      <ng-template #separator>
        <span class="separator">-</span>
      </ng-template>     
  </ngx-simple-breadcrumb>
  `
})
class BreadcrumbHostComponent { }

const getCrumbContents = (fixture: ComponentFixture<BreadcrumbHostComponent>) =>
  fixture
    .debugElement
    .queryAll(By.css('.crumb'))
    .map((el) => (el.nativeElement as HTMLSpanElement).innerHTML);


describe('NgxSimpleBreadcrumbComponent', () => {
  let component: BreadcrumbHostComponent;
  let fixture: ComponentFixture<BreadcrumbHostComponent>;

  const grandchild = {
    data: { breadcrumb: 'Grandchild' },
    url: [{ path: 'grandchild' }],
    get firstChild() {
      return null;
    }
  }

  const child = {
    data: {},
    url: [{ path: 'child' }],
    get firstChild() {
      return grandchild;
    }
  }

  const mockActivatedRoute = {
    snapshot: {
      data: { breadcrumb: 'Home' },
      url: [{ path: 'home' }],
      get firstChild() {
        return child;
      }
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BreadcrumbHostComponent, NgxSimpleBreadcrumbComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }]
    });
    fixture = TestBed.createComponent(BreadcrumbHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display home breadcrumb', () => {
    expect(getCrumbContents(fixture)).toContain('Home');
  });

  it('should display grandchild breadcrumb', () => {
    expect(getCrumbContents(fixture)).toContain('Grandchild');
  });

  it('should only display home and grandchild breadcrumb as child route does not contain the breadcrumb data item', () => {
    expect(getCrumbContents(fixture).length).toEqual(2);
  });

  it('should display configured separator', () => {
    const firstSeparator = 
    fixture
      .debugElement
      .queryAll(By.css('.separator'))[0]
      .nativeElement as HTMLSpanElement;

    expect(firstSeparator.innerHTML).toEqual('-');
  });


});
