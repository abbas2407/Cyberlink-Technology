import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FieldPulseLogo from './FieldPulseLogo';
import HotelWifiLogo from './HotelWifiLogo';
import CyberlinkHRLogo from './CyberlinkHRLogo';
import AgentProLogo from './AgentProLogo';

/* ── SVG Icons ── */
const icons = {
  navigation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="3 11 22 2 13 21 11 13 3 11"/>
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  ),
  receipt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
      <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
      <line x1="12" y1="6" x2="12" y2="18"/>
    </svg>
  ),
  fileSpreadsheet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
      <polyline points="10 9 9 9 8 9"/>
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/>
      <polyline points="2 17 12 22 22 17"/>
      <polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  smartphone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
      <line x1="12" y1="18" x2="12.01" y2="18"/>
    </svg>
  ),
  wifi: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
      <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
      <circle cx="12" cy="20" r="1"/>
    </svg>
  ),
  key: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
    </svg>
  ),
  radio: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2"/>
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/>
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
      <line x1="9" y1="22" x2="9" y2="16"/>
      <line x1="9" y1="16" x2="15" y2="16"/>
      <line x1="15" y1="16" x2="15" y2="22"/>
      <line x1="9" y1="12" x2="15" y2="12"/>
      <line x1="9" y1="8" x2="15" y2="8"/>
    </svg>
  ),
  creditCard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
      <line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  trendingUp: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
      <polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  logout: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16 17 21 12 16 7"/>
      <line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  mapPin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
  calculator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2"/>
      <line x1="8" y1="6" x2="16" y2="6"/>
      <line x1="8" y1="10" x2="10" y2="10"/>
      <line x1="14" y1="10" x2="16" y2="10"/>
      <line x1="8" y1="14" x2="10" y2="14"/>
      <line x1="14" y1="14" x2="16" y2="14"/>
      <line x1="8" y1="18" x2="10" y2="18"/>
      <line x1="14" y1="18" x2="16" y2="18"/>
    </svg>
  ),
  fileBadge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <path d="M9 15l2 2 4-4"/>
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  ),
  filePen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14 2 14 8 20 8"/>
      <path d="M12 18v-3l5-5-3 0 0 3-2 2z"/>
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12 6 12 12 16 14"/>
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  bot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <circle cx="12" cy="5" r="2"/>
      <path d="M12 7v4"/>
      <line x1="8" y1="16" x2="8.01" y2="16"/>
      <line x1="16" y1="16" x2="16.01" y2="16"/>
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  inbox: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/>
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  ),
  flame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
    </svg>
  ),
  kanban: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="5" height="12" rx="1"/>
      <rect x="10" y="3" width="5" height="18" rx="1"/>
      <rect x="17" y="3" width="5" height="8" rx="1"/>
    </svg>
  ),
  messageSquare: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  clipboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/>
      <path d="M9 12h6"/>
      <path d="M9 16h6"/>
    </svg>
  ),
  landmark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="22" y1="22" y2="22"/>
      <line x1="6" x2="6" y1="18" y2="11"/>
      <line x1="10" x2="10" y1="18" y2="11"/>
      <line x1="14" x2="14" y1="18" y2="11"/>
      <line x1="18" x2="18" y1="18" y2="11"/>
      <polygon points="12 2 20 7 4 7"/>
    </svg>
  ),
  barChart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="20" y2="10"/>
      <line x1="18" x2="18" y1="20" y2="4"/>
      <line x1="6" x2="6" y1="20" y2="16"/>
    </svg>
  ),
};

export default function Softwares() {
  const [activeTab, setActiveTab] = useState<'fieldpulse' | 'hotelwifi' | 'cyberlinkhr' | 'agentpro'>('fieldpulse');
  const sectionRef = useRef<HTMLDivElement>(null);

  // Reveal effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="softwares" ref={sectionRef} style={{
      background: 'var(--surface-low)',
      padding: '96px 0',
      borderTop: '1px solid var(--border)',
      position: 'relative'
    }}>
      {/* Dot Grid Background */}
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.35, pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div className="reveal" style={{ marginBottom: '52px' }}>
          <span className="section-eyebrow">// SOFTWARE</span>
          <h2 className="section-title">Our Softwares.</h2>
          <p className="section-body" style={{ maxWidth: '580px' }}>
            We design and build intuitive software products that solve operational challenges, streamline business workflows, and make technology helpful in the real world.
          </p>
        </div>

        {/* Tab switcher buttons — centered */}
        <div className="tab-nav sw-tabs-row" style={{
          display: 'flex', gap: '12px', marginBottom: '36px', flexWrap: 'wrap', justifyContent: 'center'
        }}>
          <button
            onClick={() => setActiveTab('fieldpulse')}
            className={`tab-btn ${activeTab === 'fieldpulse' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: 'var(--r)',
              border: '1.5px solid var(--border)',
              background: activeTab === 'fieldpulse' ? 'var(--blue-tint)' : 'var(--surface-white)',
              borderColor: activeTab === 'fieldpulse' ? 'var(--blue)' : 'var(--border)',
              color: activeTab === 'fieldpulse' ? 'var(--blue)' : 'var(--text-secondary)',
              fontFamily: 'var(--font)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'fieldpulse' ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <FieldPulseLogo size={20} showText={false} backgroundColor={activeTab === 'fieldpulse' ? 'var(--blue-tint)' : 'var(--surface-white)'} />
            </div>
            <span style={{ letterSpacing: '0.02em' }}>
              FIELD<span style={{ color: '#695d4a', fontWeight: 800 }}>PULSE</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('hotelwifi')}
            className={`tab-btn ${activeTab === 'hotelwifi' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: 'var(--r)',
              border: '1.5px solid var(--border)',
              background: activeTab === 'hotelwifi' ? 'var(--blue-tint)' : 'var(--surface-white)',
              borderColor: activeTab === 'hotelwifi' ? 'var(--blue)' : 'var(--border)',
              color: activeTab === 'hotelwifi' ? 'var(--blue)' : 'var(--text-secondary)',
              fontFamily: 'var(--font)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'hotelwifi' ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <HotelWifiLogo size={20} showText={false} />
            </div>
            <span style={{ letterSpacing: '0.02em' }}>
              HOTEL<span style={{ color: '#3B82F6', fontWeight: 800 }}>WIFI</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('cyberlinkhr')}
            className={`tab-btn ${activeTab === 'cyberlinkhr' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: 'var(--r)',
              border: '1.5px solid var(--border)',
              background: activeTab === 'cyberlinkhr' ? 'var(--blue-tint)' : 'var(--surface-white)',
              borderColor: activeTab === 'cyberlinkhr' ? 'var(--blue)' : 'var(--border)',
              color: activeTab === 'cyberlinkhr' ? 'var(--blue)' : 'var(--text-secondary)',
              fontFamily: 'var(--font)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'cyberlinkhr' ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CyberlinkHRLogo size={20} showText={false} backgroundColor={activeTab === 'cyberlinkhr' ? 'var(--blue-tint)' : 'var(--surface-white)'} />
            </div>
            <span style={{ letterSpacing: '0.02em' }}>
              CYBERLINK<span style={{ color: '#10b981', fontWeight: 800 }}>HR</span>
            </span>
          </button>

          <button
            onClick={() => setActiveTab('agentpro')}
            className={`tab-btn ${activeTab === 'agentpro' ? 'active' : ''}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '10px 18px',
              borderRadius: 'var(--r)',
              border: '1.5px solid var(--border)',
              background: activeTab === 'agentpro' ? 'var(--blue-tint)' : 'var(--surface-white)',
              borderColor: activeTab === 'agentpro' ? 'var(--blue)' : 'var(--border)',
              color: activeTab === 'agentpro' ? 'var(--blue)' : 'var(--text-secondary)',
              fontFamily: 'var(--font)',
              fontSize: '13.5px',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'agentpro' ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <AgentProLogo size={20} showText={false} />
            </div>
            <span style={{ letterSpacing: '0.02em' }}>
              AGENT<span style={{ color: '#7c3aed', fontWeight: 800 }}>PRO</span>
            </span>
          </button>
        </div>

        {/* Centered Detail Card — no carousel */}
        <div className="sw-card-wrap">
          <AnimatePresence mode="wait">
            {activeTab === 'fieldpulse' && (
              <motion.div
                key="fieldpulse-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="detail-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <FieldPulseLogo size={36} showText={true} backgroundColor="var(--surface-white)" />
                  <a
                    href="https://fp.cyberlink.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sw-site-badge"
                    title="Visit Fieldpulse Web App"
                  >
                    <span className="sw-site-badge-dot" />
                    <span>fp.cyberlink.co.in</span>
                    <span>↗</span>
                  </a>
                </div>
                <div style={{
                  fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font)'
                }}>
                  Smart field operations platform
                </div>

                <a
                  href="https://fp.cyberlink.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-live-banner"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span><strong>Live Platform:</strong> fp.cyberlink.co.in</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>Open ↗</span>
                </a>

                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>
                  Key Features
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.navigation}</div>
                    Live GPS tracking with 5-sec refresh
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.shield}</div>
                    Anti-fraud face punch-in with geofencing
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.receipt}</div>
                    Attendance, leaves & expense management
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.fileSpreadsheet}</div>
                    Excel report exports from admin dashboard
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.layers}</div>
                    Multi-tenant architecture
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.smartphone}</div>
                    Android app with offline GPS support
                  </li>
                </ul>

                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                {/* CTA row */}
                <div className="sw-cta-row">
                  <motion.a
                    href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20would%20like%20to%20request%20a%20live%20demo%20of%20the%20FieldPulse%20SaaS%20platform."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary sw-btn-demo"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Request demo</span>
                    <span>→</span>
                  </motion.a>

                  <a
                    href="/products/fieldpulse"
                    className="sw-btn-checkout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Show Case</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'hotelwifi' && (
              <motion.div
                key="hotelwifi-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="detail-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <HotelWifiLogo size={36} showText={true} />
                  <a
                    href="https://app.cyberlink.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sw-site-badge"
                    title="Visit Hotel wifi Web App"
                  >
                    <span className="sw-site-badge-dot" />
                    <span>app.cyberlink.co.in</span>
                    <span>↗</span>
                  </a>
                </div>
                <div style={{
                  fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font)'
                }}>
                  Guest WiFi management platform for hotels
                </div>

                <a
                  href="https://app.cyberlink.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-live-banner"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span><strong>Live Platform:</strong> app.cyberlink.co.in</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>Open ↗</span>
                </a>

                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>
                  Key Features
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.smartphone}</div>
                    1-click guest check-in & WiFi activation
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.key}</div>
                    OTP authentication via DLT-registered SMS
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.radio}</div>
                    FreeRADIUS + WireGuard VPN tunnel
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.monitor}</div>
                    Real-time dashboard & live sessions tracking
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.building}</div>
                    Multi-property single panel management
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.creditCard}</div>
                    WiFi card & MAC bypass/block device control
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.trendingUp}</div>
                    Subscription & MRR tracking with alerts
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.logout}</div>
                    Auto guest checkout & WiFi revocation
                  </li>
                </ul>

                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                {/* CTA row */}
                <div className="sw-cta-row">
                  <motion.a
                    href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20would%20like%20to%20request%20a%20demo%20of%20HotelWifi."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary sw-btn-demo"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Request demo</span>
                    <span>→</span>
                  </motion.a>

                  <a
                    href="/products/hotelwifi"
                    className="sw-btn-checkout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Show Case</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'cyberlinkhr' && (
              <motion.div
                key="cyberlinkhr-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="detail-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <CyberlinkHRLogo size={36} showText={true} backgroundColor="var(--surface-white)" />
                  <a
                    href="https://hrms.cyberlink.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sw-site-badge"
                    title="Visit Cyberlink hr Web App"
                  >
                    <span className="sw-site-badge-dot" />
                    <span>hrms.cyberlink.co.in</span>
                    <span>↗</span>
                  </a>
                </div>
                <div style={{
                  fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font)'
                }}>
                  Multi-tenant HR & Payroll management platform
                </div>

                <a
                  href="https://hrms.cyberlink.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-live-banner"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span><strong>Live Platform:</strong> hrms.cyberlink.co.in</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>Open ↗</span>
                </a>

                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>
                  Key Features
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.database}</div>
                    Schema-isolated data per company — zero cross-tenant access
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.mapPin}</div>
                    GPS geo-fence punch in/out with multi-location support
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.calculator}</div>
                    Indian payroll engine — PF, ESIC, TDS, PT auto-calculated
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.fileBadge}</div>
                    One-click Form 16, ECR challan & Form 24Q compliance reports
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.calendar}</div>
                    Leave apply, approve & balance tracking with accrual cron
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.filePen}</div>
                    Salary revision with arrear calculation & payslip PDF
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.history}</div>
                    Employee history timeline — every change tracked with old & new value
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.users}</div>
                    Vendor panel — manage all client companies, billing & expiry
                  </li>
                </ul>

                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                {/* CTA row */}
                <div className="sw-cta-row">
                  <motion.a
                    href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20would%20like%20to%20request%20a%20demo%20of%20CyberlinkHR."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary sw-btn-demo"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Request demo</span>
                    <span>→</span>
                  </motion.a>

                  <a
                    href="/products/cyberlinkhr"
                    className="sw-btn-checkout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Show Case</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}

            {activeTab === 'agentpro' && (
              <motion.div
                key="agentpro-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                className="detail-card"
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                  <AgentProLogo size={36} showText={true} />
                  <a
                    href="https://agent.cyberlink.co.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sw-site-badge"
                    title="Visit Agent Pro Web App"
                  >
                    <span className="sw-site-badge-dot" />
                    <span>agent.cyberlink.co.in</span>
                    <span>↗</span>
                  </a>
                </div>
                <div style={{
                  fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', fontFamily: 'var(--font)'
                }}>
                  AI Marketing Automation Platform for Indian SMEs
                </div>

                <a
                  href="https://agent.cyberlink.co.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sw-live-banner"
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="2" y1="12" x2="22" y2="12"/>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                    </svg>
                    <span><strong>Live Platform:</strong> agent.cyberlink.co.in</span>
                  </span>
                  <span style={{ fontWeight: 600 }}>Open ↗</span>
                </a>

                <div style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--text-muted)',
                  marginBottom: '16px'
                }}>
                  Key Features
                </div>

                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.bot}</div>
                    AI-powered cold email generation for every lead
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.mapPin}</div>
                    Real business lead scraping from Google Maps & OpenStreetMap
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.mail}</div>
                    Automated follow-up emails on Day 3 and Day 6
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.inbox}</div>
                    Gmail reply detection & AI intent classification
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.flame}</div>
                    Hot lead alerts with instant owner notification
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.kanban}</div>
                    Built-in CRM with lead pipeline & status tracking
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.messageSquare}</div>
                    AI auto-reply to interested leads within 15 minutes
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.clipboard}</div>
                    Paste any text — AI extracts leads instantly
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.landmark}</div>
                    MCA21 & government database scraping
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.barChart}</div>
                    Live dashboard with open rate, reply rate & revenue
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.building}</div>
                    Multi-tenant SaaS with full vendor management panel
                  </li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
                    <div className="feature-icon-box">{icons.creditCard}</div>
                    Razorpay billing with trial & subscription management
                  </li>
                </ul>

                <div style={{ height: '1px', background: 'var(--border)', marginBottom: '24px' }} />

                {/* CTA row */}
                <div className="sw-cta-row">
                  <motion.a
                    href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20would%20like%20to%20request%20a%20demo%20of%20AgentPro."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary sw-btn-demo"
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Request demo</span>
                    <span>→</span>
                  </motion.a>

                  <a
                    href="/products/agentpro"
                    className="sw-btn-checkout"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Show Case</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>

      {/* Scoped styles */}
      <style>{`
        /* Card wrapper — centers the single card */
        .sw-card-wrap {
          display: flex;
          justify-content: center;
        }

        /* Detail card */
        .detail-card {
          background: var(--surface-white);
          border: 1px solid var(--border);
          border-radius: var(--r-lg, 20px);
          box-shadow: var(--shadow-md);
          padding: 36px 32px;
          max-width: 480px;
          width: 100%;
        }

        /* Feature List Styling */
        .feature-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: var(--blue-tint);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--blue);
        }
        .feature-icon-box svg {
          width: 14px;
          height: 14px;
        }

        /* CTA row */
        .sw-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-top: 0;
        }

        /* Demo button */
        .sw-btn-demo {
          display: inline-flex !important;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          padding: 0 24px;
          border-radius: var(--r, 16px);
          font-weight: 600;
          font-size: 15px;
          font-family: var(--font);
          background: var(--blue);
          color: #fff;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0 2px 8px rgba(56,48,231,0.22);
          transition: background 0.2s, box-shadow 0.2s;
          flex: 1;
          min-width: 160px;
        }
        .sw-btn-demo:hover {
          background: var(--blue-hover);
          box-shadow: 0 4px 16px rgba(56,48,231,0.32);
        }

        /* Check out outline button */
        .sw-btn-checkout {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 48px;
          padding: 0 24px;
          border-radius: var(--r, 16px);
          font-weight: 600;
          font-size: 15px;
          font-family: var(--font);
          background: transparent;
          color: var(--blue);
          border: 1.5px solid var(--blue);
          cursor: pointer;
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1;
          min-width: 160px;
        }
        .sw-btn-checkout:hover {
          background: var(--blue);
          color: #fff;
          box-shadow: 0 2px 8px rgba(56,48,231,0.22);
        }

        /* Direct Website Badge & Banner */
        .sw-site-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--mono, monospace);
          font-size: 11.5px;
          font-weight: 600;
          color: var(--blue);
          background: var(--blue-tint);
          border: 1px solid rgba(56, 48, 231, 0.2);
          padding: 4px 10px;
          border-radius: var(--r-full);
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .sw-site-badge:hover {
          background: var(--blue);
          color: #ffffff;
          border-color: var(--blue);
          transform: translateY(-1px);
        }
        .sw-site-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 6px rgba(34, 197, 94, 0.7);
        }
        .sw-live-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          background: #f8fafc;
          border: 1px dashed var(--border-strong, #cbd5e1);
          border-radius: 10px;
          font-size: 12.5px;
          color: var(--text-secondary);
          text-decoration: none;
          margin-bottom: 22px;
          transition: all 0.2s ease;
        }
        .sw-live-banner:hover {
          background: var(--blue-tint);
          border-color: var(--blue);
          color: var(--blue);
        }

        /* Mobile: swipeable pill tabs, full-width card, vertical CTA stack */
        @media (max-width: 768px) {
          #softwares {
            padding: 60px 0 !important;
          }
          .sw-tabs-row {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            -webkit-overflow-scrolling: touch !important;
            scrollbar-width: none !important;
            justify-content: flex-start !important;
            gap: 10px !important;
            margin-bottom: 24px !important;
            padding-bottom: 8px !important;
            margin-left: -16px !important;
            margin-right: -16px !important;
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .sw-tabs-row::-webkit-scrollbar {
            display: none !important;
          }
          .sw-tabs-row .tab-btn {
            flex-shrink: 0 !important;
            white-space: nowrap !important;
            padding: 9px 16px !important;
            font-size: 13px !important;
            border-radius: var(--r-full) !important;
          }
          .detail-card {
            padding: 24px 18px !important;
            max-width: 100% !important;
            border-radius: var(--r-lg, 18px) !important;
          }
          .sw-cta-row {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .sw-btn-demo,
          .sw-btn-checkout {
            width: 100% !important;
            flex: unset !important;
          }
        }
      `}</style>
    </section>
  );
}
