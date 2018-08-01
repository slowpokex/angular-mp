import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { MainController } from './controllers/main.controller';

@Module({
  imports: [
    ConfigModule
  ],
  controllers: [
    MainController
  ]
})
export class CommonModule {}
