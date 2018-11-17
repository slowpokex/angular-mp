import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError } from 'rxjs/operators';

import {
    Login,
    LoginSuccess,
    LoginFailure,
    AuthActionTypes,
} from '../actions/user-auth';
import { UserAuthService } from '../services/user-auth.service';
import { LoginFormData } from '../../login/interfaces/login-form.interface';
import { Token } from '../model/token';

@Injectable()
export class AuthEffects {

    @Effect()
    login$ = this.actions$.pipe(
        ofType(AuthActionTypes.Login),
        map((action: Login) => action.payload),
        exhaustMap((auth: LoginFormData) =>
            this.userAuthService
                .login(auth)
                .pipe(
                    map((userData: Token) => new LoginSuccess({ userData })),
                    catchError(error => of(new LoginFailure(error)))
                )
        )
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap((data: LoginSuccess) => UserAuthService.setSession(data.payload.userData)),
        tap(() => this.router.navigate(['/course']))
    );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
        tap(authed => {
            this.router.navigate(['/login']);
        })
    );

    @Effect({ dispatch: false })
    logoutSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.Logout),
        tap(UserAuthService.resetSession)
    );

    constructor(
        private actions$: Actions,
        private userAuthService: UserAuthService,
        private router: Router
    ) {}
}