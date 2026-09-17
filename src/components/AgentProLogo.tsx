interface AgentProLogoProps {
  size?: number;
  variant?: 'light' | 'dark';
  showText?: boolean;
  backgroundColor?: string;
}

export default function AgentProLogo({
  size = 40,
  variant = 'light',
  showText = true,
}: AgentProLogoProps) {
  const isLight = variant === 'light';
  const textColorAgent = isLight ? '#1a1c1a' : '#ffffff';
  const textColorPro = '#7c3aed'; // vibrant violet/purple AI brand color

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
      }}
    >
      {/* AgentPro Brand Mark — Rounded Square with AI Robot / Intelligence Node */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="agentProGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Rounded square background with purple/indigo gradient */}
        <rect x="0" y="0" width="100" height="100" rx="22" ry="22" fill="url(#agentProGrad)" />

        {/* Top antenna beacon */}
        <circle cx="50" cy="22" r="4.5" fill="#ffffff" />
        <line x1="50" y1="26" x2="50" y2="34" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />

        {/* Head chassis */}
        <rect x="22" y="34" width="56" height="42" rx="12" fill="#ffffff" />

        {/* Eye visor screen */}
        <rect x="30" y="44" width="40" height="16" rx="8" fill="#1e1b4b" />

        {/* Intelligent glowing eyes */}
        <circle cx="41" cy="52" r="4" fill="#a855f7" />
        <circle cx="59" cy="52" r="4" fill="#a855f7" />
        <circle cx="42" cy="51" r="1.5" fill="#ffffff" />
        <circle cx="60" cy="51" r="1.5" fill="#ffffff" />

        {/* Mouth speaker grill */}
        <line x1="42" y1="68" x2="58" y2="68" stroke="#7c3aed" strokeWidth="3" strokeLinecap="round" />

        {/* Ear node connectors */}
        <rect x="16" y="47" width="6" height="16" rx="3" fill="#ffffff" opacity="0.85" />
        <rect x="78" y="47" width="6" height="16" rx="3" fill="#ffffff" opacity="0.85" />

        {/* Sparkle node in bottom corner */}
        <path
          d="M50 82 L52 86 L56 88 L52 90 L50 94 L48 90 L44 88 L48 86 Z"
          fill="#ffffff"
          opacity="0.9"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font)',
            fontSize: `${size * 0.52}px`,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span style={{ color: textColorAgent }}>AGENT</span>
          <span style={{ color: textColorPro }}>PRO</span>
        </span>
      )}
    </div>
  );
}
