import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

const NotFound = () => {
  return (
    <section
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,107,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,107,0,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          {/* Glitch 404 */}
          <div
            className="glitch-container"
            data-text="404"
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(8rem, 20vw, 16rem)',
              fontWeight: 700,
              lineHeight: 1,
              color: 'var(--primary)',
              display: 'block',
              marginBottom: 8,
              textShadow: '0 0 40px rgba(255,107,0,0.4)',
            }}
          >
            404
          </div>

          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--secondary)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}>
            // TRANSMISSION_LOST
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(1.6rem, 4vw, 2.8rem)',
            fontWeight: 700,
            marginBottom: 16,
          }}>
            Signal Not Found
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.05rem',
            maxWidth: 480,
            margin: '0 auto 40px',
            lineHeight: 1.8,
          }}>
            The page you're looking for has been lost in the decentralized void. 
            It may have been moved, deleted, or never existed on this chain.
          </p>

          {/* Code block flavour */}
          <div style={{
            display: 'inline-block',
            textAlign: 'left',
            padding: '20px 28px',
            background: 'rgba(255,107,0,0.04)',
            border: '1px solid rgba(255,107,0,0.15)',
            borderRadius: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.82rem',
            lineHeight: 2,
            color: 'var(--text-secondary)',
            marginBottom: 40,
          }}>
            <div style={{ color: 'var(--text-muted)', marginBottom: 4, fontSize: '0.72rem', letterSpacing: '0.2em' }}>// BLOCK_ERROR_LOG</div>
            <div><span style={{ color: 'var(--secondary)' }}>Error</span>: Page not found at this address</div>
            <div><span style={{ color: 'var(--primary)' }}>Chain</span>: CyberPhunk Network</div>
            <div><span style={{ color: 'var(--primary)' }}>Status</span>: <span style={{ color: 'var(--accent)' }}>404 REVERTED</span></div>
            <div><span style={{ color: 'var(--primary)' }}>Suggestion</span>: <span style={{ color: '#00FF88' }}>return home()</span></div>
          </div>

          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/" className="btn-solid-primary" style={{ padding: '13px 36px' }}>
              <i className="bi bi-house-fill me-2"></i>Return Home
            </Link>
            <Link to="/blog" className="btn-neon" style={{ padding: '13px 36px' }}>
              <i className="bi bi-newspaper me-2"></i>Read the Blog
            </Link>
            <Link to="/community" className="btn-neon" style={{ padding: '13px 36px' }}>
              <i className="bi bi-people me-2"></i>Join Community
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default NotFound;
