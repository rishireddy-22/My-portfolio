import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiUploadCloud,
  FiFileText,
  FiCheckCircle,
  FiDownload,
  FiTrash2,
  FiClock,
  FiAlertCircle
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import {
  getAdminResume,
  uploadResumeFile,
  activateResume,
  deleteResume
} from '../services/adminApi';

export default function ResumeManager() {
  const [activeResume, setActiveResume] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminResume();
    setActiveResume(data.active);
    setHistory(data.history || []);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleFileUpload = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf') {
      showToast('Only PDF format is supported for resumes.', 'error');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast('Maximum allowed PDF size is 5 MB.', 'error');
      return;
    }

    setUploading(true);
    try {
      await uploadResumeFile(file);
      showToast('New resume uploaded and set as active!');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to upload resume.', 'error');
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleActivate = async (id) => {
    await activateResume(id);
    showToast('Resume version set as active on the public portfolio.');
    loadData();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteResume(deleteTarget.id);
    showToast('Version removed.');
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div>
      <AdminHeader
        title="Resume & CV Management"
        subtitle="Upload new PDF versions, inspect active document preview, and manage version history."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '2rem',
          alignItems: 'start'
        }}
        className="resume-manager-grid"
      >
        {/* Left Column: Drag & Drop Upload + PDF Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Drag & Drop Upload Zone */}
          <GlassCard style={{ padding: '2rem' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
              Upload New Resume Version
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Uploading a new PDF immediately updates the live portfolio preview and download button.
            </p>

            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                border: `2px dashed ${dragActive ? 'var(--text-primary)' : 'var(--glass-border)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '3rem 2rem',
                textAlign: 'center',
                background: dragActive ? 'var(--badge-bg)' : 'transparent',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '50%',
                  background: 'var(--badge-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto',
                  color: 'var(--text-primary)'
                }}
              >
                <FiUploadCloud size={24} />
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                Drag and drop your PDF here
              </h4>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)', marginBottom: '1.25rem' }}>
                Supports standard PDF files up to 5 MB
              </p>

              <label className="btn btn-primary" style={{ cursor: 'pointer' }}>
                <span>{uploading ? 'Processing PDF...' : 'Browse Computer'}</span>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                  disabled={uploading}
                  style={{ display: 'none' }}
                />
              </label>
            </div>
          </GlassCard>

          {/* Active Resume Preview Frame */}
          <GlassCard style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Active Public Document
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                  Last updated: {activeResume?.updatedAt || 'Recent'}
                </span>
              </div>

              <a
                href={activeResume?.fileUrl || '/resume.pdf'}
                download="Rishi_Swar_Resume.pdf"
                className="btn btn-secondary"
                style={{ padding: '0.5rem 0.9rem', fontSize: '0.85rem' }}
              >
                <FiDownload size={15} />
                <span>Download</span>
              </a>
            </div>

            <div
              style={{
                width: '100%',
                height: '420px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-secondary)'
              }}
            >
              <iframe
                src={`${activeResume?.fileUrl || '/resume.pdf'}#toolbar=0`}
                title="Active Resume Preview"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
              />
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Version History */}
        <GlassCard style={{ padding: '2rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
            Version History Archive
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {history.map((ver) => (
              <div
                key={ver.id}
                style={{
                  padding: '1.2rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--badge-bg)',
                  border: `1px solid ${ver.active ? 'var(--text-primary)' : 'var(--glass-border)'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <FiFileText size={18} color="var(--text-primary)" />
                    <span style={{ fontWeight: 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                      {ver.fileName}
                    </span>
                  </div>

                  {ver.active ? (
                    <span className="badge" style={{ borderColor: 'var(--text-primary)' }}>
                      <FiCheckCircle size={12} />
                      Active
                    </span>
                  ) : null}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', color: 'var(--text-tertiary)', marginBottom: '0.85rem' }}>
                  <FiClock size={12} />
                  <span>{new Date(ver.uploadedAt).toLocaleString()}</span>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  {!ver.active && (
                    <button
                      onClick={() => handleActivate(ver.id)}
                      className="btn btn-primary"
                      style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
                    >
                      Set as Active
                    </button>
                  )}
                  <a
                    href={ver.fileUrl}
                    download={ver.fileName}
                    className="btn btn-secondary"
                    style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem' }}
                  >
                    <FiDownload size={13} />
                  </a>
                  {!ver.active && (
                    <button
                      onClick={() => setDeleteTarget(ver)}
                      className="btn btn-secondary"
                      style={{ padding: '0.35rem 0.6rem', fontSize: '0.78rem', color: '#ef4444' }}
                    >
                      <FiTrash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Resume Version"
        message={`Are you sure you want to permanently delete this resume version (${deleteTarget?.fileName})?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />

      <style>{`
        @media (max-width: 960px) {
          .resume-manager-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
