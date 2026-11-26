import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiGithub,
  FiCheckCircle,
  FiAlertCircle,
  FiLoader
} from 'react-icons/fi';
import GlassCard from './GlassCard';
import SectionTitle from './SectionTitle';
import { submitContact } from '../services/api';

export default function Contact({ profile }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', text: '' }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setToast({
        type: 'error',
        text: 'Please complete all required fields before submitting.'
      });
      return;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({
        type: 'error',
        text: 'Please provide a valid email address.'
      });
      return;
    }

    setSubmitting(true);
    setToast(null);

    try {
      const response = await submitContact(formData);
      setToast({
        type: 'success',
        text: response.message || 'Inquiry sent successfully! Thank you for connecting.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      setToast({
        type: 'error',
        text: 'Failed to send inquiry. Please email directly at ' + profile?.email
      });
    } finally {
      setSubmitting(false);
      // Auto-clear toast after 6 seconds
      setTimeout(() => {
        setToast(null);
      }, 6000);
    }
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <SectionTitle
          badge="Get In Touch"
          title="Let's Discuss Data Opportunities"
          subtitle="Looking for an analytical thinker to join your team or build impactful business dashboards? Reach out anytime."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="contact-layout"
        >
          {/* Left Column: Direct Info Card */}
          <GlassCard style={{ padding: '2.5rem' }}>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1rem'
              }}
            >
              Contact Channels
            </h3>
            
            <p
              style={{
                fontSize: '0.95rem',
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
                marginBottom: '2rem'
              }}
            >
              Open to Data Analyst roles, Business Intelligence internships, and freelance analytics projects. Let's explore how data can drive your key KPIs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {/* Email */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  <FiMail size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Email
                  </span>
                  <div>
                    <a
                      href={`mailto:${profile?.email}`}
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        textDecoration: 'underline',
                        textUnderlineOffset: '2px'
                      }}
                    >
                      {profile?.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  <FiPhone size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Phone
                  </span>
                  <div>
                    <a
                      href={`tel:${profile?.phone}`}
                      style={{
                        fontSize: '0.98rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}
                    >
                      {profile?.phoneDisplay || profile?.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                  <FiMapPin size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Location
                  </span>
                  <p style={{ fontSize: '0.98rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {profile?.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  marginBottom: '1rem'
                }}
              >
                Professional Networks
              </span>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <a
                  href={profile?.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.88rem' }}
                >
                  <FiLinkedin size={17} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={profile?.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ flex: 1, padding: '0.65rem 1rem', fontSize: '0.88rem' }}
                >
                  <FiGithub size={17} />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </GlassCard>

          {/* Right Column: Contact Form */}
          <GlassCard style={{ padding: '2.5rem' }}>
            <h3
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginBottom: '1.5rem'
              }}
            >
              Send a Direct Message
            </h3>

            {/* Notification Toast */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.9rem 1.25rem',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '1.5rem',
                    fontSize: '0.9rem',
                    background:
                      toast.type === 'success'
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(255, 255, 255, 0.08)',
                    border: `1px solid ${toast.type === 'success' ? 'var(--text-primary)' : 'var(--text-muted)'}`,
                    color: 'var(--text-primary)'
                  }}
                >
                  {toast.type === 'success' ? (
                    <FiCheckCircle size={18} />
                  ) : (
                    <FiAlertCircle size={18} />
                  )}
                  <span>{toast.text}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name Input */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.45rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  Your Name *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.45rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  Your Email *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. sarah@company.com"
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem'
                  }}
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label
                  htmlFor="contact-message"
                  style={{
                    display: 'block',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    marginBottom: '0.45rem',
                    color: 'var(--text-primary)'
                  }}
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Briefly describe your project, team opportunity, or inquiry..."
                  required
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--badge-bg)',
                    border: '1px solid var(--glass-border)',
                    color: 'var(--text-primary)',
                    fontFamily: 'inherit',
                    fontSize: '0.95rem',
                    resize: 'vertical'
                  }}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.9rem',
                  fontSize: '1rem',
                  marginTop: '0.5rem'
                }}
              >
                {submitting ? (
                  <>
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{ display: 'inline-flex' }}
                    >
                      <FiLoader size={18} />
                    </motion.span>
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <FiSend size={16} />
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
