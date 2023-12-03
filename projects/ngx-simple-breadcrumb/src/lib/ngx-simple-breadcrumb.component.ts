import { ChangeDetectionStrategy, Component, ContentChild, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, GuardsCheckEnd, Router } from '@angular/router';
import { Observable, filter, map, startWith } from 'rxjs';

type Breadcrumb = {
  label: string;
  route: string;
  isLast: boolean;
};

@Component({
  selector: 'ngx-simple-breadcrumb',
  template: `
  @for (breadcrumb of breadcrumbs$ | async; track breadcrumb.label){
    <ng-container [ngTemplateOutlet]="itemTemplate" [ngTemplateOutletContext]="{$implicit: breadcrumb}"] />
    <ng-container *ngIf="!breadcrumb.isLast" [ngTemplateOutlet]="separatorTemplate"/>
  }
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxSimpleBreadcrumbComponent implements OnInit {
  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>
  @ContentChild('separator') separatorTemplate!: TemplateRef<any>

  breadcrumbs$!: Observable<Breadcrumb[]>;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.breadcrumbs$ = this.router.events
      .pipe(
        filter((event): event is GuardsCheckEnd => event instanceof GuardsCheckEnd),
        filter((event: GuardsCheckEnd) => event.shouldActivate),
        map((event: GuardsCheckEnd) => this.buildBreadcrumbs('', event.state.root)),
        startWith(this.buildBreadcrumbs('', this.activatedRoute.snapshot))
      );
  }

  private buildBreadcrumbs(parentRoute: string, routeSnapshot: ActivatedRouteSnapshot): Breadcrumb[] {
    const route = this.buildRoute(parentRoute, routeSnapshot);
    const breadcrumbLabel = routeSnapshot.data['breadcrumb'];
    let breadcrumb: Breadcrumb | null = null;
    if (breadcrumbLabel) {
      breadcrumb = {
        label: breadcrumbLabel,
        route: route,
        isLast: false
      };
    }
    if (routeSnapshot.firstChild) {
      const childCrumbs = this.buildBreadcrumbs(route, routeSnapshot.firstChild);
      return breadcrumb ? [breadcrumb, ...childCrumbs] : childCrumbs;
    }
    if (breadcrumb) {
      breadcrumb.isLast = true;
      return [breadcrumb]
    }
    return [];
  }

  private buildRoute(parentRoute: string, routeSnapshot: ActivatedRouteSnapshot) {
    if (parentRoute.length) {
      return `${parentRoute}/${this.getPathSegment(routeSnapshot)}`
    }
    return this.getPathSegment(routeSnapshot)
  }

  private getPathSegment(snapshot: ActivatedRouteSnapshot) {
    return snapshot.url.length ? snapshot.url[0].path : '';
  }
}
