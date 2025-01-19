import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardTitle } from '../components/ui/card';
import { User, PageType } from '../types/types';
import { deleteCookie, getCookie } from '../utils/Cookies';
import axios from 'axios';
import { API_URL } from '../api';
import Skeleton from '../components/ui/Skeleton';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
}

const UserProfile: React.FC<Props> = ({ setPage }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const token = getCookie('jwt');

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/profile`, {
          headers: { Authorization: `${token}` },
        })
        .then((response) => {
          setUser(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setProfileError(
            error.response?.data?.message || 'Ошибка при загрузке профиля.'
          );
          setLoading(false);
          setPage('login');
        });
    } else {
      setPage('login');
    }
  }, [token, setPage]);

  const handleLogout = () => {
    deleteCookie('jwt');
    setPage('login');
  };

  if (loading) {
    return <Skeleton />;
  }

  if (profileError) {
    return (
      <div className='w-80 p-4 bg-red-100 text-red-700 rounded'>
        <p>Произошла ошибка: {profileError}</p>
      </div>
    );
  }

  if (!user) {
    return null; // Or some fallback UI
  }

  return (
    <Card className='w-80 p-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Профиль</CardTitle>
      <CardContent>
        <div className='flex flex-col gap-1'>
          <span>
            <strong>ID:</strong> {user.id}
          </span>
          <span>
            <strong>Email:</strong> {user.email}
          </span>
        </div>
        <Button type='button' className='mt-4' onClick={handleLogout}>
          Выйти
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
