import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b" stroke="#f59e0b" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

const QuoteIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.25 }}>
    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.757 2.017 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/>
    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.757 2.017 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"/>
  </svg>
);

const PILLS = [
  { l: 'Pan-India Shipping',   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> },
  { l: 'International Export', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> },
  { l: '90-Day Warranty',      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg> },
  { l: 'Same-Day Dispatch',    icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { l: '500+ Parts Stocked',   icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10"/><path d="M1 6l11-4 11 4"/><path d="M12 2v8"/></svg> },
  { l: '30+ Brands',           icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
];

const REVIEWS = [
  {
    initials: 'IT',
    name: 'IT Manager, Hyderabad',
    tag: 'Verified Customer · Enterprise Client',
    text: 'We messaged at 9am — server had been down since midnight. Cyberlink quoted in 20 minutes and dispatched the same day. Back online by evening. Our previous vendor was still "checking availability."',
  },
  {
    initials: 'CT',
    name: 'CTO, Bengaluru Logistics Tech',
    tag: 'Verified Buyer · Express Delivery',
    text: 'Sourced 40x Cisco 100Gb SFP28 modules and Mellanox NICs during a severe supply crunch. Delivered within 48 hours with full test reports and 90-day replacement warranty.',
  },
  {
    initials: 'IL',
    name: 'Infrastructure Lead, Dubai',
    tag: 'Verified Client · International Export',
    text: 'Export process to UAE was completely seamless. Original HP ProLiant parts with clean serial numbers and zero customs hassle. Cyberlink is now our primary hardware partner.',
  },
  {
    initials: 'HI',
    name: 'Head of IT, Mumbai FinTech',
    tag: 'Verified Client · Enterprise Fleet',
    text: 'Refurbished ThinkPad workstations and Xeon Scalable Gold processors arrived in factory condition. Saved us over 35% on infrastructure budget with zero downtime.',
  },
];

function ReviewCard({ rev, idx }: { rev: typeof REVIEWS[0]; idx: number }) {
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
      initial={{ opacity: 0, y: 45, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: 'easeOut', delay: idx * 0.08 }}
      whileHover={{ y: -6, boxShadow: 'var(--shadow-md)', borderColor: 'rgba(56, 48, 231, 0.22)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'var(--surface-white)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        padding: '32px 28px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '240px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Spotlight hover effect */}
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
              background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 48, 231, 0.45), transparent 80%)`,
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        {/* Top Quote Icon & Stars */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', gap: '3px' }}>
            {[0, 1, 2, 3, 4].map(i => <StarIcon key={i} />)}
          </div>
          <QuoteIcon />
        </div>

        {/* Quote Text */}
        <blockquote style={{
          fontFamily: 'var(--font)', fontSize: '15.5px', fontWeight: 400,
          lineHeight: 1.7, fontStyle: 'italic', margin: 0, marginBottom: '24px',
          color: 'var(--text-secondary)', flex: 1,
        }}>
          "{rev.text}"
        </blockquote>

        {/* Author Footer */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '14px',
          paddingTop: '18px', borderTop: '1px solid rgba(226, 228, 233, 0.6)',
        }}>
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--blue) 0%, #7c3aed 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontFamily: 'var(--font)', fontWeight: 700, fontSize: '15px',
            flexShrink: 0, letterSpacing: '-0.02em',
          }}>
            {rev.initials}
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font)', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
              {rev.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '3px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '0.03em' }}>
                {rev.tag}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonial() {
  return (
    <section style={{
      background: 'var(--surface-white)',
      padding: '96px 0',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container">

        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '52px' }}
        >
          <span className="section-eyebrow">// CLIENT REVIEWS</span>
          <h2 className="section-title">Trusted by IT leaders &amp; data centers.</h2>
          <p className="section-body">
            Read how businesses rely on Cyberlink for fast turnarounds, genuine enterprise hardware, and 24/7 technical support.
          </p>
        </motion.div>

        {/* Review Cards Grid */}
        <div className="reviews-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px',
          marginBottom: '56px',
        }}>
          {REVIEWS.map((rev, idx) => (
            <ReviewCard key={idx} rev={rev} idx={idx} />
          ))}
        </div>

        {/* Trust pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
          {PILLS.map((p, i) => (
            <motion.span
              key={p.l}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.04, borderColor: 'var(--blue)', color: 'var(--blue)', background: 'var(--blue-tint)' }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                padding: '9px 16px',
                background: 'var(--surface-low)', border: '1px solid var(--border)',
                borderRadius: 'var(--r-full)',
                fontFamily: 'var(--font)', fontSize: '13px', fontWeight: 500,
                color: 'var(--text-secondary)', cursor: 'default',
                transition: 'border-color 0.2s ease, color 0.2s ease, background-color 0.2s ease',
              }}
            >
              <span style={{ color: 'var(--blue)', display: 'flex', alignItems: 'center' }}>{p.icon}</span>
              {p.l}
            </motion.span>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .reviews-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
