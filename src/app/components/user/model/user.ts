export enum UserRoleEnum {
  GUEST, USER, MODERATOR, ADMIN
}

export interface User {
  id: number;
  login: string;
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  role: UserRoleEnum;
  lastModifiedDate?: Date;
}

export interface UserAuthenticate {
  login?: string;
  password?: string;
}
