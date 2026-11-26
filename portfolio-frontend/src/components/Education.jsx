import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCalendar, FiAward, FiCheckCircle } from 'react-icons/fi';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function Education({ educationList = [] }) {
  // Sort entries newest first based on startYear/endYear
  const sortedEducation = [...educationList].sort((a, b) => {
    // If ongoing, place first
    if (a.status === 'ONGOING' && b.status !== 'ONGOING') return -1;
    if (b.status === 'ONGOING' && a.status !== 'ONGOING') return 1;
    return (b.startYear || 0) - (a.startYear || 0);
  });

  return (
    <section id="education" className="section">
      <div className="container">
        <SectionTitle
          badge="Academic Background"
          title="Education Timeline"
          subtitle="A structured pathway combining computational applications, software systems, and commerce."
        />

        <div
          style={{
            position: 'relative',
            maxWidth: '820px',
            margin: '0 auto',
            padding: '1rem 0'
          }}
        >
          {/* Vertical Timeline Guide Line */}
          <div
            style={{
              position: 'absolute',
              top: '2rem',
              bottom: '2rem',
              left: '26px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--text-primary) 0%, var(--glass-border) 100%)',
              zIndex: 0
            }}
            className="timeline-guide-line"
          />

          {/* Education Entries */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {sortedEducation.map((item, index) => {
              const isOngoing = item.status === 'ONGOING';
              const endDisplay = isOngoing ? 'Present' : item.endYear || 'Completed';
              
              // Score calculation based on status and value
              let scoreDisplay = null;
              if (isOngoing) {
                // If ongoing, check if score is provided or empty
                scoreDisplay = item.score && item.score.toString().trim() !== ''
                  ? `${item.scoreType || 'CGPA'}: ${item.score}`
                  : 'CGPA: Will be updated';
              } else {
                // Completed state: show score if available, or default
                scoreDisplay = item.score
                  ? `${item.scoreType || 'CGPA'}: ${item.score}`
                  : 'Degree Completed';
              }

              return (
                <motion.div
                  key={item.id || index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '54px 1fr',
                    gap: '1.5rem',
                    alignItems: 'flex-start',
                    position: 'relative',
                    zIndex: 1
                  }}
                  className="timeline-entry"
                >
                  {/* Timeline Node Icon */}
                  <div
                    style={{
                      width: '54px',
                      height: '54px',
                      borderRadius: '50%',
                      background: isOngoing ? 'var(--button-primary-bg)' : 'var(--bg-secondary)',
                      color: isOngoing ? 'var(--button-primary-text)' : 'var(--text-primary)',
                      border: '2px solid var(--glass-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'var(--glass-card-shadow)',
                      flexShrink: 0
                    }}
                  >
                    {isOngoing ? <FiBookOpen size={20} /> : <FiCheckCircle size={20} />}
                  </div>

                  {/* Timeline Glass Card */}
                  <GlassCard style={{ padding: '2rem' }}>
                    {/* Top Row: Degree & Status Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '0.75rem',
                        marginBottom: '0.75rem'
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {item.degree}
                        </h3>
                        <p
                          style={{
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: 'var(--text-secondary)'
                          }}
                        >
                          {item.institution}
                          {item.university && `, ${item.university}`}
                        </p>
                      </div>

                      {/* Status Badge: Animated Pulsing for Ongoing */}
                      <div>
                        {isOngoing ? (
                          <span
                            className="badge"
                            style={{
                              background: 'var(--badge-bg)',
                              borderColor: 'var(--text-primary)',
                              color: 'var(--text-primary)',
                              fontWeight: 600
                            }}
                          >
                            <span className="pulse-dot" />
                            Currently Studying
                          </span>
                        ) : (
                          <span
                            className="badge"
                            style={{
                              background: 'var(--badge-bg)',
                              color: 'var(--text-secondary)'
                            }}
                          >
                            Completed
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Metadata Row: Years & Score */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1.5rem',
                        flexWrap: 'wrap',
                        margin: '1.25rem 0',
                        fontSize: '0.9rem',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <FiCalendar size={15} />
                        <span>
                          {item.startYear} – {endDisplay}
                        </span>
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          color: isOngoing && !item.score ? 'var(--text-muted)' : 'var(--text-primary)',
                          fontWeight: 600
                        }}
                      >
                        <FiAward size={15} />
                        <span>{scoreDisplay}</span>
                      </div>
                    </div>

                    {/* Description */}
                    {item.description && (
                      <p
                        style={{
                          fontSize: '0.92rem',
                          lineHeight: 1.6,
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .timeline-guide-line {
            display: none !important;
          }
          .timeline-entry {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
