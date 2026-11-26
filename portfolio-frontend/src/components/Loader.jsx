import React from 'react';
import GlassCard from './GlassCard';

export default function Loader({ type = 'card', count = 3 }) {
  if (type === 'stat') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', width: '100%' }}>
        {Array.from({ length: count }).map((_, i) => (
          <GlassCard key={i} style={{ padding: '1.5rem' }} hoverEffect={false}>
            <div className="skeleton" style={{ height: '1.2rem', width: '60%', marginBottom: '0.8rem' }} />
            <div className="skeleton" style={{ height: '2.4rem', width: '40%', marginBottom: '0.5rem' }} />
            <div className="skeleton" style={{ height: '0.9rem', width: '80%' }} />
          </GlassCard>
        ))}
      </div>
    );
  }

  if (type === 'timeline') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto' }}>
        {Array.from({ length: count }).map((_, i) => (
          <GlassCard key={i} style={{ padding: '2rem' }} hoverEffect={false}>
            <div className="skeleton" style={{ height: '1.5rem', width: '50%', marginBottom: '1rem' }} />
            <div className="skeleton" style={{ height: '1rem', width: '70%', marginBottom: '0.8rem' }} />
            <div className="skeleton" style={{ height: '3.5rem', width: '100%' }} />
          </GlassCard>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem', width: '100%' }}>
      {Array.from({ length: count }).map((_, i) => (
        <GlassCard key={i} style={{ padding: '1.5rem' }} hoverEffect={false}>
          <div className="skeleton" style={{ height: '180px', width: '100%', marginBottom: '1.2rem', borderRadius: '12px' }} />
          <div className="skeleton" style={{ height: '1.4rem', width: '70%', marginBottom: '0.8rem' }} />
          <div className="skeleton" style={{ height: '3rem', width: '100%', marginBottom: '1.2rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <div className="skeleton" style={{ height: '1.8rem', width: '60px', borderRadius: '999px' }} />
            <div className="skeleton" style={{ height: '1.8rem', width: '70px', borderRadius: '999px' }} />
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
