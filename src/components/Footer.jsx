import { motion } from 'framer-motion';
import { Separator } from '@heroui/react';
import { FaGithub, FaLinkedinIn, FaDiscord, FaEnvelope } from 'react-icons/fa6';
import AnimatedSection from './AnimatedSection';

const SOCIALS = [
  { icon: FaGithub, href: 'https://github.com/razakhan83', label: 'GitHub' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: FaDiscord, href: 'https://discord.com', label: 'Discord' },
  { icon: FaEnvelope, href: 'mailto:ahmedraza@example.com', label: 'Email' },
];

export default function Footer() {
  return (
    <AnimatedSection
      className="section-container pb-8 pt-16"
      delay={0.1}
    >
      <Separator className="bg-[var(--border-subtle)] mb-8 h-px" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Logo & Copyright */}
        <div className="flex items-center gap-3">
          <span
            className="text-xl font-black tracking-wider text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            AR
            <span
              className="inline-block w-1.5 h-1.5 rounded-full ml-0.5 align-super"
              style={{ backgroundColor: 'var(--color-secondary)' }}
            />
          </span>
          <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} Ahmed Raza. All rights reserved.
          </span>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors duration-300"
              style={{
                backgroundColor: 'var(--bg-surface-light)',
                border: '1px solid var(--border-subtle)',
              }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <Icon size={16} />
            </motion.a>
          ))}
        </div>
      </div>

      <p
        className="text-center text-xs mt-6"
        style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}
      >
        Designed & Built with React 19, HeroUI, Tailwind CSS 4 & Framer Motion
      </p>
    </AnimatedSection>
  );
}
