import React from 'react';
import { FiArrowUp, FiMail, FiLinkedin, FiGithub, FiHeart } from 'react-icons/fi';

export default function Footer({ profile }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Education', href: '#education' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Resume', href: '#resume' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer
      style={{
        borderTop: '1px solid var(--glass-border)',
        background: 'var(--bg-secondary)',
        padding: '4rem 0 2.5rem 0',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--glass-border)'
          }}
        >
          {/* Logo & Tagline */}
          <div style={{ maxWidth: '320px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                fontSize: '1.3rem',
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                marginBottom: '0.6rem'
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--button-primary-bg)',
                  color: 'var(--button-primary-text)',
                  fontSize: '0.88rem',
                  fontWeight: 700
                }}
              >
                {profile?.initials || 'RS'}
              </span>
              <span>{profile?.name || 'Rishi Swar'}</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', lineHeight: 1.5 }}>
              Data Analytics Specialist & Business Intelligence Dashboard Builder.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
                style={{
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-secondary)')}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="btn btn-secondary"
            style={{
              padding: '0.6rem 1.1rem',
              fontSize: '0.85rem',
              borderRadius: 'var(--radius-full)'
            }}
          >
            <span>Back to top</span>
            <FiArrowUp size={16} />
          </button>
        </div>

        {/* Bottom credits */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '2rem',
            fontSize: '0.85rem',
            color: 'var(--text-tertiary)'
          }}
        >
          <div>
            © {new Date().getFullYear()} {profile?.name || 'Rishi Swar'}. All rights reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <span>Built with React + Vite</span>
            <span>&bull;</span>
            <a
              href="/admin"
              style={{
                color: 'var(--text-tertiary)',
                textDecoration: 'none',
                transition: 'color 0.2s ease'
              }}
              onMouseEnter={(e) => (e.target.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.target.style.color = 'var(--text-tertiary)')}
            >
              Admin Portal
            </a>
          </div>

          {/* Mini Socials */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a
              href={`mailto:${profile?.email}`}
              aria-label="Email"
              title="Email"
              style={{ color: 'var(--text-secondary)' }}
            >
              <FiMail size={16} />
            </a>
            <a
              href={profile?.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              style={{ color: 'var(--text-secondary)' }}
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href={profile?.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              style={{ color: 'var(--text-secondary)' }}
            >
              <FiGithub size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
