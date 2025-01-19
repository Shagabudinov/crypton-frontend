// src/pages/UserProfile.tsx

import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { User } from '../types/types';

interface UserProfileProps {
  user: User;
  setCurrentType: React.Dispatch<
    React.SetStateAction<'login' | 'registration' | 'authorized'>
  >;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  setCurrentType,
  setUser,
}) => {
  const handleLogout = () => {
    setUser(null);
    setCurrentType('login');
    console.log('Пользователь вышел из системы');
  };

  return (
    <Card className='w-[350px] py-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Профиль</CardTitle>
      <CardContent>
        <div className='flex flex-col gap-2'>
          <span>
            <strong>ID:</strong> {user.id}
          </span>
          <span>
            <strong>Email:</strong> {user.email}
          </span>
        </div>
        <Button type='button' className='mt-6' onClick={handleLogout}>
          Выйти
        </Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
