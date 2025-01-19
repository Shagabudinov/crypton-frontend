import React from 'react';

const Skeleton: React.FC = () => (
  <div className='animate-pulse flex flex-col gap-4 w-80 p-4'>
    <div className='h-6 bg-gray-300 rounded'></div>
    <div className='h-4 bg-gray-300 rounded'></div>
    <div className='h-4 bg-gray-300 rounded w-3/4'></div>
    <div className='h-6 bg-gray-300 rounded w-1/2 mt-4'></div>
  </div>
);

export default Skeleton;
