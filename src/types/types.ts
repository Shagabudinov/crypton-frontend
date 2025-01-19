export type PageType = 'loading' | 'login' | 'registration' | 'authorized';

export interface User {
  id?: string;
  email: string;
  password?: string;
}
