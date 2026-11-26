import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999
      }}
    >
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            padding: '1rem 1.4rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1px solid ${isSuccess ? 'var(--text-primary)' : 'rgba(239, 68, 68, 0.5)'}`,
            boxShadow: 'var(--glass-card-shadow)',
            color: 'var(--text-primary)',
            fontSize: '0.92rem',
            fontWeight: 500,
            maxWidth: '420px'
          }}
        >
          {isSuccess ? (
            <FiCheckCircle size={20} color="var(--text-primary)" />
          ) : (
            <FiAlertCircle size={20} color="#ef4444" />
          )}
          <span style={{ flex: 1 }}>{toast.text}</span>
          <button
            onClick={onClose}
            style={{
              cursor: 'pointer',
              color: 'var(--text-tertiary)',
              display: 'flex',
              padding: '2px'
            }}
          >
            <FiX size={16} />
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
