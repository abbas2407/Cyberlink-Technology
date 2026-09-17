interface CyberlinkHRLogoProps {
  size?: number;
  variant?: 'light' | 'dark';
  showText?: boolean;
  backgroundColor?: string;
}

export default function CyberlinkHRLogo({
  size = 40,
  variant = 'light',
  showText = true,
  backgroundColor,
}: CyberlinkHRLogoProps) {
  const isLight = variant === 'light';

  // Rounded square background
  const bgColor = isLight ? '#1a1c1a' : '#faf9f6';
  // Cutout color matches the container
  const defaultBg = isLight ? '#ffffff' : '#0a0a0a';
  const cutoutColor = backgroundColor || defaultBg;

  // Text colors
  const textColorCyberlink = isLight ? '#1a1c1a' : '#ffffff';
  const textColorHR = '#10b981'; // emerald accent for HR

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
      }}
    >
      {/* Logo mark — rounded square with people/org icon */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Rounded square background */}
        <rect x="0" y="0" width="100" height="100" rx="22" ry="22" fill={bgColor} />

        {/* Central person silhouette */}
        <circle cx="50" cy="32" r="10" fill={cutoutColor} />
        <path
          d="M35,56 C35,47 42,42 50,42 C58,42 65,47 65,56 L65,60 L35,60 Z"
          fill={cutoutColor}
        />

        {/* Left small person */}
        <circle cx="26" cy="48" r="6" fill={cutoutColor} opacity="0.6" />
        <path
          d="M16,66 C16,60 20,57 26,57 C32,57 36,60 36,66 L36,68 L16,68 Z"
          fill={cutoutColor}
          opacity="0.6"
        />

        {/* Right small person */}
        <circle cx="74" cy="48" r="6" fill={cutoutColor} opacity="0.6" />
        <path
          d="M64,66 C64,60 68,57 74,57 C80,57 84,60 84,66 L84,68 L64,68 Z"
          fill={cutoutColor}
          opacity="0.6"
        />

        {/* Connection lines */}
        <line x1="38" y1="50" x2="32" y2="50" stroke={cutoutColor} strokeWidth="1.5" opacity="0.4" />
        <line x1="62" y1="50" x2="68" y2="50" stroke={cutoutColor} strokeWidth="1.5" opacity="0.4" />

        {/* Bottom bar — org chart line */}
        <line x1="26" y1="74" x2="74" y2="74" stroke={cutoutColor} strokeWidth="2" strokeLinecap="round" opacity="0.35" />
        <circle cx="50" cy="74" r="2.5" fill={cutoutColor} opacity="0.5" />

        {/* Payroll indicator — small rupee symbol */}
        <text x="50" y="88" textAnchor="middle" fill={cutoutColor} fontSize="12" fontWeight="700" fontFamily="sans-serif" opacity="0.4">₹</text>
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font)',
            fontSize: `${size * 0.48}px`,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span style={{ color: textColorCyberlink }}>CYBERLINK</span>
          <span style={{ color: textColorHR }}>HR</span>
        </span>
      )}
    </div>
  );
}
