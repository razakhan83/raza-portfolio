import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_ITEMS = [
  { label: 'About',    id: 'about' },
  { label: 'Skills',   id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact',  id: 'contact' },
];

// Hook to track window width for responsive logic
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

export default function Navbar() {
  const [active,     setActive]     = useState('about');
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const windowWidth = useWindowWidth();
  const isDesktop = windowWidth >= 768;

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observers = NAV_ITEMS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(id); },
        { threshold: 0.25, rootMargin: '-70px 0px -40% 0px' }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = id => {
    const el = document.getElementById(id);
    if (el) {
      if (mobileOpen) {
        setMobileOpen(false);
        // Wait for the drawer close animation to complete (280ms) before scrolling
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        transition: 'background 0.35s, border-color 0.35s, backdrop-filter 0.35s',
        background: scrolled ? 'rgba(7,8,15,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      <nav
        className="section-container"
        style={{
          height: 'clamp(56px,8vw,68px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* ── Logo — always far LEFT ───────── */}
        <motion.button
          onClick={() => scrollTo('about')}
          className="display-font"
          style={{
            background: 'none', border: 'none', flexShrink: 0,
            fontSize: 'clamp(1.1rem,2.5vw,1.35rem)', fontWeight: 800,
            color: 'var(--text-hi)', letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'flex-end', gap: 3,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          AR
          <motion.span
            style={{
              width: 6, height: 6, borderRadius: '50%',
              background: 'var(--teal)',
              display: 'inline-block', marginBottom: 3,
            }}
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.button>

        {/* ── Desktop nav — RIGHT side, only on desktop ── */}
        {isDesktop && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            {NAV_ITEMS.map(({ label, id }) => (
              <motion.button
                key={id}
                onClick={() => scrollTo(id)}
                className={`btn btn-ghost btn-sm display-font ${active === id ? 'active' : ''}`}
                style={{ letterSpacing: '-0.01em' }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.95 }}
              >
                {label}
              </motion.button>
            ))}

            <motion.button
              className="btn btn-teal btn-sm display-font"
              style={{ marginLeft: 8 }}
              onClick={() => scrollTo('contact')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
              data-cursor="pointer"
            >
              Hire Me
            </motion.button>
          </div>
        )}

        {/* ── Mobile hamburger — ONLY on mobile ── */}
        {!isDesktop && (
          <motion.button
            style={{
              background: 'none', border: 'none',
              display: 'flex', flexDirection: 'column',
              gap: 5, padding: 8, cursor: 'pointer',
            }}
            onClick={() => setMobileOpen(o => !o)}
            whileTap={{ scale: 0.9 }}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {[0, 1, 2].map(i => (
              <motion.span
                key={i}
                style={{
                  display: 'block', width: 22, height: 2,
                  background: 'var(--text-hi)', borderRadius: 2,
                  transformOrigin: 'center',
                }}
                animate={
                  i === 1
                    ? { opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }
                    : i === 0
                      ? { rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }
                      : { rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }
                }
                transition={{ type: 'spring', stiffness: 320, damping: 26 }}
              />
            ))}
          </motion.button>
        )}
      </nav>

      {/* ── Mobile menu drawer — only renders on mobile ── */}
      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: 'hidden',
              background: 'rgba(7,8,15,0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              borderBottom: '1px solid var(--border)',
            }}
          >
            <div
              className="section-container"
              style={{
                paddingTop: 'var(--sp-4)',
                paddingBottom: 'var(--sp-6)',
                display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)',
              }}
            >
              {NAV_ITEMS.map(({ label, id }, i) => (
                <motion.button
                  key={id}
                  onClick={() => scrollTo(id)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, ease: [0.22, 1, 0.36, 1], duration: 0.28 }}
                  className="display-font"
                  style={{
                    background: active === id ? 'rgba(45,212,191,0.06)' : 'none',
                    border: 'none', textAlign: 'left',
                    fontSize: 'var(--text-lg)',
                    fontWeight: active === id ? 700 : 500,
                    color: active === id ? 'var(--teal)' : 'var(--text-lo)',
                    padding: 'var(--sp-3) var(--sp-4)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    transition: 'color 0.15s, background 0.15s',
                    width: '100%',
                  }}
                >
                  {label}
                </motion.button>
              ))}

              <motion.button
                className="btn btn-teal btn-lg display-font"
                style={{ marginTop: 'var(--sp-3)', width: '100%' }}
                onClick={() => scrollTo('contact')}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.22, duration: 0.28 }}
              >
                Hire Me
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
