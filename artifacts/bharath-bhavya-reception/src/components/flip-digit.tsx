import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export function FlipDigits({ value, testId }: { value: string; testId?: string }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <span className="flip-digits" data-testid={testId}>
        {value}
      </span>
    );
  }

  return (
    <span className="flip-digits" data-testid={testId}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-60%', opacity: 0, filter: 'blur(3px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '60%', opacity: 0, filter: 'blur(3px)' }}
          transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
          className="flip-digits-value"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
