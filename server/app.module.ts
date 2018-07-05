import { Module } from '@nestjs/common';
import { SimpleController } from './simple.controller';
import { ConfigService } from './config/config.service';

@Module({
  controllers: [
    SimpleController
  ],
  providers: [
    ConfigService
  ]
})
export class ApplicationModule {}
