import cyberlinkLogo from '../images/cyberlink-logo.png';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--footer-bg)',
      padding: '36px 0',
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>

        {/* Left: brand + copyright */}
        <div>
          <div style={{ marginBottom: '6px' }}>
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
          <div style={{
            fontFamily: 'var(--font)',
            fontSize: '13px',
            color: 'var(--footer-muted)',
          }}>
            © 2024 Cyberlink IT Hardware. All rights reserved.
          </div>
        </div>

        {/* Right: nav links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {['Privacy Policy', 'Terms of Service', 'FAQ', 'Support'].map(link => (
            <a
              key={link}
              href="#"
              style={{
                fontFamily: 'var(--font)',
                fontSize: '13px',
                color: 'var(--footer-muted)',
                textDecoration: 'none',
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
    </footer>
  );
}
