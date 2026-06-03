import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub, FaXmark } from 'react-icons/fa6';

export default function ProjectModal({ project, onClose }) {

  // Lock body scroll when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ──────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed', inset: 0, zIndex: 9990,
              background: 'rgba(7,8,15,0.8)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />

          {/* ── Scroll container ─────────────────── */}
          {/* Fills the screen, scrollable, backdrop-click closes */}
          <div
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9991,
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 'clamp(5rem, 10vw, 7rem)',   /* push below navbar */
            paddingBottom: 'clamp(1.5rem, 5vw, 3rem)',
            paddingLeft: 'clamp(0.75rem, 3vw, 1.5rem)',
            paddingRight: 'clamp(0.75rem, 3vw, 1.5rem)',
            }}
          >
            {/* ── Modal card ── */}
            <motion.div
              key="modal"
              role="dialog"
              aria-modal="true"
              aria-label={project.title}
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: 32,    scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 280, damping: 28, mass: 0.9 }}
              className="surface"
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 620,
                borderRadius: 'var(--radius-xl)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.55)',
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {/* ── Hero image ── */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(160px, 28vw, 230px)',
                overflow: 'hidden',
              }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-surface) 0%, transparent 55%)',
                }} />
              </div>

              {/* ── Close button ── absolute top-right, always visible */}
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  position: 'absolute', top: 12, right: 12,
                  zIndex: 20,
                  width: 32, height: 32,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  background: 'rgba(7,8,15,0.85)',
                  color: 'var(--text-md)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                  backdropFilter: 'blur(8px)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'var(--rose)';
                  e.currentTarget.style.borderColor = 'var(--rose)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(7,8,15,0.85)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = 'var(--text-md)';
                }}
              >
                <FaXmark size={13} />
              </button>

              {/* ── Content ── */}
              <div style={{ padding: 'clamp(1.25rem, 4vw, 1.75rem)' }}>

                {/* Title + badge */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginBottom: 'var(--sp-4)',
                  flexWrap: 'wrap',
                }}>
                  <h2
                    className="display-font"
                    style={{
                      fontSize: 'clamp(1.15rem, 3.5vw, 1.55rem)',
                      fontWeight: 800,
                      letterSpacing: '-0.022em',
                      color: 'var(--text-hi)',
                      lineHeight: 1.2,
                      flex: '1 1 180px',
                    }}
                  >
                    {project.title}
                  </h2>
                  <span
                    className="display-font"
                    style={{
                      flexShrink: 0,
                      fontSize: 'var(--text-xs)', fontWeight: 700,
                      padding: '0.25rem 0.7rem',
                      borderRadius: 'var(--radius-sm)',
                      background: `${project.badgeColor ?? 'var(--teal)'}1a`,
                      border: `1px solid ${project.badgeColor ?? 'var(--teal)'}44`,
                      color: project.badgeColor ?? 'var(--teal)',
                      whiteSpace: 'nowrap',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {project.badge}
                  </span>
                </div>

                {/* Long description */}
                <p style={{
                  fontSize: 'clamp(0.875rem, 2vw, 0.975rem)',
                  lineHeight: 1.8,
                  color: 'var(--text-lo)',
                  marginBottom: 'var(--sp-5)',
                }}>
                  {project.longDesc}
                </p>

                {/* Tech tags */}
                <div style={{
                  display: 'flex', flexWrap: 'wrap', gap: 8,
                  paddingBottom: 'var(--sp-5)',
                  borderBottom: '1px solid var(--border)',
                  marginBottom: 'var(--sp-5)',
                }}>
                  {project.tech.split(', ').map(t => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>

                {/* Action buttons — flex-wrap so they stack on narrow screens */}
                <div style={{
                  display: 'flex',
                  gap: 'var(--sp-3)',
                  flexWrap: 'wrap',
                }}>
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
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
