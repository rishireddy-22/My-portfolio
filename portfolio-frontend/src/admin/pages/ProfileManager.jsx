import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiSave,
  FiUploadCloud,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import { getAdminProfile, updateProfile } from '../services/adminApi';

export default function ProfileManager() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    getAdminProfile().then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfile((prev) => ({ ...prev, photoUrl: url }));
      showToast('Profile image preview updated!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      showToast('Profile credentials and bio updated!');
    } catch (err) {
      showToast('Failed to update profile.', 'error');
    }
  };

  if (loading || !profile) {
    return <div style={{ color: 'var(--text-secondary)' }}>Loading profile settings...</div>;
  }

  return (
    <div>
      <AdminHeader
        title="Personal Profile & Biography"
        subtitle="Manage your name, professional title, contact coordinates, and portrait photograph."
      />

      <GlassCard style={{ padding: '2.5rem' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          {/* Photo Upload & Preview Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <div
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid var(--glass-border)',
                background: 'var(--bg-secondary)',
                boxShadow: 'var(--glass-card-shadow)'
              }}
            >
              <img
                src={profile.photoUrl || '/profile.png'}
                alt="Profile Avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                Profile Portrait
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Square JPG, PNG, or WEBP photograph for the Hero section.
              </p>
              <label className="btn btn-secondary" style={{ padding: '0.55rem 1rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                <FiUploadCloud size={16} />
                <span>Change Photo</span>
                <input type="file" accept="image/*" onChange={handlePhotoUpload} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.25rem'
            }}
          >
            {/* Full Name */}
            <div>
              <label style={labelStyle}>Full Name *</label>
              <input
                type="text"
                name="name"
                value={profile.name || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Professional Title */}
            <div>
              <label style={labelStyle}>Headline Title *</label>
              <input
                type="text"
                name="title"
                value={profile.title || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Public Contact Email *</label>
              <input
                type="email"
                name="email"
                value={profile.email || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={labelStyle}>Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={profile.phone || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* Location */}
            <div>
              <label style={labelStyle}>Location *</label>
              <input
                type="text"
                name="location"
                value={profile.location || ''}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            {/* LinkedIn */}
            <div>
              <label style={labelStyle}>LinkedIn URL</label>
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin || ''}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            {/* GitHub */}
            <div>
              <label style={labelStyle}>GitHub URL</label>
              <input
                type="url"
                name="github"
                value={profile.github || ''}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Tagline */}
          <div>
            <label style={labelStyle}>Hero Tagline</label>
            <textarea
              name="tagline"
              rows={2}
              value={profile.tagline || ''}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          {/* Full Bio */}
          <div>
            <label style={labelStyle}>About Me Biography</label>
            <textarea
              name="bio"
              rows={5}
              value={profile.bio || ''}
              onChange={handleChange}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '0.8rem 1.8rem' }}>
              <FiSave size={16} />
              <span>Save Profile Information</span>
            </button>
          </div>
        </form>
      </GlassCard>

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
