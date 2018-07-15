import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { graphqlExpress } from 'apollo-server-express';
import { GraphQLModule } from '@nestjs/graphql';

import { CommonModule } from './modules/common/common.module';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [
    ApiModule,
    CommonModule
  ]
})
export class ApplicationModule {}
