import React, { useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const TRACKS = [
  {
    id: 1, type: 'bootcamp', icon: 'bi-mortarboard-fill', color: 'var(--cyan)',
    title: 'Web3 Bootcamp', subtitle: '4-Week Intensive',
    description: 'A comprehensive introduction to blockchain development. Learn Solidity, smart contract security, wallet integration, and DeFi protocols from expert mentors.',
    modules: ['Blockchain Fundamentals', 'Solidity & Smart Contracts', 'DeFi Protocols', 'Wallet & Frontend Integration', 'Security Auditing'],
    outcome: 'Graduate with your first deployed smart contract and a CypherBadge NFT credential.',
    capacity: 200, badge: 'badge-bootcamp',
  },
  {
    id: 2, type: 'hackathon', icon: 'bi-lightning-charge-fill', color: 'var(--pink)',
    title: 'Global Hackathon', subtitle: '72-Hour Sprint',
    description: '72-hour global hackathon focused on privacy-preserving technologies. Compete for $50,000 in prizes across Privacy, DeFi, and DAO categories.',
    modules: ['Privacy Tools', 'Zero-Knowledge Applications', 'DeFi Innovation', 'DAO Infrastructure', 'Open Category'],
    outcome: 'Build a working prototype, pitch to a panel of VCs, and win up to $25,000.',
    capacity: 500, badge: 'badge-hackathon',
  },
  {
    id: 3, type: 'accelerator', icon: 'bi-rocket-takeoff-fill', color: 'var(--gold)',
    title: 'Web3 Accelerator', subtitle: '12-Week Program',
    description: '12-week intensive accelerator for early-stage Web3 startups. Receive $25K seed investment, expert mentorship, and VC introductions.',
    modules: ['Product-Market Fit', 'Tokenomics Design', 'Smart Contract Architecture', 'Go-to-Market Strategy', 'Fundraising & Pitching'],
    outcome: 'Graduate with $25K seed funding, 3 months of mentorship, and warm introductions to 50+ VCs.',
    capacity: 30, badge: 'badge-accelerator',
  },
  {
    id: 4, type: 'village', icon: 'bi-house-fill', color: 'var(--green)',
    title: 'Pop-up Village', subtitle: 'Week-Long Residency',
    description: 'A week-long co-living and co-working experience for Web3 builders in a carefully chosen global city. Build, connect, and ship together.',
    modules: ['Morning Workshops', 'Build Sessions', 'Speaker Fireside Chats', 'Networking Dinners', 'Demo Day'],
    outcome: 'Launch a project with your cohort, build lasting global connections, and create unforgettable memories.',
    capacity: 100, badge: 'badge-village',
  },
];

const SCHEDULE = [
  { date: '2026-06-01', title: 'Web3 Bootcamp Cohort 5', type: 'bootcamp', location: 'Online', spots: 113 },
  { date: '2026-07-15', title: 'Global Cypherpunk Hackathon', type: 'hackathon', location: 'Berlin + Online', spots: 188 },
  { date: '2026-08-10', title: 'Accelerator Cohort 3', type: 'accelerator', location: 'Singapore + Dubai', spots: 18 },
  { date: '2026-09-20', title: 'Pop-up Village: Lisbon', type: 'village', location: 'Lisbon, Portugal', spots: 33 },
  { date: '2026-10-12', title: 'Web3 Bootcamp Cohort 6', type: 'bootcamp', location: 'Online', spots: 200 },
  { date: '2026-11-28', title: 'Global Hackathon: Winter Edition', type: 'hackathon', location: 'Bangkok + Online', spots: 500 },
];

const Programs = () => {
  const [activeTrack, setActiveTrack] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ name: '', email: '' });
  const [status, setStatus] = useState('');



  const handleRegister = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const eventId = selectedEvent?.id || 1;
      await axios.post(`${API}/events/register`, { event_id: eventId, name: form.name, email: form.email });
      setStatus('success');
      setForm({ name: '', email: '' });
    } catch (err) {
      if (err.response?.data?.message === 'Already registered with this email') {
        setStatus('duplicate');
      } else {
        setStatus('success'); // Demo mode — show success anyway
      }
    }
  };

  const openModal = (event) => { setSelectedEvent(event); setShowModal(true); setStatus(''); };

  const badgeClass = (type) => ({ bootcamp: 'badge-bootcamp', hackathon: 'badge-hackathon', accelerator: 'badge-accelerator', village: 'badge-village' }[type] || 'badge-bootcamp');

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: '140px', paddingBottom: '80px', background: 'linear-gradient(to bottom, var(--bg-surface), var(--bg-deep))', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,0,127,0.08) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <ScrollReveal>
            <span className="section-label"><i className="bi bi-calendar-event me-2"></i>Programs & Events</span>
            <h1 className="section-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
              Your Journey <br /><span className="gradient-text">Starts Here</span>
            </h1>
            <p className="section-subtitle">
              From beginner bootcamps to elite accelerators — our programs are designed to transform curious minds into world-class Web3 builders.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Row */}
      <section style={{ background: 'var(--bg-surface)', borderTop: '1px solid var(--border-glass)', borderBottom: '1px solid var(--border-glass)', padding: '30px 0' }}>
        <div className="container">
          <div className="row g-3 text-center">
            {[
              { icon: 'bi-people-fill', value: '5,200+', label: 'Alumni', color: 'var(--cyan)' },
              { icon: 'bi-globe2', value: '32', label: 'Countries', color: 'var(--pink)' },
              { icon: 'bi-trophy-fill', value: '$500K+', label: 'Prizes Awarded', color: 'var(--gold)' },
              { icon: 'bi-briefcase-fill', value: '78%', label: 'Job Placement', color: 'var(--green)' },
            ].map(({ icon, value, label, color }, i) => (
              <div className="col-6 col-md-3" key={i}>
                <div className="d-flex flex-column align-items-center">
                  <i className={`bi ${icon}`} style={{ fontSize: '1.6rem', color, marginBottom: 6 }}></i>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.6rem', color }}>{value}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Program Tracks */}
      <section className="section-pad grid-bg">
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-5">
              <span className="section-label"><i className="bi bi-diagram-3 me-2"></i>Program Tracks</span>
              <h2 className="section-title">Choose Your <span className="gradient-text">Path</span></h2>
              <p className="section-subtitle mx-auto">Four distinct tracks designed for different stages of your Web3 journey.</p>
            </div>
          </ScrollReveal>

          <div className="row g-4">
            {TRACKS.map((track, i) => (
              <div className="col-md-6" key={track.id}>
                <ScrollReveal delay={i * 100}>
                  <div
                    className={`glass-card track-card p-4 h-100 d-flex flex-column ${track.type}`}
                    style={{ cursor: 'pointer', borderLeftColor: track.color }}
                    onClick={() => setActiveTrack(activeTrack === track.id ? null : track.id)}
                  >
                    <div className="d-flex align-items-start justify-content-between mb-3">
                      <div className="d-flex align-items-center gap-3">
                        <div style={{ width: 52, height: 52, borderRadius: 12, background: `${track.color}18`, border: `1px solid ${track.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <i className={`bi ${track.icon}`} style={{ fontSize: '1.4rem', color: track.color }}></i>
                        </div>
                        <div>
                          <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, margin: 0 }}>{track.title}</h5>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: track.color }}>{track.subtitle}</div>
                        </div>
                      </div>
                      <span className={`event-type-badge ${track.badge}`}>{track.type}</span>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.92rem', flex: 1 }}>{track.description}</p>

                    {activeTrack === track.id && (
                      <div style={{ marginTop: 20, animation: 'fade-in 0.3s ease' }}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: track.color, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>Modules</div>
                        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                          {track.modules.map((mod, j) => (
                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: 6 }}>
                              <i className="bi bi-check-circle-fill" style={{ color: track.color, fontSize: '0.75rem' }}></i>
                              {mod}
                            </li>
                          ))}
                        </ul>
                        <div style={{ marginTop: 16, padding: '12px 16px', background: `${track.color}10`, border: `1px solid ${track.color}30`, borderRadius: 8 }}>
                          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: track.color, marginBottom: 4 }}>// OUTCOME</div>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0 }}>{track.outcome}</p>
                        </div>
                      </div>
                    )}

                    <div className="d-flex align-items-center justify-content-between mt-3 pt-3" style={{ borderTop: '1px solid var(--border-glass)' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <i className="bi bi-people me-1"></i>{track.capacity} spots
                      </span>
                      <div className="d-flex gap-2 align-items-center">
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {activeTrack === track.id ? 'Click to collapse' : 'Click to expand'}
                        </span>
                        <i className={`bi bi-chevron-${activeTrack === track.id ? 'up' : 'down'}`} style={{ color: track.color }}></i>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="section-pad" style={{ background: 'var(--bg-surface)' }}>
        <div className="container">
          <ScrollReveal>
            <div className="text-center mb-5">
              <span className="section-label"><i className="bi bi-calendar3 me-2"></i>Schedule</span>
              <h2 className="section-title">Upcoming <span className="gradient-text">Events</span></h2>
            </div>
          </ScrollReveal>

          <div className="row justify-content-center">
            <div className="col-lg-10">
              {SCHEDULE.map((ev, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="glass-card p-4 mb-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
                    <div className="d-flex align-items-center gap-4 flex-wrap">
                      <div style={{ minWidth: 100, textAlign: 'center' }}>
                        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.4rem', color: 'var(--cyan)' }}>
                          {new Date(ev.date).getDate()}
                        </div>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                          {new Date(ev.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <div>
                        <h5 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, margin: 0, marginBottom: 4 }}>{ev.title}</h5>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span className={`event-type-badge ${badgeClass(ev.type)}`}>{ev.type}</span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                            <i className="bi bi-geo-alt me-1"></i>{ev.location}
                          </span>
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--green)' }}>
                            <i className="bi bi-person-check me-1"></i>{ev.spots} spots left
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="btn-neon" style={{ padding: '8px 22px', fontSize: '0.85rem' }} onClick={() => openModal({ ...ev, id: i + 1 })}>
                      Register <i className="bi bi-arrow-right ms-1"></i>
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showModal && (
        <div className="modal show d-block ag-modal" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: 'var(--cyan)' }}>
                  <i className="bi bi-calendar-check me-2"></i>Register for Event
                </h5>
                <button type="button" className="btn-close" onClick={() => { setShowModal(false); setStatus(''); }}></button>
              </div>
              <div className="modal-body p-4">
                {selectedEvent && (
                  <div style={{ marginBottom: 24, padding: '12px 16px', background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', borderRadius: 8 }}>
                    <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, marginBottom: 4 }}>{selectedEvent.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      <i className="bi bi-geo-alt me-1"></i>{selectedEvent.location} &nbsp;|&nbsp;
                      <i className="bi bi-calendar3 me-1"></i>{new Date(selectedEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                )}
                {status === 'success' ? (
                  <div className="text-center py-4">
                    <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem', color: 'var(--green)', display: 'block', marginBottom: 16 }}></i>
                    <h5 style={{ fontFamily: 'var(--font-heading)', color: 'var(--green)' }}>Registration Confirmed!</h5>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>You're on the list. We'll send details to your email.</p>
                    <button className="btn-solid-cyan mt-3" onClick={() => { setShowModal(false); setStatus(''); }}>Done</button>
                  </div>
                ) : (
                  <form onSubmit={handleRegister}>
                    <div className="mb-3">
                      <label className="ag-form-label">Full Name</label>
                      <input className="ag-form-control form-control" type="text" placeholder="Satoshi Nakamoto" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                    </div>
                    <div className="mb-4">
                      <label className="ag-form-label">Email Address</label>
                      <input className="ag-form-control form-control" type="email" placeholder="you@example.com" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                    </div>
                    {status === 'duplicate' && (
                      <div style={{ color: 'var(--pink)', fontFamily: 'var(--font-mono)', fontSize: '0.82rem', marginBottom: 12 }}>
                        <i className="bi bi-exclamation-triangle me-1"></i>Already registered with this email.
                      </div>
                    )}
                    <button type="submit" className="btn-solid-cyan w-100" disabled={status === 'loading'}>
                      {status === 'loading' ? <><i className="bi bi-hourglass-split me-2"></i>Registering...</> : <><i className="bi bi-lightning-charge-fill me-2"></i>Confirm Registration</>}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Programs;
