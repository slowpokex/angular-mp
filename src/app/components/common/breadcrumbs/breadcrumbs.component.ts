import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../user/user-auth.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

export interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public isAuthenticated = false;
  public $breadcrumbs: Observable<any>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.userAuthService.getChangeAuthSubscription().subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
    this.$breadcrumbs = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        distinctUntilChanged(),
        map(() =>  this.buildBreadcrumbs(this.route.root))
      );
  }

  buildBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Array<Breadcrumb> = []): Array<Breadcrumb> {
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : '';
    const path = route.routeConfig ? route.routeConfig.path : '';

    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
      label: label,
      url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
      return this.buildBreadcrumbs(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
