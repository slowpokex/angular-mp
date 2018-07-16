import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { UserAuthService } from '../../user/user-auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public isAuthenticated = false;

  constructor(private readonly userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userAuthService.getChangeAuthSubscription().subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
  }
}
