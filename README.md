# NgxSimpleBreadcrumb

A tiny breadcrumb library for Angular. Under 40kb in size with no additional dependencies.

Add a breadcrumb to your Angular app in 5 minutes.

## Demo App

To run the demo run the following from the root of the project:

```shell
npm start 
```

## Test

To run the project tests run the following from the root of the project:

```shell
npm run test 
```

## Versioning

| Version | Compatible Angular Version |
|---------|----------------------------|
| 17.x.x  | >=17.0.0                   |
| 16.x.x  | >=16.0.0                   |

## Quick Start

### Installation

```shell
npm install ngx-simple-breadcrumb
```

### Setup

Import NgxSimpleBreadcrumbModule in your app module.

***app.module.ts***

```ts
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { NgxSimpleBreadcrumbModule } from 'ngx-simple-breadcrumb';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    NgxSimpleBreadcrumbModule,
    RouterModule.forRoot([
     ...
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


```
### Usage Example

#### 1. Add the nxg-simple   -breadcrumb component

***app.component.html***
```html
<ngx-simple-breadcrumb>
  <ng-template let-breadcrumb>
    <a [routerLink]="breadcrumb.route">{{breadcrumb.label}}</a>
  </ng-template>
  <ng-template #separator> > </ng-template>
</ngx-simple-breadcrumb>

<router-outlet />
```

The first template defines each breadcrumb item. It can access the breadcrumb object by using ```let-breadcrumb```.

The breadcrumb object contains the following properties
- label - as defined in the breadcrumb property of the route data object (see next step)
- route - the full path which can be used to build a link (as seen in example)
- isLast - whether or not the breadcrumb is the last in the trail

The second template defines the separator which will separate each breadcrumb item. It must be identified by the template reference variable ```#seperator```.

These templates allow you the flexibility to add icons, images, styling etc. however you wish.

#### 2. In your routing confing, add the breadcrumb property to the data object for each route you would like to appear in your breadcrumb.
This value will be made available in your template as ```breadcrumb.label```.

***app-routing.module.ts***
```ts
[
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
]
```
## Troubleshooting

### Duplicate Breadcrumbs
Note the Angular behaviour that an empty path route inherits its parent's parameters and data.

This means if you add a breadcrumb to an empty path route (such as is common when lazy loading a module), its children will also inherit this breadcrumb and create duplicates. This can be avoided by only adding the breadcrumb data property to the children of empty path routes. 