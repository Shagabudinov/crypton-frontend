export type RegistrationOrLoginType = 'login' | 'registration' | 'authorized';

export interface User {
  id: string;
  email: string;
}