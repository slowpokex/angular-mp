import { Body, Controller, HttpCode, HttpStatus, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { UserAuthDto } from '../dto/user-auth.dto';
import { AuthService } from '../services/auth.service';
import { UserModel } from '../../api/models/user.model';
import { UserAuthService } from '../services/user-auth.service';

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly authService: AuthService
  ) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async getToken(@Body() authBody: UserAuthDto): Promise<any> { // Authenticate user
    return this.authService.createToken(authBody);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async registerNewUser(@Body() newUser: UserAuthDto): Promise<UserModel> {
    return this.userAuthService.create(newUser);
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  async getCurrentUser(@Req() request: Request): Promise<any> {
    return this.authService.getCurrentUserFromRequest(request);
  }

  @Get('data')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  findAll() {
    return 'SUCCESS!!!';
  }
}
