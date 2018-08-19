import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';

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
                    map(user => new LoginSuccess({ user })),
                    catchError(error => of(new LoginFailure(error)))
                )
        )
    );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginSuccess),
        tap(() => this.router.navigate(['/course']))
    );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$.pipe(
        ofType(AuthActionTypes.LoginRedirect, AuthActionTypes.Logout),
        tap(authed => {
            this.router.navigate(['/login']);
        })
    );

    constructor(
        private actions$: Actions,
        private userAuthService: UserAuthService,
        private router: Router
    ) {}
}