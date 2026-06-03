import { Modal, Button, Chip } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowUpRightFromSquare, FaGithub } from 'react-icons/fa6';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <Modal open={!!project} onOpenChange={(details) => { if (!details.open) onClose(); }}>
      <Modal.Backdrop
        className="fixed inset-0 z-[99990] bg-[var(--bg-primary)]/70 backdrop-blur-xl"
      />
      <Modal.Container className="fixed inset-0 z-[99991] flex items-center justify-center p-4">
        <Modal.Dialog
          className="glass-card border-[var(--border-glow)] bg-[var(--bg-surface)]/95 text-white rounded-2xl w-full max-w-[680px] max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/40 mx-0 sm:mx-4"
        >
          <Modal.CloseTrigger
            className="absolute top-3 right-3 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-[rgba(7,8,14,0.6)] border border-[var(--border-subtle)] text-white text-xl hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] hover:rotate-90 transition-all duration-300"
          >
            ×
          </Modal.CloseTrigger>

          {/* Hero Image */}
          <div className="relative w-full h-48 sm:h-64 overflow-hidden rounded-t-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
          </div>

          <Modal.Header className="px-6 pt-4 pb-0">
            <div className="flex items-center justify-between w-full">
              <Modal.Heading
                className="text-2xl font-extrabold text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {project.title}
              </Modal.Heading>
              <Chip
                size="sm"
                className="border border-[rgba(0,206,201,0.3)] text-[var(--color-secondary)] bg-[rgba(0,206,201,0.06)] font-bold text-xs px-2 py-0.5 rounded-md"
              >
                {project.badge}
              </Chip>
            </div>
          </Modal.Header>

          <Modal.Body className="px-6 py-4">
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--color-text-muted)' }}
            >
              {project.longDesc}
            </p>

            {/* Tech Stack Chips */}
            <div className="flex flex-wrap gap-2 mt-5 pb-4 border-b border-[var(--border-subtle)]">
              {project.tech.split(', ').map((tech) => (
                <Chip
                  key={tech}
                  size="sm"
                  className="border border-[var(--border-subtle)] text-[var(--color-text-secondary)] font-medium text-xs px-2 py-0.5 rounded-md"
                >
                  {tech}
                </Chip>
              ))}
            </div>
          </Modal.Body>

          <Modal.Footer className="px-4 sm:px-6 pb-5 sm:pb-6 pt-4 flex flex-col sm:flex-row gap-3 border-t border-[var(--border-subtle)]">
            <Button
              as="a"
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-bold text-[var(--bg-primary)] bg-[var(--color-secondary)] rounded-lg inline-flex items-center justify-center gap-2"
            >
              <FaArrowUpRightFromSquare size={14} />
              Live Project
            </Button>
            <Button
              as="a"
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto font-bold text-white bg-[var(--bg-surface-light)] border border-[var(--border-subtle)] hover:border-[var(--color-primary)] rounded-lg inline-flex items-center justify-center gap-2"
            >
              <FaGithub size={16} />
              GitHub Code
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal.Container>
    </Modal>
  );
}
