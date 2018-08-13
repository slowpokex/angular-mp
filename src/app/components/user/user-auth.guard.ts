import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { UserAuthService } from './services/user-auth.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly userAuthService: UserAuthService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return Observable.create((observer: Subject<boolean>) => {
      if (this.userAuthService.isAuthenticated()) {
        return observer.next(true);
      }
      this.router.navigate(['/login']);
      return observer.next(false);
    });
  }
}
