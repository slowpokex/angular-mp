import { Injectable } from '@angular/core';
import { User } from './model/user';

@Injectable()
export class UserAuthService {
  constructor() { }

  async login(): Promise<void> {
    console.log('Login user');
  }

  async logout(): Promise<void> {
    console.log('Logout user');
  }

  async register(): Promise<void> {
    console.log('Register user');
  }

  async isAuthenticated(): Promise<boolean> {
    return false;
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
