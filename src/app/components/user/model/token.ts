import { User } from './user';

export interface Token {
  accessToken: string;
  expiresIn: number;
  user: User;
}
