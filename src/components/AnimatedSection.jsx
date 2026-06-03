import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Scroll-reveal wrapper. Slides + fades in on first viewport intersection.
 *
 * @param {'up'|'down'|'left'|'right'} direction - slide direction
 * @param {number}  delay     - seconds before animation starts
 * @param {number}  distance  - pixels to travel from
 * @param {string}  className - extra CSS classes
 * @param {React.ReactNode} children
 */
export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  distance = 48,
  className = '',
  ...rest
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-64px' });

  const offset = {
    up:    { x: 0,         y: distance },
    down:  { x: 0,         y: -distance },
    left:  { x: distance,  y: 0 },
    right: { x: -distance, y: 0 },
  }[direction] ?? { x: 0, y: distance };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{
        type: 'spring',
        stiffness: 90,
        damping: 18,
        mass: 0.9,
        delay,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container — wraps multiple AnimatedSection children for cascade effect */
export const staggerContainer = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

/** Individual stagger item */
export const staggerItem = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 130, damping: 16, mass: 0.85 },
  },
};
