import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { isEqual } from 'lodash';

import { UserAuthService } from '../../user/services/user-auth.service';
import { User } from '../../user/model/user';
import {filter, switchMap, tap} from 'rxjs/operators';

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
    this.userAuthService.isAuthenticated()
      .pipe(
        tap((isAuth: boolean) => this.isAuthenticated = isAuth),
        filter((isAuth: boolean) => isAuth),
        switchMap(() => this.userAuthService.getUserInfo()),
        filter((newUser: User) => !isEqual(this.currentUser, newUser))
      )
      .subscribe((newUser: User) => this.currentUser = newUser);
  }

  onLogout() {
    this.isAuthenticated = false;
    this.userAuthService.logout()
      .then(() => this.router.navigate(['/login']));
  }
}
