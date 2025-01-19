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

const Registration: React.FC<Props> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/register`, { email, password })
      .then((response) => {
        setCookie('jwt', response.data.token, 3600);
        setPage('authorized');
      })
      .catch((err) => {
        console.error('Registration error:', err);
      });
  };

  return (
    <Card className='w-80 p-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Регистрация</CardTitle>
      <CardContent>
        <form onSubmit={handleRegister} className='flex flex-col gap-2'>
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
            <span>Есть аккаунт?</span>
            <button
              type='button'
              onClick={() => setPage('login')}
              className='text-blue-500 hover:underline'
            >
              Войти
            </button>
          </div>

          <Button type='submit' className='mt-4'>
            Зарегистрироваться
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Registration;
