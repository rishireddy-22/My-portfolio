import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  FiArrowDown,
  FiDownload,
  FiMail,
  FiLinkedin,
  FiGithub,
  FiTrendingUp,
  FiActivity
} from 'react-icons/fi';
import GlassCard from './GlassCard';

// Sample animated trend data for the floating mini-chart
const trendData = [
  { month: 'Jan', queries: 45, accuracy: 88 },
  { month: 'Feb', queries: 62, accuracy: 91 },
  { month: 'Mar', queries: 80, accuracy: 94 },
  { month: 'Apr', queries: 95, accuracy: 96 },
  { month: 'May', queries: 120, accuracy: 98 },
  { month: 'Jun', queries: 145, accuracy: 99 }
];

export default function Hero({ profile, resumeUrl }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = profile?.typingRoles || [
    'Data Analyst',
    'SQL Enthusiast',
    'Dashboard Builder',
    'Insight Storyteller'
  ];

  // Typing effect
  useEffect(() => {
    const currentRole = roles[roleIndex % roles.length];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentRole.substring(0, displayText.length + 1));
        if (displayText.length + 1 === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(currentRole.substring(0, displayText.length - 1));
        if (displayText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex, roles]);

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--nav-height) + 3rem)',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Glass Orbs in Background */}
      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '380px',
          height: '380px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--orb-color, rgba(0,0,0,0.04)) 0%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />
      <motion.div
        animate={{
          x: [0, -50, 0],
          y: [0, 40, 0],
          scale: [1, 1.15, 1]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '5%',
          width: '420px',
          height: '420px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--orb-color, rgba(0,0,0,0.04)) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: '3.5rem',
            alignItems: 'center',
            marginBottom: '4rem'
          }}
          className="hero-grid"
        >
          {/* Left Column: Heading, Animated Typing, Tagline, CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <div style={{ marginBottom: '1.25rem' }}>
              <span className="badge">
                <span className="pulse-dot" />
                Available for Analytics Opportunities
              </span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: '-0.04em',
                marginBottom: '1rem'
              }}
            >
              Hi, I'm{' '}
              <span style={{ color: 'var(--text-primary)' }}>
                {profile?.name || 'Rishi Swar'}
              </span>
            </h1>

            {/* Dynamic Typing Title */}
            <div
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 2.1rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                minHeight: '2.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.2rem',
                marginBottom: '1.25rem'
              }}
            >
              <span>{displayText}</span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  display: 'inline-block',
                  width: '3px',
                  height: '1.3em',
                  backgroundColor: 'var(--text-primary)',
                  marginLeft: '2px',
                  verticalAlign: 'middle'
                }}
              />
            </div>

            <p
              style={{
                fontSize: '1.1rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                maxWidth: '540px',
                marginBottom: '2.25rem'
              }}
            >
              {profile?.tagline}
            </p>

            {/* Action Buttons */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                flexWrap: 'wrap',
                marginBottom: '2.5rem'
              }}
            >
              <a
                href="#projects"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>View Projects</span>
                <FiArrowDown size={17} />
              </a>

              <a
                href={resumeUrl || '/resume.pdf'}
                download="Rishi_Swar_Resume.pdf"
                className="btn btn-secondary"
              >
                <FiDownload size={17} />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Social Icons row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span
                style={{
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 600
                }}
              >
                Connect:
              </span>
              <a
                href={`mailto:${profile?.email}`}
                aria-label="Send Email"
                title={`Email: ${profile?.email}`}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiMail size={18} />
              </a>

              <a
                href={profile?.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiLinkedin size={18} />
              </a>

              <a
                href={profile?.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub Profile"
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  color: 'var(--text-primary)',
                  transition: 'all 0.2s ease'
                }}
              >
                <FiGithub size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right Column: Profile Photo in Glossy Frame & Floating Mini-Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {/* Glossy Ring Frame for Portrait */}
            <div
              style={{
                position: 'relative',
                width: '320px',
                height: '320px',
                borderRadius: '50%',
                padding: '10px',
                background:
                  'linear-gradient(135deg, var(--glass-sheen-color, rgba(255,255,255,0.9)) 0%, var(--glass-bg) 100%)',
                boxShadow: 'var(--glass-card-shadow)',
                border: '1px solid var(--glass-border)',
                backdropFilter: 'blur(12px)'
              }}
            >
              <img
                src={profile?.photoUrl || '/profile.png'}
                alt={`${profile?.name || 'Rishi Swar'} Portrait`}
                loading="eager"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
                  borderRadius: '50%',
                  filter: 'grayscale(20%) contrast(105%)',
                  display: 'block'
                }}
              />

              {/* Glowing decorative badge on photo */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '15px',
                  right: '15px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '0.4rem 0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  boxShadow: 'var(--glass-card-shadow)',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                <FiActivity color="var(--text-primary)" size={14} />
                <span>MCA Analyst</span>
              </div>
            </div>

            {/* Floating Mini Chart in a Glass Card (Recharts) */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: [0, -8, 0], opacity: 1 }}
              transition={{
                y: { repeat: Infinity, duration: 5, ease: 'easeInOut' },
                opacity: { duration: 0.6, delay: 0.4 }
              }}
              style={{
                position: 'absolute',
                bottom: '-25px',
                left: '-20px',
                width: '240px',
                zIndex: 3
              }}
              className="hero-mini-chart"
            >
              <GlassCard
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--glass-bg)',
                  boxShadow: '0 12px 35px rgba(0,0,0,0.35)'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Query Execution Velocity
                  </span>
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)'
                    }}
                  >
                    <FiTrendingUp size={12} />
                    +42%
                  </span>
                </div>

                {/* Animated Recharts AreaChart */}
                <div style={{ width: '100%', height: '65px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="miniChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--chart-line)" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="var(--chart-line)" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="queries"
                        stroke="var(--chart-line)"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#miniChartGrad)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick Stats Row in Glass Cards */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            width: '100%'
          }}
        >
          {profile?.stats?.map((stat, i) => (
            <GlassCard
              key={i}
              style={{
                padding: '1.5rem 1.6rem'
              }}
              contentStyle={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                justifyContent: 'center'
              }}
            >
              <div
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em'
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize: '2.2rem',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  lineHeight: 1.15
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4
                }}
              >
                {stat.sub}
              </div>
            </GlassCard>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 3rem !important;
          }
          .hero-grid > div:first-child {
            order: 2;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-grid > div:last-child {
            order: 1;
          }
          .hero-mini-chart {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
