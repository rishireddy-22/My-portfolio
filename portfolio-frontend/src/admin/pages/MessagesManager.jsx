import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiMail,
  FiClock,
  FiCheck,
  FiTrash2,
  FiSend,
  FiInbox
} from 'react-icons/fi';
import GlassCard from '../../components/GlassCard';
import AdminHeader from '../components/AdminHeader';
import Toast from '../components/Toast';
import ConfirmModal from '../components/ConfirmModal';
import {
  getAdminMessages,
  markMessageRead,
  deleteMessage
} from '../services/adminApi';

export default function MessagesManager() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (text, type = 'success') => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = async () => {
    setLoading(true);
    const data = await getAdminMessages();
    setMessages(data);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMarkRead = async (id) => {
    await markMessageRead(id);
    showToast('Marked as read.');
    loadData();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMessage(deleteTarget.id);
    showToast('Message deleted.');
    setDeleteTarget(null);
    loadData();
  };

  return (
    <div>
      <AdminHeader
        title="Contact Form Inquiries"
        subtitle="Manage client inquiries, recruitment prospects, and visitor messages submitted through the website."
      />

      {messages.length === 0 ? (
        <GlassCard style={{ padding: '3rem', textAlign: 'center' }}>
          <FiInbox size={32} color="var(--text-tertiary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            No inquiries received yet
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            New submissions from your Contact section will appear here automatically.
          </p>
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {messages.map((msg) => (
            <GlassCard key={msg.id} style={{ padding: '1.8rem 2rem' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {msg.name}
                    </h3>
                    {!msg.read && (
                      <span className="badge" style={{ borderColor: 'var(--text-primary)' }}>
                        <span className="pulse-dot" />
                        Unread
                      </span>
                    )}
                  </div>

                  <a
                    href={`mailto:${msg.email}`}
                    style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', textDecoration: 'underline' }}
                  >
                    {msg.email}
                  </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: 'var(--text-tertiary)', marginRight: '0.5rem' }}>
                    <FiClock size={13} />
                    <span>{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>

                  {!msg.read && (
                    <button
                      onClick={() => handleMarkRead(msg.id)}
                      className="btn btn-secondary"
                      style={{ padding: '0.45rem 0.8rem', fontSize: '0.82rem' }}
                    >
                      <FiCheck size={14} />
                      <span>Mark Read</span>
                    </button>
                  )}

                  <a
                    href={`mailto:${msg.email}?subject=Re:%20Portfolio%20Inquiry`}
                    className="btn btn-primary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.82rem' }}
                  >
                    <FiSend size={13} />
                    <span>Reply</span>
                  </a>

                  <button
                    onClick={() => setDeleteTarget(msg)}
                    className="btn btn-secondary"
                    style={{ padding: '0.45rem 0.65rem', color: '#ef4444' }}
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>

              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, background: 'var(--badge-bg)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)' }}>
                {msg.message}
              </p>
            </GlassCard>
          ))}
        </div>
      )}

      <ConfirmModal
        isOpen={Boolean(deleteTarget)}
        title="Delete Message"
        message={`Delete inquiry from ${deleteTarget?.name}?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />

      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
