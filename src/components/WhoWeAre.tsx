import { useEffect, useRef, useState } from 'react';

const INFO_CARDS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: 'LOCATION',
    title: 'Hyderabad, Telangana',
    sub: 'Pan-India + global shipping',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    label: 'WE EXPORT TO',
    title: 'UAE · UK · USA · Africa',
    sub: 'International hardware supply',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    label: 'RESPONSE TIME',
    title: 'Within 2 hours',
    sub: 'Same-day dispatch available',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91A16 16 0 0 0 15 16.91l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
    label: 'CONTACT',
    title: '+91 93914 40440',
    sub: 'sales@cyberlinktechno.com',
  },
];

const DEAL_IN = [
  'Servers & Storage',
  'Network Switches',
  'Routers & Firewalls',
  'Refurb Laptops',
  'Server Memory',
  'RAID Controllers',
  'HDD / SSD / NVMe',
  'HBA Cards',
  'PSU Units',
  'SFP Modules',
  'IT Support',
  'Network Setup',
];

export default function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeChip, setActiveChip] = useState('HDD / SSD / NVMe');

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="server-parts"
      ref={sectionRef}
      style={{
        background: 'var(--surface-white)',
        padding: '100px 0',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="container" style={{ maxWidth: '1100px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'start',
          }}
          className="who-we-are-grid"
        >
          {/* ── LEFT COLUMN ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            {/* Eyebrow with horizontal rule */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '1.5px',
                  background: 'var(--text-muted)',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                Who We Are
              </span>
            </div>

            {/* Big headline */}
            <h2
              style={{
                fontFamily: 'var(--font)',
                fontSize: 'clamp(36px, 4.5vw, 52px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                marginBottom: '24px',
              }}
            >
              Built in Hyderabad.
              <br />
              Trusted{' '}
              <em
                style={{
                  fontStyle: 'italic',
                  fontWeight: 800,
                  color: 'var(--blue)',
                  letterSpacing: '-0.04em',
                }}
              >
                across
                <br />
                India
              </em>
              <br />
              and beyond.
            </h2>

            {/* Description */}
            <p
              style={{
                fontFamily: 'var(--font)',
                fontSize: '15px',
                color: 'var(--text-secondary)',
                lineHeight: 1.72,
                marginBottom: '32px',
                maxWidth: '420px',
              }}
            >
              Cyberlink Technology specialises in servers, storage, networking,
              refurbished laptops and hard-to-find spare parts. We source
              globally and deliver fast — to businesses, resellers and data
              centers across India and internationally.
            </p>

            {/* Pull-quote */}
            <blockquote
              style={{
                borderLeft: '3px solid var(--blue)',
                paddingLeft: '20px',
                marginBottom: '40px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font)',
                  fontSize: '14.5px',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.7,
                }}
              >
                "We don't just supply parts — we understand them. It's our
                passion to deliver the right solution at the right time, from a
                single spare to a full build-out."
              </p>
            </blockquote>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20would%20like%20to%20get%20in%20touch."
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                Get in touch →
              </a>
              <a
                href="#what-we-do"
                className="btn btn-secondary btn-sm"
              >
                View capabilities
              </a>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(28px)',
              transition: 'opacity 0.6s ease 0.12s, transform 0.6s ease 0.12s',
            }}
          >
            {/* 2×2 Info card grid */}
            <div
              className="info-cards-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '28px',
              }}
            >
              {INFO_CARDS.map((card, i) => (
                <InfoCard key={i} card={card} delay={i * 60} visible={visible} />
              ))}
            </div>

            {/* What We Deal In */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                What We Deal In
              </span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {DEAL_IN.map((chip) => {
                  const isActive = chip === activeChip;
                  return (
                    <button
                      key={chip}
                      onClick={() => setActiveChip(chip)}
                      style={{
                        fontFamily: 'var(--font)',
                        fontSize: '12.5px',
                        fontWeight: isActive ? 600 : 400,
                        color: isActive ? 'var(--surface-white)' : 'var(--text-secondary)',
                        background: isActive ? 'var(--text-primary)' : 'transparent',
                        border: `1.5px solid ${isActive ? 'var(--text-primary)' : 'var(--border)'}`,
                        borderRadius: 'var(--r-full)',
                        padding: '5px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                        lineHeight: 1.4,
                      }}
                      onMouseEnter={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--text-primary)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isActive) {
                          (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                          (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)';
                        }
                      }}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #server-parts {
            padding: 60px 0 !important;
          }
          .who-we-are-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 540px) {
          .info-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
        }
        @media (max-width: 360px) {
          .info-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

function InfoCard({
  card,
  delay,
  visible,
}: {
  card: (typeof INFO_CARDS)[0];
  delay: number;
  visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--surface-white)',
        border: `1px solid ${hovered ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: 'var(--r)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-xs)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.22s ease',
        opacity: visible ? 1 : 0,
        transitionDelay: `${delay + 200}ms`,
        cursor: 'default',
      }}
    >
      <span
        style={{
          color: 'var(--blue)',
          display: 'flex',
          alignItems: 'center',
          marginBottom: '4px',
        }}
      >
        {card.icon}
      </span>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '9.5px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}
      >
        {card.label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font)',
          fontSize: '14px',
          fontWeight: 700,
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          lineHeight: 1.3,
        }}
      >
        {card.title}
      </span>
      <span
        style={{
          fontFamily: 'var(--font)',
          fontSize: '12.5px',
          color: 'var(--text-muted)',
          lineHeight: 1.4,
        }}
      >
        {card.sub}
      </span>
    </div>
  );
}
