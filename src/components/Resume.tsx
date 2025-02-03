import {
  CheckIcon,
  XMarkIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/solid';
import { Button } from './ui/button';

interface ResumeProps {
  className?: string;
  toggleResumeVisible: () => void;
}

const BASIC_FEATURES = [
  {
    completed: true,
    name: 'Отображение статуса запроса пользователю/обработка ошибок',
  },
  { completed: true, name: 'Сохранение сессии после обновления страницы' },
  { completed: true, name: 'Дополнительное поле для пароля при регистрации' },
  { completed: true, name: 'Валидация email и пароля на стороне фронта' },
  { completed: true, name: 'Анимация при переключении регистрации/логина' },
  { completed: true, name: 'Светлая и тёмная темы' },
  { completed: true, name: 'Не используется роутинг' },
];

const libraries = [
  'react',
  'typescript',
  'vite',
  'tailwind',
  'axios',
  'shadcn/ui',
  'framer-motion',
];

export const Resume: React.FC<ResumeProps> = ({
  className,
  toggleResumeVisible,
}) => {
  return (
    <div className={`${className} flex gap-6 flex-col`}>
      <div className='flex flex-col border rounded py-2 px-4 relative'>
        <Button
          className='absolute right-[-54px] top-0'
          onClick={() => toggleResumeVisible()}
        >
          <EyeSlashIcon className='w-2 h-2'></EyeSlashIcon>
        </Button>
        <p className='font-semibold text-2xl mb-2'>Фичи:</p>
        {BASIC_FEATURES.map((item) => (
          <span className='flex'>
            {item.completed ? (
              <CheckIcon className='w-5 h-5 mr-2' />
            ) : (
              <XMarkIcon className='w-5 h-5 mr-2' />
            )}
            <p>{item.name}</p>
          </span>
        ))}
      </div>
      <div className='flex flex-col border rounded py-2 px-4 items-start'>
        <p className='font-semibold text-2xl mb-2 mr-2'>Стек</p>
        <div className='flex flex-wrap gap-1'>
          {libraries.map((item, index) => (
            <span className='flex text-lg font-medium' key={index}>
              {`${item}`}
              {index < libraries.length - 1 && ','}
            </span>
          ))}
        </div>
      </div>
      <div className='flex flex-col border rounded py-2 px-4 items-start'>
        <a
          className='font-semibold text-2xl mb-2 mr-2 underline'
          href='https://github.com/Shagabudinov/crypton-frontend'
          target='_blank'
          rel='noopener noreferrer'
        >
          Ссылка на Github
        </a>
      </div>
    </div>
  );
};
