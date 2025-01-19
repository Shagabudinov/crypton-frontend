import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PageType } from '../types/types';
import {
  loginRegVariants,
  defaultVariants,
} from '../animations/animationVariants';

interface AnimatedWrapperProps {
  page: PageType;
  prevPage: PageType;
  children: React.ReactNode;
}

const AnimatedWrapper: React.FC<AnimatedWrapperProps> = ({
  page,
  prevPage,
  children,
}) => {
  const isLoginRegistrationTransition =
    (prevPage === 'login' && page === 'registration') ||
    (prevPage === 'registration' && page === 'login');

  const variants = isLoginRegistrationTransition
    ? loginRegVariants
    : defaultVariants;

  return (
    <AnimatePresence>
      <motion.div
        key={page}
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        className='absolute'
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedWrapper;
