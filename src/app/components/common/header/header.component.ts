import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { isEqual } from 'lodash';

import { UserAuthService } from '../../user/services/user-auth.service';
import { User } from '../../user/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements DoCheck {

  public currentUser: User = null;
  public isAuthenticated = false;

  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) { }

  ngDoCheck(): void {
    this.isAuthenticated = this.userAuthService.isAuthenticated();
    if (this.isAuthenticated) {
      const newUser = this.userAuthService.getUserInfo();
      if (!isEqual(this.currentUser, newUser)) {
        this.currentUser = newUser;
      }
    }
  }

  onLogout() {
    this.isAuthenticated = false;
    this.userAuthService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
