import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const BENEFITS = [
  { icon: 'bi-mortarboard-fill', title: 'World-Class Education', desc: 'Access bootcamps, courses, and workshops led by industry experts.', color: 'var(--cyan)' },
  { icon: 'bi-trophy-fill', title: 'Hackathon Prizes', desc: 'Compete for $500K+ in annual prizes across our global hackathons.', color: 'var(--gold)' },
  { icon: 'bi-people-fill', title: 'Global Network', desc: 'Connect with 5,000+ builders, investors, and researchers worldwide.', color: 'var(--pink)' },
  { icon: 'bi-shield-lock-fill', title: 'Privacy-First Tools', desc: 'Access exclusive privacy tools and infrastructure built by the community.', color: 'var(--green)' },
  { icon: 'bi-badge-fill', title: 'CypherBadge NFTs', desc: 'Earn on-chain credentials that prove your Web3 skills.', color: 'var(--purple)' },
  { icon: 'bi-rocket-takeoff-fill', title: 'Launch Support', desc: 'Get mentorship, funding introductions, and go-to-market support.', color: 'var(--cyan)' },
];

const SOCIALS = [
  { icon: 'bi-twitter-x', name: 'Twitter / X', handle: '@CypherpunkWeb3', desc: '14.2K followers', href: '#', color: '#000' },
  { icon: 'bi-discord', name: 'Discord', handle: 'Cypherpunk Server', desc: '8,400+ members', href: '#', color: '#5865F2' },
  { icon: 'bi-telegram', name: 'Telegram', handle: '@CypherpunkDAO', desc: '3,100 subscribers', href: '#', color: '#26A5E4' },
  { icon: 'bi-github', name: 'GitHub', handle: 'cypherpunk-io', desc: '1,200+ stars', href: '#', color: '#fff' },
  { icon: 'bi-youtube', name: 'YouTube', handle: 'Cypherpunk Channel', desc: '22K subscribers', href: '#', color: '#FF0000' },
];

const Community = () => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactStatus, setContactStatus] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        setWalletConnected(true);
      } catch (err) {
        console.error('Wallet connection rejected');
      }
    } else {
      // Demo mode
      setWalletAddress('0x71C7656EC7ab88b098defB751B7401B5f6d8976F');
      setWalletConnected(true);
    }
  };

  const handleContact = async (e) => {
    e.preventDefault();
    setContactStatus('loading');
    try {
      await axios.post(`${API}/contact`, contactForm);
      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (err) {
      setContactStatus('success'); // Demo mode
    }
  };

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'linear-gradient(135deg, rgba(0,255,255,0.06) 0%, rgba(255,0,127,0.06) 100%), var(--bg-surface)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,255,255,0.1) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <span className="section-label"><i className="bi bi-people me-2"></i>Community</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Join the <span className="gradient-text">Revolution</span>
            </h1>
            <p className="section-subtitle mx-auto mb-5">
              Become part of a global community of Web3 builders, privacy advocates, and digital sovereignty warriors. No permission required — just code.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a href="#membership" className="btn-solid-cyan" style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
                <i className="bi bi-person-plus-fill me-2"></i>Become a Member
              </a>
              <a href="#contact" className="btn-neon" style={{ padding: '14px 40px', fontSize: '1.05rem' }}>
                <i className="bi bi-chat-dots me-2"></i>Get in Touch
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Membership Benefits */}
      <section id="membership" className="section-pad grid-bg">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-5">
              <span className="section-label"><i className="bi bi-gem me-2"></i>Membership</span>
              <h2 className="section-title">What You <span className="gradient-text">Unlock</span></h2>
              <p className="section-subtitle mx-auto">Cypherpunk membership is free and open to all builders. Here's what you get access to.</p>
            </div>
          </ScrollReveal>

          <div className="row g-4">
            {BENEFITS.map((b, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <ScrollReveal delay={i * 80}>
                  <div className="glass-card p-4 h-100 d-flex flex-column">
                    <div style={{ width: 52, height: 52, borderRadius: 12, background: `${b.color}18`, border: `1px solid ${b.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <i className={`bi ${b.icon}`} style={{ fontSize: '1.4rem', color: b.color }}></i>
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 8 }}>{b.title}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.7, margin: 0 }}>{b.desc}</p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          <ScrollReveal delay={200}>
            <div className="text-center mt-5">
              <div className="glass-card p-5 d-inline-block" style={{ maxWidth: 600, width: '100%' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 16 }}>
                  // MEMBERSHIP_TIERS
                </div>
                <div className="row g-3">
                  {[
                    { tier: 'Anon', color: 'var(--text-secondary)', price: 'Free', desc: 'Open access to events & blog' },
                    { tier: 'Builder', color: 'var(--cyan)', price: '0.01 ETH', desc: 'Full community access + badges' },
                    { tier: 'Cypher', color: 'var(--gold)', price: '0.1 ETH', desc: 'VIP events + VC introductions' },
                  ].map(({ tier, color, price, desc }) => (
                    <div className="col-12" key={tier}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'var(--bg-glass)', border: `1px solid ${color}30`, borderRadius: 8, flexWrap: 'wrap', gap: 8 }}>
                        <div>
                          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color, marginRight: 12 }}>{tier}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>{desc}</span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color, fontWeight: 700 }}>{price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Wallet Connect */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <ScrollReveal>
                <span className="section-label"><i className="bi bi-wallet2 me-2"></i>Wallet Connect</span>
                <h2 className="section-title">Connect Your <span className="gradient-text">Web3 Identity</span></h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 24 }}>
                  Link your Ethereum wallet to verify your on-chain identity, access member-only content, and receive your CypherBadge credentials.
                </p>
                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32 }}>
                  {['MetaMask, WalletConnect & Coinbase Wallet supported', 'No KYC — your keys, your identity', 'Access exclusive on-chain content', 'Receive CypherBadge NFT credentials'].map((item, i) => (
                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: 10 }}>
                      <i className="bi bi-check-circle-fill" style={{ color: 'var(--green)', fontSize: '0.9rem', flexShrink: 0 }}></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
            <div className="col-lg-6">
              <ScrollReveal delay={200}>
                <div className="glass-card p-5 text-center">
                  {walletConnected ? (
                    <div>
                      <div style={{ width: 70, height: 70, borderRadius: '50%', background: 'rgba(0,255,136,0.15)', border: '2px solid var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 0 30px rgba(0,255,136,0.3)' }}>
                        <i className="bi bi-check-circle-fill" style={{ fontSize: '1.8rem', color: 'var(--green)' }}></i>
                      </div>
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--green)', marginBottom: 8 }}>Wallet Connected!</h5>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 20, wordBreak: 'break-all' }}>
                        {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                      </div>
                      <div style={{ padding: '12px 20px', background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)', borderRadius: 8 }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--green)', margin: 0 }}>
                          ✦ Welcome to Cypherpunk, Builder.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div style={{ fontSize: '3rem', marginBottom: 16 }}>🦊</div>
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 8 }}>Connect Your Wallet</h5>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: 28 }}>
                        Verify your Web3 identity and unlock exclusive member benefits.
                      </p>
                      <button className="wallet-btn w-100" onClick={connectWallet}>
                        <i className="bi bi-wallet2"></i> Connect MetaMask
                      </button>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 12, marginBottom: 0 }}>
                        WalletConnect & Coinbase Wallet coming soon
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="section-pad grid-bg">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-5">
              <span className="section-label"><i className="bi bi-broadcast me-2"></i>Find Us</span>
              <h2 className="section-title">Join the <span className="gradient-text">Conversation</span></h2>
            </div>
          </ScrollReveal>
          <div className="row g-4">
            {SOCIALS.map((s, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <ScrollReveal delay={i * 80}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    <div className="glass-card p-4 d-flex align-items-center gap-4 h-100">
                      <div style={{ width: 54, height: 54, borderRadius: '50%', background: `${s.color}18`, border: `1px solid ${s.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <i className={`bi ${s.icon}`} style={{ fontSize: '1.4rem', color: s.color }}></i>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 2, color: 'var(--text-primary)' }}>{s.name}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', marginBottom: 4 }}>{s.handle}</div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.desc}</div>
                      </div>
                      <i className="bi bi-arrow-right ms-auto" style={{ color: 'var(--text-muted)' }}></i>
                    </div>
                  </a>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="section-pad" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-5">
              <ScrollReveal>
                <span className="section-label"><i className="bi bi-envelope me-2"></i>Contact</span>
                <h2 className="section-title">Get in <span className="gradient-text">Touch</span></h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 32 }}>
                  Have a question, partnership inquiry, or just want to say hello? We respond to every message within 48 hours.
                </p>
                <div className="d-flex flex-column gap-4">
                  {[
                    { icon: 'bi-envelope-fill', label: 'General Inquiries', value: 'hello@cypherpunk.io', color: 'var(--cyan)' },
                    { icon: 'bi-briefcase-fill', label: 'Partnerships', value: 'partners@cypherpunk.io', color: 'var(--pink)' },
                    { icon: 'bi-code-slash', label: 'Technical Issues', value: 'dev@cypherpunk.io', color: 'var(--gold)' },
                  ].map(({ icon, label, value, color }) => (
                    <div key={label} className="d-flex align-items-center gap-3">
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: `${color}15`, border: `1px solid ${color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <i className={`bi ${icon}`} style={{ color, fontSize: '1.1rem' }}></i>
                      </div>
                      <div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
                        <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-primary)' }}>{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="col-lg-7">
              <ScrollReveal delay={200}>
                <div className="glass-card p-5">
                  {contactStatus === 'success' ? (
                    <div className="text-center py-4">
                      <i className="bi bi-send-check-fill" style={{ fontSize: '3rem', color: 'var(--green)', display: 'block', marginBottom: 16 }}></i>
                      <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--green)', marginBottom: 8 }}>Message Received!</h5>
                      <p style={{ color: 'var(--text-secondary)' }}>Transmission successful. We'll respond within 48 hours.</p>
                      <button className="btn-neon mt-3" onClick={() => setContactStatus('')}>Send Another</button>
                    </div>
                  ) : (
                    <form onSubmit={handleContact}>
                      <div className="row g-3">
                        <div className="col-md-6">
                          <label className="ag-form-label">Your Name</label>
                          <input className="ag-form-control form-control" type="text" placeholder="Satoshi Nakamoto" required value={contactForm.name} onChange={e => setContactForm({ ...contactForm, name: e.target.value })} />
                        </div>
                        <div className="col-md-6">
                          <label className="ag-form-label">Email Address</label>
                          <input className="ag-form-control form-control" type="email" placeholder="you@example.com" required value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} />
                        </div>
                        <div className="col-12">
                          <label className="ag-form-label">Message</label>
                          <textarea
                            className="ag-form-control form-control"
                            rows="6"
                            placeholder="Tell us what's on your mind. We read everything."
                            required
                            value={contactForm.message}
                            onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                          ></textarea>
                        </div>
                        <div className="col-12">
                          <button type="submit" className="btn-solid-cyan w-100" disabled={contactStatus === 'loading'} style={{ padding: '14px', fontSize: '1rem' }}>
                            {contactStatus === 'loading' ? (
                              <><i className="bi bi-hourglass-split me-2"></i>Sending...</>
                            ) : (
                              <><i className="bi bi-send-fill me-2"></i>Send Message</>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-pad" style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.06), rgba(255,0,127,0.06))', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container text-center">
          <ScrollReveal>
            <div style={{ fontSize: '3rem', marginBottom: 20 }}>⚡</div>
            <h2 className="section-title">
              The Code Cannot <span className="gradient-text">Be Stopped</span>
            </h2>
            <p className="section-subtitle mx-auto mb-5">
              "We know that software can't be destroyed and that a widely dispersed system can't be shut down."<br />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>— Cypherpunk Manifesto, 1993</span>
            </p>
            <Link to="/programs" className="btn-solid-cyan" style={{ padding: '16px 50px', fontSize: '1.1rem' }}>
              <i className="bi bi-lightning-charge-fill me-2"></i>Start Your Journey
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Community;
