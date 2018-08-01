import { Component, OnInit } from '@angular/core';

import { UserAuthService } from '../../user/user-auth.service';
import { User } from '../../user/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public currentUser: User = null;
  public isAuthenticated = false;

  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) { }

  ngOnInit(): void {
    this.userAuthService.getChangeAuthSubscription().subscribe((isAuth: boolean) => {
      this.isAuthenticated = isAuth;
    });
    this.userAuthService.getUserInfo().then((userData: User) => {
      this.currentUser = userData;
    });
  }

  onLogout() {
    this.isAuthenticated = false;
    this.userAuthService.logout().then(() => this.router.navigate(['/login']));
  }
}
