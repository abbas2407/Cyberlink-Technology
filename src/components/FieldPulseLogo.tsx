import React from 'react';

interface FieldPulseLogoProps {
  size?: number;
  variant?: 'light' | 'dark';
  showText?: boolean;
  backgroundColor?: string;
}

export default function FieldPulseLogo({
  size = 40,
  variant = 'light',
  showText = true,
  backgroundColor,
}: FieldPulseLogoProps) {
  const isLight = variant === 'light';
  
  // Outer hexagon color: #1a1c1a (product theme dark) or #faf9f6 (product theme light)
  const hexColor = isLight ? '#1a1c1a' : '#faf9f6';
  
  // Cutout map pin: matches background of the container to simulate transparency cutout
  const defaultBg = isLight ? '#ffffff' : '#0a0a0a';
  const pinColor = backgroundColor || defaultBg;
  
  // Inner ECG circle: same as hexagon color to make it look like a cutout in the pin
  const innerCircleColor = isLight ? '#1a1c1a' : '#faf9f6';
  
  // ECG path color: same as pin (matches container background)
  const ecgColor = pinColor;

  // Wordmark colors with product theme
  // "FIELD" text uses product's dark color (or white on dark variant)
  const textColorField = isLight ? '#1a1c1a' : '#ffffff';
  // "PULSE" text uses product's gold accent color: #695d4a
  const textColorPulse = '#695d4a';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
      }}
    >
      {/* 2F Hexagon Logo Mark — Natively transparent SVG */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Hexagon */}
        <polygon
          points="50,2 91.5,26 91.5,74 50,98 8.5,74 8.5,26"
          fill={hexColor}
        />
        
        {/* Map pin shape */}
        <path
          d="M50,24 C40.1,24 32,32.1 32,42 C32,54 50,76 50,76 C50,76 68,54 68,42 C68,32.1 59.9,24 50,24 Z"
          fill={pinColor}
        />
        
        {/* Inner circle of the pin */}
        <circle
          cx="50"
          cy="42"
          r="10"
          fill={innerCircleColor}
        />
        
        {/* ECG pulse line inside circle */}
        <polyline
          points="40,42 44,42 46,36 48,48 51,30 53,46 55,40 57,42 60,42"
          fill="none"
          stroke={ecgColor}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <span
          style={{
            fontFamily: 'var(--font)',
            fontSize: `${size * 0.65}px`,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            display: 'inline-flex',
            alignItems: 'center',
          }}
        >
          <span style={{ color: textColorField }}>FIELD</span>
          <span style={{ color: textColorPulse }}>PULSE</span>
        </span>
      )}
    </div>
  );
}
