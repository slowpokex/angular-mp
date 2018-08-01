import { Document } from 'mongoose';

export enum UserRoleEnum {
  GUEST, USER, MODERATOR, ADMIN
}

export interface UserAuthModel extends Document {
  id: number;
  login: string;
  displayName: string;
  email: string;
  role: UserRoleEnum;
  lastModifiedDate: Date;

  setPassword(password: string): void;
  isValidPassword(password: string): boolean;
}
