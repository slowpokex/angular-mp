import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable()
export class ConfigService {
  private readonly apiUrl: string;
  private readonly authUrl: string;
  private readonly userInfo: string;

  constructor() {
    let host = '';

    if (!environment.production) {
      host = 'http://' + window.location.hostname + ':8080';
    }

    this.apiUrl = `${host}/api`;
    this.authUrl = `${host}/auth`;
    // Auth urls
    this.userInfo = `${this.authUrl}/user`;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }

  getAuthUrl(): string {
    return this.authUrl;
  }

  getUserInfoUrl(): string {
    return this.userInfo;
  }
}
