import React from 'react';
import { motion } from 'framer-motion';
import {
  FiMapPin,
  FiMail,
  FiPhone,
  FiLinkedin,
  FiGithub,
  FiDatabase,
  FiPieChart,
  FiTrendingUp,
  FiCheckCircle
} from 'react-icons/fi';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function About({ profile }) {
  const pillars = [
    {
      icon: <FiDatabase size={24} />,
      title: 'SQL & Data Engineering',
      desc: 'Expertise in writing complex queries, window functions, CTEs, and schema indexing for maximum performance.'
    },
    {
      icon: <FiPieChart size={24} />,
      title: 'BI & Executive Dashboards',
      desc: 'Designing clean, decision-oriented dashboards in Power BI & Tableau that convert numbers into immediate takeaways.'
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: 'Exploratory & Predictive EDA',
      desc: 'Deep-diving into data distributions, customer cohorts, and statistical hypothesis testing with Python & Pandas.'
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: 'Business Value Acumen',
      desc: 'Combining commercial accounting principles (B.Com) with modern computing (MCA) to address tangible business problems.'
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <SectionTitle
          badge="About Me"
          title="Analytical Mindset, Business Impact"
          subtitle="A blend of computational rigor and commercial business strategy to solve data challenges."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '2.5rem',
            alignItems: 'stretch'
          }}
          className="about-grid"
        >
          {/* Main Bio Card */}
          <GlassCard style={{ padding: '2.5rem' }}>
            <h3
              style={{
                fontSize: '1.6rem',
                fontWeight: 600,
                marginBottom: '1.25rem',
                color: 'var(--text-primary)'
              }}
            >
              Transforming Complexity into Clarity
            </h3>
            
            <p
              style={{
                fontSize: '1.05rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '1.5rem'
              }}
            >
              {profile?.bio}
            </p>

            <p
              style={{
                fontSize: '1.02rem',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}
            >
              My goal is to eliminate data silos and guesswork by architecting automated analytics pipelines and intuitive dashboards that allow leaders to steer business growth with statistical certainty.
            </p>

            {/* Pillars 2x2 grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1.25rem'
              }}
            >
              {pillars.map((pillar, i) => (
                <div
                  key={i}
                  style={{
                    padding: '1.2rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <div
                    style={{
                      color: 'var(--text-primary)',
                      marginBottom: '0.6rem'
                    }}
                  >
                    {pillar.icon}
                  </div>
                  <h4
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      marginBottom: '0.35rem',
                      color: 'var(--text-primary)'
                    }}
                  >
                    {pillar.title}
                  </h4>
                  <p
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5
                    }}
                  >
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Contact Details & Quick Links Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <GlassCard style={{ padding: '2rem' }}>
              <h4
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600,
                  marginBottom: '1.5rem',
                  color: 'var(--text-primary)'
                }}
              >
                Direct Information
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Location */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      padding: '0.6rem',
                      borderRadius: '50%',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <FiMapPin size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Location
                    </span>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      {profile?.location}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      padding: '0.6rem',
                      borderRadius: '50%',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <FiMail size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Email
                    </span>
                    <p>
                      <a
                        href={`mailto:${profile?.email}`}
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: 'var(--text-primary)',
                          textDecoration: 'underline',
                          textUnderlineOffset: '3px'
                        }}
                      >
                        {profile?.email}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      padding: '0.6rem',
                      borderRadius: '50%',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--glass-border)',
                      color: 'var(--text-primary)'
                    }}
                  >
                    <FiPhone size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Phone
                    </span>
                    <p>
                      <a
                        href={`tel:${profile?.phone}`}
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: 'var(--text-primary)'
                        }}
                      >
                        {profile?.phoneDisplay || profile?.phone}
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div
                style={{
                  height: '1px',
                  background: 'var(--glass-border)',
                  margin: '1.75rem 0'
                }}
              />

              {/* Social Channels */}
              <h5
                style={{
                  fontSize: '0.85rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem'
                }}
              >
                Social Profiles
              </h5>

              <div style={{ display: 'flex', gap: '0.85rem' }}>
                <a
                  href={profile?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                >
                  <FiLinkedin size={16} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.85rem' }}
                >
                  <FiGithub size={16} />
                  <span>GitHub</span>
                </a>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
