import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const FALLBACK_PROJECTS = [
  { id: 1, title: 'GhostPay — Anonymous Payment Protocol', description: 'A zero-knowledge payment protocol built on Ethereum that enables fully anonymous transactions using ZK-SNARKs.', category: 'privacy', tags: 'privacy,zkproofs,ethereum', image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', github_url: '#', live_url: '#', author: 'CipherDev Team', is_featured: 1 },
  { id: 2, title: 'ApeVault — NFT-Collateralized Lending', description: 'Borrow stablecoins against your NFT collection without selling your assets. Real-time floor price oracles.', category: 'defi', tags: 'defi,nft,lending', image_url: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800', github_url: '#', live_url: '#', author: 'DeFi Apes', is_featured: 1 },
  { id: 3, title: 'DAOforge — No-Code DAO Builder', description: 'Create and manage decentralized autonomous organizations without code. Voting, treasury, and proposals.', category: 'dao', tags: 'dao,governance,nocode', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', github_url: '#', live_url: null, author: 'CryptoCraft Labs', is_featured: 0 },
  { id: 4, title: 'SolanaStream — Real-Time DeFi Analytics', description: 'Monitor DeFi positions and wallet activity across Solana ecosystem in real-time. Yield optimizer included.', category: 'defi', tags: 'solana,analytics,defi', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', github_url: '#', live_url: null, author: 'BlockScope', is_featured: 0 },
  { id: 5, title: 'ZKVote — Private On-Chain Voting', description: 'Decentralized voting using ZK-proofs to ensure ballot privacy. Used in 3 major DAO elections.', category: 'privacy', tags: 'voting,zkproofs,dao', image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', github_url: '#', live_url: '#', author: 'PrivacyFirst', is_featured: 0 },
  { id: 6, title: 'CypherBadge — Soulbound NFTs', description: 'Non-transferable NFTs that certify Web3 skills. Your on-chain resume and credential system.', category: 'nft', tags: 'nft,soulbound,identity', image_url: 'https://images.unsplash.com/photo-1646753522408-077ef9839300?w=800', github_url: '#', live_url: '#', author: 'Cypherpunk Team', is_featured: 1 },
  { id: 7, title: 'MeshNet — P2P Encrypted Messaging', description: 'Browser-based P2P encrypted messaging with no central server. No accounts, no logs, no trace.', category: 'privacy', tags: 'privacy,p2p,messaging', image_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', github_url: '#', live_url: '#', author: 'CipherDev Team', is_featured: 0 },
  { id: 8, title: 'LiquidGov — Cross-Chain Governance', description: 'Vote on protocol proposals across 10+ blockchains using a single interface. Liquid democracy.', category: 'dao', tags: 'dao,crosschain,governance', image_url: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800', github_url: '#', live_url: null, author: 'MultiChain Labs', is_featured: 0 },
];

const CATEGORIES = [
  { id: 'all', label: 'All Projects', icon: 'bi-grid-3x3-gap' },
  { id: 'defi', label: 'DeFi', icon: 'bi-currency-exchange' },
  { id: 'nft', label: 'NFT', icon: 'bi-image' },
  { id: 'privacy', label: 'Privacy', icon: 'bi-shield-lock' },
  { id: 'dao', label: 'DAO', icon: 'bi-people' },
];

const categoryColors = { defi: 'var(--cyan)', nft: 'var(--pink)', privacy: 'var(--gold)', dao: 'var(--green)', tool: 'var(--purple)', other: 'var(--text-secondary)' };
const tagColors = ['tag-cyan', 'tag-pink', 'tag-gold', 'tag-green', 'tag-purple'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const [_hoveredId, setHoveredId] = useState(null); // eslint-disable-line no-unused-vars

  useEffect(() => {
    const url = activeFilter === 'all' ? `${API}/projects` : `${API}/projects?category=${activeFilter}`;
    axios.get(url).then(r => { if (r.data.data?.length) setProjects(r.data.data); }).catch(() => {});
  }, [activeFilter]);

  const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.category === activeFilter);
  const featured = projects.find(p => p.is_featured);

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'linear-gradient(to bottom, var(--bg-surface), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <span className="section-label"><i className="bi bi-grid-3x3-gap me-2"></i>Showcase</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Community <br /><span className="gradient-text">Projects</span>
            </h1>
            <p className="section-subtitle">
              Explore cutting-edge Web3 projects built by the Cypherpunk community — from privacy tools and DeFi protocols to NFT platforms and DAO infrastructure.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Project */}
      {featured && (
        <section className="section-pad-sm" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <ScrollReveal>
              <span className="section-label mb-3 d-block"><i className="bi bi-star-fill me-2"></i>Featured Project</span>
              <div className="glass-card overflow-hidden">
                <div className="row g-0">
                  <div className="col-md-5">
                    <img src={featured.image_url} alt={featured.title} style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover', display: 'block' }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800'; }} />
                  </div>
                  <div className="col-md-7 p-5 d-flex flex-column justify-content-center">
                    <div className="d-flex align-items-center gap-3 mb-3">
                      <span style={{ background: 'rgba(255,215,0,0.15)', color: 'var(--gold)', border: '1px solid rgba(255,215,0,0.3)', padding: '4px 14px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                        <i className="bi bi-star-fill me-1"></i>Featured
                      </span>
                      <span style={{ background: `${categoryColors[featured.category]}18`, color: categoryColors[featured.category], border: `1px solid ${categoryColors[featured.category]}40`, padding: '4px 14px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        {featured.category}
                      </span>
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 12 }}>{featured.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20 }}>{featured.description}</p>
                    <div className="mb-4">
                      {featured.tags?.split(',').map((tag, j) => (
                        <span key={j} className={`tag-badge ${tagColors[j % tagColors.length]} me-1`}>{tag.trim()}</span>
                      ))}
                    </div>
                    <div className="d-flex gap-3 flex-wrap">
                      {featured.live_url && <a href={featured.live_url} target="_blank" rel="noopener noreferrer" className="btn-solid-cyan" style={{ padding: '10px 24px', fontSize: '0.9rem' }}><i className="bi bi-box-arrow-up-right me-1"></i>Live Demo</a>}
                      {featured.github_url && <a href={featured.github_url} target="_blank" rel="noopener noreferrer" className="btn-neon" style={{ padding: '10px 24px', fontSize: '0.9rem' }}><i className="bi bi-github me-1"></i>GitHub</a>}
                    </div>
                    <div style={{ marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <i className="bi bi-person me-1"></i>Built by {featured.author}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* Filter + Grid */}
      <section className="section-pad grid-bg">
        <div className="container">
          <ScrollReveal>
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5">
              <h2 className="section-title mb-0" style={{ fontSize: '2rem' }}>
                All Projects <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '1rem' }}>({filtered.length})</span>
              </h2>
              <div className="filter-tabs">
                {CATEGORIES.map(cat => (
                  <button key={cat.id} className={`filter-tab ${activeFilter === cat.id ? 'active' : ''}`} onClick={() => setActiveFilter(cat.id)}>
                    <i className={`bi ${cat.icon} me-1`}></i>{cat.label}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="row g-4">
            {filtered.map((proj, i) => (
              <div className="col-md-6 col-lg-4" key={proj.id}>
                <ScrollReveal delay={i * 80}>
                  <div
                    className="glass-card project-card h-100 d-flex flex-column"
                    style={{ overflow: 'hidden', position: 'relative' }}
                    onMouseEnter={() => setHoveredId(proj.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <div style={{ overflow: 'hidden', position: 'relative' }}>
                      <img src={proj.image_url} alt={proj.title} className="project-card-img" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800'; }} />
                      {proj.is_featured ? (
                        <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,215,0,0.9)', color: '#000', padding: '4px 10px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 700 }}>
                          <i className="bi bi-star-fill me-1"></i>FEATURED
                        </div>
                      ) : null}
                    </div>

                    <div className="p-4 flex-grow-1 d-flex flex-column">
                      <div className="d-flex align-items-center gap-2 mb-2">
                        <span style={{ background: `${categoryColors[proj.category]}18`, color: categoryColors[proj.category], border: `1px solid ${categoryColors[proj.category]}40`, padding: '2px 10px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', textTransform: 'uppercase' }}>
                          {proj.category}
                        </span>
                      </div>
                      <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1rem', marginBottom: 10, lineHeight: 1.4 }}>{proj.title}</h5>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.7, flex: 1 }}>
                        {proj.description}
                      </p>
                      <div className="mb-3">
                        {proj.tags?.split(',').slice(0, 3).map((tag, j) => (
                          <span key={j} className={`tag-badge ${tagColors[j % tagColors.length]}`}>{tag.trim()}</span>
                        ))}
                      </div>
                      <div className="d-flex align-items-center justify-content-between" style={{ borderTop: '1px solid var(--border-glass)', paddingTop: 12 }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <i className="bi bi-person me-1"></i>{proj.author}
                        </span>
                        <div className="d-flex gap-2">
                          {proj.github_url && (
                            <a href={proj.github_url} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: 34, height: 34, fontSize: '0.9rem' }} aria-label="GitHub">
                              <i className="bi bi-github"></i>
                            </a>
                          )}
                          {proj.live_url && (
                            <a href={proj.live_url} target="_blank" rel="noopener noreferrer" className="social-link" style={{ width: 34, height: 34, fontSize: '0.9rem' }} aria-label="Live Demo">
                              <i className="bi bi-box-arrow-up-right"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-search" style={{ fontSize: '3rem', color: 'var(--text-muted)', display: 'block', marginBottom: 16 }}></i>
              <p style={{ color: 'var(--text-secondary)' }}>No projects found in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="section-pad-sm" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="glass-card p-5 text-center" style={{ maxWidth: 700, margin: '0 auto' }}>
              <i className="bi bi-plus-circle-fill" style={{ fontSize: '2.5rem', color: 'var(--cyan)', display: 'block', marginBottom: 16 }}></i>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 12 }}>
                Built Something <span className="gradient-text">Awesome?</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
                Submit your Web3 project to be featured in the Cypherpunk showcase. We highlight the best community-built tools and experiments.
              </p>
              <a href="mailto:projects@cypherpunk.io" className="btn-solid-cyan" style={{ padding: '12px 32px' }}>
                <i className="bi bi-send-fill me-2"></i>Submit Your Project
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
};

export default Projects;
