import { Injectable } from '@nestjs/common';

import * as config from '../../../config/config';

@Injectable()
export class ConfigService {
  private readonly _config = {
    ...config.default,
    COMPILED_APP_PATH: '../../../../dist/angular-mp'
  };

  getAppPath(): string {
    return this._config.COMPILED_APP_PATH;
  }

  getHost(): string {
    return this._config.server.host;
  }

  getPort(): number {
    return this._config.server.port;
  }
}
