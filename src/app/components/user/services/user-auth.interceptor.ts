import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import get from 'lodash/get';

import * as Auth from '../actions/user-auth';
import * as fromAuth from '../reducers';
import { Token } from '../model/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAuth.State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.pipe(
      select(fromAuth.getToken),
      map((authToken: Token) => get(authToken, 'accessToken') ? req.clone({ headers: req.headers.set('Authorization', `bearer ${get(authToken, 'accessToken')}`) }) : req),
      take(1),
      switchMap((resultReq) => next.handle(resultReq)),
      tap(() => {}, (err: any) => {
        if (err instanceof HttpErrorResponse) {
          this.store.dispatch(new Auth.LoginRedirect());
        }
      })
    );
  }
}
