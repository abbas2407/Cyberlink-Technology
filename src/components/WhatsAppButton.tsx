import { useEffect, useState } from 'react';

export default function WhatsAppButton() {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const [lbl, setLbl] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="whatsapp-float-wrap"
      style={{
        position: 'fixed',
        bottom: 'calc(var(--safe-bottom, 0px) + 20px)',
        right: 'calc(var(--safe-right, 0px) + 20px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        opacity: vis ? 1 : 0,
        transform: vis ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(14px)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}
    >
      {/* Label tooltip (desktop only) */}
      <div
        className="whatsapp-tooltip"
        style={{
          background: 'var(--footer-bg)',
          color: 'var(--footer-text)',
          fontFamily: 'var(--mono)',
          fontSize: '12px',
          padding: '8px 14px',
          borderRadius: 'var(--r-full)',
          boxShadow: 'var(--shadow-md)',
          opacity: hov && lbl ? 1 : 0,
          transform: hov && lbl ? 'translateX(0)' : 'translateX(8px)',
          transition: 'opacity 0.18s, transform 0.18s',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        Chat on WhatsApp →
      </div>

      {/* Button */}
      <a
        href="https://wa.me/919391440440?text=Hello!%20I%20visited%20your%20Cyberlink%20website%20and%20want%20to%20inquire%20about%20IT%20hardware%20supply%2C%20server%20parts%2C%20or%20booking%20a%20consultation."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        id="whatsapp-float-btn"
        onMouseEnter={() => { setHov(true); setTimeout(() => setLbl(true), 80); }}
        onMouseLeave={() => { setHov(false); setLbl(false); }}
        style={{
          width: '52px',
          height: '52px',
          borderRadius: '50%',
          background: '#22c55e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: hov ? '0 8px 28px rgba(34,197,94,0.5)' : '0 4px 18px rgba(34,197,94,0.38)',
          transition: 'all 0.22s ease',
          transform: hov ? 'scale(1.08)' : 'scale(1)',
          textDecoration: 'none',
          position: 'relative',
        }}
      >
        {!hov && (
          <div style={{
            position: 'absolute', inset: '-4px', borderRadius: '50%',
            border: '2px solid rgba(34,197,94,0.4)',
            animation: 'pulse-ring 2.2s ease-out infinite',
            pointerEvents: 'none',
          }} />
        )}
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      <style>{`
        @media (max-width: 768px) {
          .whatsapp-tooltip {
            display: none !important;
          }
          .whatsapp-float-wrap {
            bottom: calc(var(--safe-bottom, 0px) + 16px) !important;
            right: 16px !important;
          }
          #whatsapp-float-btn {
            width: 48px !important;
            height: 48px !important;
          }
          #whatsapp-float-btn svg {
            width: 24px !important;
            height: 24px !important;
          }
        }
      `}</style>
    </div>
  );
}
