import { Tokens } from './tokens';

export interface User {
  id: number;
  name: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

export interface UserAuthData {
  name: string;
  password: string;
}

export interface UserAuthState extends Tokens {
  user: User;
}
