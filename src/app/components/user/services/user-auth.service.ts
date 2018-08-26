import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from '../model/user';
import { Token } from '../model/token';
import { LoginFormData } from '../../login/interfaces/login-form.interface';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UserAuthService {
  private onChangeAuth = new ReplaySubject<boolean>(1);

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {}

  // private static setSession(jwtToken: Token) {
  //   const expiresAt = moment().add(jwtToken.expiresIn, 'second');

  //   localStorage.setItem('current_user', JSON.stringify(jwtToken.user));
  //   localStorage.setItem('access_token', jwtToken.accessToken);
  //   localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  // }

  // private static resetSession() {
  //   localStorage.removeItem('current_user');
  //   localStorage.removeItem('access_token');
  //   localStorage.removeItem('expires_at');
  // }

  // private static getExpiration() {
  //   const expiration = localStorage.getItem('expires_at');
  //   const expiresAt = JSON.parse(expiration);
  //   return moment(expiresAt);
  // }

  public login(userData: LoginFormData): Observable<Token> {
    return this.http.post<Token>(this.config.getAuthUrl(), userData);
  }

  // public logout(): Observable<void> {
  //   return of(UserAuthService.resetSession());
  // }

  // TODO: Need to implement register logic
  public register(): Observable<any> {
    return of('Will be implemented later!');
  }

  // public isAuthenticated(): Observable<boolean> {
  //   return of(moment().isBefore(UserAuthService.getExpiration()));
  // }

  // public getUserInfo(): Observable<User> {
  //   return of(JSON.parse(localStorage.getItem('current_user')) as User);
  // }
}
