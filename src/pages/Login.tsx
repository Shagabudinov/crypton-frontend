import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { PageType } from '../types/types';
import axios, { AxiosError } from 'axios';
import { API_URL } from '../api';
import { setCookie } from '../utils/Cookies';
import Spinner from '../components/ui/Spinner';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const Login: React.FC<Props> = ({ setPage }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      setCookie('jwt', response.data.token, 3600);
      setPage('authorized');
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError;
        const status = axiosError.response?.status;
        const message =
          axiosError.response?.data?.message || axiosError.message;
        setError(`${status ? `${status}. ` : ''}${message}`);
      } else {
        setError('Произошла неизвестная ошибка.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
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
            className='p-2 border border-gray-300 rounded'
          />

          <label htmlFor='password'>Пароль</label>
          <input
            id='password'
            type='password'
            placeholder='Ваш пароль'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='p-2 border border-gray-300 rounded'
          />

          {error && <div className='text-red-500 text-sm'>{error}</div>}

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

          {loading ? (
            <Spinner />
          ) : (
            <Button type='submit' className='mt-4'>
              Войти
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
