// src/pages/NotFound.tsx

import React from 'react';
import { Card, CardContent, CardTitle } from '../components/ui/Card';

const NotFound: React.FC = () => {
  return (
    <Card className='w-[350px] py-4 flex flex-col gap-4'>
      <CardTitle className='text-center'>Страница не найдена</CardTitle>
      <CardContent>
        <p>Извините, запрашиваемая страница не существует.</p>
      </CardContent>
    </Card>
  );
};

export default NotFound;
