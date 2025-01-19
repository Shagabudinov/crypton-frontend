// src/components/ThemeToggle.tsx
import React, { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import { Button } from '../components/ui/button';
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // Иконки, можно использовать любые другие

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Button onClick={toggleTheme} className='flex items-center'>
      {theme === 'light' ? (
        <>
          <MoonIcon className='w-5 h-5 mr-2' />
          Тёмная тема
        </>
      ) : (
        <>
          <SunIcon className='w-5 h-5 mr-2' />
          Светлая тема
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
