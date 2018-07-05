import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly _config = {
    COMPILED_APP_PATH: 'dist/angular-mp'
  };

  getAppPath(): string {
    return this._config.COMPILED_APP_PATH;
  }
}
