export type PageType = 'loading' | 'login' | 'registration' | 'authorized' | 'error';

export interface User {
  id?: string;
  email: string;
  password?: string;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
}
