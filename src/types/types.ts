export type RegistrationOrLoginType = 'login' | 'registration' | 'authorized' | 'loading';

export interface User {
  id?: string;
  email: string;
  password?: string;
}