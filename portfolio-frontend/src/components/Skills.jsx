import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function Skills({ skillsData = [] }) {
  // Check if skillsData is grouped or flat list
  const categories = Array.isArray(skillsData) && skillsData[0]?.category && Array.isArray(skillsData[0]?.skills)
    ? skillsData
    : [
        {
          category: 'All Skills',
          skills: Array.isArray(skillsData) ? skillsData : []
        }
      ];

  return (
    <section id="skills" className="section">
      <div className="container">
        <SectionTitle
          badge="Core Competencies"
          title="Technical Stack & Expertise"
          subtitle="Proficiencies across query optimization, data transformation libraries, BI suites, and analytical frameworks."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: '2rem'
          }}
          className="skills-grid"
        >
          {categories.map((group, groupIndex) => (
            <GlassCard
              key={group.category || groupIndex}
              style={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem'
              }}
            >
              {/* Category Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--glass-border)',
                  paddingBottom: '1rem'
                }}
              >
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.02em'
                  }}
                >
                  {group.category}
                </h3>
                <span className="badge" style={{ fontSize: '0.75rem' }}>
                  {group.skills?.length} Tools
                </span>
              </div>

              {/* Skills in Category */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
                {group.skills?.map((skill, skillIndex) => (
                  <div key={skill.id || skill.name || skillIndex}>
                    {/* Skill Name & Level */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'baseline',
                        marginBottom: '0.45rem'
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: 'var(--text-primary)'
                          }}
                        >
                          {skill.name}
                        </span>
                        {skill.note && (
                          <span
                            style={{
                              display: 'block',
                              fontSize: '0.78rem',
                              color: 'var(--text-tertiary)',
                              marginTop: '1px'
                            }}
                          >
                            {skill.note}
                          </span>
                        )}
                      </div>

                      <span
                        style={{
                          fontSize: '0.85rem',
                          fontFamily: 'var(--font-heading)',
                          fontWeight: 700,
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>

                    {/* Animated Progress Bar */}
                    <div
                      style={{
                        width: '100%',
                        height: '6px',
                        borderRadius: '999px',
                        background: 'var(--badge-bg)',
                        overflow: 'hidden',
                        position: 'relative'
                      }}
                    >
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.9,
                          delay: skillIndex * 0.1,
                          ease: [0.16, 1, 0.3, 1]
                        }}
                        style={{
                          height: '100%',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg, var(--text-tertiary) 0%, var(--text-primary) 100%)',
                          position: 'relative'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .skills-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
