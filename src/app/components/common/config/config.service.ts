import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable()
export class ConfigService {
  public readonly apiUrl: string;

  constructor() {
    let host = '';

    if (!environment.production) {
      host = 'http://' + window.location.hostname + ':8080';
    }

    this.apiUrl = `${host}/api`;
  }

  getApiUrl(): string {
    return this.apiUrl;
  }
}
