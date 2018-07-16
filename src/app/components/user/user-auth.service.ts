import { Injectable } from '@angular/core';
import { User } from './model/user';
import {Observable, ReplaySubject} from 'rxjs';

@Injectable()
export class UserAuthService {
  private isAuthenticatedUser = false;
  private onChangeAuth = new ReplaySubject<boolean>(1);

  constructor() { }

  getChangeAuthSubscription(): Observable<boolean> {
    return this.onChangeAuth;
  }

  async login(): Promise<void> {
    this.onChangeAuth.next(this.isAuthenticatedUser = true);
    console.log('Login user');
  }

  async logout(): Promise<void> {
    this.onChangeAuth.next(this.isAuthenticatedUser = false);
    console.log('Logout user');
  }

  async register(): Promise<void> {
    console.log('Register user');
  }

  async isAuthenticated(): Promise<boolean> {
    return this.isAuthenticatedUser;
  }

  async getUserInfo(): Promise<User> {
    return {
      id: 1,
      login: 'harley26',
      firstName: 'Mikita',
      lastName: 'Isakau',
      email: 'harley26.gold@gmail.com'
    };
  }
}
