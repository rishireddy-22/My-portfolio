import React from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiGithub, FiInfo, FiLayers } from 'react-icons/fi';
import GlassCard from './GlassCard';

export default function ProjectCard({ project, onOpenDetails }) {
  return (
    <GlassCard
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden'
      }}
    >
      {/* Thumbnail with glossy sheen container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '210px',
          overflow: 'hidden',
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--glass-border)'
        }}
      >
        <img
          src={project.thumbnailUrl}
          alt={project.title}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          className="project-thumb-img"
        />

        {/* Category Pill Badge */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            zIndex: 3
          }}
        >
          <span
            className="badge"
            style={{
              background: 'var(--bg-primary)',
              backdropFilter: 'blur(8px)',
              borderColor: 'var(--glass-border)'
            }}
          >
            <FiLayers size={12} />
            {project.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div
        style={{
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1
        }}
      >
        <h3
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.65rem',
            lineHeight: 1.3
          }}
        >
          {project.title}
        </h3>

        <p
          style={{
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.25rem',
            flexGrow: 1
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tech Stack Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginBottom: '1.5rem'
          }}
        >
          {project.techStack?.map((tech, idx) => (
            <span
              key={idx}
              style={{
                fontSize: '0.75rem',
                padding: '0.25rem 0.6rem',
                borderRadius: '6px',
                background: 'var(--badge-bg)',
                color: 'var(--text-secondary)',
                border: '1px solid var(--glass-border)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginTop: 'auto',
            paddingTop: '1rem',
            borderTop: '1px solid var(--glass-border)'
          }}
        >
          <button
            onClick={() => onOpenDetails(project)}
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
          >
            <FiInfo size={15} />
            <span>Details</span>
          </button>

          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
              title="Live Demo"
              aria-label="Live Demo"
            >
              <FiExternalLink size={15} />
            </a>
          )}

          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ padding: '0.6rem 0.8rem', fontSize: '0.85rem' }}
              title="GitHub Code Repository"
              aria-label="GitHub Code Repository"
            >
              <FiGithub size={15} />
            </a>
          )}
        </div>
      </div>

      <style>{`
        .glass-panel:hover .project-thumb-img {
          transform: scale(1.04);
        }
      `}</style>
    </GlassCard>
  );
}
