import { UserRoleEnum } from '../models/user-auth.model';

export interface JwtPayload {
  login: string;
  displayName: string;
  email: string;
  role: UserRoleEnum;
}
