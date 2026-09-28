import { AnimatePresence, motion } from 'framer-motion';

const SPARK_COUNT = 14;

export function SealBurst({ active }: { active: boolean }) {
  return (
    <AnimatePresence>
      {active && (
        <div className="seal-burst" aria-hidden="true">
          {Array.from({ length: SPARK_COUNT }).map((_, index) => {
            const angle = (360 / SPARK_COUNT) * index;
            const distance = 64 + (index % 3) * 22;
            const rad = (angle * Math.PI) / 180;
            const x = Math.cos(rad) * distance;
            const y = Math.sin(rad) * distance;
            return (
              <motion.span
                key={index}
                className="seal-spark"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
                animate={{ opacity: [0, 1, 0], x, y, scale: [0.3, 1, 0.4] }}
                transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
              />
            );
          })}
          <motion.span
            className="seal-flash"
            initial={{ opacity: 0.8, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.6 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
