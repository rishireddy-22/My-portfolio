import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiLock,
  FiDownload,
  FiUpload,
  FiShield,
  FiSave,
  FiCheckCircle,
  FiRefreshCw
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import {
  changePassword,
  exportPortfolioData,
  importPortfolioData
} from '../services/adminApi';

export default function SettingsManager() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.', 'error');
      return;
    }
    if (newPassword.length < 6) {
      showToast('New password must be at least 6 characters.', 'error');
      return;
    }

    try {
      await changePassword(oldPassword, newPassword);
      showToast('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      showToast(err.message || 'Failed to update password.', 'error');
    }
  };

  const handleExport = () => {
    exportPortfolioData();
    showToast('Portfolio JSON backup downloaded!');
  };

  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        importPortfolioData(event.target.result);
        showToast('Portfolio data restored from backup successfully! Refreshing...');
        setTimeout(() => window.location.reload(), 1500);
      } catch (err) {
        showToast('Invalid JSON backup file structure.', 'error');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <AdminHeader
        title="Settings & System Backups"
        subtitle="Manage administrator authentication, credentials, and full portfolio JSON export/import."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        {/* Password Manager */}
        <GlassCard style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
            <FiShield size={22} color="var(--text-primary)" />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Change Admin Password
            </h3>
          </div>

          <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Current Password *</label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
                placeholder="Current password (default: admin123)"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>New Password *</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Minimum 6 characters"
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Confirm New Password *</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Retype new password"
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button type="submit" className="btn btn-primary">
                <FiSave size={16} />
                <span>Update Password</span>
              </button>
            </div>
          </form>
        </GlassCard>

        {/* JSON Backup & Restore */}
        <GlassCard style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <FiRefreshCw size={22} color="var(--text-primary)" />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                Data Portability & Backup
              </h3>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
              Export a complete snapshot of your entire portfolio (profile, education, projects, skills, resume configurations) as a single portable JSON file. You can restore it anytime or migrate between environments.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={handleExport}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
            >
              <FiDownload size={16} />
              <span>Export Full Portfolio Backup (JSON)</span>
            </button>

            <label
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', padding: '0.85rem', cursor: 'pointer' }}
            >
              <FiUpload size={16} />
              <span>Import Portfolio from JSON Backup</span>
              <input
                type="file"
                accept=".json,application/json"
                onChange={handleImportFile}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </GlassCard>
      </div>

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '0.85rem',
  fontWeight: 600,
  marginBottom: '0.4rem',
  color: 'var(--text-primary)'
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-md)',
  background: 'var(--badge-bg)',
  border: '1px solid var(--glass-border)',
  color: 'var(--text-primary)',
  fontSize: '0.92rem',
  outline: 'none',
  fontFamily: 'inherit'
};
