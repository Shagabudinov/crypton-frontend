import React from 'react';
import { Card, CardContent, CardTitle } from '../components/ui/card';

const NotFound: React.FC = () => (
  <Card className='w-80 p-4 flex flex-col gap-4'>
    <CardTitle className='text-center'>Страница не найдена</CardTitle>
    <CardContent>
      <p>Извините, запрашиваемая страница не существует.</p>
    </CardContent>
  </Card>
);

export default NotFound;
