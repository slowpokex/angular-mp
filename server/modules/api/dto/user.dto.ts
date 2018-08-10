import { UserRoleEnum } from '../models/user.model';

export interface UserDto {
  _id: string;
  login: string;
  displayName: string;
  email: string;
  role: UserRoleEnum;
  password: string;
}
