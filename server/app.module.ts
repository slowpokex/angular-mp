import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import config from '../config/config';

import { CommonModule } from './modules/common/common.module';
import { ApiModule } from './modules/api/api.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(config.mongo.uri),
    AuthModule,
    ApiModule,
    CommonModule
  ]
})
export class ApplicationModule {}
