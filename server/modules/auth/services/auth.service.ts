import * as jwt from 'jsonwebtoken';
import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { pick } from 'lodash/fp';

import { ConfigService } from '../../config/config.service';
import { UserAuthService } from './user-auth.service';
import { UserAuthDto } from '../dto/user-auth.dto';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

const expiresIn = 3600;
const pickForJwtToken = pick(['displayName', 'role', 'login', 'email']);

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly userAuthService: UserAuthService
  ) {}

  async createToken(authBody: UserAuthDto) {
    const user = await this.userAuthService.getUser(authBody.login);
    if (!user) {
      throw new NotFoundException(`User ${authBody.login} not found!`);
    }
    if (!user.isValidPassword(authBody.password)) {
      throw new ForbiddenException(`Incorrect password for user: ${authBody.login}`);
    }
    const accessToken = jwt.sign(pickForJwtToken(user), this.config.getSecretKey(), { expiresIn });
    return {
      expiresIn,
      accessToken,
      user: pickForJwtToken(user)
    };
  }

  async getCurrentUserFromRequest(request: Request): Promise<any> {
    const jwtToken = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
    const payload: JwtPayload  = <JwtPayload>(pickForJwtToken(jwt.decode(jwtToken)) as any);
    const user = await this.userAuthService.getUser(payload.login);
    return pickForJwtToken(user);
  }

  async validateUser(payload: JwtPayload): Promise<boolean> {
    const user = await this.userAuthService.getUser(payload.login);
    return !!user;
  }
}
