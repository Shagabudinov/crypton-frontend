// src/pages/Login.tsx

import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { RegistrationOrLoginType, User } from '../types/types';
import axios from 'axios';
import { API_URL } from '../api';
import { setCookie } from '../utils/Cookies';

interface LoginProps {
  setCurrentType: React.Dispatch<React.SetStateAction<RegistrationOrLoginType>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login: React.FC<LoginProps> = ({ setCurrentType, setUser }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const loggedInUser: User = {
      email: email,
      password: password,
    };

    axios({
      method: 'post',
      url: `${API_URL}/login`,
      data: loggedInUser,
    }).then(function (response) {
      setCookie('jwt', response.data.token, 3600);
      setCurrentType('authorized');
    });
  };

  return (
    <Card className='w-[350px] py-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Вход</CardTitle>
      <CardContent>
        <form className='flex flex-col gap-[8px]' onSubmit={handleLogin}>
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
              onClick={() => setCurrentType('registration')}
              className='text-blue-500 hover:underline'
            >
              Зарегистрироваться
            </button>
          </div>

          <Button type='submit' className='mt-6'>
            Войти
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
