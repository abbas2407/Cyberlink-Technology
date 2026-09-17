import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import technicianImg from '../images/technician.jpg';
import switchImg from '../images/switch.jpg';
import softwareEngineerImg from '../images/software-engineer.jpg';
import softwareLifecycleImg from '../images/software-lifecycle.jpg';

/* ─── Typewriter word cycling ─── */
const DEFAULT_WORDS = ['before', 'faster', 'smarter', 'reliably'];

function TypewriterBlue({ words = DEFAULT_WORDS, isDark = true }: { words?: string[]; isDark?: boolean }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setWordIdx(0);
    setDisplayed('');
    setDeleting(false);
  }, [words]);

  useEffect(() => {
    const list = words && words.length > 0 ? words : DEFAULT_WORDS;
    const word = list[wordIdx % list.length] || '';
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < word.length) {
      t = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      t = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setWordIdx(i => (i + 1) % list.length);
    }
    return () => clearTimeout(t);
  }, [displayed, deleting, wordIdx, words]);

  const color = isDark ? '#60a5fa' : '#3830e7';
  return (
    <em style={{
      fontStyle: 'italic',
      fontWeight: 800,
      color,
      letterSpacing: '-0.03em',
    }}>
      {displayed}
      <span style={{ animation: 'blink 0.85s step-end infinite', color, marginLeft: '1px' }}>|</span>
    </em>
  );
}

/* ─── Slideshow images ─── */
const SLIDES = [
  { src: technicianImg,        alt: 'IT technician working on server rack', position: 'center' }, // slide 1 — hardware
  { src: softwareEngineerImg,  alt: 'Software engineering workspace',       position: 'center right' }, // slide 2 — software
  { src: switchImg,            alt: 'Network switch mounted in rack',       position: 'center' }, // slide 3 — hardware
  { src: softwareLifecycleImg, alt: 'Software lifecycle management',        position: 'center' }, // slide 4 — software
];

const SLIDE_OVERLAYS = [
  'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.20) 100%)', // slide 1 dark
  'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.15) 100%)', // slide 2 light
  'linear-gradient(to right, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.58) 50%, rgba(0,0,0,0.20) 100%)', // slide 3 dark
  'linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.72) 48%, rgba(255,255,255,0.15) 100%)', // slide 4 light
];

/* ─── SLIDE_CONTENT for all 4 slides ─── */
const SLIDE_CONTENT = [
  // SLIDE 1 — Hardware (dark theme)
  {
    theme: 'dark' as const,
    eyebrow: 'HYDERABAD · PAN-INDIA · WORLDWIDE',
    headingLines: ['IT Hardware.', null, 'you need it.'],
    animatedLine: { prefix: 'Delivered ', words: ['before', 'faster', 'smarter', 'reliably'], suffix: '' },
    subtitle: <>Premium Servers, Storage, Networking, and Spare Parts — plus{' '}<strong style={{ color: '#ffffff', fontWeight: 600 }}>purpose-built software</strong>{' '}for field operations, hospitality, and HR. Shipping hardware from Hyderabad to{' '}<strong style={{ color: '#ffffff', fontWeight: 600 }}>enterprise data centers</strong>{' '}across the globe.</>,
    badges: ['500+ Parts in Stock', '30+ Brands', 'Same-Day Dispatch', '90-Day Warranty', 'Custom Software Built'],
    cta1: { label: 'Explore Products', href: '#networking' },
    cta2: { label: 'WhatsApp Us ↗', href: 'https://wa.me/919391440440' },
    bottomLeft: 'Pan-India Cloud & On-Prem Deployments',
    bottomRight: 'Full-Stack Engineers & 24/7 SLA Backing',
  },

  // SLIDE 2 — Software Engineering (light theme)
  {
    theme: 'light' as const,
    eyebrow: 'PRODUCT CRAFT · BESPOKE WEB & MOBILE',
    headingLines: ['We Engineer', null, 'Clean. Modern.'],
    animatedLine: { prefix: 'Software that ', words: ['transforms', 'scales', 'performs', 'delivers'], suffix: '' },
    subtitle: <>From architectural blueprint to production-grade deployment — Cyberlink builds scalable, high-performance web and cloud platforms with uncompromising code quality.</>,
    badges: ['Clean Code & Strict Types', 'Modern Web & Native Mobile', 'Sub-Second Performance', 'SOC-2 Compliance Ready'],
    cta1: { label: 'Start Your Build', href: '#softwares' },
    cta2: { label: 'Explore Tech Stack ↗', href: 'https://wa.me/919391440440?text=I+want+to+know+about+your+software+engineering+services.' },
    bottomLeft: 'Pan-India Cloud & On-Prem Deployments',
    bottomRight: 'Full-Stack Engineers & 24/7 SLA Backing',
  },

  // SLIDE 3 — Hardware Networking (dark theme)
  {
    theme: 'dark' as const,
    eyebrow: 'NETWORKING · ENTERPRISE · HYDERABAD',
    headingLines: ['Enterprise IT.', null, 'Delivered same day.'],
    animatedLine: { prefix: 'Sourced ', words: ['globally', 'reliably', 'instantly', 'direct'], suffix: '' },
    subtitle: <>Switches, Firewalls, Routers, SFP Modules, and full rack-level networking infrastructure — sourced from{' '}<strong style={{ color: '#ffffff', fontWeight: 600 }}>Cisco, Ubiquiti, Fortinet</strong>{' '}and 30+ top brands. Delivered same day.</>,
    badges: ['30+ Networking Brands', 'SFP 1G–400G', 'Same-Day Dispatch', 'GPON & Enterprise WiFi'],
    cta1: { label: 'View Networking', href: '#networking' },
    cta2: { label: 'Get a Quote ↗', href: 'https://wa.me/919391440440?text=I+need+a+quote+for+networking+hardware.' },
    bottomLeft: 'Pan-India Cloud & On-Prem Deployments',
    bottomRight: 'Full-Stack Engineers & 24/7 SLA Backing',
  },

  // SLIDE 4 — Software Lifecycle (light theme)
  {
    theme: 'light' as const,
    eyebrow: 'LIFECYCLE MANAGEMENT · REFACTORING & SCALE',
    headingLines: ['Total Lifecycle', null, 'Engineered right.'],
    animatedLine: { prefix: 'Software handled ', words: ['seamlessly', 'reliably', 'expertly', 'at scale'], suffix: '' },
    subtitle: <>Legacy codebase modernization, feature scaling, security patching, and ongoing feature delivery. We take end-to-end stewardship of your mission-critical software.</>,
    badges: ['Legacy System Modernization', 'Dedicated Agile Squads', '24/7 Security Patching & QA', 'Transparent Sprint Delivery'],
    cta1: { label: 'Modernize Your Stack', href: '#softwares' },
    cta2: { label: 'See Case Studies ↗', href: 'https://wa.me/919391440440?text=I+want+to+see+case+studies+for+software+lifecycle+management.' },
    bottomLeft: 'Pan-India Cloud & On-Prem Deployments',
    bottomRight: 'Full-Stack Engineers & 24/7 SLA Backing',
  },
];

/* ─── Per-theme color helper ─── */
const isDark = (i: number) => SLIDE_CONTENT[i].theme === 'dark';

const col = (i: number) => ({
  primary:   isDark(i) ? '#ffffff'              : '#0f172a',
  secondary: isDark(i) ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.75)',
  muted:     isDark(i) ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.45)',
  eyebrowBg: isDark(i) ? 'rgba(99,102,241,0.18)'  : 'rgba(56,48,231,0.08)',
  eyebrowBorder: isDark(i) ? 'rgba(99,102,241,0.4)' : 'rgba(56,48,231,0.25)',
  eyebrowText: isDark(i) ? '#c7d2fe' : '#3830e7',
  eyebrowDot:  isDark(i) ? '#818cf8' : '#3830e7',
  badgeCheck:  isDark(i) ? '#818cf8' : '#3830e7',
  badgeCircleBg: isDark(i) ? 'rgba(99,102,241,0.25)' : 'rgba(56,48,231,0.10)',
  badgeCircleBorder: isDark(i) ? 'rgba(99,102,241,0.5)' : 'rgba(56,48,231,0.3)',
  cta1Bg:    isDark(i) ? 'var(--text-primary)' : '#0f172a',
  cta1Text:  '#ffffff',
  cta2Border: isDark(i) ? 'rgba(255,255,255,0.5)' : 'rgba(15,23,42,0.35)',
  cta2Text:   isDark(i) ? '#ffffff' : '#0f172a',
  accentColor: '#3830e7',
});

/* ─── Carousel Navigator ─── */
const AUTO_DELAY = 4000;

function CarouselNavigator({
  total,
  active,
  onPrev,
  onNext,
  onDot,
}: {
  total: number;
  active: number;
  onPrev: () => void;
  onNext: () => void;
  onDot: (i: number) => void;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
    }}>
      {/* Prev button */}
      <motion.button
        onClick={onPrev}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
        aria-label="Previous slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
      </motion.button>

      {/* Dots + progress bars */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        {Array.from({ length: total }).map((_, i) => {
          const isActive = active === i;
          return (
            <button
              key={i}
              onClick={() => onDot(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                position: 'relative',
                width: isActive ? '40px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.35)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                overflow: 'hidden',
                transition: 'width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease',
                flexShrink: 0,
              }}
            >
              {isActive && (
                <motion.div
                  key={active}
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: AUTO_DELAY / 1000, ease: 'linear' }}
                  style={{
                    position: 'absolute',
                    left: 0, top: 0,
                    height: '100%',
                    background: '#ffffff',
                    borderRadius: '4px',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Next button */}
      <motion.button
        onClick={onNext}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        style={{
          width: '38px', height: '38px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.12)',
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(8px)',
          color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
        aria-label="Next slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </motion.button>

      {/* Slide counter */}
      <motion.span
        key={active}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '11px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.06em',
          userSelect: 'none',
          minWidth: '28px',
        }}
      >
        {String(active + 1).padStart(2, '0')}/{String(total).padStart(2, '0')}
      </motion.span>
    </div>
  );
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const [magnetPos, setMagnetPos] = useState({ x: 0, y: 0 });
  const [wipe, setWipe] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const triggerWipe = () => {
    setWipe(true);
    setTimeout(() => setWipe(false), 500);
  };

  const handleMagnet = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setMagnetPos({
      x: (e.clientX - cx) * 0.3,
      y: (e.clientY - cy) * 0.3,
    });
  };
  const resetMagnet = () => setMagnetPos({ x: 0, y: 0 });

  const goTo = (i: number) => {
    setActive(i);
  };

  const startInterval = () => {
    stopInterval();
    intervalRef.current = setInterval(
      () => {
        triggerWipe();
        setActive(i => (i + 1) % SLIDES.length);
      },
      AUTO_DELAY,
    );
  };
  const stopInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handlePrev = () => {
    stopInterval();
    triggerWipe();
    setActive(i => (i - 1 + SLIDES.length) % SLIDES.length);
    startInterval();
  };
  const handleNext = () => {
    stopInterval();
    triggerWipe();
    setActive(i => (i + 1) % SLIDES.length);
    startInterval();
  };
  const handleDot = (i: number) => {
    stopInterval();
    triggerWipe();
    goTo(i);
    startInterval();
  };

  useEffect(() => {
    startInterval();
    return stopInterval;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderHeading = (slide: typeof SLIDE_CONTENT[0], colors: ReturnType<typeof col>) => {
    const lines = slide.headingLines;
    const anim = 'animatedLine' in slide ? slide.animatedLine : null;

    return (
      <h1 className="hero-h1" style={{
        fontFamily: 'var(--font)', fontWeight: 800,
        fontSize: 'clamp(36px, 5.5vw, 68px)',
        lineHeight: 1.08, letterSpacing: '-0.04em',
        marginBottom: '24px', color: colors.primary,
      }}>
        {lines.map((line, i) => {
          if (line === null && anim) {
            return (
              <span key={i} style={{ display: 'block' }}>
                {anim.prefix}<TypewriterBlue words={anim.words} isDark={isDark(active)} />{anim.suffix}
              </span>
            );
          }
          return (
            <span key={i} style={{
              display: 'block',
              color: colors.primary,
            }}>
              {line}
            </span>
          );
        })}
      </h1>
    );
  };

  return (
    <section
      id="products"
      onMouseEnter={stopInterval}
      onMouseLeave={startInterval}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        minHeight: '640px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* ── Background Slideshow ── */}
      {SLIDES.map((slide, i) => (
        <motion.img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          animate={{
            opacity: active === i ? 1 : 0,
            scale: active === i ? 1 : 1.04,
            x: active === i ? 0 : (i % 2 === 0 ? -12 : 12),
          }}
          transition={{ duration: 1.1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: 'absolute', top: 0, left: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: slide.position || 'center',
            zIndex: 0, willChange: 'transform, opacity',
            filter: active === i ? 'none' : 'blur(2px)',
          }}
        />
      ))}

      {/* ── Wipe Overlay ── */}
      <AnimatePresence>
        {wipe && (
          <motion.div
            key="wipe"
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0, originX: 1 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            style={{
              position: 'absolute', inset: 0, zIndex: 10,
              background: isDark(active)
                ? 'rgba(56,48,231,0.12)'
                : 'rgba(56,48,231,0.06)',
              pointerEvents: 'none',
              transformOrigin: 'left center',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Overlay gradient ── */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: SLIDE_OVERLAYS[active],
        zIndex: 1, pointerEvents: 'none',
        transition: 'background 0.8s ease-in-out',
      }} />

      {/* ── Main content wrapper ── */}
      <div
        className="container"
        style={{ position: 'relative', zIndex: 2, width: '100%', paddingTop: '100px' }}
      >
        <div style={{ maxWidth: '580px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 22, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            >
              {(() => {
                const content = SLIDE_CONTENT[active];
                const colors = col(active);
                return (
                  <>
                    {/* Eyebrow pill */}
                    <div style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      background: colors.eyebrowBg,
                      border: `1px solid ${colors.eyebrowBorder}`,
                      borderRadius: 'var(--r-full)',
                      padding: '5px 14px', marginBottom: '28px',
                    }}>
                      <span style={{ color: colors.eyebrowDot, fontSize: '9px' }}>◆</span>
                      <span style={{
                        fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500,
                        color: colors.eyebrowText, letterSpacing: '0.08em',
                        textTransform: 'uppercase' as const,
                      }}>
                        {content.eyebrow}
                      </span>
                    </div>

                    {/* Heading */}
                    {renderHeading(content, colors)}

                    {/* Subtitle */}
                    <p style={{
                      fontFamily: 'var(--font)', fontSize: '17px', fontWeight: 400,
                      color: colors.secondary, lineHeight: 1.65,
                      maxWidth: '460px', marginBottom: '28px',
                    }}>
                      {content.subtitle}
                    </p>

                    {/* Badges — 2-column grid */}
                    <div className="hero-badges-grid" style={{
                      display: 'grid', gridTemplateColumns: '1fr 1fr',
                      gap: '10px 20px', marginBottom: '36px',
                    }}>
                      {content.badges.map((label, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{
                            width: '18px', height: '18px', borderRadius: '50%', flexShrink: 0,
                            background: colors.badgeCircleBg,
                            border: `1px solid ${colors.badgeCircleBorder}`,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.2 5.5L8 1" stroke={colors.badgeCheck} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span style={{
                            fontFamily: 'var(--font)', fontSize: '13.5px',
                            fontWeight: 500, color: colors.secondary,
                          }}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CTA buttons */}
                    <div className="hero-cta-wrap" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <motion.a
                        href={content.cta1.href}
                        onMouseMove={handleMagnet}
                        onMouseLeave={resetMagnet}
                        animate={{ x: magnetPos.x, y: magnetPos.y }}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="hero-btn-primary"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          height: '48px', padding: '0 28px',
                          borderRadius: '12px',
                          background: colors.cta1Bg, color: colors.cta1Text,
                          fontFamily: 'var(--font)', fontWeight: 700, fontSize: '15px',
                          textDecoration: 'none', border: 'none',
                          boxShadow: isDark(active)
                            ? '0 4px 20px rgba(0,0,0,0.4)'
                            : '0 4px 20px rgba(15,23,42,0.18)',
                          cursor: 'pointer',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {content.cta1.label}
                      </motion.a>

                      <motion.a
                        href={content.cta2.href}
                        target={content.cta2.href.startsWith('http') ? '_blank' : undefined}
                        rel={content.cta2.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="hero-btn-secondary"
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: '6px',
                          height: '48px', padding: '0 24px',
                          borderRadius: '12px',
                          border: `1.5px solid ${colors.cta2Border}`,
                          color: colors.cta2Text, fontFamily: 'var(--font)',
                          fontWeight: 600, fontSize: '15px',
                          textDecoration: 'none', background: 'transparent',
                          backdropFilter: 'blur(6px)',
                          cursor: 'pointer', letterSpacing: '-0.01em',
                        }}
                      >
                        {content.cta2.label}
                      </motion.a>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom trust bar ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bar-${active}`}
          className="hero-trust-bar"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0, left: 0, right: 0,
            height: '48px',
            background: isDark(active)
              ? 'rgba(0,0,0,0.35)'
              : 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(10px)',
            borderTop: isDark(active)
              ? '1px solid rgba(255,255,255,0.08)'
              : '1px solid rgba(15,23,42,0.08)',
            display: 'flex', alignItems: 'center',
            padding: '0 48px',
            gap: '24px',
            zIndex: 3,
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#22c55e', flexShrink: 0,
              boxShadow: '0 0 6px rgba(34,197,94,0.6)',
            }} />
            <span style={{
              fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500,
              color: isDark(active) ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.55)',
              letterSpacing: '0.04em',
            }}>
              {SLIDE_CONTENT[active].bottomLeft}
            </span>
          </span>

          <span style={{
            color: isDark(active) ? 'rgba(255,255,255,0.2)' : 'rgba(15,23,42,0.2)',
            fontSize: '12px',
          }}>·</span>

          <span style={{
            fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500,
            color: isDark(active) ? 'rgba(255,255,255,0.55)' : 'rgba(15,23,42,0.55)',
            letterSpacing: '0.04em',
          }}>
            {SLIDE_CONTENT[active].bottomRight}
          </span>
        </motion.div>
      </AnimatePresence>

      {/* ── Carousel Navigator ── */}
      <div className="hero-carousel-nav" style={{
        position: 'absolute',
        bottom: '64px',
        right: '48px',
        zIndex: 4,
      }}>
        <CarouselNavigator
          total={SLIDES.length}
          active={active}
          onPrev={handlePrev}
          onNext={handleNext}
          onDot={handleDot}
        />
      </div>

      <style>{`
        @media (max-width: 768px) {
          #products {
            height: auto !important;
            min-height: 100svh !important;
            padding-top: 84px !important;
            padding-bottom: 90px !important;
          }
          .hero-h1 {
            font-size: clamp(28px, 7.5vw, 42px) !important;
            line-height: 1.12 !important;
            margin-bottom: 16px !important;
          }
          .hero-trust-bar {
            display: none !important;
          }
          .hero-carousel-nav {
            bottom: 24px !important;
            right: 20px !important;
          }
        }
        @media (max-width: 500px) {
          .hero-badges-grid {
            grid-template-columns: 1fr !important;
            gap: 8px !important;
            margin-bottom: 24px !important;
          }
          .hero-cta-wrap {
            flex-direction: column !important;
            gap: 10px !important;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100% !important;
            justify-content: center !important;
          }
        }
        @media (max-width: 640px) {
          #products > div[style*="z-index: 1"] {
            background: linear-gradient(to bottom,
              rgba(0,0,0,0.85) 0%,
              rgba(0,0,0,0.72) 100%) !important;
          }
        }
      `}</style>
    </section>
  );
}
