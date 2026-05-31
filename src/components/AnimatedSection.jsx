import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * Reusable scroll-reveal wrapper using Framer Motion spring physics.
 * Wraps any section to animate it into view on first scroll intersection.
 *
 * @param {object} props
 * @param {'up'|'down'|'left'|'right'} props.direction - Slide direction
 * @param {number} props.delay - Animation delay in seconds
 * @param {number} props.distance - Distance in pixels to slide from
 * @param {object} props.springConfig - Custom spring configuration
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.children
 */
export default function AnimatedSection({
  children,
  direction = 'up',
  delay = 0,
  distance = 60,
  springConfig = { stiffness: 100, damping: 20, mass: 1 },
  className = '',
  as: Component = 'div',
  ...props
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const directionMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
  };

  const offset = directionMap[direction] || directionMap.up;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: offset.x, y: offset.y }}
      transition={{
        type: 'spring',
        ...springConfig,
        delay,
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container variant — wrap children items for cascading reveals.
 */
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

/**
 * Individual stagger item variant with spring physics.
 */
export const staggerItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 14,
      mass: 1,
    },
  },
};
