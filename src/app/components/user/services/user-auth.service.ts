import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, forkJoin } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';
import * as moment from 'moment';

import { User } from '../model/user';
import { Token } from '../model/token';
import { LoginFormData } from '../../login/interfaces/login-form.interface';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';

@Injectable()
export class UserAuthService {
  private onChangeAuth = new ReplaySubject<boolean>(1);
  private userInfo: User;

  constructor(
    private readonly config: ConfigService,
    private readonly http: HttpClient
  ) {}

  getChangeAuthSubscription(): Observable<boolean> {
    return this.onChangeAuth;
  }

  async login(userData: LoginFormData): Promise<any> {
    return this.http.post(this.config.getAuthUrl(), userData)
      .pipe(tap(this.setSession), shareReplay()).toPromise();
  }

  async logout(): Promise<void> {
    this.resetSession();
  }

  // TODO: Need to implement register logic
  async register(): Promise<void> {
    console.log('Register user');
  }

  isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  getUserInfo(): User {
    return JSON.parse(localStorage.getItem('current_user')) as User;
  }

  private setSession(jwtToken: Token) {
    const expiresAt = moment().add(jwtToken.expiresIn, 'second');

    localStorage.setItem('current_user', JSON.stringify(jwtToken.user));
    localStorage.setItem('access_token', jwtToken.accessToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt));
  }

  private resetSession() {
    localStorage.removeItem('current_user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
