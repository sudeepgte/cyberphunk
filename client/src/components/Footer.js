import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer className="ag-footer">
      <div className="container">
        <div className="row gy-5">
          {/* Brand Column */}
          <div className="col-lg-4 col-md-6">
            <div className="ag-brand mb-3" style={{ fontSize: '1.8rem' }}>
              CYBER<span>PHUNK</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.8 }}>
              The Web3 community platform for builders, hackers, and privacy advocates. Built for the decentralized future.
            </p>
            <div className="d-flex gap-2 mt-4">
              {[
                { icon: 'bi-twitter-x', href: '#', label: 'Twitter' },
                { icon: 'bi-discord', href: '#', label: 'Discord' },
                { icon: 'bi-telegram', href: '#', label: 'Telegram' },
                { icon: 'bi-github', href: '#', label: 'GitHub' },
                { icon: 'bi-youtube', href: '#', label: 'YouTube' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="social-link"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={`bi ${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Navigate
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: 2.2 }}>
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/programs', label: 'Programs' },
                { path: '/projects', label: 'Projects' },
                { path: '/blog', label: 'Blog' },
                { path: '/community', label: 'Community' },
              ].map(({ path, label }) => (
                <li key={path}>
                  <Link to={path} style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Resources
            </h6>
            <ul className="list-unstyled" style={{ lineHeight: 2.2 }}>
              {['About Us', 'Network', 'Documentation', 'GitHub', 'Discord', 'Newsletter'].map(item => (
                <li key={item}>
                  <a href="#" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}
                  >{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', letterSpacing: '0.2em', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '20px' }}>
              Stay Informed
            </h6>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Get the latest news on Web3, innovation, and upcoming events.
            </p>
            {subscribed ? (
              <div style={{ color: '#00FF88', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                <i className="bi bi-check-circle-fill me-2"></i>You're in. Transmission received ✦
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="d-flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="ag-form-control flex-grow-1"
                />
                <button type="submit" className="btn-solid-primary" style={{ padding: '10px 18px', whiteSpace: 'nowrap' }}>
                  Subscribe
                </button>
              </form>
            )}

            {/* Manifesto Quote */}
            <div style={{ marginTop: '24px', padding: '16px', borderLeft: '2px solid rgba(255,107,0,0.3)', background: 'var(--bg-glass)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.7, margin: 0 }}>
                "The future is built by those who show up. <span style={{ color: 'var(--primary)' }}>CyberPhunk is where builders connect.</span>"
              </p>
            </div>
          </div>
        </div>

        <hr className="neon-divider my-5" />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
            © 2026 CyberPhunk. Built for the decentralized future.
          </p>
          <div className="d-flex gap-4">
            {['Privacy Policy', 'Terms', 'Cookie Policy'].map(item => (
              <a key={item} href="#" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
                onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
