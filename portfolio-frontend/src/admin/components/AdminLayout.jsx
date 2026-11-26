import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid,
  FiUser,
  FiBookOpen,
  FiCheckCircle,
  FiFolder,
  FiFileText,
  FiMail,
  FiSettings,
  FiLogOut,
  FiExternalLink,
  FiSun,
  FiMoon,
  FiMenu,
  FiX
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../../hooks/useTheme';

export default function AdminLayout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navLinks = [
    { label: 'Dashboard', path: '/admin', icon: <FiGrid size={18} />, end: true },
    { label: 'Profile', path: '/admin/profile', icon: <FiUser size={18} /> },
    { label: 'Education', path: '/admin/education', icon: <FiBookOpen size={18} /> },
    { label: 'Skills', path: '/admin/skills', icon: <FiCheckCircle size={18} /> },
    { label: 'Projects', path: '/admin/projects', icon: <FiFolder size={18} /> },
    { label: 'Resume', path: '/admin/resume', icon: <FiFileText size={18} /> },
    { label: 'Messages', path: '/admin/messages', icon: <FiMail size={18} /> },
    { label: 'Settings', path: '/admin/settings', icon: <FiSettings size={18} /> }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: '260px',
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          borderRight: '1px solid var(--glass-border)',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 90
        }}
        className="admin-sidebar-desktop"
      >
        {/* Brand */}
        <div
          style={{
            padding: '1.75rem 1.5rem',
            borderBottom: '1px solid var(--glass-border)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <span
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'var(--button-primary-bg)',
              color: 'var(--button-primary-text)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            RS
          </span>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1rem', fontFamily: 'var(--font-heading)' }}>
              Admin Console
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
              Portfolio Management
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav style={{ padding: '1.25rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1, overflowY: 'auto' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.92rem',
                fontWeight: isActive ? 600 : 500,
                color: isActive ? 'var(--button-primary-text)' : 'var(--text-secondary)',
                background: isActive ? 'var(--button-primary-bg)' : 'transparent',
                transition: 'all var(--transition-fast)'
              })}
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div style={{ padding: '1rem', borderTop: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ width: '100%', padding: '0.65rem', fontSize: '0.85rem', justifyContent: 'center' }}
          >
            <FiExternalLink size={15} />
            <span>View Public Site</span>
          </a>

          <button
            onClick={handleLogout}
            className="btn"
            style={{
              width: '100%',
              padding: '0.65rem',
              fontSize: '0.85rem',
              justifyContent: 'center',
              color: '#ef4444',
              background: 'rgba(239, 68, 68, 0.08)'
            }}
          >
            <FiLogOut size={15} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          marginLeft: '260px',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh'
        }}
        className="admin-main-wrap"
      >
        {/* Top Bar */}
        <header
          style={{
            height: '68px',
            background: 'var(--nav-bg)',
            backdropFilter: 'var(--glass-blur)',
            WebkitBackdropFilter: 'var(--glass-blur)',
            borderBottom: '1px solid var(--glass-border)',
            position: 'sticky',
            top: 0,
            zIndex: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem'
          }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="admin-mobile-toggle"
            aria-label="Toggle navigation"
            style={{
              display: 'none',
              padding: '0.5rem',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
          >
            <FiMenu size={20} />
          </button>

          <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }} className="admin-status-indicator">
            <span className="pulse-dot" style={{ marginRight: '8px' }} />
            System Live &bull; Connected
          </div>

          {/* Action icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-primary)',
                cursor: 'pointer'
              }}
            >
              {theme === 'light' ? <FiMoon size={17} /> : <FiSun size={17} />}
            </button>

            <button
              onClick={handleLogout}
              title="Logout"
              className="btn btn-secondary"
              style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
            >
              <FiLogOut size={15} />
              <span>Exit</span>
            </button>
          </div>
        </header>

        {/* Content Outlet */}
        <main style={{ padding: '2.5rem', flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto' }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.5)',
              zIndex: 998
            }}
          >
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '260px',
                height: '100%',
                background: 'var(--bg-secondary)',
                borderRight: '1px solid var(--glass-border)',
                display: 'flex',
                flexDirection: 'column',
                padding: '1.5rem 1rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <span style={{ fontWeight: 700 }}>Admin Console</span>
                <button onClick={() => setMobileSidebarOpen(false)} style={{ color: 'var(--text-primary)' }}>
                  <FiX size={20} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.end}
                    onClick={() => setMobileSidebarOpen(false)}
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.92rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? 'var(--button-primary-text)' : 'var(--text-secondary)',
                      background: isActive ? 'var(--button-primary-bg)' : 'transparent'
                    })}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar-desktop {
            display: none !important;
          }
          .admin-main-wrap {
            margin-left: 0 !important;
          }
          .admin-mobile-toggle {
            display: inline-flex !important;
          }
          .admin-status-indicator {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
