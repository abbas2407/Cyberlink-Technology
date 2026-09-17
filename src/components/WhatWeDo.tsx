import React, { useEffect, useRef, useState } from 'react';

/* ── Brand-consistent SVG icons ── */
const icons = {
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  ),
  server: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2"/>
      <circle cx="6" cy="6" r="1" fill="currentColor"/>
      <circle cx="6" cy="18" r="1" fill="currentColor"/>
      <line x1="10" y1="6" x2="16" y2="6"/>
      <line x1="10" y1="18" x2="16" y2="18"/>
    </svg>
  ),
  laptop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M2 20h20"/>
      <path d="M8 20l2-3h4l2 3"/>
    </svg>
  ),
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  ),
};

interface Card {
  icon: React.ReactNode;
  accent: string;
  accentBg: string;
  tag: string;
  title: string;
  body: React.ReactNode;
  footer: string;
  delay: number;
}

const CARDS: Card[] = [
  {
    icon: icons.network,
    accent: 'var(--blue)',
    accentBg: 'var(--blue-tint)',
    tag: '30+ brands',
    title: 'Network Infrastructure',
    body: 'Switches · Routers · Firewalls · Access Points · SFP Modules 1G–400G · Fiber Cable · DAC & AOC · GPON/EPON · Media Converters',
    footer: 'Cisco · Ubiquiti · Mikrotik · Fortinet',
    delay: 0,
  },
  {
    icon: icons.server,
    accent: 'var(--green)',
    accentBg: 'var(--green-bg)',
    tag: 'Hard-to-find parts + Refurb laptops',
    title: 'Server, Storage & Laptops',
    body: (
      <>
        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Server & Storage:</strong>
        {' '}Server Memory DDR1–DDR5 · RAID Controllers · HDD/SSD/NVMe · HBA & Fibre Channel · PSU · Motherboards · Network Controllers
        <br /><br />
        <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Laptops & Desktops:</strong>
        {' '}Certified refurbished business laptops. Core i5, i7, i9. All brands. 90-day warranty. New and refurbished options.
      </>
    ),
    footer: 'HP · Dell · IBM · Lenovo · ThinkPad · EliteBook',
    delay: 80,
  },
  {
    icon: icons.support,
    accent: '#7c3aed',
    accentBg: '#f5f3ff',
    tag: 'Remote & on-site',
    title: 'IT Services & Support',
    body: 'Computer Support · Server Administration · Networking Setup · IT Monitoring · Maintenance for HP, Dell, IBM, and enterprise systems.',
    footer: 'Free consultation →',
    delay: 160,
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
    accent: '#7c3aed',
    accentBg: '#f5f3ff',
    tag: 'Built in-house',
    title: 'Software Products & Development',
    body: 'FieldPulse · HotelWifi · CyberlinkHR — SaaS platforms built by our own engineering team. We also take custom software projects: web apps, dashboards, automation tools, and business software tailored to your workflow.',
    footer: 'Custom builds available →',
    delay: 240,
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 90);
            });
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="what-we-do" ref={ref} style={{
      background: 'var(--surface-low)',
      padding: '96px 0',
      borderTop: '1px solid var(--border)',
      position: 'relative',
    }}>
      {/* Subtle dot grid background */}
      <div className="dot-grid" style={{
        position: 'absolute', inset: 0, opacity: 0.4, pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: '52px' }}>
          <span className="section-eyebrow">// WHAT WE DO</span>
          <h2 className="section-title">One supplier. Every IT need.</h2>
          <p className="section-body">
            From a single SFP module to a full data center build-out — and from a field ops app to a complete HR platform. We source it, build it, supply it, and support it.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gridTemplateRows: 'auto auto',
            gap: '16px',
            alignItems: 'stretch',
          }}
          className="what-grid"
        >
          {CARDS.map((card, i) => {
            const [hovered, setHovered] = useState(false);
            return (
              <div
                key={i}
                className="reveal animated-border"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                  background: 'var(--surface-white)',
                  border: `1px solid ${hovered ? card.accent + '40' : 'var(--border)'}`,
                  borderRadius: 'var(--r)',
                  padding: '28px 24px',
                  display: 'flex', flexDirection: 'column', gap: '14px',
                  position: 'relative', overflow: 'hidden',
                  boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                  transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  transitionDelay: `${card.delay}ms`,
                  cursor: 'default',
                }}
              >
                {/* Shimmer on hover */}
                {hovered && (
                  <div style={{
                    position: 'absolute', top: 0, left: '-100%', right: 0, bottom: 0,
                    background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)',
                    animation: 'shimmer-slide 0.8s ease-out',
                    pointerEvents: 'none', zIndex: 0,
                  }} />
                )}

                {/* Left accent bar */}
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: '3px',
                  background: card.accent,
                  borderRadius: '0 2px 2px 0',
                  transform: hovered ? 'scaleY(1)' : 'scaleY(0.6)',
                  transition: 'transform 0.3s ease',
                  transformOrigin: 'center',
                }} />

                {/* Tag */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center',
                  padding: '3px 10px', borderRadius: 'var(--r-full)',
                  fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 500,
                  background: card.accentBg, color: card.accent,
                  border: `1px solid ${card.accent}30`,
                  alignSelf: 'flex-start', zIndex: 1,
                }}>
                  {card.tag}
                </span>

                {/* Icon box */}
                <div style={{
                  width: '48px', height: '48px', borderRadius: 'var(--r)',
                  background: card.accentBg,
                  border: `1px solid ${card.accent}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: card.accent,
                  transform: hovered ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
                  transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  zIndex: 1,
                }}>
                  <div style={{ width: '22px', height: '22px' }}>{card.icon}</div>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font)', fontWeight: 700, fontSize: '18px',
                  color: 'var(--text-primary)', letterSpacing: '-0.01em', zIndex: 1,
                }}>
                  {card.title}
                </h3>

                <div style={{
                  fontFamily: 'var(--font)', fontSize: '14px',
                  color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1, zIndex: 1,
                }}>
                  {card.body}
                </div>

                <div style={{
                  fontFamily: 'var(--mono)', fontSize: '12px',
                  color: hovered ? card.accent : 'var(--text-dim)',
                  paddingTop: '12px', borderTop: '1px solid var(--border)',
                  transition: 'color 0.25s',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  zIndex: 1,
                }}>
                  <span>{card.footer}</span>
                  <span style={{
                    opacity: hovered ? 1 : 0,
                    transform: hovered ? 'translateX(0)' : 'translateX(-6px)',
                    transition: 'opacity 0.2s, transform 0.2s',
                    fontSize: '14px',
                  }}>→</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) { .what-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
