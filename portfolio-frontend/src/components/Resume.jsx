import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiDownload,
  FiEye,
  FiClock,
  FiCheckSquare,
  FiFileText,
  FiExternalLink,
  FiBookOpen,
  FiCode,
  FiAward
} from 'react-icons/fi';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';

export default function Resume({ resumeData }) {
  const [iframeError, setIframeError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const fileUrl = resumeData?.fileUrl || '/resume.pdf';
  const updatedAt = resumeData?.updatedAt || 'November 2026';

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="resume" className="section">
      <div className="container">
        <SectionTitle
          badge="Curriculum Vitae"
          title="Resume & Qualifications"
          subtitle="Comprehensive overview of academic credentials, technical skills, and project accomplishments."
        />

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <GlassCard style={{ padding: isMobile ? '1.5rem' : '2.5rem' }}>
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
                    width: '46px',
                    height: '46px',
                    borderRadius: '50%',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    flexShrink: 0
                  }}
                >
                  <FiFileText size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Rishi_Swar_Resume.pdf
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.2rem'
                    }}
                  >
                    <FiClock size={13} />
                    <span>Last updated: {updatedAt}</span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
                <a
                  href={fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    padding: '0.65rem 1.1rem',
                    fontSize: '0.88rem',
                    flex: isMobile ? 1 : 'initial',
                    justifyContent: 'center'
                  }}
                >
                  <FiExternalLink size={16} />
                  <span>Open PDF</span>
                </a>

                <a
                  href={fileUrl}
                  download="Rishi_Swar_Resume.pdf"
                  className="btn btn-primary"
                  style={{
                    padding: '0.65rem 1.25rem',
                    fontSize: '0.88rem',
                    flex: isMobile ? 1 : 'initial',
                    justifyContent: 'center'
                  }}
                >
                  <FiDownload size={16} />
                  <span>Download</span>
                </a>
              </div>
            </div>

            {/* Document Display: Mobile View vs Desktop Embed */}
            {isMobile ? (
              <div
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--glass-border)',
                  background: 'var(--bg-secondary)',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)' }}>
                  <FiAward size={20} />
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
                    Rishi Swar — Data Analyst
                  </h4>
                </div>

                <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  MCA student with a strong foundation in SQL, Python, and Power BI. Experienced in cleaning raw data, exploratory analysis, and building business dashboards that drive decisions.
                </p>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '0.75rem',
                    background: 'var(--badge-bg)',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem'
                  }}
                >
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>🎓 Education: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>MCA (Pursuing) • B.Com (7.8 CGPA)</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>🛠️ Core Stack: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>SQL, Python, Power BI, Tableau, Excel, MySQL</span>
                  </div>
                  <div>
                    <strong style={{ color: 'var(--text-primary)' }}>📊 Projects: </strong>
                    <span style={{ color: 'var(--text-secondary)' }}>Sales Dashboard, Churn Analysis, SQL Retail Insights</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    <FiEye size={18} />
                    <span>View Official Resume PDF</span>
                  </a>
                  <a
                    href={fileUrl}
                    download="Rishi_Swar_Resume.pdf"
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', padding: '0.85rem' }}
                  >
                    <FiDownload size={18} />
                    <span>Save PDF to Device</span>
                  </a>
                </div>
              </div>
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '560px',
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
                    <FiFileText size={48} style={{ color: 'var(--text-muted)', marginBottom: '1rem' }} />
                    <h4 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Rishi Swar — Curriculum Vitae
                    </h4>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px' }}>
                      Click below to open or download the complete PDF resume.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <a
                        href={fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                      >
                        <FiEye size={16} />
                        <span>Open in New Tab</span>
                      </a>
                      <a
                        href={fileUrl}
                        download="Rishi_Swar_Resume.pdf"
                        className="btn btn-primary"
                      >
                        <FiDownload size={16} />
                        <span>Download PDF</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}

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
