import { useEffect, useRef, useState } from 'react';

/* ─── inline SVG icons ─── */
const MapPinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const GlobeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.21 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

/* ─── Info cards ─── */
const INFO_CARDS = [
  {
    icon: <MapPinIcon />,
    label: 'LOCATION',
    value: 'Hyderabad, Telangana',
    sub: 'India — pan-India + global shipping',
  },
  {
    icon: <GlobeIcon />,
    label: 'WE EXPORT TO',
    value: 'UAE · UK · USA · Africa',
    sub: 'International hardware supply',
  },
  {
    icon: <ClockIcon />,
    label: 'RESPONSE TIME',
    value: 'Within 2 hours',
    sub: 'Same-day dispatch available',
  },
  {
    icon: <PhoneIcon />,
    label: 'CONTACT US',
    value: '+91 93914 40440',
    sub: 'ali@serverparts.in',
  },
];

/* ─── Stats ─── */
const STATS = [
  { num: 500, suffix: '+', label: 'Parts in stock' },
  { num: 30,  suffix: '+', label: 'Brands supplied' },
  { num: 24,  suffix: 'hr', label: 'Quote turnaround' },
  { num: 90,  suffix: ' days', label: 'Warranty on all units' },
];

/* ─── Tag cloud ─── */
const INDIGO_TAGS = [
  'Servers & Storage', 'Network Switches', 'Routers & Firewalls',
  'Refurb Laptops', 'Server Memory', 'RAID Controllers',
  'HDD / SSD / NVMe', 'HBA Cards', 'PSU Units', 'SFP Modules',
];
const GREY_TAGS = [
  'IT Support', 'Network Setup', 'Server Administration',
  'Computer Support', 'IT Monitoring',
];

/* ─── Animated counter ─── */
function useCounter(target: number, active: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

/* ─── Single stat block ─── */
function StatBlock({ num, suffix, label, active }: { num: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(num, active);
  return (
    <div style={{ textAlign: 'center', flex: 1, padding: '8px 0' }}>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
        fontWeight: 800,
        fontSize: 'clamp(36px, 4vw, 48px)',
        color: '#564AF6',
        lineHeight: 1,
        letterSpacing: '-0.03em',
      }}>
        {count}{suffix}
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
        fontWeight: 400,
        fontSize: '14px',
        color: '#6B7280',
        marginTop: '6px',
      }}>
        {label}
      </div>
    </div>
  );
}

/* ─── Hover card ─── */
function InfoCard({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: '#ffffff',
        border: `1px solid ${hov ? '#564AF6' : '#E5E7F0'}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: 'default',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        boxShadow: hov ? '0 8px 24px rgba(86,74,246,0.12)' : '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <div style={{ color: '#564AF6', marginBottom: '10px' }}>{icon}</div>
      <div style={{
        fontFamily: 'monospace',
        fontSize: '10px',
        color: '#9CA3AF',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        marginBottom: '6px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
        fontWeight: 600,
        fontSize: '16px',
        color: '#0F1629',
        marginBottom: '4px',
      }}>
        {value}
      </div>
      <div style={{
        fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
        fontSize: '13px',
        color: '#6B7280',
      }}>
        {sub}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   WHO WE ARE — main export
   ══════════════════════════════════════════════ */
export default function ServerParts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef   = useRef<HTMLDivElement>(null);
  const [statsVis, setStatsVis] = useState(false);

  /* Scroll reveal — stagger children */
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll<HTMLElement>('.wwa-reveal');
            items.forEach((el, i) => {
              setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
              }, i * 80);
            });
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* Stats counter trigger */
  useEffect(() => {
    const io2 = new IntersectionObserver(
      entries => { if (entries[0].isIntersecting) { setStatsVis(true); io2.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) io2.observe(statsRef.current);
    return () => io2.disconnect();
  }, []);

  /* Ghost button hover state */
  const [ghost1Hov, setGhost1Hov] = useState(false);
  const [ghost2Hov, setGhost2Hov] = useState(false);

  return (
    <section
      id="server-parts"
      ref={sectionRef}
      style={{
        background: '#F8F9FF',
        padding: '100px 0',
        borderTop: '1px solid #E5E7F0',
        borderBottom: '1px solid #E5E7F0',
      }}
    >
      {/* ── inject reveal-initial styles ── */}
      <style>{`
        .wwa-reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        @keyframes shimmer-sweep {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @media (max-width: 768px) {
          .wwa-cards-grid { grid-template-columns: 1fr !important; }
          .wwa-stats-row  { flex-direction: column !important; gap: 24px !important; }
          .wwa-stats-div  { display: none !important; }
          .wwa-cta-row    { flex-direction: column !important; }
        }
      `}</style>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>

        {/* ── EYEBROW ── */}
        <div className="wwa-reveal" style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '12px',
          color: '#564AF6',
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          marginBottom: '20px',
        }}>
          // WHO WE ARE
        </div>

        {/* ── HEADLINE ── */}
        <h2 className="wwa-reveal" style={{
          fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(32px, 4vw, 52px)',
          color: '#0F1629',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '24px',
          maxWidth: '640px',
        }}>
          Built in Hyderabad.<br />
          Trusted{' '}
          <span style={{ color: '#564AF6' }}>across India</span><br />
          and beyond.
        </h2>

        {/* ── BODY PARAGRAPH ── */}
        <p className="wwa-reveal" style={{
          fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
          fontWeight: 400,
          fontSize: '17px',
          color: '#374151',
          lineHeight: 1.7,
          maxWidth: '520px',
          marginBottom: '40px',
        }}>
          Cyberlink Technology is an IT hardware company specializing in servers, storage,
          networking, refurbished laptops, and hard-to-find spare parts. We source globally
          and deliver fast — to businesses, resellers, and data centers across India and internationally.
        </p>

        {/* ── 2×2 INFO CARDS ── */}
        <div
          className="wwa-cards-grid wwa-reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          {INFO_CARDS.map(card => (
            <InfoCard key={card.label} {...card} />
          ))}
        </div>

        {/* ── STATS ROW ── */}
        <div
          ref={statsRef}
          className="wwa-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#ffffff',
            border: '1px solid #E5E7F0',
            borderRadius: '14px',
            padding: '32px 16px',
            marginBottom: '40px',
            gap: 0,
          }}
        >
          {STATS.map((s, i) => (
            <div key={s.label} style={{ display: 'contents' }}>
              <StatBlock num={s.num} suffix={s.suffix} label={s.label} active={statsVis} />
              {i < STATS.length - 1 && (
                <div
                  className="wwa-stats-div"
                  style={{ width: '1px', height: '52px', background: '#E5E7F0', flexShrink: 0 }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── WHAT WE DEAL IN — tag cloud ── */}
        <div className="wwa-reveal" style={{ marginBottom: '32px' }}>
          <div style={{
            fontFamily: 'monospace',
            fontSize: '11px',
            color: '#564AF6',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '14px',
          }}>
            WHAT WE DEAL IN
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {INDIGO_TAGS.map(tag => (
              <span key={tag} style={{
                background: '#EEF0FF',
                color: '#3B31D4',
                border: '1px solid #C5C0FD',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '13px',
                fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
            {GREY_TAGS.map(tag => (
              <span key={tag} style={{
                background: '#F3F4F6',
                color: '#6B7280',
                border: '1px solid #E5E7EB',
                borderRadius: '100px',
                padding: '6px 14px',
                fontSize: '13px',
                fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
                fontWeight: 500,
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ── MISSION BLOCK ── */}
        <div className="wwa-reveal" style={{
          background: '#EEF0FF',
          border: '1px solid #C5C0FD',
          borderRadius: '12px',
          padding: '24px 28px',
          marginBottom: '20px',
        }}>
          <div style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            color: '#564AF6',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '8px',
          }}>
            // OUR MISSION
          </div>
          <p style={{
            fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: '16px',
            color: '#26215C',
            lineHeight: 1.7,
            margin: 0,
          }}>
            "We don't just supply parts — we understand them. It's our passion to deliver the
            right solution at the right time, whether it's a single spare part or a full data
            center build-out."
          </p>
        </div>

        {/* ── COMPANY INFO BAR ── */}
        <div className="wwa-reveal" style={{
          background: '#ffffff',
          border: '1px solid #E5E7F0',
          borderRadius: '10px',
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          <span style={{ color: '#564AF6', flexShrink: 0 }}><BuildingIcon /></span>
          <span style={{
            fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
            fontWeight: 400,
            fontSize: '14px',
            color: '#6B7280',
          }}>
            <strong style={{ color: '#0F1629', fontWeight: 600 }}>Cyberlink Technology</strong>
            {' '}· Hyderabad, Telangana, India · cyberlinktechno.com · @cyberlinktechno · sales@cyberlinktechno.com
          </span>
        </div>

        {/* ── CTA ROW ── */}
        <div className="wwa-cta-row wwa-reveal" style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Primary */}
          <a
            href="#contact"
            id="whoweare-contact-btn"
            onMouseEnter={() => setGhost1Hov(true)}
            onMouseLeave={() => setGhost1Hov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '48px',
              padding: '0 28px',
              borderRadius: '10px',
              background: ghost1Hov
                ? 'linear-gradient(90deg, #3B31D4, #564AF6, #3B31D4)'
                : '#564AF6',
              backgroundSize: ghost1Hov ? '200% auto' : 'auto',
              animation: ghost1Hov ? 'shimmer-sweep 1.2s linear infinite' : 'none',
              color: '#ffffff',
              fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
              fontWeight: 600,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'background 0.25s ease',
              whiteSpace: 'nowrap',
            }}
          >
            Get in touch →
          </a>

          {/* Ghost */}
          <a
            href="#networking"
            id="whoweare-products-btn"
            onMouseEnter={() => setGhost2Hov(true)}
            onMouseLeave={() => setGhost2Hov(false)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: '48px',
              padding: '0 28px',
              borderRadius: '10px',
              border: `1px solid ${ghost2Hov ? '#564AF6' : '#E5E7F0'}`,
              color: ghost2Hov ? '#564AF6' : '#374151',
              background: 'transparent',
              fontFamily: "'Plus Jakarta Sans', 'Arial', sans-serif",
              fontWeight: 500,
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'border-color 0.2s ease, color 0.2s ease',
              whiteSpace: 'nowrap',
            }}
          >
            View all products
          </a>
        </div>

      </div>
    </section>
  );
}
