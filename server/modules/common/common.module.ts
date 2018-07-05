import { Module } from '@nestjs/common';

import { MainController } from './controllers/main.controller';
import { ConfigService } from './config/config.service';

@Module({
  controllers: [
    MainController
  ],
  providers: [
    ConfigService
  ],
  exports: [
    ConfigService
  ]
})
export class CommonModule {}
