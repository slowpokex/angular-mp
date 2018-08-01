import { ExtractJwt, Strategy } from 'passport-jwt';
import {  PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { ConfigService } from '../config/config.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AuthService } from './services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService, private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.getSecretKey()
    });
  }

  async validate(payload: JwtPayload, done: Function): Promise<any> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(`User is not valid or invalid token data!`), false);
    }
    done(null, user);
  }
}
