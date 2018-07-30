import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserAuthService} from './user-auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.userAuthService.isAuthenticated().then((isLoggedIn) => {
      if (isLoggedIn) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
    });
  }
}
