import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const FALLBACK_POSTS = [
  { id: 1, slug: 'cyberphunk-manifesto-privacy', title: 'The CyberPhunk Ethos: Why Privacy Is Not Optional', category: 'Privacy', author: 'CyberPhunk Core', thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800', excerpt: 'Revisiting the seminal principles that predicted the privacy battles of the digital age — and why they matter more than ever.', published_at: '2026-03-15T00:00:00Z', views: 2341 },
  { id: 2, slug: 'bitcoin-15-years-global-reserve', title: 'Bitcoin at 15: From CyberPhunk Dream to Global Reserve', category: 'Bitcoin', author: 'Satoshi Nakamoto', thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=800', excerpt: 'How Satoshi Nakamoto\'s white paper transformed from a mailing list post to the foundation of a $1 trillion asset class.', published_at: '2026-03-01T00:00:00Z', views: 4502 },
  { id: 3, slug: 'defi-summer-3-protocols', title: 'DeFi Summer 3.0: The Protocols Rewriting Finance', category: 'DeFi', author: 'CyberPhunk Labs', thumbnail: 'https://images.unsplash.com/photo-1642790551116-18e150f248e3?w=800', excerpt: 'A deep dive into the latest wave of decentralized finance protocols that are challenging traditional banking institutions.', published_at: '2026-02-20T00:00:00Z', views: 3187 },
  { id: 4, slug: 'zero-knowledge-proofs-explained', title: 'Zero-Knowledge Proofs: The Math Behind Private Transactions', category: 'Privacy', author: 'Zooko Wilcox', thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800', excerpt: 'Understanding ZK-SNARKs and ZK-STARKs — the cryptographic magic that enables Zcash, StarkNet, and zkSync.', published_at: '2026-02-10T00:00:00Z', views: 1876 },
  { id: 5, slug: 'nfts-beyond-art-digital-ownership', title: 'NFTs Beyond Art: The Next Chapter for Digital Ownership', category: 'NFTs', author: 'Yat Siu', thumbnail: 'https://images.unsplash.com/photo-1646753522408-077ef9839300?w=800', excerpt: 'How non-fungible tokens are evolving from profile pictures to real-world asset tokenization and digital identity.', published_at: '2026-01-28T00:00:00Z', views: 2954 },
  { id: 6, slug: 'solana-vs-ethereum-layer1-2026', title: 'Solana vs Ethereum: The Layer-1 Wars of 2026', category: 'Blockchain', author: 'Anatoly Yakovenko', thumbnail: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?w=800', excerpt: 'Analyzing technical and ecosystem differences between the two dominant smart contract platforms.', published_at: '2026-01-15T00:00:00Z', views: 5629 },
];

const CATEGORIES = ['All', 'Privacy', 'Bitcoin', 'DeFi', 'NFTs', 'Blockchain'];

const catTagClass = (cat) => ({ Privacy: 'tag-accent', Bitcoin: 'tag-primary', DeFi: 'tag-green', NFTs: 'tag-secondary', Blockchain: 'tag-purple' }[cat] || 'tag-primary');

const Blog = () => {
  const [posts, setPosts] = useState(FALLBACK_POSTS);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const cat = activeCategory === 'All' ? '' : activeCategory;
    axios.get(`${API}/posts${cat ? `?category=${cat}` : ''}`).then(r => { if (r.data.data?.length) setPosts(r.data.data); }).catch(() => {});
  }, [activeCategory]);

  const filtered = posts.filter(p =>
    (activeCategory === 'All' || p.category === activeCategory) &&
    (!search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt?.toLowerCase().includes(search.toLowerCase()))
  );

  const [featured, ...rest] = filtered;

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'linear-gradient(to bottom, var(--bg-surface), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,107,0,0.07) 1px, transparent 1px)', backgroundSize: '45px 45px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <span className="section-label"><i className="bi bi-newspaper me-2"></i>Blog & News</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              From the <br /><span className="gradient-text">Cryptosphere</span>
            </h1>
            <p className="section-subtitle">
              News, analysis, tutorials, and deep dives from the frontlines of the Web3 revolution.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Search + Filters */}
      <section style={{ background: 'var(--bg-surface)', padding: '24px 0', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', position: 'sticky', top: '72px', zIndex: 100, backdropFilter: 'blur(20px)' }}>
        <div className="container">
          <div className="d-flex flex-wrap gap-3 align-items-center justify-content-between">
            {/* Search */}
            <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: 380 }}>
              <i className="bi bi-search" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}></i>
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="ag-form-control form-control"
                style={{ paddingLeft: '40px' }}
              />
            </div>
            {/* Category Tabs */}
            <div className="filter-tabs flex-wrap">
              {CATEGORIES.map(cat => (
                <button key={cat} className={`filter-tab ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="section-pad grid-bg">
        <div className="container">
          {/* Featured Post */}
          {featured && !search && (
            <ScrollReveal>
              <Link to={`/blog/${featured.slug}`} style={{ textDecoration: 'none' }}>
                <div className="glass-card blog-card mb-5 overflow-hidden" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 340px', overflow: 'hidden' }}>
                    <img src={featured.thumbnail} alt={featured.title} style={{ width: '100%', height: '100%', minHeight: 300, objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800'; }}
                    />
                  </div>
                  <div className="p-5 d-flex flex-column justify-content-center" style={{ flex: '1 1 340px' }}>
                    <div className="d-flex align-items-center gap-2 mb-3">
                      <span style={{ background: 'rgba(255,107,0,0.15)', color: 'var(--primary)', border: '1px solid rgba(255,107,0,0.3)', padding: '3px 12px', borderRadius: 20, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                        <i className="bi bi-star-fill me-1"></i>Featured
                      </span>
                      <span className={`tag-badge ${catTagClass(featured.category)}`}>{featured.category}</span>
                    </div>
                    <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.6rem', lineHeight: 1.3, marginBottom: 12, color: 'var(--text-primary)' }}>{featured.title}</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 20, fontSize: '0.95rem' }}>{featured.excerpt}</p>
                    <div className="d-flex align-items-center gap-4">
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}><i className="bi bi-person me-1"></i>{featured.author}</span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}><i className="bi bi-eye me-1"></i>{featured.views?.toLocaleString()} views</span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Article Grid */}
          <div className="row g-4">
            {(search ? filtered : rest).map((post, i) => (
              <div className="col-md-6 col-lg-4" key={post.id}>
                <ScrollReveal delay={i * 80}>
                  <Link to={`/blog/${post.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="glass-card blog-card h-100">
                      <div style={{ overflow: 'hidden', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0' }}>
                        <img src={post.thumbnail} alt={post.title} className="blog-card-img" onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800'; }} />
                      </div>
                      <div className="p-4">
                        <div className="d-flex align-items-center gap-2 mb-2">
                          <span className={`tag-badge ${catTagClass(post.category)}`}>{post.category}</span>
                        </div>
                        <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.02rem', color: 'var(--text-primary)', marginBottom: 10, lineHeight: 1.4 }}>{post.title}</h5>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.87rem', lineHeight: 1.7, marginBottom: 16 }}>{post.excerpt}</p>
                        <div className="d-flex align-items-center justify-content-between">
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}><i className="bi bi-person me-1"></i>{post.author}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}><i className="bi bi-eye me-1"></i>{post.views?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-5">
              <i className="bi bi-file-earmark-x" style={{ fontSize: '3rem', color: 'var(--text-muted)', display: 'block', marginBottom: 16 }}></i>
              <p style={{ color: 'var(--text-secondary)' }}>No articles found. Try a different search term.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Blog;
