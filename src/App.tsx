// src/App.tsx

import React, { useState } from 'react';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { RegistrationOrLoginType, User } from './types/types';

const App: React.FC = () => {
  const [currentType, setCurrentType] =
    useState<RegistrationOrLoginType>('login');
  const [user, setUser] = useState<User | null>(null);

  const renderPage = () => {
    switch (currentType) {
      case 'login':
        return <Login setCurrentType={setCurrentType} setUser={setUser} />;
      case 'registration':
        return (
          <Registration setCurrentType={setCurrentType} setUser={setUser} />
        );
      case 'authorized':
        if (user) {
          return (
            <UserProfile
              user={user}
              setCurrentType={setCurrentType}
              setUser={setUser}
            />
          );
        } else {
          // Если пользователь не установлен, вернём страницу входа
          return <Login setCurrentType={setCurrentType} setUser={setUser} />;
        }
      default:
        return <NotFound />;
    }
  };

  return (
    <section className='flex justify-center items-center min-h-screen bg-gray-100'>
      {renderPage()}
    </section>
  );
};

export default App;
