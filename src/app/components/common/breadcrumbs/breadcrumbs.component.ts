import { Component, OnInit } from '@angular/core';
import {UserAuthService} from '../../user/user-auth.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public isAuthenticated = false;

  constructor(private readonly userAuthService: UserAuthService) { }

  ngOnInit() {
    this.userAuthService.isAuthenticated().then((isAuth: boolean) =>{
      this.isAuthenticated = isAuth;
    });
  }
}
