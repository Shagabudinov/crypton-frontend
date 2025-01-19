import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { PageType, User } from '../types/types';
import axios from 'axios';
import { API_URL } from '../api';
import { setCookie } from '../utils/Cookies';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login: React.FC<Props> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/login`, { email, password })
      .then((response) => {
        setCookie('jwt', response.data.token, 3600);
        setPage('authorized');
      })
      .catch((err) => {
        console.error('Login error:', err);
      });
  };

  return (
    <Card className='w-80 p-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Вход</CardTitle>
      <CardContent>
        <form onSubmit={handleLogin} className='flex flex-col gap-2'>
          <label htmlFor='email'>Почта</label>
          <input
            id='email'
            type='email'
            placeholder='Ваша почта'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor='password'>Пароль</label>
          <input
            id='password'
            type='password'
            placeholder='Ваш пароль'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className='flex justify-between items-center'>
            <span>Нет аккаунта?</span>
            <button
              type='button'
              onClick={() => setPage('registration')}
              className='text-blue-500 hover:underline'
            >
              Зарегистрироваться
            </button>
          </div>

          <Button type='submit' className='mt-4'>
            Войти
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
