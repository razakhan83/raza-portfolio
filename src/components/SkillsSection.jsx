import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Card, Chip } from '@heroui/react';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';

const SKILLS = [
  { name: 'React & Frontend Architectures', percent: 95, color: 'var(--color-primary)' },
  { name: 'Node.js & Backend APIs', percent: 90, color: 'var(--color-secondary)' },
  { name: 'Express.js & Middleware', percent: 85, color: 'var(--color-accent)' },
  { name: 'MongoDB & Database Design', percent: 80, color: '#00b894' },
  { name: 'Next.js & SSR/SSG', percent: 88, color: '#a29bfe' },
  { name: 'TypeScript', percent: 82, color: '#3178c6' },
];

const TECH_CHIPS = [
  'Redux Toolkit', 'RESTful APIs', 'GraphQL', 'Next.js',
  'Firebase', 'Git / GitHub', 'TailwindCSS', 'Docker',
  'Socket.io', 'JWT Auth', 'Prisma', 'PostgreSQL',
];

function CountUpNumber({ target, isInView, delay }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const duration = 1500;
      const startTime = performance.now();

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }, delay * 1000 + 200);

    return () => clearTimeout(timeout);
  }, [isInView, target, delay]);

  return `${count}%`;
}

function SkillBar({ name, percent, color, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className="flex flex-col gap-2"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ type: 'spring', stiffness: 120, damping: 18, delay }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold text-white">{name}</span>
        <span className="text-sm font-bold tabular-nums" style={{ color }}>
          {isInView ? <CountUpNumber target={percent} isInView={isInView} delay={delay} /> : '0%'}
        </span>
      </div>

      <div
        className="h-2 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-surface-light)' }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percent}%` } : { width: 0 }}
          transition={{
            type: 'spring',
            stiffness: 50,
            damping: 15,
            mass: 1,
            delay: delay + 0.2,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section-container py-20 lg:py-28">
      <AnimatedSection>
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Expertise & <span className="gradient-text">Skills</span>
        </h2>
        <p className="mt-2 mb-12 text-base" style={{ color: 'var(--color-text-muted)' }}>
          Core tools and languages powering my full-stack applications
        </p>
      </AnimatedSection>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        {SKILLS.map((skill, i) => (
          <AnimatedSection key={skill.name} delay={i * 0.06}>
            <Card className="glass-card p-5">
              <SkillBar
                name={skill.name}
                percent={skill.percent}
                color={skill.color}
                delay={i * 0.08}
              />
            </Card>
          </AnimatedSection>
        ))}
      </div>

      {/* Tech Chips */}
      <AnimatedSection delay={0.3}>
        <motion.div
          className="flex flex-wrap gap-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {TECH_CHIPS.map((tech) => (
            <motion.div key={tech} variants={staggerItem}>
              <Chip
                className="border-[var(--border-subtle)] text-[var(--color-text-secondary)] bg-transparent hover:border-[var(--color-secondary)] hover:text-[var(--color-secondary)] hover:bg-[rgba(0,206,201,0.04)] transition-all duration-300 px-3 py-1 rounded-lg text-sm"
                data-cursor="pointer"
              >
                {tech}
              </Chip>
            </motion.div>
          ))}
        </motion.div>
      </AnimatedSection>
    </section>
  );
}
