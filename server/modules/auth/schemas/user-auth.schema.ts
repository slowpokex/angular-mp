import * as mongoose from 'mongoose';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { random } from 'lodash';

import { UserAuthModel } from '../models/user-auth.model';

const UserAuthSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true,
    default: () => random(Number.MAX_SAFE_INTEGER, false)
  },
  login: {
    type: String,
    required: true,
    unique: true,
    minlength: 6,
    maxlength: 128,
  },
  displayName: {
    type: String,
    default: 'Anonymous',
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    enum: ['GUEST', 'USER', 'MODERATOR', 'ADMIN'],
    default: 'GUEST',
  },
  hash : String,
  salt : String,
  lastModifiedDate: Date,
}).pre('save', function(next) {
  const user: UserAuthModel = this as UserAuthModel;
  user.lastModifiedDate = new Date();
  next();
});

UserAuthSchema.methods.setPassword = function(password): void {
  this.salt = randomBytes(16).toString('hex');
  this.hash = pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
};

UserAuthSchema.methods.isValidPassword = function(password): boolean {
  const hash = pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
  return this.hash === hash;
};

export default UserAuthSchema;
