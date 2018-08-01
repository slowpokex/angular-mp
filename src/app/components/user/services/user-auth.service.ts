import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, interval, Subscription} from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

import { User, UserRoleEnum } from '../model/user';
import { Token } from '../model/token';
import { LoginFormData } from '../../login/interfaces/login-form.interface';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UserAuthService {
  private onChangeAuth = new ReplaySubject<boolean>(1);

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {}

  getChangeAuthSubscription(): Observable<boolean> {
    return this.onChangeAuth;
  }

  async login(userData: LoginFormData): Promise<any> {
    return this.http.post(this.config.getAuthUrl(), userData)
      .pipe(tap(this.setSession), tap(() => {
        this.onChangeAuth.next(this.isAuthenticated());
      }), shareReplay()).toPromise();
  }

  async logout(): Promise<void> {
    this.resetSession();
    this.onChangeAuth.next(this.isAuthenticated());
  }

  // TODO: Need to implement register logic
  async register(): Promise<void> {
    console.log('Register user');
  }

  isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  async getUserInfo(): Promise<User> {
    return this.http.get<User>(this.config.getUserInfoUrl()).toPromise();
  }

  private setSession(jwtToken: Token) {
    const expiresAt = moment().add(jwtToken.expiresIn, 'second');

    localStorage.setItem('access_token', jwtToken.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  private resetSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
