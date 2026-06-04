import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaDiscord, FaEnvelope, FaDownload, FaArrowRight } from 'react-icons/fa6';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

const ROLES = [
  'MERN Stack Developer',
  'Next.js Engineer',
  'Full-Stack Architect',
  'UI/UX Enthusiast',
];

const SOCIAL_LINKS = [
  { icon: FaGithub,     label: 'GitHub',   href: 'https://github.com/razakhan83',                  color: '#7c6af0' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com/in/ahmed-raza-abc786',     color: '#0077b5' },
  { icon: FaDiscord,    label: 'Discord',  href: 'https://discord.com',                             color: '#5865f2' },
  { icon: FaEnvelope,   label: 'Email',    href: 'mailto:raza.mern.dev@gmail.com',                  color: '#f472b6' },
];

const FLOAT_BADGES = [
  { text: 'React 19',  pos: 'top-1 right-6',          color: 'var(--teal)',   delay: 0 },
  { text: 'Node.js',   pos: 'bottom-2 left-6',         color: 'var(--rose)',   delay: 0.6 },
  { text: 'MongoDB',   pos: 'top-1/2 -right-2 -translate-y-1/2', color: 'var(--violet)', delay: 1.1 },
];

export default function HeroSection() {
  const [roleIdx, setRoleIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 3000);
    return () => clearInterval(id);
  }, []);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section
      id="about"
      className="section-container relative flex items-center min-h-[95svh]"
      style={{ paddingTop: 'clamp(6rem,13vw,9rem)', paddingBottom: 'clamp(3.5rem,7vw,5rem)' }}
    >
      <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start justify-between gap-16 lg:gap-12 w-full">

        {/* ── Left column ────────────────────── */}
        <motion.div
          className="w-full lg:w-[56%] flex flex-col items-center lg:items-start text-center lg:text-left"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting label */}
          <motion.div variants={staggerItem}>
            <span className="section-label">
              <span style={{ width: 20, height: 1.5, background: 'var(--teal)', display: 'inline-block', borderRadius: 2 }} />
              Hello World
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={staggerItem}
            className="display-font"
            style={{
              fontSize: 'var(--text-hero)',
              fontWeight: 800,
              letterSpacing: '-0.032em',
              lineHeight: 1.05,
              color: 'var(--text-hi)',
            }}
          >
            Ahmed{' '}
            <span className="accent">Raza</span>
          </motion.h1>

          {/* Role rotator */}
          <motion.div
            variants={staggerItem}
            className="mt-3 overflow-hidden"
            style={{ height: 'clamp(1.6rem,3.5vw,2.2rem)' }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIdx}
                initial={{ y: 32, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{ y: -32,   opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="display-font font-semibold"
                style={{ fontSize: 'var(--text-xl)', color: 'var(--text-md)' }}
              >
                {ROLES[roleIdx]}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={staggerItem}
            className="section-desc"
            style={{ marginTop: 'var(--sp-5)', textAlign: 'inherit', maxWidth: '50ch' }}
          >
            Crafting premium full-stack web applications and fluid interactive
            experiences. Specializing in high-performance React, robust Node.js
            APIs, and elegant cloud-native solutions.
          </motion.p>

          {/* Social icons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-wrap gap-2 justify-center lg:justify-start"
            style={{ marginTop: 'var(--sp-6)' }}
          >
            {SOCIAL_LINKS.map(({ icon: Icon, label, href, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="surface btn-icon"
                style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}
                whileHover={{ y: -3, borderColor: color, backgroundColor: `${color}15` }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.16 }}
              >
                <Icon size={16} style={{ color }} />
              </motion.a>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            variants={staggerItem}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center lg:justify-start"
            style={{ marginTop: 'var(--sp-8)' }}
          >
            <motion.button
              className="btn btn-solid btn-lg w-full sm:w-auto"
              onClick={() => scrollTo('contact')}
              data-cursor="pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              Let's Build Together
              <FaArrowRight size={13} />
            </motion.button>

            <motion.a
              href="/ahmed_raza_cv.pdf"
              download="Ahmed_Raza_CV.pdf"
              className="btn btn-outline btn-lg w-full sm:w-auto"
              data-cursor="pointer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
            >
              <FaDownload size={13} />
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>

        {/* ── Right column — profile image ─── */}
        <AnimatedSection
          direction="right"
          delay={0.25}
          className="w-full lg:w-[40%] flex justify-center"
        >
          <div className="relative" style={{ padding: 'clamp(2.5rem,6vw,3.5rem)' }}>

            {/* Spinning gradient halo */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: 'clamp(2.5rem,6vw,3.5rem)',
                margin: -14,
                background: 'conic-gradient(from 0deg, var(--violet), var(--teal), var(--rose), var(--violet))',
                filter: 'blur(10px)',
                opacity: 0.55,
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
            />

            {/* Dashed orbit */}
            <motion.div
              className="absolute rounded-full"
              style={{
                inset: 'clamp(1rem,3vw,1.5rem)',
                border: '1.5px dashed rgba(45,212,191,0.22)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            />

            {/* Avatar */}
            <motion.div
              className="relative rounded-full overflow-hidden"
              style={{
                width:  'clamp(168px,35vw,288px)',
                height: 'clamp(168px,35vw,288px)',
                border: '2px solid var(--teal)',
                background: 'var(--bg-surface)',
              }}
              whileHover={{ scale: 1.04, rotate: 2 }}
              transition={{ type: 'spring', stiffness: 180, damping: 16 }}
              animate={{
                boxShadow: [
                  '0 0 24px rgba(45,212,191,0.22)',
                  '0 0 44px rgba(124,106,240,0.28)',
                  '0 0 24px rgba(45,212,191,0.22)',
                ],
              }}
            >
              <img
                src="https://github.com/razakhan83.png"
                alt="Ahmed Raza — MERN Stack Developer"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80';
                }}
              />
            </motion.div>

            {/* Floating tech badges */}
            {FLOAT_BADGES.map(({ text, pos, color, delay }) => (
              <motion.div
                key={text}
                className={`absolute surface ${pos}`}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  fontFamily: 'var(--font-display)',
                  color,
                  zIndex: 10,
                }}
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
              >
                {text}
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
