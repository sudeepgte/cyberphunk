import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import VideoEmbed from '../components/VideoEmbed';

const TEAM = [
  { name: 'Cipher Nakamura', role: 'Founder & Lead Architect', avatar: 'https://i.pravatar.cc/150?img=11', bio: 'Bitcoin OG since 2011. Built privacy tools for 15+ years.', twitter: '#', github: '#' },
  { name: 'Vera Cryptova', role: 'Head of Education', avatar: 'https://i.pravatar.cc/150?img=47', bio: 'Ex-Ethereum Foundation. Runs global bootcamps.', twitter: '#', github: '#' },
  { name: 'Marcus Dechain', role: 'DeFi Protocol Lead', avatar: 'https://i.pravatar.cc/150?img=15', bio: 'Solidity master. Built 3 DeFi protocols with $200M+ TVL.', twitter: '#', github: '#' },
  { name: 'Aiko Hashimoto', role: 'ZK Research Lead', avatar: 'https://i.pravatar.cc/150?img=48', bio: 'PhD Cryptography. Specializes in zero-knowledge systems.', twitter: '#', github: '#' },
  { name: 'Dev Solaris', role: 'Community Manager', avatar: 'https://i.pravatar.cc/150?img=17', bio: 'Built communities across 30+ countries. Discord wizard.', twitter: '#', github: '#' },
  { name: 'Luna Vaults', role: 'NFT & Art Director', avatar: 'https://i.pravatar.cc/150?img=49', bio: 'Created 5 acclaimed NFT collections. Web3 art curator.', twitter: '#', github: '#' },
];

const TIMELINE = [
  { year: '1993', event: 'Eric Hughes publishes the Cypherpunk Manifesto. A movement is born.' },
  { year: '2008', event: 'Satoshi Nakamoto releases the Bitcoin whitepaper. Cypherpunk philosophy meets money.' },
  { year: '2015', event: 'Ethereum launches. Smart contracts make programmable money a reality.' },
  { year: '2020', event: 'DeFi Summer. Billions flow into decentralized protocols. No permission needed.' },
  { year: '2022', event: 'Cypherpunk founded. A platform to educate, build, and unite the community.' },
  { year: '2026', event: 'Present. 5,000+ members. 12 hackathons. 240+ projects. The revolution continues.' },
];

const PARTNERS = [
  { name: 'Ethereum Foundation', icon: 'bi-hexagon-fill', color: '#627EEA' },
  { name: 'Bitcoin Magazine', icon: 'bi-currency-bitcoin', color: '#F7931A' },
  { name: 'Solana Foundation', icon: 'bi-lightning-charge-fill', color: '#9945FF' },
  { name: 'Crypto.com', icon: 'bi-shield-check', color: '#00FFFF' },
  { name: 'Dev3Pack', icon: 'bi-code-slash', color: '#FF007F' },
  { name: 'Devcon', icon: 'bi-people-fill', color: '#FFD700' },
];

const About = () => {
  const [expandedMember, setExpandedMember] = useState(null);

  return (
    <>
      {/* Page Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'linear-gradient(to bottom, var(--bg-surface), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(0,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <span className="section-label"><i className="bi bi-info-circle me-2"></i>Our Story</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Who We Are &<br /><span className="gradient-text">Why We Exist</span>
            </h1>
            <p className="section-subtitle">
              Cypherpunk is a Web3 community platform born from the cypherpunk ethos — the belief that code is the ultimate instrument of freedom, privacy, and human sovereignty.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission */}
      <section className="section-pad grid-bg">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <ScrollReveal>
                <span className="section-label"><i className="bi bi-flag me-2"></i>Our Mission</span>
                <h2 className="section-title">Building the <span className="gradient-text">Decentralized Future</span></h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 20 }}>
                  We exist to educate, equip, and connect the next generation of Web3 builders. From blockchain fundamentals to advanced cryptography, our programs are designed to turn curious minds into cypherpunk engineers.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 32 }}>
                  We believe in open-source code, privacy by default, decentralized governance, and financial sovereignty for all — regardless of geography, nationality, or background.
                </p>
                <div className="row g-3">
                  {[
                    { icon: 'bi-shield-lock', label: 'Privacy First', color: 'var(--cyan)' },
                    { icon: 'bi-code-slash', label: 'Open Source', color: 'var(--pink)' },
                    { icon: 'bi-globe2', label: 'Decentralized', color: 'var(--gold)' },
                    { icon: 'bi-people', label: 'Community Led', color: 'var(--green)' },
                  ].map(({ icon, label, color }) => (
                    <div className="col-6" key={label}>
                      <div className="glass-card p-3 d-flex align-items-center gap-3">
                        <i className={`bi ${icon}`} style={{ fontSize: '1.4rem', color }}></i>
                        <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 600 }}>{label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            <div className="col-lg-6">
              <ScrollReveal delay={200}>
                <div style={{ padding: '40px', background: 'linear-gradient(135deg, rgba(0,255,255,0.05), rgba(255,0,127,0.05))', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '5rem', fontWeight: 700, color: 'rgba(0,255,255,0.1)', lineHeight: 1, marginBottom: 8 }}>"</div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', lineHeight: 1.7, color: 'var(--text-primary)', fontWeight: 500 }}>
                    We are the cypherpunks. We don't ask for privacy — <span style={{ color: 'var(--cyan)' }}>we build it</span>. We don't wait for permission — <span style={{ color: 'var(--pink)' }}>we write code</span>.
                  </p>
                  <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--bg-deep)', fontWeight: 700, fontSize: '0.9rem' }}>CP</div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700 }}>Cypherpunk Collective</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Est. 2022 — Decentralized</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-5">
              <span className="section-label"><i className="bi bi-clock-history me-2"></i>History</span>
              <h2 className="section-title">The Cypherpunk <span className="gradient-text">Timeline</span></h2>
            </div>
          </ScrollReveal>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="timeline">
                {TIMELINE.map((item, i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <div className="timeline-item">
                      <div className="timeline-dot" style={{ background: i % 2 === 0 ? 'var(--cyan)' : 'var(--pink)', boxShadow: i % 2 === 0 ? 'var(--glow-cyan)' : 'var(--glow-pink)' }}></div>
                      <div className="timeline-year">{item.year}</div>
                      <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7 }}>{item.event}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video */}
      <section className="section-pad grid-bg">
        <div className="container">
          <div className="row g-5 align-items-center">
            <div className="col-lg-5">
              <ScrollReveal>
                <span className="section-label"><i className="bi bi-play-circle me-2"></i>Watch</span>
                <h2 className="section-title">Cypherpunks <span className="gradient-text">Write Code</span></h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.9, marginBottom: 24 }}>
                  Explore the documentary that tells the story of the cypherpunk movement — the digital activists who believed encryption and open-source software could change the world. They were right.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <a href="https://www.youtube.com/watch?v=9vM0oIEhMag" target="_blank" rel="noopener noreferrer" className="btn-neon">
                    <i className="bi bi-youtube"></i> Watch Full Doc
                  </a>
                </div>
              </ScrollReveal>
            </div>
            <div className="col-lg-7">
              <ScrollReveal delay={200}>
                <VideoEmbed videoId="9vM0oIEhMag" title="Cypherpunks Write Code Documentary" />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-5">
              <span className="section-label"><i className="bi bi-people me-2"></i>The Team</span>
              <h2 className="section-title">Meet the <span className="gradient-text">Builders</span></h2>
              <p className="section-subtitle mx-auto">The people behind Cypherpunk — cypherpunks, engineers, educators, and community builders.</p>
            </div>
          </ScrollReveal>
          <div className="row g-4">
            {TEAM.map((member, i) => (
              <div className="col-md-6 col-lg-4" key={i}>
                <ScrollReveal delay={i * 100}>
                  <div
                    className="glass-card p-4 text-center h-100 d-flex flex-column align-items-center"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setExpandedMember(expandedMember === i ? null : i)}
                  >
                    <img src={member.avatar} alt={member.name} className="team-avatar" />
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 4 }}>{member.name}</h5>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--cyan)', marginBottom: 12 }}>{member.role}</div>
                    {expandedMember === i && (
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: 16 }}>{member.bio}</p>
                    )}
                    <div className="d-flex gap-2 mt-auto">
                      <a href={member.twitter} className="social-link" aria-label="Twitter"><i className="bi bi-twitter-x"></i></a>
                      <a href={member.github} className="social-link" aria-label="GitHub"><i className="bi bi-github"></i></a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section-pad-sm" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <ScrollReveal>
            <p className="text-center mb-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Partners & Collaborators
            </p>
          </ScrollReveal>
          <div className="row g-4 justify-content-center align-items-center">
            {PARTNERS.map(({ name, icon, color }, i) => (
              <div className="col-6 col-md-2 text-center" key={i}>
                <ScrollReveal delay={i * 80}>
                  <div style={{ opacity: 0.5, transition: 'opacity 0.3s', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                  >
                    <i className={`bi ${icon}`} style={{ fontSize: '2rem', color, display: 'block', marginBottom: 8 }}></i>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{name}</span>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-pad" style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.05), rgba(255,0,127,0.05))', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container text-center">
          <ScrollReveal>
            <h2 className="section-title">Ready to <span className="gradient-text">Join Us?</span></h2>
            <p className="section-subtitle mx-auto mb-5">Become part of the movement. No permission required.</p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <Link to="/community" className="btn-solid-cyan" style={{ padding: '14px 40px' }}>
                <i className="bi bi-person-plus-fill"></i> Join Community
              </Link>
              <Link to="/programs" className="btn-neon btn-neon-pink" style={{ padding: '14px 40px' }}>
                <i className="bi bi-calendar-event"></i> View Programs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default About;
