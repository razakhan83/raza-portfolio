import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Professional custom cursor with Framer Motion springs.
 * - Inner dot: tight spring for near-instant response
 * - Outer ring: softer spring for elegant trailing
 * - Reacts to interactive elements (scale + color shift)
 * - Hidden on touch/mobile devices
 */
export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  // Raw motion values for mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner dot — tight spring (near-instant)
  const dotX = useSpring(mouseX, { stiffness: 500, damping: 28, mass: 0.5 });
  const dotY = useSpring(mouseY, { stiffness: 500, damping: 28, mass: 0.5 });

  // Outer ring — softer spring (elegant trail)
  const ringX = useSpring(mouseX, { stiffness: 150, damping: 15, mass: 1 });
  const ringY = useSpring(mouseY, { stiffness: 150, damping: 15, mass: 1 });

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  useEffect(() => {
    // Check if device supports fine pointer (no touch-only)
    const isFinePonter = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePonter) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove]);

  // Track interactive elements for hover state
  useEffect(() => {
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, [data-cursor="pointer"], .project-card-wrapper, input, textarea'
      );

      const enterHandler = (e) => {
        setIsHovering(true);
        const label = e.currentTarget.getAttribute('data-cursor-label');
        if (label) setCursorLabel(label);
      };

      const leaveHandler = () => {
        setIsHovering(false);
        setCursorLabel('');
      };

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', enterHandler);
        el.addEventListener('mouseleave', leaveHandler);
      });

      return () => {
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', enterHandler);
          el.removeEventListener('mouseleave', leaveHandler);
        });
      };
    };

    // Delay to allow DOM to render
    const timer = setTimeout(addHoverListeners, 500);

    // Re-observe for dynamic content
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      setTimeout(addHoverListeners, 100);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // Don't render on mobile/touch
  if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: dotX,
          top: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--teal)',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 0.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Outer Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: ringX,
          top: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid var(--teal)',
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scale: isClicking ? 0.7 : isHovering ? 1.8 : 1,
          opacity: isVisible ? (isHovering ? 0.9 : 0.4) : 0,
          borderColor: isHovering ? 'var(--violet)' : 'var(--teal)',
          backgroundColor: isHovering
            ? 'rgba(124, 106, 240, 0.07)'
            : isClicking
              ? 'rgba(244, 114, 182, 0.08)'
              : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Cursor Label */}
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: cursorLabel ? 1 : 0,
            scale: cursorLabel ? 1 : 0.5,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          style={{
            fontSize: '10px',
            fontWeight: 700,
            color: 'var(--violet)',
            letterSpacing: '0.5px',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {cursorLabel}
        </motion.span>
      </motion.div>
    </>
  );
}
