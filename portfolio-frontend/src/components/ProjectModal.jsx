import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiX,
  FiExternalLink,
  FiGithub,
  FiCheckCircle,
  FiTarget,
  FiCpu,
  FiTrendingUp,
  FiLayers
} from 'react-icons/fi';

export default function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
      >
        {/* Frosted Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'var(--modal-backdrop, rgba(0, 0, 0, 0.5))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)'
          }}
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel"
          style={{
            position: 'relative',
            zIndex: 1001,
            width: '100%',
            maxWidth: '850px',
            maxHeight: '88vh',
            overflowY: 'auto',
            padding: '2.5rem',
            background: 'var(--bg-secondary)',
            borderColor: 'var(--glass-border-hover)'
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close project modal"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
              zIndex: 10
            }}
          >
            <FiX size={20} />
          </button>

          {/* Header */}
          <div style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
              <span className="badge">
                <FiLayers size={13} />
                {project.category}
              </span>
            </div>

            <h2
              id="modal-project-title"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}
            >
              {project.title}
            </h2>
          </div>

          {/* Gallery / Image Showcase */}
          {project.images && project.images.length > 0 && (
            <div
              style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem',
                background: 'var(--bg-primary)'
              }}
            >
              <img
                src={project.images[0]}
                alt={`${project.title} dashboard overview`}
                style={{
                  width: '100%',
                  maxHeight: '400px',
                  objectFit: 'contain',
                  display: 'block'
                }}
              />
            </div>
          )}

          {/* Full Description */}
          <div style={{ marginBottom: '2rem' }}>
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)'
              }}
            >
              {project.fullDescription || project.shortDescription}
            </p>
          </div>

          {/* Problem Statement & Approach Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1.5rem',
              marginBottom: '2rem'
            }}
            className="modal-subgrid"
          >
            {/* Problem Statement */}
            <div
              style={{
                padding: '1.4rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--badge-bg)',
                border: '1px solid var(--glass-border)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.6rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                <FiTarget size={17} />
                <span>Problem Statement</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {project.problemStatement || 'Data fragmentation and reporting delays hindered tactical decision making.'}
              </p>
            </div>

            {/* Approach */}
            <div
              style={{
                padding: '1.4rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--badge-bg)',
                border: '1px solid var(--glass-border)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.6rem',
                  color: 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.95rem'
                }}
              >
                <FiCpu size={17} />
                <span>Analytical Approach</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                {project.approach || 'Formulated star-schema modeling, automated transformations, and statistical correlation scoring.'}
              </p>
            </div>
          </div>

          {/* Key Insights & Measurable Results */}
          {project.insights && project.insights.length > 0 && (
            <div
              style={{
                padding: '1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                marginBottom: '2rem'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '1rem',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  fontSize: '1rem'
                }}
              >
                <FiTrendingUp size={18} />
                <span>Key Insights & Business Outcomes</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {project.insights.map((insight, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      fontSize: '0.92rem',
                      lineHeight: 1.6,
                      color: 'var(--text-secondary)'
                    }}
                  >
                    <span style={{ color: 'var(--text-primary)', marginTop: '3px' }}>
                      <FiCheckCircle size={16} />
                    </span>
                    <span>{insight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tools & Tech Chips */}
          <div style={{ marginBottom: '2rem' }}>
            <h4
              style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--text-muted)',
                marginBottom: '0.75rem'
              }}
            >
              Technologies & Tools Applied
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {(project.toolsUsed || project.techStack)?.map((tool, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.8rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)'
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* External Links Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              paddingTop: '1.25rem',
              borderTop: '1px solid var(--glass-border)'
            }}
          >
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FiExternalLink size={16} />
                <span>Launch Live Project</span>
              </a>
            )}

            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FiGithub size={16} />
                <span>View Source Code</span>
              </a>
            )}

            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ marginLeft: 'auto' }}
            >
              Close
            </button>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .modal-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
}
