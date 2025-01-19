// src/App.tsx
import React, { useState } from 'react';
import './App.css';
import RegistrationOrLogin from './pages/RegistrationOrLogin';
import { RegistrationOrLoginType } from './types/types';

const App: React.FC = () => {
  const [currentType, setCurrentType] =
    useState<RegistrationOrLoginType>('registration');
  
  return (
    <section className='flex justify-center items-center min-h-screen'>
      <RegistrationOrLogin type={currentType} />
    </section>
  );
};

export default App;
