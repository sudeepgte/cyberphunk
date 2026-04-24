import React, { useEffect, useState } from 'react';

/**
 * PageLoader — Full-screen loading splash shown on initial app mount.
 * Fades out after 1.2 seconds.
 */
const PageLoader = ({ onDone }) => {
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setOpacity(0), 900);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      if (onDone) onDone();
    }, 1400);
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-deep)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        transition: 'opacity 0.5s ease',
        gap: 24,
      }}
      aria-hidden="true"
    >
      {/* Spinning ring */}
      <div style={{ position: 'relative', width: 80, height: 80 }}>
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid rgba(0,255,255,0.1)',
          borderTop: '2px solid var(--cyan)',
          borderRadius: '50%',
          animation: 'rotate-slow 0.8s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 12,
          border: '2px solid rgba(255,0,127,0.1)',
          borderBottom: '2px solid var(--pink)',
          borderRadius: '50%',
          animation: 'rotate-slow 1.2s linear infinite reverse',
        }} />
        <div style={{
          position: 'absolute', inset: '50%',
          transform: 'translate(-50%, -50%)',
          width: 10, height: 10,
          background: 'var(--cyan)',
          borderRadius: '50%',
          boxShadow: '0 0 10px var(--cyan)',
        }} />
      </div>

      {/* Brand */}
      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.5rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        color: 'var(--text-primary)',
      }}>
        CYPHER<span style={{ color: 'var(--cyan)' }}>PUNK</span>
      </div>

      {/* Subtitle */}
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        color: 'var(--text-muted)',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
      }}>
        Initializing Web3 Environment...
      </div>
    </div>
  );
};

export default PageLoader;
