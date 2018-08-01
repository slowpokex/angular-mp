import { UserRoleEnum } from '../models/user-auth.model';

export interface UserAuthDto {
  _id: string;
  login: string;
  displayName: string;
  email: string;
  role: UserRoleEnum;
  password: string;
}
