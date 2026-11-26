import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiEye, FiClock, FiCheckSquare, FiFileText } from 'react-icons/fi';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function Resume({ resumeData }) {
  const [iframeError, setIframeError] = useState(false);

  const fileUrl = resumeData?.fileUrl || '/resume.pdf';
  const updatedAt = resumeData?.updatedAt || 'November 2026';

  return (
    <section id="resume" className="section">
      <div className="container">
        <SectionTitle
          badge="Curriculum Vitae"
          title="Resume & Qualifications"
          subtitle="Comprehensive overview of academic credentials, technical skills, and project accomplishments."
        />

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <GlassCard style={{ padding: '2.5rem' }}>
            {/* Header controls inside card */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '1.75rem',
                borderBottom: '1px solid var(--glass-border)',
                paddingBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)'
                  }}
                >
                  <FiFileText size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    Rishi_Swar_Resume.pdf
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <FiClock size={13} />
                    <span>Last updated: {updatedAt}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.1rem', fontSize: '0.88rem' }}
                >
                  <FiEye size={16} />
                  <span>Open Fullscreen</span>
                </a>

                <a
                  href={fileUrl}
                  download="Rishi_Swar_Resume.pdf"
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.88rem' }}
                >
                  <FiDownload size={16} />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>

            {/* PDF Preview Iframe */}
            <div
              style={{
                width: '100%',
                height: '540px',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--glass-border)',
                background: 'var(--bg-secondary)',
                position: 'relative'
              }}
            >
              {!iframeError ? (
                <iframe
                  src={`${fileUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Resume Document Preview"
                  width="100%"
                  height="100%"
                  style={{ border: 'none' }}
                  onError={() => setIframeError(true)}
                />
              ) : (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center'
                  }}
                >
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                    Preview could not be embedded directly in your browser.
                  </p>
                  <a
                    href={fileUrl}
                    download="Rishi_Swar_Resume.pdf"
                    className="btn btn-primary"
                  >
                    <FiDownload size={16} />
                    <span>Download PDF Directly</span>
                  </a>
                </div>
              )}
            </div>

            {/* Fast facts footer */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem',
                marginTop: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <FiCheckSquare color="var(--text-primary)" size={16} />
                <span>Verified Academic Credentials</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <FiCheckSquare color="var(--text-primary)" size={16} />
                <span>End-to-End Analytics Portfolio</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                <FiCheckSquare color="var(--text-primary)" size={16} />
                <span>ATS Optimized Format</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
