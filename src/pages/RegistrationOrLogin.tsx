import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { RegistrationOrLoginType } from '../types/types';

interface RegistrationOrLoginProps {
  type: RegistrationOrLoginType;
  setCurrentType: React.Dispatch<React.SetStateAction<RegistrationOrLoginType>>;
}

const RegistrationOrLogin: React.FC<RegistrationOrLoginProps> = ({
  type,
  setCurrentType,
}) => {
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
                <label
                  onClick={() => setCurrentType('login')}
                  className='text-blue-500 hover:underline'
                >
                  Войти
                </label>
              </>
            ) : (
              <>
                <label>Нет аккаунта?</label>
                <label
                  onClick={() => setCurrentType('registration')}
                  className='text-blue-500 hover:underline'
                >
                  Войти
                </label>
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
