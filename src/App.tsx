// src/App.tsx

import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { RegistrationOrLoginType, User } from './types/types';
import { getCookie } from './utils/Cookies';
import axios from 'axios';
import { API_URL } from './api';

const App: React.FC = () => {
  const jwt = getCookie('jwt') || null;
  console.log(jwt);
  const [currentType, setCurrentType] =
    useState<RegistrationOrLoginType>('loading');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (jwt) {
      axios({
        method: 'get',
        url: `${API_URL}/profile`,
        headers: { Authorization: jwt },
      })
        .then(function (response) {
          setUser(response.data);
        })
        .then(() => setCurrentType('authorized'));
    }
    else {
      if (currentType === 'loading') {
        setCurrentType('login');
      }
    }
  }, [currentType, jwt]);

  const renderPage = () => {
    switch (currentType) {
      case 'loading':
        return <div>Loading...</div>;
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
