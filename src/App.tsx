import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { PageType } from './types/types';
import { getCookie } from './utils/Cookies';

const App: React.FC = () => {
  const token = getCookie('jwt');
  const [page, setPage] = useState<PageType>('loading'); // Initial state can remain 'loading' or be adjusted

  useEffect(() => {
    if (token) {
      setPage('authorized');
    } else {
      setPage('login');
    }
  }, [token]);

  const renderPage = () => {
    switch (page) {
      case 'loading':
        return <div className='w-80 p-4'>Loading...</div>; // Optional: General loading state
      case 'login':
        return <Login setPage={setPage}/>;
      case 'registration':
        return (
          <Registration setPage={setPage}/>
        );
      case 'authorized':
        return (
          <UserProfile setPage={setPage} />
        );
      case 'error':
        return (
          <div className='w-80 p-4 bg-red-100 text-red-700 rounded'>
            <p>Произошла ошибка.</p>
          </div>
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
