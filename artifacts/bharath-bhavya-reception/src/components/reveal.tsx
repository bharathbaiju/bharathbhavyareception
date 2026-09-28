import type { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 0.8, 0.24, 1] },
  },
};

const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

export function Reveal({
  children,
  className,
  as = 'div',
  delay = 0,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
  delay?: number;
  [key: string]: unknown;
}) {
  const MotionTag = as === 'section' ? motion.section : motion.div;
  const prefersReducedMotion = useReducedMotion();
  return (
    <MotionTag
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={prefersReducedMotion ? 'visible' : undefined}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.28 }}
      variants={fadeUp}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({
  children,
  className,
  as = 'div',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
  [key: string]: unknown;
}) {
  const MotionTag = as === 'section' ? motion.section : motion.div;
  const prefersReducedMotion = useReducedMotion();
  return (
    <MotionTag
      className={className}
      initial={prefersReducedMotion ? false : 'hidden'}
      animate={prefersReducedMotion ? 'visible' : undefined}
      whileInView={prefersReducedMotion ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.28 }}
      variants={staggerParent}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({
  children,
  className,
  as = 'div',
  ...rest
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'p';
  [key: string]: unknown;
}) {
  const MotionTag = as === 'p' ? motion.p : motion.div;
  return (
    <MotionTag className={className} variants={fadeUp} {...rest}>
      {children}
    </MotionTag>
  );
}
