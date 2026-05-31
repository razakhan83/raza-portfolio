import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Chip } from '@heroui/react';
import { FaGithub, FaLinkedinIn, FaDiscord, FaEnvelope, FaDownload } from 'react-icons/fa6';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

const ROLES = [
  'MERN Stack Developer',
  'Next.js Engineer',
  'Full-Stack Architect',
  'UI/UX Enthusiast',
];

const SOCIAL_LINKS = [
  { icon: FaGithub, label: 'GitHub', href: 'https://github.com/razakhan83', color: '#6c5ce7' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0077b5' },
  { icon: FaDiscord, label: 'Discord', href: 'https://discord.com', color: '#5865f2' },
  { icon: FaEnvelope, label: 'Email', href: 'mailto:ahmedraza@example.com', color: '#ea4335' },
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);

  // Cycle through roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="about"
      className="section-container relative min-h-[90vh] flex items-center pt-24 pb-16 lg:pt-32 lg:pb-24"
    >
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-12 lg:gap-16 w-full">
        {/* Left Text Column */}
        <motion.div
          className="w-full lg:w-[55%]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting Badge */}
          <motion.div variants={staggerItem}>
            <Chip
              className="mb-6 border border-[rgba(0,206,201,0.25)] text-[var(--color-secondary)] bg-[rgba(0,206,201,0.04)] px-4 py-1 rounded-full text-xs"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '2.5px', fontWeight: 800 }}
            >
              HELLO WORLD
            </Chip>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Ahmed{' '}
            <span className="gradient-text">Raza</span>
          </motion.h1>

          {/* Animated Role Rotator */}
          <motion.div
            variants={staggerItem}
            className="mt-3 h-10 sm:h-12 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.h2
                key={roleIndex}
                initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 20,
                  mass: 0.8,
                }}
                className="text-xl sm:text-2xl md:text-3xl font-bold"
                style={{ color: 'var(--color-text-secondary)', fontFamily: 'var(--font-heading)' }}
              >
                {ROLES[roleIndex]}
              </motion.h2>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="mt-6 text-base sm:text-lg leading-relaxed max-w-[560px]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Crafting premium full-stack web applications and fluid interactive user experiences.
            Specializing in high-performance React architectures, robust Node.js APIs, and
            elegant cloud-native solutions.
          </motion.p>

          {/* Social Links */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-3 mt-8"
          >
            {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-white no-underline"
                whileHover={{
                  y: -3,
                  scale: 1.03,
                  borderColor: color,
                  boxShadow: `0 0 20px ${color}22`,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Icon size={18} style={{ color }} />
                <span className="hidden sm:inline">{label}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Button
              size="lg"
              className="font-extrabold text-white bg-[var(--color-primary)] shadow-lg shadow-[var(--glow-primary)] text-base px-8 rounded-xl"
              onPress={() => handleScrollTo('contact')}
              data-cursor="pointer"
            >
              Let's Build Something Great
            </Button>

            <a
              href="/resume.pdf"
              download="Ahmed_Raza_CV.pdf"
              className="inline-flex items-center justify-center gap-2 font-extrabold text-[var(--color-secondary)] border-2 border-[var(--color-secondary)] text-base px-8 py-3 rounded-xl hover:bg-[rgba(0,206,201,0.05)] hover:shadow-[0_0_20px_rgba(0,206,201,0.15)] transition-all duration-300"
              data-cursor="pointer"
            >
              <FaDownload size={16} />
              Download CV
            </a>
          </motion.div>
        </motion.div>

        {/* Right Profile Image Column */}
        <AnimatedSection direction="right" delay={0.3} className="w-full lg:w-[40%] flex justify-center">
          <div className="relative">
            {/* Animated gradient ring */}
            <motion.div
              className="absolute -inset-3 rounded-full opacity-60"
              style={{
                background: 'conic-gradient(from 0deg, var(--color-primary), var(--color-secondary), var(--color-accent), var(--color-primary))',
                filter: 'blur(8px)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />

            {/* Dashed orbit ring */}
            <motion.div
              className="absolute -inset-6 rounded-full border-2 border-dashed"
              style={{ borderColor: 'rgba(0, 206, 201, 0.25)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            />

            {/* Image container */}
            <motion.div
              className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full p-1 overflow-hidden"
              style={{
                border: '2px solid var(--color-secondary)',
                backgroundColor: 'rgba(0, 206, 201, 0.03)',
              }}
              whileHover={{ scale: 1.04, rotate: 3 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              animate={{
                boxShadow: [
                  '0 0 30px rgba(0, 206, 201, 0.25)',
                  '0 0 50px rgba(108, 92, 231, 0.3)',
                  '0 0 30px rgba(0, 206, 201, 0.25)',
                ],
              }}
            >
              <img
                src="https://github.com/razakhan83.png"
                alt="Ahmed Raza — MERN Stack Developer"
                className="w-full h-full rounded-full object-cover"
                style={{ backgroundColor: 'var(--bg-surface-light)' }}
                onError={(e) => {
                  e.target.src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
                }}
              />
            </motion.div>

            {/* Floating tech badges */}
            <motion.div
              className="absolute -top-2 -right-4 glass-card rounded-xl px-3 py-1.5 text-xs font-bold"
              style={{ color: 'var(--color-secondary)' }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              React 19
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -left-4 glass-card rounded-xl px-3 py-1.5 text-xs font-bold"
              style={{ color: 'var(--color-accent)' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              Node.js
            </motion.div>

            <motion.div
              className="absolute top-1/2 -right-8 glass-card rounded-xl px-3 py-1.5 text-xs font-bold"
              style={{ color: 'var(--color-primary)' }}
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              MongoDB
            </motion.div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
