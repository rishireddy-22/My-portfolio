import React, { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Reusable GlassCard with frosted glass, subtle border, inner glow,
 * and cursor-following glossy reflection sheen.
 */
export default function GlassCard({
  children,
  className = '',
  style = {},
  contentStyle = {},
  onClick,
  hoverEffect = true,
  ...props
}) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!hoverEffect || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`glass-panel ${className}`}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
      whileHover={hoverEffect ? { y: -3 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Dynamic glossy reflection following cursor */}
      {hoverEffect && (
        <div
          className="glass-gloss-effect"
          style={{
            background:
              'radial-gradient(circle 260px at var(--mouse-x, -999px) var(--mouse-y, -999px), rgba(255, 255, 255, 0.12), transparent 75%)'
          }}
        />
      )}
      <div
        className="glass-card-inner"
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...contentStyle
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}
