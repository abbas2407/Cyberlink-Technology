import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
          <button
            onClick={() => setMobileOpen(true)}
            className="nav-hamburger"
            aria-label="Open menu"
            style={{
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r)',
              cursor: 'pointer',
              padding: '8px 10px',
              display: 'none',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {[0,1,2].map(i => (
              <span key={i} style={{ display: 'block', width: '18px', height: '1.5px', background: 'var(--text-primary)', borderRadius: '1px' }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile overlay ── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(248,249,252,0.98)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '16px',
        opacity: mobileOpen ? 1 : 0,
        pointerEvents: mobileOpen ? 'all' : 'none',
        transition: 'opacity 0.22s ease',
        overflowY: 'auto',
        padding: '60px 20px',
      }}>
        <button
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
          style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'var(--surface-mid)', border: '1px solid var(--border)',
            borderRadius: 'var(--r)', cursor: 'pointer',
            width: '42px', height: '42px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', color: 'var(--text-primary)',
          }}
        >✕</button>
        
        {NAV_LINKS.map((link, i) => (
          <a
            key={i}
            href={link.href}
            onClick={() => {
              setActive(link.label);
              setMobileOpen(false);
            }}
            style={{
              fontFamily: 'var(--font)', fontWeight: 700, fontSize: '24px',
              color: 'var(--text-primary)', textDecoration: 'none',
              padding: '6px 20px', letterSpacing: '-0.02em',
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
              transition: `opacity 0.2s ease ${i*50}ms, transform 0.2s ease ${i*50}ms`,
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--blue)'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'}
          >
            {link.label}
          </a>
        ))}
        
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
          <span style={{
            fontFamily: 'var(--font)',
            fontSize: '15px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
          }}>
            +91 93914 40440
          </span>
          <a
            href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20want%20to%20inquire%20about%20IT%20hardware%20supply%2C%20server%20parts%2C%20or%20booking%20a%20consultation."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
            className="btn btn-primary"
            style={{ minWidth: '160px' }}
          >
            Connect →
          </a>
        </div>
      </div>

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
