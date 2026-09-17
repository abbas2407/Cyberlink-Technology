import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SERVICES = [
  {
    accent: 'var(--blue)', accentBg: 'var(--blue-tint)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/>
        <polyline points="8 21 12 17 16 21"/>
        <line x1="12" y1="17" x2="12" y2="21"/>
        <circle cx="7" cy="10" r="1" fill="currentColor"/>
        <line x1="11" y1="10" x2="17" y2="10"/>
        <line x1="11" y1="13" x2="14" y2="13"/>
      </svg>
    ),
    title: 'Computer Support',
    body: 'Troubleshooting & diagnostics · OS installs & updates · Malware removal · Software config · Performance tuning',
    tag: 'Remote & on-site',
    features: ['Diagnostics', 'OS Repair', 'Malware Removal'],
  },
  {
    accent: 'var(--green)', accentBg: 'var(--green-bg)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2"/>
        <circle cx="6" cy="6" r="1" fill="currentColor"/>
        <circle cx="6" cy="18" r="1" fill="currentColor"/>
        <line x1="10" y1="6" x2="16" y2="6"/>
        <line x1="10" y1="18" x2="16" y2="18"/>
      </svg>
    ),
    title: 'Server Administration',
    body: 'Windows & Linux server support · Active Directory · VMware/Hyper-V · Cloud & on-prem backups · Security hardening',
    tag: 'Enterprise grade',
    features: ['Windows/Linux', 'VMware', 'Backup'],
  },
  {
    accent: '#7c3aed', accentBg: '#f5f3ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path d="M4.93 4.93l14.14 14.14"/>
      </svg>
    ),
    title: 'Networking Support',
    body: 'Router & switch configuration · Firewall setup · Wi-Fi optimisation · VPN & secure remote access · Diagnostics',
    tag: 'Full setup',
    features: ['Firewall', 'VPN Setup', 'WiFi'],
  },
  {
    accent: '#7c3aed',
    accentBg: '#f5f3ff',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
        <line x1="12" y1="4" x2="12" y2="20"/>
      </svg>
    ),
    title: 'Software Building & Delivery',
    body: 'Custom web apps · Internal business tools · SaaS dashboards · Workflow automation · API integrations · Ongoing maintenance. Built clean, delivered fast.',
    tag: 'Full project delivery',
    features: ['Web Apps', 'SaaS Build', 'Automation'],
  },
];

function ServiceCard({ s, i }: { s: typeof SERVICES[0]; i: number }) {
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: i * 0.1 }}
      whileHover={{ y: -8, boxShadow: 'var(--shadow-md)', borderColor: `${s.accent}40` }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--surface-white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r)',
        padding: '32px 24px',
        display: 'flex', flexDirection: 'column', gap: '16px',
        position: 'relative', overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Spotlight cursor effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.08 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              pointerEvents: 'none',
              background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, ${s.accent}, transparent 80%)`,
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
        {/* Top hover accent bar */}
        <div style={{
          position: 'absolute', top: '-32px', left: '-24px', right: '-24px', height: '3px',
          background: `linear-gradient(90deg, ${s.accent}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s',
        }} />

        {/* Icon wrapper */}
        <div style={{
          width: '52px', height: '52px', borderRadius: 'var(--r-sm)',
          background: s.accentBg, border: `1px solid ${s.accent}25`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: s.accent,
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{ width: '24px', height: '24px' }}>{s.icon}</div>
        </div>

        <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '18px', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          {s.title}
        </h3>

        <p style={{ fontFamily: 'var(--font)', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.65, flex: 1 }}>
          {s.body}
        </p>

        {/* Features list */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {s.features.map(f => (
            <span key={f} style={{
              fontFamily: 'var(--mono)', fontSize: '11px',
              padding: '3px 9px', borderRadius: 'var(--r-sm)',
              background: isHovered ? s.accentBg : 'var(--surface-mid)',
              color: isHovered ? s.accent : 'var(--text-muted)',
              border: `1px solid ${isHovered ? s.accent + '30' : 'var(--border)'}`,
              transition: 'all 0.25s',
            }}>
              {f}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          paddingTop: '14px', borderTop: '1px solid var(--border)',
          fontFamily: 'var(--mono)', fontSize: '12px',
          color: isHovered ? s.accent : 'var(--text-dim)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'color 0.2s',
        }}>
          <span>{s.tag}</span>
          <span style={{
            opacity: isHovered ? 1 : 0, transition: 'opacity 0.2s', fontSize: '14px',
          }}>→</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" style={{ background: 'var(--bg)', padding: '96px 0' }}>
      <div className="container">
        
        {/* Section title scroll reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ marginBottom: '52px' }}
        >
          <span className="section-eyebrow">// SERVICES & SUPPORT</span>
          <h2 className="section-title">We don't just sell it.</h2>
          <p className="section-body">We make sure it works — hardware supported remotely and on-site, software designed and delivered end to end.</p>
        </motion.div>

        {/* Services grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }} className="svc-grid">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} s={s} i={i} />
          ))}
        </div>

        {/* WhatsApp Consultation button */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '44px' }}
        >
          <motion.a 
            href="https://wa.me/919391440440" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-secondary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, marginRight: '8px' }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>Free consultation · WhatsApp us</span>
          </motion.a>
        </motion.div>

      </div>

      <style>{`
        @media (max-width: 768px) { .svc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
