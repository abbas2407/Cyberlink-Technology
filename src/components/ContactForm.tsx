import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import cyberlinkLogo from '../images/cyberlink-logo.png';

/* ── SVG Icons ── */
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.08 6.08l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const ClockIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);
const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const ShieldIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>
);

const ISSUE_CATS = [
  'Software Issue',
  'Hardware Problem',
  'Networking Setup',
  'Server Administration',
  'Server Parts Enquiry',
  'Laptop / Desktop Purchase',
  'Bulk Order Request',
  'Warranty Claim',
  'General Inquiry',
];

function FloatInput({
  label, type = 'text', value, onChange, required, placeholder,
}: {
  label: string; type?: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div style={{ position: 'relative' }}>
      <motion.input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        placeholder={lifted ? (placeholder ?? '') : ''}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{
          backgroundColor: focused ? 'var(--surface-white)' : 'var(--surface-low)',
          borderColor: focused ? 'var(--blue)' : 'var(--border)',
          boxShadow: focused ? '0 0 0 3px rgba(56, 48, 231, 0.08)' : '0 0 0 0px rgba(56, 48, 231, 0)',
        }}
        transition={{ duration: 0.2 }}
        style={{
          width: '100%',
          height: '56px',
          paddingTop: '20px',
          paddingBottom: '4px',
          paddingLeft: '14px',
          paddingRight: '14px',
          fontFamily: 'var(--font)',
          fontSize: '14px',
          color: 'var(--text-primary)',
          border: '1.5px solid var(--border)',
          borderRadius: 'var(--r)',
          outline: 'none',
        }}
      />
      <motion.label
        animate={{
          top: lifted ? '10px' : '50%',
          scale: lifted ? 0.8 : 1,
          color: focused ? 'var(--blue)' : 'var(--text-muted)',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          left: '14px',
          transform: 'translateY(-50%)',
          originX: 0,
          fontFamily: lifted ? 'var(--mono)' : 'var(--font)',
          fontWeight: lifted ? 600 : 400,
          pointerEvents: 'none',
          letterSpacing: lifted ? '0.06em' : 'normal',
          textTransform: lifted ? 'uppercase' : 'none',
        }}
      >
        {label}
      </motion.label>
    </div>
  );
}

function InfoItem({
  icon, label, children,
}: {
  icon: React.ReactNode; label: string; children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
      <div style={{
        width: '38px', height: '38px', borderRadius: 'var(--r)',
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'rgba(255,255,255,0.7)',
        flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
          {label}
        </div>
        <div style={{ fontFamily: 'var(--font)', fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.85)', lineHeight: 1.5 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '', issue: '', message: '', priority: 'Normal' });
  const [robot, setRobot]   = useState(false);
  const [sent, setSent]     = useState(false);
  const [sending, setSending] = useState(false);

  const formRef = useRef<HTMLDivElement>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!robot) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      const msg = `*New Contact via Website*%0A%0A*Name:* ${form.name}%0A*Company:* ${form.company}%0A*Phone:* ${form.phone}%0A*Email:* ${form.email}%0A*Issue:* ${form.issue}%0A*Priority:* ${form.priority}%0A%0A*Message:*%0A${form.message}`;
      window.open(`https://wa.me/919391440440?text=${msg}`, '_blank');
      setTimeout(() => setSent(false), 4000);
    }, 800);
  };

  return (
    <section
      id="contact"
      style={{
        background: 'var(--bg)',
        padding: '96px 0',
        borderTop: '1px solid var(--border)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', right: 0, bottom: 0,
        width: '480px', height: '480px',
        background: 'radial-gradient(circle, rgba(56,48,231,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Header reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{ marginBottom: '52px' }}
        >
          <span className="section-eyebrow">// REACH OUT</span>
          <h2 className="section-title">Let's Start a Conversation</h2>
          <p className="section-body">
            Tell us what you need — we typically respond within 2 hours during business hours.
          </p>
        </motion.div>

        {/* Form layout card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          style={{
            display: 'grid',
            gridTemplateColumns: '380px 1fr',
            gap: '0',
            borderRadius: 'var(--r-lg)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border)',
            position: 'relative',
          }} 
          className="contact-layout"
        >
          {/* Glow on submit */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: 'var(--r-lg)',
              zIndex: 10,
            }}
            animate={{ opacity: sending || sent ? 1 : 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 'var(--r-lg)',
              background: sent
                ? 'conic-gradient(from 0deg, #3830e7, #1a7f4a, #3830e7)'
                : 'conic-gradient(from 0deg, #3830e7, #6c5ce7, #a855f7, #3830e7)',
              filter: 'blur(18px)',
              opacity: 0.22,
              animation: (sending || sent) ? 'glowSpin 3s linear infinite' : 'none',
            }} />
          </motion.div>
          {/* LEFT: Dark Info Panel */}
          <div style={{
            background: 'linear-gradient(145deg, #1a1d20 0%, #0f1217 50%, #1a2040 100%)',
            padding: '48px 36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
          }}>
            <div>
              <div style={{ marginBottom: '8px' }}>
                <img
                  src={cyberlinkLogo}
                  alt="Cyberlink"
                  style={{
                    height: '48px',
                    width: 'auto',
                    display: 'block',
                    filter: 'invert(1) hue-rotate(180deg)',
                    mixBlendMode: 'screen',
                  }}
                />
              </div>
              <p style={{ fontFamily: 'var(--font)', fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.65 }}>
                Expert IT hardware supply and technical support from Hyderabad to the world.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <InfoItem icon={<PhoneIcon />} label="Phone">
                <a href="tel:+919391440440" style={{ color: 'inherit', textDecoration: 'none' }}>+91 93914 40440</a>
              </InfoItem>
              <InfoItem icon={<MailIcon />} label="Email">
                <a href="mailto:ali@serverparts.in" style={{ color: 'inherit', textDecoration: 'none', fontFamily: 'var(--mono)', fontSize: '13px' }}>
                  ali@serverparts.in
                </a>
              </InfoItem>
              <InfoItem icon={<ClockIcon />} label="Support Hours">
                Monday – Sunday, 09:00 – 23:59
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '5px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--green)' }}>Online now</span>
                </div>
              </InfoItem>
              <InfoItem icon={<MapPinIcon />} label="Location">
                Panchseela Towers, Kalasiguda<br />
                Hyderabad, Secunderabad<br />
                Telangana 500003
                <div style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Pan-India · International</div>
              </InfoItem>
            </div>

            <div style={{
              padding: '16px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 'var(--r)',
              display: 'flex', alignItems: 'flex-start', gap: '10px',
            }}>
              <div style={{ color: 'var(--green)', marginTop: '1px', flexShrink: 0 }}>
                <ShieldIcon />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font)', fontSize: '13px', fontWeight: 600, color: '#fff', marginBottom: '3px' }}>
                  Avg. response: &lt; 2 hours
                </div>
                <div style={{ fontFamily: 'var(--font)', fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
                  During business hours · WhatsApp preferred for urgent queries
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Form Panel */}
          <div style={{
            background: 'var(--surface-white)',
            padding: '48px 44px',
          }}>
            <h3 style={{ fontFamily: 'var(--font)', fontWeight: 700, fontSize: '22px', color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '28px' }}>
              Send a Message
            </h3>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-row">
                <FloatInput
                  label="Full Name"
                  value={form.name}
                  onChange={v => setForm(f => ({ ...f, name: v }))}
                  required
                />
                <FloatInput
                  label="Company (optional)"
                  value={form.company}
                  onChange={v => setForm(f => ({ ...f, company: v }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }} className="form-row">
                <FloatInput
                  label="Email Address"
                  type="email"
                  value={form.email}
                  onChange={v => setForm(f => ({ ...f, email: v }))}
                  required
                />
                <FloatInput
                  label="Phone Number"
                  type="tel"
                  value={form.phone}
                  onChange={v => setForm(f => ({ ...f, phone: v }))}
                  placeholder="+91 00000 00000"
                />
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{
                  position: 'absolute', left: '14px', top: '10px',
                  fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 600,
                  color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em',
                  pointerEvents: 'none', zIndex: 1,
                }}>
                  Issue Category
                </label>
                <select
                  value={form.issue}
                  onChange={e => setForm(f => ({ ...f, issue: e.target.value }))}
                  style={{
                    width: '100%', height: '56px',
                    paddingTop: '20px', paddingBottom: '4px',
                    paddingLeft: '14px', paddingRight: '36px',
                    fontFamily: 'var(--font)', fontSize: '14px',
                    color: form.issue ? 'var(--text-primary)' : 'var(--text-muted)',
                    background: 'var(--surface-low)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r)', outline: 'none',
                    appearance: 'none', cursor: 'pointer',
                    transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,48,231,0.08)'; e.currentTarget.style.background = 'var(--surface-white)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--surface-low)'; }}
                >
                  <option value="">Select an option...</option>
                  {ISSUE_CATS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '10px', pointerEvents: 'none' }}>▼</div>
              </div>

              <div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                  Priority Level
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['Low', 'Normal', 'High', 'Urgent'].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, priority: p }))}
                      style={{
                        flex: 1, height: '34px',
                        fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 600,
                        borderRadius: 'var(--r-sm)',
                        cursor: 'pointer',
                        border: `1.5px solid ${form.priority === p ? (p === 'Urgent' ? '#dc2626' : p === 'High' ? '#d97706' : 'var(--blue)') : 'var(--border)'}`,
                        background: form.priority === p ? (p === 'Urgent' ? '#fef2f2' : p === 'High' ? '#fffbeb' : 'var(--blue-tint)') : 'transparent',
                        color: form.priority === p ? (p === 'Urgent' ? '#dc2626' : p === 'High' ? '#d97706' : 'var(--blue)') : 'var(--text-muted)',
                        transition: 'all 0.15s ease',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ position: 'relative' }}>
                <label style={{
                  position: 'absolute', left: '14px', top: '10px',
                  fontFamily: 'var(--mono)', fontSize: '10px', fontWeight: 600,
                  color: 'var(--blue)', textTransform: 'uppercase', letterSpacing: '0.06em',
                  pointerEvents: 'none',
                }}>
                  Your Message
                </label>
                <textarea
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                  placeholder="Describe your issue or requirement in detail..."
                  rows={4}
                  style={{
                    width: '100%', paddingTop: '32px', paddingBottom: '12px',
                    paddingLeft: '14px', paddingRight: '14px',
                    fontFamily: 'var(--font)', fontSize: '14px',
                    color: 'var(--text-primary)', background: 'var(--surface-low)',
                    border: '1.5px solid var(--border)',
                    borderRadius: 'var(--r)', outline: 'none',
                    resize: 'vertical', lineHeight: 1.55,
                    transition: 'border-color 0.2s, box-shadow 0.2s, background-color 0.2s',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--blue)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(56,48,231,0.08)'; e.currentTarget.style.background = 'var(--surface-white)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.background = 'var(--surface-low)'; }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  role="checkbox" aria-checked={robot} tabIndex={0}
                  onClick={() => setRobot(r => !r)}
                  onKeyDown={e => e.key === ' ' && setRobot(r => !r)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '10px 14px',
                    flex: 1,
                    background: 'var(--surface-low)', border: '1px solid var(--border)',
                    borderRadius: 'var(--r)', cursor: 'pointer',
                    transition: 'border-color 0.15s',
                    userSelect: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                >
                  <div style={{
                    width: '18px', height: '18px', borderRadius: '3px', flexShrink: 0,
                    border: `2px solid ${robot ? 'var(--blue)' : 'var(--border-strong)'}`,
                    background: robot ? 'var(--blue)' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.15s ease',
                  }}>
                    {robot && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span style={{ fontFamily: 'var(--font)', fontSize: '13px', color: 'var(--text-secondary)' }}>
                    I'm not a robot
                  </span>
                  <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1px' }}>
                    <div style={{ fontSize: '16px', lineHeight: 1 }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--text-dim)', fontWeight: 500 }}>reCAPTCHA</div>
                    <div style={{ fontFamily: 'var(--mono)', fontSize: '7px', color: 'var(--text-dim)' }}>Privacy · Terms</div>
                  </div>
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={!robot || sending}
                whileHover={robot && !sending && !sent ? { scale: 1.02 } : {}}
                whileTap={robot && !sending && !sent ? { scale: 0.98 } : {}}
                transition={{ duration: 0.2 }}
                style={{
                  width: '100%', height: '52px',
                  background: robot ? (sent ? '#1a7f4a' : 'var(--blue)') : 'var(--surface-mid)',
                  color: robot ? '#fff' : 'var(--text-muted)',
                  border: 'none', borderRadius: 'var(--r)',
                  fontFamily: 'var(--font)', fontSize: '15px', fontWeight: 600,
                  cursor: robot ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease',
                  letterSpacing: '-0.01em',
                  boxShadow: sent
                    ? '0 2px 20px rgba(26,127,74,0.35)'
                    : robot && !sending
                    ? '0 2px 20px rgba(56,48,231,0.3), 0 0 40px rgba(108,92,231,0.15)'
                    : 'none',
                  position: 'relative', overflow: 'hidden',
                }}
              >
                {/* Shimmer on hover */}
                {robot && !sending && !sent && (
                  <motion.div
                    style={{
                      position: 'absolute',
                      top: 0, left: '-100%',
                      width: '60%', height: '100%',
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
                      pointerEvents: 'none',
                    }}
                    animate={{ left: ['−100%', '200%'] }}
                    transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1, ease: 'easeInOut' }}
                  />
                )}
                <AnimatePresence mode="wait">
                  {sending ? (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'border-rotate 0.8s linear infinite' }} />
                      Sending...
                    </motion.span>
                  ) : sent ? (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Message Sent — We'll reply shortly!
                    </motion.span>
                  ) : (
                    <motion.span
                      key="idle"
                      initial={{ opacity: 0, y: 8, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -8, filter: 'blur(4px)' }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                    >
                      <SendIcon />
                      Send Message
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--text-dim)', textAlign: 'center', letterSpacing: '0.02em' }}>
                By submitting, your message will be sent via WhatsApp for fastest response.
              </p>
            </form>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact {
            padding: 60px 0 !important;
          }
          .contact-layout {
            grid-template-columns: 1fr !important;
          }
          .contact-card > div:first-child {
            padding: 32px 24px !important;
            gap: 24px !important;
          }
          .contact-card > div:last-child {
            padding: 32px 24px !important;
          }
        }
        @media (max-width: 520px) {
          .contact-card > div:first-child,
          .contact-card > div:last-child {
            padding: 24px 16px !important;
          }
          .form-row {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }
        }
      `}</style>
    </section>
  );
}
