import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { PageType } from '../types/types';
import axios from 'axios';
import { API_URL } from '../api';
import { setCookie } from '../utils/Cookies';
import Spinner from '../components/ui/Spinner';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const Registration: React.FC<Props> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validatePassword = (pwd: string): string | null => {
    if (pwd.length < 6) {
      return 'Пароль должен содержать минимум 6 символов.';
    }
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!specialCharRegex.test(pwd)) {
      return 'Пароль должен содержать хотя бы один специальный символ: !@#$%^&*(),.?":{}|<>';
    }
    return null;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка совпадения паролей
    if (password !== confirmPassword) {
      setError('Пароли не совпадают.');
      return;
    }

    // Валидация пароля
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);
    setError(null);

    axios
      .post(`${API_URL}/register`, { email, password })
      .then((response) => {
        setCookie('jwt', response.data.token, 3600);
        setPage('authorized');
      })
      .catch((err) => {
        setError(err.response?.data?.message || 'Ошибка при регистрации.');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Card className='w-80 p-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Регистрация</CardTitle>
      <CardContent>
        <form onSubmit={handleRegister} className='flex flex-col gap-2'>
          <label htmlFor='email'>Почта</label>
          <Input
            id='email'
            type='email'
            placeholder='Ваша почта'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          />

          <label htmlFor='password'>Пароль</label>
          <Input
            id='password'
            type='password'
            placeholder='Ваш пароль'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          />

          <label htmlFor='confirmPassword'>Подтвердите пароль</label>
          <Input
            id='confirmPassword'
            type='password'
            placeholder='Повторите ваш пароль'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          />

          {error && <div className='text-red-500 text-sm'>{error}</div>}

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

          {loading ? (
            <Spinner />
          ) : (
            <Button type='submit' className='mt-4'>
              Зарегистрироваться
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default Registration;
