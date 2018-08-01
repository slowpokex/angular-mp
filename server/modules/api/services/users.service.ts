import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserModel } from '../models/user.model';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserModel>) {}

  async create(newUser: UserDto): Promise<UserModel> {
    const createdUser = new this.userModel(newUser);
    createdUser.setPassword(newUser.password);
    return await createdUser.save();
  }

  async findAll(): Promise<Array<UserModel>> {
    return this.userModel.find().exec();
  }
}
