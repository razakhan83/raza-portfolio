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
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  // Raw motion values for mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Inner dot — ultra-responsive tight spring
  const dotX = useSpring(mouseX, { stiffness: 850, damping: 38, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 850, damping: 38, mass: 0.3 });

  // Outer ring — organic spring for smooth trailing
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.8 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.8 });

  const handleMouseMove = useCallback((e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [handleMouseMove]);

  // High Performance Event Delegation for hovering states
  useEffect(() => {
    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveTarget = target.closest('a, button, [data-cursor="pointer"], .project-card-wrapper, input, textarea');
      const textTarget = target.closest('p, h1, h2, h3, h4, h5, h6, li, label, code');

      if (interactiveTarget) {
        setIsHoveringInteractive(true);
        setIsHoveringText(false);
        const label = interactiveTarget.getAttribute('data-cursor-label');
        if (label) setCursorLabel(label);
      } else if (textTarget) {
        setIsHoveringText(true);
        setIsHoveringInteractive(false);
      } else {
        setIsHoveringInteractive(false);
        setIsHoveringText(false);
        setCursorLabel('');
      }
    };

    const handleMouseOut = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveTarget = target.closest('a, button, [data-cursor="pointer"], .project-card-wrapper, input, textarea');
      const textTarget = target.closest('p, h1, h2, h3, h4, h5, h6, li, label, code');

      if (interactiveTarget) {
        const related = e.relatedTarget;
        if (!related || !interactiveTarget.contains(related)) {
          setIsHoveringInteractive(false);
          setCursorLabel('');
        }
      } else if (textTarget) {
        const related = e.relatedTarget;
        if (!related || !textTarget.contains(related)) {
          setIsHoveringText(false);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

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
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: isHoveringInteractive ? 'var(--teal)' : 'white',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: isHoveringInteractive ? 'normal' : 'difference',
        }}
        animate={{
          scale: isClicking ? 0.5 : isHoveringInteractive ? 0.3 : isHoveringText ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 16, mass: 0.5 }}
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
          pointerEvents: 'none',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scale: isClicking ? 0.75 : isHoveringInteractive ? 1.4 : isHoveringText ? 1.8 : 1,
          opacity: isVisible ? 1 : 0,
          // Colors and borders
          border: isHoveringText
            ? 'none'
            : isHoveringInteractive
              ? '2px solid var(--teal)'
              : '2px solid rgba(45, 212, 191, 0.4)',
          backgroundColor: isHoveringText
            ? 'white'
            : isHoveringInteractive
              ? 'rgba(45, 212, 191, 0.08)'
              : 'transparent',
          // Apply mix-blend-mode difference ONLY when hovering over text
          mixBlendMode: isHoveringText ? 'difference' : 'normal',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 12, mass: 0.8 }}
      >
        {/* Cursor Label */}
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              fontSize: '9px',
              fontWeight: 800,
              color: 'var(--bg-base)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
