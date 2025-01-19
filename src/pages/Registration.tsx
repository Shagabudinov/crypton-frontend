// src/pages/Registration.tsx

import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { RegistrationOrLoginType, User } from '../types/types';

interface RegistrationProps {
  setCurrentType: React.Dispatch<React.SetStateAction<RegistrationOrLoginType>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Registration: React.FC<RegistrationProps> = ({
  setCurrentType,
  setUser,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleRegistration = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Здесь должна быть логика регистрации (например, вызов API)
    // Для демонстрации создадим пользователя вручную
    const newUser: User = {
      id: '123456',
      email: email,
    };
    setUser(newUser);
    setCurrentType('authorized');
    console.log('Пользователь зарегистрирован:', newUser);
  };

  return (
    <Card className='w-[350px] py-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Регистрация</CardTitle>
      <CardContent>
        <form className='flex flex-col gap-[8px]' onSubmit={handleRegistration}>
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
            <span>Уже есть аккаунт?</span>
            <button
              type='button'
              onClick={() => setCurrentType('login')}
              className='text-blue-500 hover:underline'
            >
              Войти
            </button>
          </div>

          <Button type='submit' className='mt-6'>
            Создать аккаунт
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default Registration;
