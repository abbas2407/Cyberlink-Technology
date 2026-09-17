import cyberlinkLogo from '../images/cyberlink-logo.png';

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--footer-bg)',
        padding: '40px 0 calc(var(--safe-bottom, 0px) + 40px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      }}
    >
      <div
        className="container footer-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
        }}
      >
        {/* Left: brand + copyright */}
        <div>
          <div style={{ marginBottom: '8px' }}>
            <img
              src={cyberlinkLogo}
              alt="Cyberlink"
              style={{
                height: '42px',
                width: 'auto',
                display: 'block',
                filter: 'invert(1) hue-rotate(180deg)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
          <div style={{
            fontFamily: 'var(--font)',
            fontSize: '13px',
            color: 'var(--footer-muted)',
          }}>
            © 2024 Cyberlink IT Hardware. All rights reserved.
          </div>
        </div>

        {/* Right: nav links */}
        <nav
          className="footer-nav"
          style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}
        >
          {['Privacy Policy', 'Terms of Service', 'FAQ', 'Support'].map(link => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: 'var(--font)',
                fontSize: '13px',
                color: 'var(--footer-muted)',
                textDecoration: 'none',
                padding: '4px 0',
                transition: 'color 0.15s',
              }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--footer-text)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--footer-muted)'}
            >
              {link}
            </a>
          ))}
        </nav>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .footer-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 20px !important;
          }
          .footer-nav {
            gap: 16px !important;
          }
        }
      `}</style>
    </footer>
  );
}
