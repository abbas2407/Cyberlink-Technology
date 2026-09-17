import React from 'react';

interface HotelWifiLogoProps {
  size?: number;
  showText?: boolean;
}

export default function HotelWifiLogo({
  size = 40,
  showText = true,
}: HotelWifiLogoProps) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        userSelect: 'none',
      }}
    >
      {/* Rounded-square WiFi icon matching the provided brand image */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Blue rounded-square background */}
        <rect x="0" y="0" width="100" height="100" rx="22" ry="22" fill="#3B82F6" />

        {/* WiFi arc — outer */}
        <path
          d="M16 44 C28, 24 72, 24 84, 44"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        {/* WiFi arc — middle */}
        <path
          d="M27 56 C34, 41 66, 41 73, 56"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          opacity="0.78"
        />
        {/* WiFi arc — inner */}
        <path
          d="M38 68 C41, 59 59, 59 62, 68"
          stroke="white"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
        />
        {/* WiFi dot */}
        <circle cx="50" cy="80" r="5.5" fill="white" />
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
          <span style={{ color: '#3B82F6' }}>HOTEL</span>
          <span style={{ color: 'var(--text-primary)' }}>WIFI</span>
        </span>
      )}
    </div>
  );
}
