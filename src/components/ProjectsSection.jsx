import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Chip } from '@heroui/react';
import AnimatedSection, { staggerContainer, staggerItem } from './AnimatedSection';
import ProjectModal from './ProjectModal';

const PROJECTS = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    tech: 'React, Node.js, Express, MongoDB, Redux',
    desc: 'A complete full-stack e-commerce marketplace featuring secure Stripe gateway integration, interactive admin dashboard, and dynamic product filtering.',
    longDesc:
      'A premium full-stack e-commerce experience designed for modern online retailers. Built with high-performance React architectures, Redux Toolkit state management, and a robust Node.js backend. Features secure payment checkout via Stripe SDK, full administrative product management panels, real-time product search matching, and dynamic category filtering.',
    badge: 'MERN Stack',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1d704d3?auto=format&fit=crop&w=600&q=80',
    liveLink: 'https://github.com/razakhan83',
    githubLink: 'https://github.com/razakhan83',
  },
  {
    id: '2',
    title: 'BillZip',
    tech: 'React, Node.js, Express, MongoDB, JWT Auth',
    desc: 'Client onboarding and gateway case handling application with secure authentication, dynamic form workflows, and real-time status tracking.',
    longDesc:
      'BillZip is a professional client onboarding and gateway case handling platform. Features a streamlined multi-step form workflow for new client registration, JWT-based authentication, role-based access control for admin/agent panels, real-time case status tracking with socket updates, and comprehensive dashboard analytics for case throughput metrics.',
    badge: 'Full-Stack App',
    image: 'https://images.unsplash.com/photo-1611224885990-ab7363d1f2a9?auto=format&fit=crop&w=600&q=80',
    liveLink: 'https://github.com/razakhan83',
    githubLink: 'https://github.com/razakhan83',
  },
  {
    id: '3',
    title: 'Professional Portfolio',
    tech: 'React 19, Tailwind CSS 4, HeroUI, Framer Motion',
    desc: 'This very portfolio — a premium immersive developer showcase with spring-physics animations, custom cursor, and HeroUI component architecture.',
    longDesc:
      'A cutting-edge developer portfolio showcasing technical mastery through its own implementation. Features ultra-smooth custom cursor with Framer Motion springs, scroll-triggered reveal animations with spring physics, HeroUI component ecosystem integration, Tailwind CSS 4 styling, responsive design, and glassmorphic UI elements.',
    badge: 'React 19',
    image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=600&q=80',
    liveLink: 'https://github.com/razakhan83',
    githubLink: 'https://github.com/razakhan83',
  },
];

function ProjectCard({ project, onSelect }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width - 0.5) * 20,
      y: ((e.clientY - rect.top) / rect.height - 0.5) * -20,
    });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <motion.div
      variants={staggerItem}
      className="project-card-wrapper"
      data-cursor="pointer"
      data-cursor-label="View"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        animate={{
          rotateY: mousePos.x * 0.5,
          rotateX: mousePos.y * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <Card
          className="glass-card border-[var(--border-glow)] bg-[var(--bg-surface)]/70 overflow-hidden group cursor-pointer"
          onClick={() => onSelect(project)}
        >
          {/* Image */}
          <div className="relative w-full h-48 overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent opacity-60" />

            {/* Badge overlay */}
            <div className="absolute top-3 right-3">
              <Chip
                size="sm"
                className="bg-[rgba(108,92,231,0.25)] text-[var(--color-text-secondary)] backdrop-blur-md font-bold text-xs px-2 py-0.5 rounded-md"
              >
                {project.badge}
              </Chip>
            </div>
          </div>

          <div className="p-5">
            <h3
              className="text-lg font-extrabold text-white mb-2 group-hover:text-[var(--color-secondary)] transition-colors duration-300"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              {project.title}
            </h3>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {project.desc}
            </p>
            <p
              className="text-xs font-semibold"
              style={{ color: 'var(--color-secondary)' }}
            >
              {project.tech}
            </p>
          </div>

          {/* Hover gradient overlay */}
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background: 'radial-gradient(circle at top right, rgba(108, 92, 231, 0.08), transparent 60%)',
            }}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="section-container py-20 lg:py-28">
      <AnimatedSection className="text-center sm:text-left">
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Featured <span className="gradient-text">Works</span>
        </h2>
        <p className="mt-2 mb-12 text-base" style={{ color: 'var(--color-text-muted)' }}>
          Clean architectures and functional responsive web applications
        </p>
      </AnimatedSection>

      {/* Projects Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onSelect={setSelectedProject}
          />
        ))}
      </motion.div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
