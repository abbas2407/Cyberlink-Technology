import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ── Pricing plan icons ── */
const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>
);
const StarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
);
const BuildingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18M15 3v18M3 9h18M3 15h18"/>
  </svg>
);

const PLANS = {
  monthly: [
    {
      name: 'Basic Support', icon: <ShieldIcon />, price: '₹300', period: '/call', popular: false,
      features: ['Computer Troubleshooting', 'Email Setup', 'Remote Optimization', 'Malware Scan'],
      cta: 'Get Started', href: 'https://wa.me/919391440440?text=Basic%20Support',
    },
    {
      name: 'Pro IT Support', icon: <StarIcon />, price: '₹1,500', period: '/mo', popular: true,
      features: ['All Basic Features', 'Server Monitoring', 'Networking Support', 'Cloud Admin Tasks'],
      cta: 'Choose Pro', href: 'https://wa.me/919391440440?text=Pro%20Support',
    },
    {
      name: 'Enterprise', icon: <BuildingIcon />, price: '₹11,000', period: '/yr', popular: false,
      features: ['Full IT Management', '24/7 Support', 'Cloud Infrastructure', 'Network Security'],
      cta: 'Contact Sales', href: 'https://wa.me/919391440440?text=Enterprise',
    },
  ],
  yearly: [
    {
      name: 'Basic Support', icon: <ShieldIcon />, price: '₹2,700', period: '/yr', popular: false,
      features: ['Computer Troubleshooting', 'Email Setup', 'Remote Optimization', 'Malware Scan'],
      cta: 'Get Started', href: 'https://wa.me/919391440440?text=Basic%20Yearly', saving: 'Save 25%',
    },
    {
      name: 'Pro IT Support', icon: <StarIcon />, price: '₹13,500', period: '/yr', popular: true,
      features: ['All Basic Features', 'Server Monitoring', 'Networking Support', 'Cloud Admin Tasks'],
      cta: 'Choose Pro', href: 'https://wa.me/919391440440?text=Pro%20Yearly', saving: 'Save 25%',
    },
    {
      name: 'Enterprise', icon: <BuildingIcon />, price: '₹99,000', period: '/yr', popular: false,
      features: ['Full IT Management', '24/7 Support', 'Cloud Infrastructure', 'Network Security'],
      cta: 'Contact Sales', href: 'https://wa.me/919391440440?text=Enterprise%20Yearly', saving: 'Save 25%',
    },
  ],
};

function PricingCard({ plan, i }: { plan: typeof PLANS.monthly[0]; i: number }) {
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
      whileHover={{ y: -8, boxShadow: 'var(--shadow-md)', borderColor: plan.popular ? 'var(--blue)' : 'rgba(56, 48, 231, 0.25)' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        background: 'var(--surface-white)',
        border: plan.popular ? '2px solid var(--blue)' : '1px solid var(--border)',
        borderRadius: 'var(--r-xl)',
        padding: plan.popular ? '44px 24px 28px 24px' : '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        overflow: 'hidden',
        boxShadow: plan.popular ? '0 0 0 4px var(--blue-tint), var(--shadow-lg)' : 'var(--shadow-xs)',
        cursor: 'pointer',
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
              background: `radial-gradient(350px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(56, 48, 231, 0.45), transparent 80%)`,
              zIndex: 0,
            }}
          />
        )}
      </AnimatePresence>

      {plan.popular && (
        <div style={{
          position: 'absolute',
          top: '14px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--blue)',
          color: '#ffffff',
          fontFamily: 'var(--font)',
          fontSize: '10px',
          fontWeight: 700,
          padding: '4px 14px',
          borderRadius: 'var(--r-full)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          zIndex: 2,
        }}>
          MOST POPULAR
        </div>
      )}

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '54px',
          height: '54px',
          borderRadius: 'var(--r)',
          background: plan.popular ? 'var(--blue-tint)' : 'var(--surface-low)',
          border: '1px solid var(--border)',
          marginBottom: '14px',
          color: plan.popular ? 'var(--blue)' : 'var(--text-secondary)',
        }}>
          {plan.icon}
        </div>
        <h3 style={{
          fontFamily: 'var(--font)',
          fontWeight: 700,
          fontSize: '19px',
          color: 'var(--text-primary)',
          letterSpacing: '-0.01em',
          marginBottom: '8px',
        }}>
          {plan.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px' }}>
          <span style={{
            fontFamily: 'var(--font)',
            fontWeight: 800,
            fontSize: '30px',
            color: plan.popular ? 'var(--blue)' : 'var(--text-primary)',
            letterSpacing: '-0.03em',
          }}>
            {plan.price}
          </span>
          <span style={{
            fontFamily: 'var(--mono)',
            fontSize: '12px',
            color: 'var(--text-muted)',
          }}>
            {plan.period}
          </span>
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }} />

      <ul style={{
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '9px',
        flex: 1,
        position: 'relative',
        zIndex: 1,
      }}>
        {plan.features.map(f => (
          <li key={f} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '9px',
            fontFamily: 'var(--font)',
            fontSize: '14px',
            color: 'var(--text-secondary)',
          }}>
            <div style={{
              width: '17px',
              height: '17px',
              borderRadius: '50%',
              flexShrink: 0,
              background: plan.popular ? 'var(--blue-tint)' : 'var(--surface-mid)',
              color: plan.popular ? 'var(--blue)' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
                <path d="M1 3.5L3 5.5L7 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {f}
          </li>
        ))}
      </ul>

      <motion.a
        href={plan.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          width: '100%',
          height: '42px',
          fontFamily: 'var(--font)',
          fontSize: '14px',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          borderRadius: 'var(--r)',
          background: plan.popular ? 'var(--blue)' : 'transparent',
          border: '1px solid var(--blue)',
          color: plan.popular ? '#ffffff' : 'var(--blue)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {plan.cta}
      </motion.a>
    </motion.div>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  const plans = PLANS[billing];

  return (
    <section id="pricing" style={{ background: 'var(--bg)', padding: '96px 0', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ textAlign: 'center', marginBottom: '44px' }}
        >
          <h2 style={{
            fontFamily: 'var(--font)', fontWeight: 700,
            fontSize: 'clamp(30px, 5vw, 48px)',
            color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '12px',
          }}>
            Simple &amp; Flexible Pricing
          </h2>
          <p style={{ fontFamily: 'var(--font)', fontSize: '17px', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '28px' }}>
            Choose the plan that fits your IT support needs — monthly or yearly.
          </p>

          {/* Toggle */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontFamily: 'var(--font)', fontSize: '15px', fontWeight: billing === 'monthly' ? 600 : 400, color: 'var(--text-primary)', transition: 'font-weight 0.15s' }}>
              Monthly
            </span>
            <button
              onClick={() => setBilling(b => b === 'monthly' ? 'yearly' : 'monthly')}
              style={{ width: '46px', height: '26px', borderRadius: 'var(--r-full)', background: 'var(--blue)', border: 'none', cursor: 'pointer', position: 'relative' }}
            >
              <motion.div 
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                style={{
                  position: 'absolute', top: '3px',
                  left: billing === 'yearly' ? '23px' : '3px',
                  width: '20px', height: '20px',
                  borderRadius: '50%', background: '#fff',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }} 
              />
            </button>
            <span style={{ fontFamily: 'var(--font)', fontSize: '15px', fontWeight: billing === 'yearly' ? 600 : 400, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', transition: 'font-weight 0.15s' }}>
              Yearly
              {billing === 'yearly' && (
                <span style={{ background: 'var(--green-bg)', color: 'var(--green-text)', border: '1px solid var(--green-border)', fontFamily: 'var(--mono)', fontSize: '10px', padding: '2px 8px', borderRadius: 'var(--r-full)' }}>
                  Save 25%
                </span>
              )}
            </span>
          </div>
        </motion.div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', alignItems: 'stretch' }} className="pricing-grid">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} i={i} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '44px' }}
        >
          <p style={{ fontFamily: 'var(--font)', fontSize: '15px', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>Why Choose Our Virtual IT Support?</strong>
          </p>
          <p style={{ fontFamily: 'var(--font)', fontSize: '15px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Professional, reliable &amp; scalable IT assistance for businesses of any size.
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .pricing-grid { grid-template-columns: 1fr !important; } }
        @media (min-width: 600px) and (max-width: 900px) { .pricing-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>
    </section>
  );
}
