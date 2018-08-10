import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigModule } from '../config/config.module';
import { AuthService } from './services/auth.service';
import { UserAuthService } from './services/user-auth.service';
import { JwtStrategy } from './jwt.strategy';
import UserAuthSchema from './schemas/user-auth.schema';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User',
      schema: UserAuthSchema
    }]),
    ConfigModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    UserAuthService,
    AuthService,
    JwtStrategy
  ]
})
export class AuthModule {}
