import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';
import ProjectModal from './ProjectModal';

const PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    tech: 'React, Node.js, Express, MongoDB, Redux',
    desc: 'Full-stack marketplace with Stripe payment integration, admin dashboard, and dynamic product filtering.',
    longDesc: 'A premium full-stack e-commerce experience for modern online retailers. Redux Toolkit state management, secure Stripe checkout, real-time product search, and dynamic category filtering.',
    badge: 'MERN Stack',
    badgeColor: 'var(--violet)',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=600&q=80',
    liveLink: 'https://github.com/razakhan83',
    githubLink: 'https://github.com/razakhan83',
  },
  {
    id: '2',
    title: 'BillZip',
    tech: 'React, Node.js, Express, MongoDB, JWT Auth',
    desc: 'Client onboarding platform with JWT authentication, multi-step forms, and real-time case tracking.',
    longDesc: 'Professional client onboarding and gateway case handling platform. Streamlined multi-step form workflow, JWT authentication, role-based access control, real-time socket updates, and analytics dashboards.',
    badge: 'Full-Stack',
    badgeColor: 'var(--teal)',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=600&q=80',
    liveLink: 'https://github.com/razakhan83',
    githubLink: 'https://github.com/razakhan83',
  },
  {
    id: '3',
    title: 'Developer Portfolio',
    tech: 'React 19, Tailwind CSS 4, Framer Motion',
    desc: 'This portfolio — a premium developer showcase with spring-physics animations and custom cursor.',
    longDesc: 'Cutting-edge portfolio with custom cursor spring physics, scroll-triggered reveal animations, glassmorphic design elements, and fully responsive layouts built with React 19.',
    badge: 'React 19',
    badgeColor: 'var(--rose)',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600&q=80',
    liveLink: 'https://github.com/razakhan83',
    githubLink: 'https://github.com/razakhan83',
  },
];

function ProjectCard({ project, onSelect }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = e => {
    const r = e.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 14,
      y: ((e.clientY - r.top) / r.height - 0.5) * -14,
    });
  };

  return (
    <motion.div
      variants={staggerItem}
      style={{ perspective: 1000 }}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      data-cursor="pointer"
    >
      <motion.div
        animate={{ rotateY: tilt.x * 0.45, rotateX: tilt.y * 0.45 }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
        onClick={() => onSelect(project)}
        className="surface"
        style={{
          overflow: 'hidden', cursor: 'pointer',
          transition: 'border-color 0.22s',
          position: 'relative',
        }}
        whileHover={{ borderColor: project.badgeColor + '44' }}
      >
        {/* Thumbnail */}
        <div style={{ position: 'relative', width: '100%', height: 192, overflow: 'hidden' }}>
          <motion.img
            src={project.image}
            alt={project.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            whileHover={{ scale: 1.07 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Dark fade */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 55%)',
          }} />
          {/* Badge */}
          <span
            className="display-font"
            style={{
              position: 'absolute', top: 12, right: 12,
              fontSize: 'var(--text-xs)', fontWeight: 700,
              padding: '0.2rem 0.65rem',
              borderRadius: 'var(--radius-sm)',
              background: `${project.badgeColor}22`,
              border: `1px solid ${project.badgeColor}44`,
              color: project.badgeColor,
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.badge}
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: 'var(--sp-5) var(--sp-5) var(--sp-6)' }}>
          <h3
            className="display-font"
            style={{
              fontSize: 'var(--text-lg)', fontWeight: 700,
              color: 'var(--text-hi)', letterSpacing: '-0.015em',
              marginBottom: 'var(--sp-2)',
              transition: 'color 0.18s',
            }}
          >
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 'var(--text-sm)', lineHeight: 1.75,
              color: 'var(--text-lo)',
              marginBottom: 'var(--sp-4)',
            }}
          >
            {project.desc}
          </p>
          <p
            className="display-font"
            style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: project.badgeColor, opacity: 0.85 }}
          >
            {project.tech}
          </p>
        </div>

        {/* Hover radial glow */}
        <motion.div
          style={{
            position: 'absolute', inset: 0, borderRadius: 'inherit',
            pointerEvents: 'none',
            background: `radial-gradient(circle at top right, ${project.badgeColor}0d, transparent 65%)`,
            opacity: 0, transition: 'opacity 0.28s',
          }}
          whileHover={{ opacity: 1 }}
        />
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selected, setSelected] = useState(null);

  return (
    <section
      id="projects"
      className="section-container"
      style={{ paddingTop: 'var(--sec-tight)', paddingBottom: 'var(--sec-loose)' }}
    >
      <AnimatedSection>
        <div className="section-header">
          <span className="section-label">
            <span style={{ width: 20, height: 1.5, background: 'var(--teal)', display: 'inline-block', borderRadius: 2 }} />
            My Work
          </span>
          <h2 className="section-title">
            Featured <span className="grad">Projects</span>
          </h2>
          <p className="section-desc">
            Clean architectures and functional responsive web applications
          </p>
        </div>
      </AnimatedSection>

      <motion.div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%,300px),1fr))',
          gap: 'clamp(1rem,2.5vw,1.5rem)',
        }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {PROJECTS.map(p => (
          <ProjectCard key={p.id} project={p} onSelect={setSelected} />
        ))}
      </motion.div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
