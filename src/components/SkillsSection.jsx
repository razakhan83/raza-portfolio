import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

const SKILLS = [
  { name: 'React & Frontend',     percent: 95, color: 'var(--violet)' },
  { name: 'Node.js & APIs',       percent: 90, color: 'var(--teal)' },
  { name: 'Express & Middleware', percent: 85, color: 'var(--rose)' },
  { name: 'MongoDB & Databases',  percent: 80, color: '#34d399' },
  { name: 'Next.js & SSR/SSG',    percent: 88, color: '#a78bfa' },
  { name: 'TypeScript',           percent: 82, color: '#60a5fa' },
];

const TECH = [
  'Redux Toolkit', 'RESTful APIs', 'GraphQL', 'Next.js',
  'Firebase', 'Git / GitHub', 'Tailwind CSS', 'Docker',
  'Socket.io', 'JWT Auth', 'Prisma', 'PostgreSQL',
];

function CountUp({ target, active, delay }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => {
      const dur = 1400;
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delay * 1000 + 150);
    return () => clearTimeout(t);
  }, [active, target, delay]);
  return `${val}%`;
}

function SkillBar({ name, percent, color, delay }) {
  const ref = useRef(null);
  const active = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 110, damping: 18, delay }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}
    >
      {/* Label row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          className="display-font"
          style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-hi)' }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: 'var(--text-xs)', fontWeight: 700,
            fontFamily: 'var(--font-display)',
            fontVariantNumeric: 'tabular-nums', color,
          }}
        >
          {active ? <CountUp target={percent} active={active} delay={delay} /> : '0%'}
        </span>
      </div>

      {/* Track */}
      <div
        style={{
          height: 5, width: '100%', borderRadius: 99,
          backgroundColor: 'var(--bg-raised)',
          overflow: 'hidden',
        }}
      >
        <motion.div
          style={{ height: '100%', borderRadius: 99, backgroundColor: color }}
          initial={{ width: 0 }}
          animate={active ? { width: `${percent}%` } : { width: 0 }}
          transition={{ type: 'spring', stiffness: 42, damping: 14, delay: delay + 0.18 }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="section-container"
      style={{ paddingTop: 'var(--sec-loose)', paddingBottom: 'var(--sec-tight)' }}
    >
      {/* Header */}
      <AnimatedSection>
        <div className="section-header">
          <span className="section-label">
            <span style={{ width: 20, height: 1.5, background: 'var(--teal)', display: 'inline-block', borderRadius: 2 }} />
            What I Know
          </span>
          <h2 className="section-title">
            Expertise &amp; <span className="grad">Skills</span>
          </h2>
          <p className="section-desc">
            Core tools and technologies powering my full-stack applications
          </p>
        </div>
      </AnimatedSection>

      {/* Skill bars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,360px),1fr))',
          gap: 'clamp(1.25rem,3vw,2rem) clamp(2rem,5vw,4rem)',
          marginBottom: 'clamp(2.5rem,5vw,3.5rem)',
        }}
      >
        {SKILLS.map((s, i) => (
          <SkillBar key={s.name} {...s} delay={i * 0.07} />
        ))}
      </div>

      {/* Tech tags */}
      <AnimatedSection delay={0.2}>
        <motion.div
          className="flex flex-wrap"
          style={{ gap: 'var(--sp-2)' }}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {TECH.map(t => (
            <motion.span key={t} variants={staggerItem} className="tag">
              {t}
            </motion.span>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
