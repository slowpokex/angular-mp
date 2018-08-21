import { Injectable } from '@angular/core';
import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as Auth from '../actions/user-auth';
import * as fromAuth from '../reducers';


@Injectable()
export class UserAuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(fromAuth.getLoggedIn),
      map((authed: boolean) => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect());
          return false;
        }
        return true;
      }),
      take(1)
    );
  }
}
