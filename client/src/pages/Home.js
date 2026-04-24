import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroCanvas from '../components/HeroCanvas';
import CounterStat from '../components/CounterStat';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';
import gsap from 'gsap';

const API = 'http://localhost:5000/api';

// Fallback data in case backend is not connected
const FALLBACK_EVENTS = [
  { id: 1, title: 'Cypherpunk Bootcamp: Web3 Foundations', type: 'bootcamp', date: '2026-06-01', location: 'Online (Global)', description: 'A 4-week intensive program covering blockchain fundamentals, smart contract development, and DeFi protocols.' },
  { id: 2, title: 'Global Cypherpunk Hackathon 2026', type: 'hackathon', date: '2026-07-15', location: 'Berlin + Online', description: '72-hour global hackathon focused on privacy-preserving technologies. $50,000 in prizes.' },
  { id: 3, title: 'Web3 Accelerator Program — Cohort 3', type: 'accelerator', date: '2026-08-10', location: 'Singapore + Dubai', description: '12-week accelerator for early-stage Web3 startups. Mentorship and $25K seed investment.' },
];

const FALLBACK_POSTS = [
  { id: 1, slug: 'cypherpunk-manifesto-privacy', title: 'The Cypherpunk Manifesto: Why Privacy Is Not Optional', category: 'Privacy', author: 'Eric Hughes', thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800', excerpt: 'Revisiting the seminal 1993 document that predicted the privacy battles of the digital age.' },
  { id: 2, slug: 'bitcoin-15-years-global-reserve', title: 'Bitcoin at 15: From Cypherpunk Dream to Global Reserve', category: 'Bitcoin', author: 'Satoshi Nakamoto', thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800', excerpt: 'How a white paper transformed from a mailing list post to the foundation of a $1 trillion asset class.' },
  { id: 3, slug: 'defi-summer-3-protocols', title: 'DeFi Summer 3.0: The Protocols Rewriting Finance', category: 'DeFi', author: 'Vitalik Buterin', thumbnail: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800', excerpt: 'A deep dive into the latest wave of decentralized finance protocols challenging traditional banking.' },
];

const PARTNERS = [
  { name: 'Bitcoin Magazine', icon: 'bi-currency-bitcoin' },
  { name: 'Solana', icon: 'bi-lightning-charge' },
  { name: 'Crypto.com', icon: 'bi-shield-check' },
  { name: 'Ethereum', icon: 'bi-hexagon' },
  { name: 'Devcon', icon: 'bi-people' },
  { name: 'Dev3Pack', icon: 'bi-code-slash' },
];

const eventBadgeClass = (type) => ({
  bootcamp: 'badge-bootcamp',
  hackathon: 'badge-hackathon',
  accelerator: 'badge-accelerator',
  village: 'badge-village',
}[type] || 'badge-bootcamp');

const Home = () => {
  const [events, setEvents] = useState(FALLBACK_EVENTS);
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [typed, setTyped] = useState('');
  const words = ['GRAVITY', 'LIMITS', 'NORMS', 'CONTROL'];
  const [wordIdx, setWordIdx] = useState(0);
  const heroRef = useRef(null);

  // GSAP hero entrance animation
  useEffect(() => {
    if (!heroRef.current) return;
    const tl = gsap.timeline({ delay: 1.5 }); // wait for page loader
    tl.fromTo('.hero-label',  { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
      .fromTo('.hero-line-1', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .fromTo('.hero-line-2', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-line-3', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .fromTo('.hero-subtitle-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.2')
      .fromTo('.hero-cta-row',  { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo('.hero-stats-pill', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .fromTo('.hero-orbit',   { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.4)' }, '-=0.5');
    return () => tl.kill();
  }, []);

  // Typing effect
  useEffect(() => {
    const word = words[wordIdx];
    let i = 0;
    let typing = true;
    const interval = setInterval(() => {
      if (typing) {
        setTyped(word.slice(0, i + 1));
        i++;
        if (i === word.length) { typing = false; setTimeout(() => {}, 1200); }
      } else {
        setTyped(word.slice(0, i - 1));
        i--;
        if (i === 0) {
          typing = true;
          setWordIdx(prev => (prev + 1) % words.length);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  // eslint-disable-next-line
  }, [wordIdx]);

  // Fetch data
  useEffect(() => {
    axios.get(`${API}/events?limit=3`).then(r => { if (r.data.data?.length) setEvents(r.data.data.slice(0,3)); }).catch(() => {});
    axios.get(`${API}/posts?limit=3`).then(r => { if (r.data.data?.length) setPosts(r.data.data.slice(0,3)); }).catch(() => {});
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section grid-bg" style={{ paddingTop: 0 }}>
        <div className="hero-canvas-bg">
          <HeroCanvas />
        </div>
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,16,0.2) 0%, rgba(5,5,16,0.6) 70%, var(--bg-deep) 100%)', zIndex: 1 }} />

        <div className="container hero-content py-5" ref={heroRef} style={{ zIndex: 2, paddingTop: '120px !important' }}>
          <div className="row align-items-center min-vh-100 py-5">
            <div className="col-lg-8">
              <div style={{ opacity: 0 }} className="hero-label">
                <span className="section-label">
                  <i className="bi bi-broadcast me-2"></i>Web3 Community Platform Est. 2024
                </span>
              </div>

              <h1 className="hero-title mb-4">
                <span className="d-block hero-line-1" style={{ color: 'var(--text-primary)', opacity: 0 }}>DEFY</span>
                <span className="d-block neon-text-cyan hero-line-2" style={{ minHeight: '1.1em', opacity: 0 }}>
                  {typed}<span style={{ animation: 'neon-flicker 1s infinite', color: 'var(--pink)' }}>|</span>
                </span>
                <span className="d-block gradient-text hero-line-3" style={{ opacity: 0 }}>WITH CODE</span>
              </h1>

              <p className="hero-subtitle mb-5 hero-subtitle-text" style={{ opacity: 0 }}>
                The cypherpunk revolution lives here. Build, learn, and collaborate with a global community of Web3 builders, privacy advocates, and digital sovereignty warriors.
              </p>

              <div className="d-flex flex-wrap gap-3 hero-cta-row" style={{ opacity: 0 }}>
                <Link to="/community" className="btn-solid-cyan" style={{ padding: '14px 36px', fontSize: '1rem' }}>
                  <i className="bi bi-lightning-charge-fill"></i> Join the Revolution
                </Link>
                <Link to="/projects" className="btn-neon">
                  <i className="bi bi-grid-3x3-gap"></i> Explore Projects
                </Link>
              </div>

              {/* Live stats pill */}
              <div className="d-flex align-items-center gap-3 mt-5 hero-stats-pill" style={{ opacity: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 18px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: '40px' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'block', animation: 'pulse-glow 2s infinite' }}></span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>5,200+ Members Active</span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Next Hackathon: <span style={{ color: 'var(--gold)' }}>July 15</span>
                </div>
              </div>
            </div>

            {/* Right: floating blockchain node visual */}
            <div className="col-lg-4 d-none d-lg-flex justify-content-center align-items-center">
              <div className="animate-float hero-orbit" style={{ position: 'relative', width: 300, height: 300, opacity: 0 }}>
                <div style={{
                  width: '100%', height: '100%', borderRadius: '50%',
                  border: '2px solid rgba(0,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 0 80px rgba(0,255,255,0.15)',
                  animation: 'border-dance 4s infinite',
                }}>
                  <div style={{
                    width: '70%', height: '70%', borderRadius: '50%',
                    border: '1px solid rgba(255,0,127,0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    animation: 'border-dance 4s infinite reverse',
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--cyan)', lineHeight: 1, textShadow: '0 0 30px rgba(0,255,255,0.8)' }}>CP</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', letterSpacing: '0.3em', marginTop: '6px' }}>CYPHERPUNK</div>
                    </div>
                  </div>
                </div>
                {/* Orbiting dots */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: 10, height: 10,
                    borderRadius: '50%',
                    background: i % 2 === 0 ? 'var(--cyan)' : 'var(--pink)',
                    boxShadow: i % 2 === 0 ? 'var(--glow-cyan)' : 'var(--glow-pink)',
                    top: '50%', left: '50%',
                    transform: `rotate(${deg}deg) translateX(140px) translateY(-50%)`,
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2, animation: 'float 2s ease-in-out infinite' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.2em' }}>SCROLL</span>
            <i className="bi bi-chevron-double-down" style={{ color: 'var(--cyan)' }}></i>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section-pad-sm grid-bg" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)' }}>
        <div className="container">
          <div className="row g-4 text-center">
            {[
              { end: 5200, suffix: '+', label: 'Community Members' },
              { end: 32, suffix: '', label: 'Countries Represented' },
              { end: 12, suffix: '', label: 'Hackathons Hosted' },
              { end: 240, suffix: '+', label: 'Projects Built' },
            ].map((stat, i) => (
              <div className="col-6 col-md-3" key={i}>
                <ScrollReveal delay={i * 100}>
                  <CounterStat {...stat} />
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="section-pad manifesto-section dot-grid-bg">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <ScrollReveal>
                <span className="section-label"><i className="bi bi-shield-lock me-2"></i>The Manifesto</span>
                <h2 className="section-title">
                  Code is the <span className="gradient-text">Ultimate Weapon</span> of Freedom
                </h2>
              </ScrollReveal>
              {[
                { text: '"Privacy is necessary for an open society in the electronic age." We don\'t ask for privacy. We', highlight: 'build it.', delay: 100 },
                { text: '"We the Cypherpunks are dedicated to building anonymous systems."', highlight: 'We write code.', delay: 200 },
                { text: '"We know that software can\'t be destroyed and that a', highlight: 'widely dispersed system can\'t be shut down."', delay: 300 },
              ].map((q, i) => (
                <ScrollReveal key={i} delay={q.delay}>
                  <blockquote className="manifesto-quote">
                    {q.text} <em>{q.highlight}</em>
                  </blockquote>
                </ScrollReveal>
              ))}
              <ScrollReveal delay={400}>
                <Link to="/about" className="btn-neon mt-3">
                  <i className="bi bi-file-text"></i> Read Full Manifesto
                </Link>
              </ScrollReveal>
            </div>

            <div className="col-lg-6">
              <ScrollReveal delay={200}>
                <div className="glass-card p-4" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', lineHeight: 2, color: 'var(--text-secondary)' }}>
                  <div style={{ color: 'var(--cyan)', marginBottom: 12, fontSize: '0.75rem', letterSpacing: '0.2em' }}>// CYPHERPUNK_CORE.js</div>
                  <div><span style={{ color: 'var(--pink)' }}>const</span> <span style={{ color: 'var(--gold)' }}>mission</span> = {'{'}</div>
                  <div style={{ paddingLeft: 24 }}><span style={{ color: 'var(--cyan)' }}>privacy</span>: <span style={{ color: 'var(--green)' }}>"non-negotiable"</span>,</div>
                  <div style={{ paddingLeft: 24 }}><span style={{ color: 'var(--cyan)' }}>tools</span>: <span style={{ color: 'var(--green)' }}>"open-source forever"</span>,</div>
                  <div style={{ paddingLeft: 24 }}><span style={{ color: 'var(--cyan)' }}>identity</span>: <span style={{ color: 'var(--green)' }}>"self-sovereign"</span>,</div>
                  <div style={{ paddingLeft: 24 }}><span style={{ color: 'var(--cyan)' }}>censorship</span>: <span style={{ color: 'var(--pink)' }}>null</span>,</div>
                  <div style={{ paddingLeft: 24 }}><span style={{ color: 'var(--cyan)' }}>motto</span>: <span style={{ color: 'var(--green)' }}>"Cypherpunks write code"</span></div>
                  <div>{'}'}</div>
                  <div style={{ marginTop: 12 }}><span style={{ color: 'var(--purple)' }}>export default</span> mission;</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENTS ── */}
      <section className="section-pad" style={{ background: 'var(--bg-deep)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-5">
              <div>
                <span className="section-label"><i className="bi bi-calendar-event me-2"></i>Upcoming Events</span>
                <h2 className="section-title mb-0">Join the <span className="gradient-text">Next Wave</span></h2>
              </div>
              <Link to="/programs" className="btn-neon" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                View All Programs <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </ScrollReveal>

          <div className="row g-4">
            {events.map((ev, i) => (
              <div className="col-md-4" key={ev.id}>
                <ScrollReveal delay={i * 120}>
                  <div className="glass-card h-100 p-4 d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <span className={`event-type-badge ${eventBadgeClass(ev.type)}`}>{ev.type}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        <i className="bi bi-calendar3 me-1"></i>
                        {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 12, fontSize: '1.1rem' }}>{ev.title}</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', flex: 1, lineHeight: 1.7 }}>
                      {ev.description?.substring(0, 110)}...
                    </p>
                    <div className="d-flex align-items-center justify-content-between mt-3">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <i className="bi bi-geo-alt me-1"></i>{ev.location}
                      </span>
                      <Link to="/programs" className="btn-neon" style={{ padding: '6px 16px', fontSize: '0.8rem' }}>
                        Register
                      </Link>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST NEWS ── */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="d-flex justify-content-between align-items-end flex-wrap gap-3 mb-5">
              <div>
                <span className="section-label"><i className="bi bi-newspaper me-2"></i>Latest News</span>
                <h2 className="section-title mb-0">From the <span className="gradient-text-gold">Cryptosphere</span></h2>
              </div>
              <Link to="/blog" className="btn-neon btn-neon-gold" style={{ padding: '10px 24px', fontSize: '0.9rem' }}>
                All Articles <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>
          </ScrollReveal>

          <div className="row g-4">
            {posts.map((post, i) => (
              <div className="col-md-4" key={post.id}>
                <ScrollReveal delay={i * 120}>
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-card blog-card h-100">
                      <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0' }}>
                        <img
                          src={post.thumbnail}
                          alt={post.title}
                          className="blog-card-img"
                          onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800'; }}
                        />
                      </div>
                      <div className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-3">
                          <span className="tag-badge tag-cyan">{post.category}</span>
                        </div>
                        <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.4 }}>
                          {post.title}
                        </h5>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
                          {post.excerpt}
                        </p>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          <i className="bi bi-person me-1"></i>{post.author}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section className="section-pad-sm" style={{ background: 'var(--bg-deep)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <ScrollReveal>
            <p style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.3em', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: 40 }}>
              As Featured In / Powered By
            </p>
          </ScrollReveal>
          <div className="row g-4 align-items-center justify-content-center">
            {PARTNERS.map(({ name, icon }, i) => (
              <div className="col-6 col-md-2 text-center" key={i}>
                <ScrollReveal delay={i * 80}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.5, transition: 'opacity 0.3s', cursor: 'default' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = 1}
                    onMouseLeave={e => e.currentTarget.style.opacity = 0.5}
                  >
                    <i className={`bi ${icon}`} style={{ fontSize: '1.8rem', color: 'var(--cyan)' }}></i>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>{name}</span>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="section-pad" style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.05) 0%, rgba(255,0,127,0.05) 100%)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container text-center">
          <ScrollReveal>
            <span className="section-label"><i className="bi bi-rocket me-2"></i>Ready to Launch?</span>
            <h2 className="section-title">
              The Revolution Starts <span className="gradient-text">With You</span>
            </h2>
            <p className="section-subtitle mx-auto mb-5">
              Join thousands of builders, hackers, and privacy advocates who are shaping the decentralized future. No permission required.
            </p>
            <div className="d-flex flex-wrap justify-content-center gap-3">
              <Link to="/community" className="btn-solid-cyan" style={{ padding: '16px 44px', fontSize: '1.05rem' }}>
                <i className="bi bi-lightning-charge-fill"></i> Join Cypherpunk
              </Link>
              <Link to="/programs" className="btn-neon btn-neon-pink" style={{ padding: '16px 44px', fontSize: '1.05rem' }}>
                <i className="bi bi-calendar-event"></i> View Programs
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Home;
