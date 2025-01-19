import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Login from './pages/Login';
import Registration from './pages/Registration';
import UserProfile from './pages/UserProfile';
import NotFound from './pages/NotFound';
import { PageType } from './types/types';
import { getCookie } from './utils/Cookies';
import AnimatedWrapper from './animations/AnimatedWrapper';
import ThemeToggle from './components/ThemeToggle';
import { Resume } from './components/Resume';

const App: React.FC = () => {
  const token = getCookie('jwt');
  const [page, setPage] = useState<PageType>('loading');
  const prevPageRef = useRef<PageType>('loading');
  const [isResumeVisible, setIsResumeVisible] = useState<boolean>(true);

  const toggleResumeVisible = () => {
    setIsResumeVisible((prev) => !prev);
  };

  useEffect(() => {
    if (token) {
      setPage('authorized');
    } else {
      setPage('login');
    }
  }, [token]);

  useEffect(() => {
    prevPageRef.current = page;
  }, [page]);

  const prevPage = prevPageRef.current;

  const renderPage = () => {
    switch (page) {
      case 'loading':
        return <div className='w-80 p-4'>Loading...</div>;
      case 'login':
        return <Login setPage={setPage} />;
      case 'registration':
        return <Registration setPage={setPage} />;
      case 'authorized':
        return <UserProfile setPage={setPage} />;
      default:
        return <NotFound />;
    }
  };

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-background text-foreground relative-container'>
      {/* Переключатель темы в верхнем правом углу */}
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      {isResumeVisible ? (
        <Resume
          className='absolute top-4 left-4'
          toggleResumeVisible={toggleResumeVisible}
        />
      ) : (
        <></>
      )}
      {/* Условный оператор для анимации только в нужные моменты */}
      {token ? (
        renderPage()
      ) : (
        <AnimatedWrapper page={page} prevPage={prevPage}>
          {renderPage()}
        </AnimatedWrapper>
      )}
    </div>
  );
};

export default App;
