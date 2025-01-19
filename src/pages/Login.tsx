// src/pages/Login.tsx

import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { RegistrationOrLoginType, User } from '../types/types';

interface LoginProps {
  setCurrentType: React.Dispatch<React.SetStateAction<RegistrationOrLoginType>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login: React.FC<LoginProps> = ({ setCurrentType, setUser }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Здесь должна быть логика аутентификации (например, вызов API)
    // Для демонстрации проверим вручную
    if (email === 'test@example.com' && password === 'password') {
      const loggedInUser: User = {
        id: '123456',
        email: email,
      };
      setUser(loggedInUser);
      setCurrentType('authorized');
      console.log('Пользователь вошёл в систему:', loggedInUser);
    } else {
      alert('Неверная почта или пароль');
    }
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
