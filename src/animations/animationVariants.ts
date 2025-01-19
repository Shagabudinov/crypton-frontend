const loginRegVariants = {
  initial: {
    x: -300,
    y: 100,
    opacity: 0,
    rotate: -45,
  },
  animate: {
    x: 0,
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    x: 300,
    y: 100,
    opacity: 0,
    rotate: 45,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
    },
  },
};

const defaultVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export { loginRegVariants, defaultVariants };
