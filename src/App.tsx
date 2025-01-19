import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { PageType, User } from './types/types';
import { getCookie } from './utils/Cookies';
import axios from 'axios';
import { API_URL } from './api';

const App: React.FC = () => {
  const token = getCookie('jwt');
  const [page, setPage] = useState<PageType>('loading');
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/profile`, { headers: { Authorization: token } })
        .then((response) => {
          setCurrentUser(response.data);
          setPage('authorized');
        })
        .catch(() => setPage('login'));
    } else {
      setPage('login');
    }
  }, [token]);

  const renderPage = () => {
    switch (page) {
      case 'loading':
        return <div>Типо лоадер</div>;
      case 'login':
        return <Login setPage={setPage} setCurrentUser={setCurrentUser} />;
      case 'registration':
        return (
          <Registration setPage={setPage} setCurrentUser={setCurrentUser} />
        );
      case 'authorized':
        return currentUser ? (
          <UserProfile
            user={currentUser}
            setPage={setPage}
            setCurrentUser={setCurrentUser}
          />
        ) : (
          <Login setPage={setPage} setCurrentUser={setCurrentUser} />
        );
      default:
        return <NotFound />;
    }
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      {renderPage()}
    </div>
  );
};

export default App;
