import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@heroui/react';

const NAV_ITEMS = [
  { label: 'About', id: 'about' },
  { label: 'Skills', id: 'skills' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const observers = [];
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: '-80px 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-[var(--bg-primary)]/80 backdrop-blur-xl shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
      style={{
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      }}
    >
      <nav className="section-container flex items-center justify-between h-16 lg:h-[72px]">
        {/* Logo */}
        <motion.button
          onClick={() => handleScrollTo('about')}
          className="flex items-end gap-0.5 bg-transparent border-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span
            className="text-2xl font-black tracking-wider text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            AR
          </span>
          <motion.div
            className="w-1.5 h-1.5 rounded-full mb-1.5"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, id }) => (
            <motion.button
              key={id}
              onClick={() => handleScrollTo(id)}
              className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-300 bg-transparent border-none ${
                activeSection === id
                  ? 'text-[var(--color-secondary)]'
                  : 'text-[var(--color-text-muted)] hover:text-white'
              }`}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              {label}
              {activeSection === id && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute inset-0 rounded-lg -z-10"
                  style={{
                    backgroundColor: 'rgba(0, 206, 201, 0.06)',
                    border: '1px solid rgba(0, 206, 201, 0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          <Button
            size="sm"
            className="font-bold text-[var(--bg-primary)] bg-[var(--color-secondary)] ml-3 rounded-lg"
            onPress={() => handleScrollTo('contact')}
          >
            Hire Me
          </Button>
        </div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden flex flex-col gap-1.5 p-2 bg-transparent border-none"
          onClick={() => setMobileOpen(!mobileOpen)}
          whileTap={{ scale: 0.9 }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
            animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full"
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-6 h-0.5 bg-white rounded-full origin-center"
            animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        </motion.button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="md:hidden overflow-hidden bg-[var(--bg-primary)]/95 backdrop-blur-xl border-t border-[var(--border-subtle)]"
          >
            <div className="section-container py-6 flex flex-col gap-2">
              {NAV_ITEMS.map(({ label, id }, index) => (
                <motion.button
                  key={id}
                  onClick={() => handleScrollTo(id)}
                  className={`w-full text-left text-lg font-semibold py-3 px-4 rounded-xl transition-colors bg-transparent border-none ${
                    activeSection === id
                      ? 'text-[var(--color-secondary)] bg-[rgba(0,206,201,0.06)]'
                      : 'text-[var(--color-text-muted)]'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06, type: 'spring', stiffness: 200 }}
                >
                  {label}
                </motion.button>
              ))}

              <Button
                fullWidth
                className="mt-4 font-bold text-[var(--bg-primary)] bg-[var(--color-secondary)] rounded-lg"
                size="lg"
                onPress={() => handleScrollTo('contact')}
              >
                Hire Me
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
