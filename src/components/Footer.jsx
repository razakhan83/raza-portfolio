import { motion } from 'framer-motion';
import { FaGithub, FaLinkedinIn, FaDiscord, FaEnvelope } from 'react-icons/fa6';
import AnimatedSection from './AnimatedSection';

const SOCIALS = [
  { icon: FaGithub,     href: 'https://github.com/razakhan83',       label: 'GitHub',   color: '#7c6af0' },
  { icon: FaLinkedinIn, href: 'https://linkedin.com',                  label: 'LinkedIn', color: '#0077b5' },
  { icon: FaDiscord,    href: 'https://discord.com',                   label: 'Discord',  color: '#5865f2' },
  { icon: FaEnvelope,   href: 'mailto:ahmedraza@example.com',           label: 'Email',    color: '#f472b6' },
];

export default function Footer() {
  return (
    <AnimatedSection delay={0.05}>
      <footer
        className="section-container"
        style={{ paddingTop: 'var(--sp-8)', paddingBottom: 'var(--sp-8)' }}
      >
        <div className="divider" style={{ marginBottom: 'var(--sp-8)' }} />

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--sp-5)',
          }}
        >
          {/* Logo + copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
            <span
              className="display-font"
              style={{ fontSize: 'var(--text-xl)', fontWeight: 800, color: 'var(--text-hi)', letterSpacing: '-0.02em' }}
            >
              AR
              <span
                style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '50%', background: 'var(--teal)', marginLeft: 2, marginBottom: 4, verticalAlign: 'middle' }}
              />
            </span>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-lo)' }}>
              © {new Date().getFullYear()} Ahmed Raza
            </span>
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-2)' }}>
            {SOCIALS.map(({ icon: Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="surface btn-icon"
                style={{
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                }}
                whileHover={{ y: -2, borderColor: color, backgroundColor: `${color}15` }}
                whileTap={{ scale: 0.93 }}
                transition={{ duration: 0.15 }}
              >
                <Icon size={14} style={{ color: 'var(--text-lo)' }} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Built-with line */}
        <p
          style={{
            textAlign: 'center',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-lo)',
            marginTop: 'var(--sp-6)',
            opacity: 0.55,
          }}
        >
          Built with React 19 · Framer Motion · Tailwind CSS 4
        </p>
      </footer>
    </AnimatedSection>
  );
}
