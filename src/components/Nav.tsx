import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import cyberlinkLogo from '../images/cyberlink-logo.png';

interface NavLink {
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { label: 'Who We Are', href: '#server-parts' },
  { label: 'Networking', href: '#networking' },
  { label: 'Services',   href: '#services' },
  { label: 'Softwares',  href: '#softwares' },
  { label: 'Contact',    href: '#contact' },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState('Who We Are');
  const [hovered, setHovered]   = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const SECTION_MAP: Record<string, string> = {
      'server-parts':  'Who We Are',
      'networking':    'Networking',
      'services':      'Services',
      'softwares':     'Softwares',
      'contact':       'Contact',
    };

    const observers: IntersectionObserver[] = [];

    Object.entries(SECTION_MAP).forEach(([id, label]) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(label);
        },
        { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          height: scrolled ? '54px' : '62px',
          background: scrolled ? 'rgba(255, 255, 255, 0.85)' : '#ffffff',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border)',
          boxShadow: scrolled ? 'var(--shadow-sm)' : 'none',
          transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, box-shadow 0.3s ease',
        }}
      >
        <div className="container" style={{
          height: '100%', display: 'flex', alignItems: 'center', gap: 0,
        }}>

          <a
            href="/"
            onClick={() => setActive('Softwares')}
            style={{ textDecoration: 'none', marginRight: '40px', flexShrink: 0 }}
          >
            <img
              src={cyberlinkLogo}
              alt="Cyberlink"
              style={{
                height: scrolled ? '34px' : '40px',
                width: 'auto',
                display: 'block',
                mixBlendMode: 'multiply',
                transition: 'height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </a>

          {/* ── Nav links with AnimatedBackground-style hover ── */}
          <div
            style={{ display: 'flex', flex: 1, height: '100%', position: 'relative' }}
            className="nav-links"
            onMouseLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((link, idx) => {
              const isActive = active === link.label;
              const isHovered = hovered === link.label;
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setActive(link.label)}
                  onMouseEnter={() => setHovered(link.label)}
                  style={{
                    fontFamily: 'var(--font)',
                    fontSize: '14px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive || isHovered ? 'var(--text-primary)' : 'var(--text-secondary)',
                    textDecoration: 'none',
                    padding: '0 14px',
                    height: '100%',
                    display: 'flex', alignItems: 'center',
                    position: 'relative',
                    zIndex: 1,
                    transition: 'color 0.2s ease',
                  }}
                >
                  {/* Sliding hover pill */}
                  {isHovered && (
                    <motion.span
                      layoutId="navHoverPill"
                      style={{
                        position: 'absolute',
                        inset: '10px 4px',
                        borderRadius: '8px',
                        background: 'var(--surface-mid)',
                        zIndex: -1,
                      }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                    />
                  )}
                  {link.label}
                  {/* Active underline */}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      style={{
                        position: 'absolute', bottom: 0, left: '14px', right: '14px',
                        height: '2px', background: 'var(--blue)',
                        borderRadius: '2px 2px 0 0',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* ── Right side — replaced phone + quote ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }} className="nav-right">

            {/* Phone number display */}
            <span style={{
              fontFamily: 'var(--font)',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
            }}>
              +91 93914 40440
            </span>

            {/* Connect CTA */}
            <motion.a
              href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20want%20to%20inquire%20about%20IT%20hardware%20supply%2C%20server%20parts%2C%20or%20booking%20a%20consultation."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-sm"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                background: 'var(--text-primary)',
                boxShadow: 'var(--shadow-xs)',
                letterSpacing: '-0.01em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span>Connect</span>
              <motion.span
                variants={{
                  hover: { x: 5 }
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                →
              </motion.span>
            </motion.a>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <motion.button
            onClick={() => setMobileOpen(prev => !prev)}
            className="nav-hamburger"
            aria-label="Toggle menu"
            whileTap={{ scale: 0.92 }}
            style={{
              background: mobileOpen ? 'var(--surface-high)' : 'var(--surface-low)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              cursor: 'pointer',
              padding: '10px 12px',
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              width: '42px',
              height: '42px',
              transition: 'background-color 0.2s',
            }}
          >
            <div style={{ width: '18px', height: '14px', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                style={{ width: '18px', height: '2px', background: 'var(--text-primary)', borderRadius: '2px', transformOrigin: 'center' }}
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                style={{ width: '18px', height: '2px', background: 'var(--text-primary)', borderRadius: '2px' }}
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                style={{ width: '18px', height: '2px', background: 'var(--text-primary)', borderRadius: '2px', transformOrigin: 'center' }}
              />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* ── High-Tech Glassmorphic Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 190,
                background: 'rgba(15, 23, 42, 0.45)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />

            {/* Slide-over Drawer */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(360px, 86vw)',
                zIndex: 200,
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                borderLeft: '1px solid var(--border)',
                boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
                display: 'flex', flexDirection: 'column',
                overflowY: 'auto',
                padding: 'calc(var(--safe-top) + 20px) 20px calc(var(--safe-bottom) + 24px)',
              }}
            >
              {/* Drawer Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <img src={cyberlinkLogo} alt="Cyberlink" style={{ height: '32px', width: 'auto', mixBlendMode: 'multiply' }} />
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: '5px',
                    padding: '3px 8px', borderRadius: 'var(--r-full)',
                    background: 'var(--green-bg)', border: '1px solid var(--green-border)',
                    fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 600, color: 'var(--green-text)',
                  }}>
                    <span className="dot-live" style={{ width: '5px', height: '5px' }} />
                    ONLINE
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--surface-low)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '16px',
                  }}
                >
                  ✕
                </motion.button>
              </div>

              {/* Navigation Links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '24px' }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600,
                  color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase',
                  marginBottom: '6px', paddingLeft: '6px',
                }}>
                  Navigation
                </span>
                {NAV_LINKS.map((link, i) => {
                  const isActive = active === link.label;
                  return (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.25 }}
                      onClick={() => {
                        setActive(link.label);
                        setMobileOpen(false);
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '12px 14px', borderRadius: '12px',
                        background: isActive ? 'var(--blue-tint)' : 'var(--surface-white)',
                        border: `1px solid ${isActive ? 'var(--blue-border)' : 'var(--border)'}`,
                        textDecoration: 'none',
                        color: isActive ? 'var(--blue)' : 'var(--text-primary)',
                        fontFamily: 'var(--font)', fontWeight: isActive ? 600 : 500, fontSize: '15px',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{link.label}</span>
                      <span style={{ color: isActive ? 'var(--blue)' : 'var(--text-muted)', fontSize: '14px' }}>
                        {isActive ? '●' : '→'}
                      </span>
                    </motion.a>
                  );
                })}
              </div>

              {/* Quick Products Shortcuts */}
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600,
                  color: 'var(--text-dim)', letterSpacing: '0.08em', textTransform: 'uppercase',
                  marginBottom: '8px', display: 'block', paddingLeft: '6px',
                }}>
                  Software Platforms
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { name: 'FieldPulse', path: '/products/fieldpulse', cat: 'Fleet GPS' },
                    { name: 'CyberlinkHR', path: '/products/cyberlinkhr', cat: 'Payroll' },
                    { name: 'HotelWifi', path: '/products/hotelwifi', cat: 'Hotspot' },
                    { name: 'AgentPro', path: '/products/agentpro', cat: 'CRM Desk' },
                  ].map(p => (
                    <a
                      key={p.name}
                      href={p.path}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        padding: '10px 12px', borderRadius: '10px',
                        background: 'var(--surface-low)', border: '1px solid var(--border)',
                        textDecoration: 'none', display: 'flex', flexDirection: 'column', gap: '2px',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {p.name}
                      </span>
                      <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', color: 'var(--text-muted)' }}>
                        {p.cat}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Bottom Quick-Action CTAs */}
              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <motion.a
                  href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20want%20to%20inquire%20about%20IT%20hardware%20supply%2C%20server%20parts%2C%20or%20booking%20a%20consultation."
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    height: '46px', borderRadius: '12px',
                    background: '#22c55e', color: '#ffffff',
                    fontFamily: 'var(--font)', fontWeight: 600, fontSize: '14px',
                    textDecoration: 'none', boxShadow: '0 4px 14px rgba(34,197,94,0.3)',
                  }}
                >
                  <span>Chat on WhatsApp</span>
                  <span>↗</span>
                </motion.a>

                <a
                  href="tel:+919391440440"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    height: '42px', borderRadius: '12px',
                    background: 'var(--surface-low)', border: '1px solid var(--border)',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font)', fontWeight: 500, fontSize: '13.5px',
                    textDecoration: 'none',
                  }}
                >
                  <span>📞 Call: +91 93914 40440</span>
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 960px) {
          .nav-links   { display: none !important; }
          .nav-right   { display: none !important; }
          .nav-hamburger { display: flex !important; margin-left: auto !important; }
        }
      `}</style>
    </>
  );
}

