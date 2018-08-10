import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { UserAuthModel } from '../models/user-auth.model';
import { UserAuthDto } from '../dto/user-auth.dto';

@Injectable()
export class UserAuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserAuthModel>) {}

  async create(newUser: UserAuthDto): Promise<UserAuthModel> {
    const createdUser = new this.userModel(newUser);
    createdUser.setPassword(newUser.password);
    return await createdUser.save();
  }

  async getUser(login: string): Promise<UserAuthModel> {
    return this.userModel.findOne({ login }).exec();
  }
}
