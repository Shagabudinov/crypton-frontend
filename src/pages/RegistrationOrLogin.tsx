import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { RegistrationOrLoginType } from '../types/types';

interface RegistrationOrLoginProps {
  type: RegistrationOrLoginType;
}

const RegistrationOrLogin: React.FC<RegistrationOrLoginProps> = ({ type }) => {
  const isRegistration = type === 'registration';

  return (
    <Card className='w-[350px] py-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>
        {isRegistration ? 'Регистрация' : 'Вход'}
      </CardTitle>
      <CardContent>
        <form className='flex flex-col gap-[8px]'>
          <label htmlFor='email'>Почта</label>
          <input id='email' type='email' placeholder='Ваша почта' required />

          <label htmlFor='password'>Пароль</label>
          <input
            id='password'
            type='password'
            placeholder='Ваш пароль'
            required
          />

          <div className='flex justify-between items-center'>
            {isRegistration ? (
              <>
                <label>Уже есть аккаунт?</label>
                <a href='/login' className='text-blue-500 hover:underline'>
                  Войти
                </a>
              </>
            ) : (
              <>
                <label>Нет аккаунта?</label>
                <a href='/register' className='text-blue-500 hover:underline'>
                  Зарегистрироваться
                </a>
              </>
            )}
          </div>

          <Button type='submit' className='mt-6'>
            {isRegistration ? 'Создать аккаунт' : 'Войти'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegistrationOrLogin;
