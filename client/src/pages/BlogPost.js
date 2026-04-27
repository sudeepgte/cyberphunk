import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const FALLBACK_POSTS = {
  'cyberphunk-manifesto-privacy': {
    title: 'The CyberPhunk Ethos: Why Privacy Is Not Optional',
    category: 'Privacy', author: 'CyberPhunk Core', views: 2341,
    thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200',
    published_at: '2026-03-15T00:00:00Z',
    tags: 'privacy,ethos,cyberphunk',
    body: `<p>In the digital age, the principles of CyberPhunk are more relevant than ever. Privacy is necessary for an open society. selectivity in revealing oneself to the world is the power we aim to restore to every individual.</p>
    <h2>What Is Privacy?</h2>
    <p>A private matter is something one doesn't want the whole world to know. Privacy is the power to selectively reveal oneself to the world. This is the foundation of digital sovereignty.</p>
    <h2>Builders Write Code</h2>
    <p>The core of CyberPhunk is building. We don't just talk about decentralization; we build the tools that make it possible. From anonymous payments to P2P messaging, the mission is clear: decentralize everything.</p>
    <blockquote style="border-left: 3px solid var(--primary); padding-left: 20px; margin: 24px 0; font-style: italic; color: var(--text-secondary);">
    "We know that software can't be destroyed and that a widely dispersed system can't be shut down."
    </blockquote>
    <h2>Why It Matters Today</h2>
    <p>Every transaction and relationship is being logged. We build the alternatives. CyberPhunk is the platform where the next generation of privacy-preserving technologies is born.</p>`,
  },
  'bitcoin-15-years-global-reserve': {
    title: 'Bitcoin at 15: From CyberPhunk Dream to Global Reserve',
    category: 'Bitcoin', author: 'Satoshi Nakamoto', views: 4502,
    thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200',
    published_at: '2026-03-01T00:00:00Z',
    tags: 'bitcoin,blockchain,cryptocurrency',
    body: `<p>On October 31, 2008, an anonymous figure calling themselves Satoshi Nakamoto posted a nine-page white paper. The title: "Bitcoin: A Peer-to-Peer Electronic Cash System." It was the ultimate dream realized.</p>
    <h2>The Problem Bitcoin Solved</h2>
    <p>Satoshi's breakthrough was the blockchain — a distributed ledger that no single entity controls, maintained by a network of nodes using cryptographic proof-of-work.</p>
    <h2>Fifteen Years Later</h2>
    <p>Today, Bitcoin is a global reserve asset. The dream of a currency that no government can inflate has become reality.</p>
    <blockquote style="border-left: 3px solid var(--accent); padding-left: 20px; margin: 24px 0; font-style: italic; color: var(--text-secondary);">
    "The root problem with conventional currency is all the trust that's required to make it work." — Satoshi Nakamoto
    </blockquote>`,
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts] = useState([
    { id: 1, slug: 'cyberphunk-manifesto-privacy', title: 'The CyberPhunk Ethos: Why Privacy Is Not Optional', category: 'Privacy', thumbnail: 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400' },
    { id: 2, slug: 'bitcoin-15-years-global-reserve', title: 'Bitcoin at 15: From CyberPhunk Dream to Global Reserve', category: 'Bitcoin', thumbnail: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400' },
  ].filter(p => p.slug !== slug));

  useEffect(() => {
    setLoading(true);
    axios.get(`${API}/posts/${slug}`)
      .then(r => { setPost(r.data.data); setLoading(false); })
      .catch(() => {
        const fallback = FALLBACK_POSTS[slug];
        setPost(fallback || null);
        setLoading(false);
      });
    window.scrollTo(0, 0);
  // eslint-disable-next-line
  }, [slug]);

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="loader-ring"></div>
    </div>
  );

  if (!post) return (
    <div className="text-center" style={{ paddingTop: '160px', paddingBottom: '80px' }}>
      <div style={{ fontSize: '4rem', marginBottom: 16 }}>🔍</div>
      <h2 style={{ fontFamily: 'var(--font-heading)' }}>Article Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 24 }}>This transmission seems lost in the blockchain.</p>
      <Link to="/blog" className="btn-neon">← Back to Blog</Link>
    </div>
  );

  const catTagClass = (cat) => ({ Privacy: 'tag-accent', Bitcoin: 'tag-primary', DeFi: 'tag-green', NFTs: 'tag-secondary', Blockchain: 'tag-purple' }[cat] || 'tag-primary');

  return (
    <>
      {/* Article Hero */}
      <section style={{ paddingTop: '100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', maxHeight: 480, overflow: 'hidden' }}>
          <img src={post.thumbnail} alt={post.title} style={{ width: '100%', height: 480, objectFit: 'cover', filter: 'brightness(0.4)', display: 'block' }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=1200'; }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(5,5,16,0.3), rgba(5,5,16,0.95))' }} />
          <div className="container" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', padding: '40px 24px' }}>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
                  <Link to="/blog" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                    <i className="bi bi-arrow-left me-1"></i>Blog
                  </Link>
                  <span style={{ color: 'var(--text-muted)' }}>/</span>
                  <span className={`tag-badge ${catTagClass(post.category)}`}>{post.category}</span>
                </div>
                <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 'clamp(1.6rem, 4vw, 2.6rem)', lineHeight: 1.25, color: 'white', marginBottom: 20 }}>
                  {post.title}
                </h1>
                <div className="d-flex align-items-center gap-4 flex-wrap" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                  <span><i className="bi bi-person me-1"></i>{post.author}</span>
                  <span><i className="bi bi-calendar3 me-1"></i>{post.published_at ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Published'}</span>
                  <span><i className="bi bi-eye me-1"></i>{post.views?.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="section-pad">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <ScrollReveal>
                {/* Tags */}
                {post.tags && (
                  <div className="mb-4">
                    {post.tags.split(',').map((tag, i) => (
                      <span key={i} className="tag-badge tag-primary me-1">{tag.trim()}</span>
                    ))}
                  </div>
                )}

                {/* Body */}
                <article
                  style={{
                    color: 'var(--text-secondary)',
                    lineHeight: 1.9,
                    fontSize: '1.02rem',
                  }}
                  dangerouslySetInnerHTML={{ __html: post.body || post.excerpt || '<p>Content loading...</p>' }}
                />

                {/* Share */}
                <div className="d-flex align-items-center gap-3 mt-5 pt-4" style={{ borderTop: '1px solid var(--border-glass)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Share:</span>
                  {[
                    { icon: 'bi-twitter-x', label: 'Twitter' },
                    { icon: 'bi-telegram', label: 'Telegram' },
                    { icon: 'bi-discord', label: 'Discord' },
                  ].map(({ icon, label }) => (
                    <a key={label} href="#" className="social-link" aria-label={label} style={{ width: 38, height: 38, fontSize: '0.95rem' }}>
                      <i className={`bi ${icon}`}></i>
                    </a>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-pad-sm" style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)' }}>
          <div className="container">
            <ScrollReveal>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 24 }}>
                More From the <span className="gradient-text">Cryptosphere</span>
              </h3>
              <div className="row g-4">
                {relatedPosts.slice(0, 2).map((rp, i) => (
                  <div className="col-md-6" key={rp.id}>
                    <Link to={`/blog/${rp.slug}`} style={{ textDecoration: 'none' }}>
                      <div className="glass-card d-flex gap-3 p-3 align-items-center">
                        <img src={rp.thumbnail} alt={rp.title} style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} onError={e => { e.target.src = 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=400'; }} />
                        <div>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--primary)', marginBottom: 4 }}>{rp.category}</div>
                          <h6 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '0.9rem', margin: 0, color: 'var(--text-primary)', lineHeight: 1.4 }}>{rp.title}</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogPost;
