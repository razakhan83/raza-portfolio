import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub, FaXmark } from 'react-icons/fa6';

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9990,
              background: 'rgba(7,8,15,0.75)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          />

          {/* Dialog */}
          <motion.div
            key="dialog"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
            className="surface"
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9991,
              width: '100%',
              maxWidth: 'min(660px, calc(100vw - 2rem))',
              maxHeight: 'min(88vh, 700px)',
              overflowY: 'auto',
              borderRadius: 'var(--radius-xl)',
              boxShadow: '0 32px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="btn btn-ghost btn-icon"
              aria-label="Close"
              style={{
                position: 'absolute', top: 12, right: 12,
                zIndex: 10, width: 34, height: 34, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid var(--border)',
                color: 'var(--text-lo)',
              }}
            >
              <FaXmark size={14} />
            </button>

            {/* Hero image */}
            <div style={{ width: '100%', height: 'clamp(160px,28vw,240px)', overflow: 'hidden', borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0' }}>
              <img
                src={project.image}
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            </div>

            {/* Content */}
            <div style={{ padding: 'var(--sp-6)', paddingTop: 'var(--sp-5)' }}>
              {/* Title + badge */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--sp-3)', marginBottom: 'var(--sp-4)' }}>
                <h2
                  className="display-font"
                  style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, letterSpacing: '-0.022em', color: 'var(--text-hi)', lineHeight: 1.2 }}
                >
                  {project.title}
                </h2>
                <span
                  className="display-font"
                  style={{
                    flexShrink: 0,
                    fontSize: 'var(--text-xs)', fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-sm)',
                    background: `${project.badgeColor ?? 'var(--teal)'}1a`,
                    border: `1px solid ${project.badgeColor ?? 'var(--teal)'}44`,
                    color: project.badgeColor ?? 'var(--teal)',
                  }}
                >
                  {project.badge}
                </span>
              </div>

              {/* Description */}
              <p style={{ fontSize: 'var(--text-base)', lineHeight: 1.8, color: 'var(--text-lo)', marginBottom: 'var(--sp-5)' }}>
                {project.longDesc}
              </p>

              {/* Tech tags */}
              <div
                style={{
                  display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-2)',
                  paddingBottom: 'var(--sp-5)',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: 'var(--sp-5)',
                }}
              >
                {project.tech.split(', ').map(t => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: 'flex', flexWrap: 'wrap',
                  gap: 'var(--sp-3)',
                }}
              >
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-teal"
                  style={{ flex: '1 1 140px', justifyContent: 'center' }}
                >
                  <FaArrowUpRightFromSquare size={12} />
                  Live Demo
                </a>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                  style={{ flex: '1 1 140px', justifyContent: 'center' }}
                >
                  <FaGithub size={14} />
                  View Code
                </a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
