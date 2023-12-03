import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { Grandchild1Component } from './grandchild1/grandchild1.component';
import { RouterModule } from '@angular/router';
import { NgxSimpleBreadcrumbModule } from 'ngx-simple-breadcrumb';

@NgModule({
  declarations: [
    AppComponent,
    Child1Component,
    Child2Component,
    Grandchild1Component
  ],
  imports: [
    BrowserModule,
    NgxSimpleBreadcrumbModule,
    RouterModule.forRoot([
      {
        path: 'child1',
        component: Child1Component,
        data: {breadcrumb: 'Child 1'},
        children:
        [{
          path: 'grandchild1',
          component: Grandchild1Component,
          data: { breadcrumb: 'Grandchild 1' },
        }]
      },
      {
        path: 'child2',
        component: Child2Component,
        data: {breadcrumb: 'Child 2'},
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
