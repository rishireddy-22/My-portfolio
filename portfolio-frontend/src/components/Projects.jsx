import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import SectionTitle from './SectionTitle';

export default function Projects({ projectsList = [] }) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Power BI', 'Python', 'Tableau', 'SQL', 'Excel'];

  const filteredProjects = projectsList.filter((proj) => {
    if (activeFilter === 'All') return true;
    const filterLower = activeFilter.toLowerCase();
    const categoryMatches = proj.category?.toLowerCase() === filterLower;
    const techMatches = proj.techStack?.some(tech => tech.toLowerCase().includes(filterLower));
    return categoryMatches || techMatches;
  });

  return (
    <section id="projects" className="section">
      <div className="container">
        <SectionTitle
          badge="Featured Work"
          title="Analytics Projects & Case Studies"
          subtitle="Real-world demonstrations of business intelligence dashboards, exploratory ML modeling, and SQL database tuning."
        />

        {/* Category Filters Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.65rem',
            marginBottom: '3rem'
          }}
        >
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  position: 'relative',
                  padding: '0.55rem 1.25rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--button-primary-text)' : 'var(--text-secondary)',
                  background: isActive ? 'var(--button-primary-bg)' : 'var(--glass-bg)',
                  border: `1px solid ${isActive ? 'var(--button-primary-bg)' : 'var(--glass-border)'}`,
                  backdropFilter: 'var(--glass-blur)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
              >
                <ProjectCard
                  project={project}
                  onOpenDetails={(p) => setSelectedProject(p)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div
            style={{
              textAlign: 'center',
              padding: '3rem',
              color: 'var(--text-tertiary)',
              fontSize: '1rem'
            }}
          >
            No projects found in this category yet.
          </div>
        )}

        {/* Project Details Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={Boolean(selectedProject)}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
