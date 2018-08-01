import { Body, Controller, HttpCode, HttpStatus, Post, Get } from '@nestjs/common';

import { UserDto } from '../dto/user.dto';
import { UsersService } from '../services/users.service';
import { UserModel } from '../models/user.model';

@Controller('/api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<Array<UserModel>> {
    return this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async registerNewUser(@Body() newUser: UserDto): Promise<UserModel> {
    return this.usersService.create(newUser);
  }
}
