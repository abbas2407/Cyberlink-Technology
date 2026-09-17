import { useEffect, useRef } from 'react';

/* ── SVG icons for contact blocks ── */
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.21 10.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92v2z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const contactBlocks = [
  {
    icon: <PhoneIcon />,
    accentColor: 'var(--cyan)',
    label: 'CALL / WHATSAPP',
    value: '+91 93914 40440',
    value2: '+91 93964 40440',
    href: 'tel:+919391440440',
  },
  {
    icon: <MailIcon />,
    accentColor: 'var(--indigo)',
    label: 'EMAIL',
    value: 'ali@serverparts.in',
    value2: 'sales@cyberlinktechno.com',
    href: 'mailto:ali@serverparts.in',
  },
  {
    icon: <MapPinIcon />,
    accentColor: 'var(--green)',
    label: 'FIND US',
    value: 'cyberlinktechno.com',
    value2: '@cyberlinktechno',
    href: 'https://cyberlinktechno.com',
  },
];

export default function ContactCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, idx) => {
              setTimeout(() => el.classList.add('visible'), idx * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--bg-void)',
        padding: '100px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated orb background */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '20%', left: '-10%',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)',
          animation: 'float1 22s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '-5%',
          width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)',
          animation: 'float2 28s ease-in-out infinite',
        }} />
      </div>

      {/* Grid lines */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', textAlign: 'center' }}>
          <div className="reveal">
            <span className="section-label">// GET IN TOUCH</span>
            <h2 className="section-headline" style={{ textAlign: 'center', margin: '0 auto 20px' }}>
              Ready when{' '}
              <span style={{
                background: 'linear-gradient(135deg, var(--cyan), var(--indigo))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                you are.
              </span>
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: '17px', fontWeight: 400,
              color: 'var(--text-body)', lineHeight: 1.7,
              marginBottom: '56px', textAlign: 'center',
            }}>
              Share a part number, a requirement, or just say hello. We respond within 2 hours.
            </p>
          </div>

          {/* Contact blocks */}
          <div
            className="reveal contact-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '52px' }}
          >
            {contactBlocks.map((block, idx) => (
              <a
                key={idx}
                href={block.href}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  padding: '32px 20px',
                  background: 'rgba(13,20,33,0.7)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  textDecoration: 'none',
                  transition: 'all 0.28s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = block.accentColor;
                  el.style.boxShadow = `0 0 40px ${block.accentColor}20, 0 20px 50px rgba(0,0,0,0.4)`;
                  el.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = 'var(--border)';
                  el.style.boxShadow = 'none';
                  el.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '52px', height: '52px', borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${block.accentColor}15, transparent)`,
                  border: `1px solid ${block.accentColor}30`,
                  color: block.accentColor,
                }}>
                  {block.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)', fontSize: '10px',
                  color: block.accentColor, textTransform: 'uppercase', letterSpacing: '0.12em',
                }}>
                  {block.label}
                </span>
                <div style={{
                  fontFamily: 'var(--font-display)', fontWeight: 700,
                  fontSize: '16px', color: 'var(--text-bright)', lineHeight: 1.3,
                }}>
                  {block.value}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-muted)' }}>
                  {block.value2}
                </div>
              </a>
            ))}
          </div>

          {/* Main CTA */}
          <div className="reveal" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <a
              href="mailto:ali@serverparts.in"
              className="btn btn-primary"
              id="contact-email-btn"
              style={{
                maxWidth: '420px', width: '100%',
                height: '58px', fontSize: '16px',
                borderRadius: '14px',
              }}
            >
              Send us your requirement →
            </a>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--text-dim)' }}>
              Or WhatsApp: +91 93914 40440
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
