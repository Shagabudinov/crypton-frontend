import React from 'react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';
import { User, PageType } from '../types/types';
import { deleteCookie } from '../utils/Cookies';

interface Props {
  user: User;
  setPage: React.Dispatch<React.SetStateAction<PageType>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const UserProfile: React.FC<Props> = ({ user, setPage, setCurrentUser }) => {
  const handleLogout = () => {
    deleteCookie('jwt');
    setCurrentUser(null);
    setPage('login');
  };

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
