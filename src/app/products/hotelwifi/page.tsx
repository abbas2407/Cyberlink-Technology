"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   DATA DEFINITIONS & SLIDES CONFIGURATION
   ───────────────────────────────────────────────────────────── */

interface KPI {
  val: string;
  label: string;
  sub: string;
  color: string;
}

interface SlideData {
  url: string;
  statusText: string;
  date: string;
  title: string;
  badge: string;
  caption: string;
  actions: { label: string; primary?: boolean }[];
  kpi: KPI[];
}

const SLIDE_DATA: SlideData[] = [
  {
    url: "app.hotelwifi.in/laserene/guest-checkin",
    statusText: "LIVE (1s) · DLT Gateway Active",
    date: "05 Sept 2026",
    title: "Guest Check-in",
    badge: "Room 305 · La Serene Hotel",
    caption: "1 of 6: Guest Check-in & Instant DLT SMS",
    actions: [
      { label: "+ New Check-in", primary: true },
      { label: "DLT Template ✓" },
      { label: "Print Pass" }
    ],
    kpi: [
      { val: "305", label: "ACTIVE ROOM", sub: "Mohammed Ali", color: "#2563eb" },
      { val: "1", label: "SMS SENT", sub: "DLT Delivered (1.2s)", color: "#059669" },
      { val: "3 Devices", label: "DEVICE QUOTA", sub: "2 Active now", color: "#7c3aed" },
      { val: "3 Days", label: "STAY DURATION", sub: "Valid till 08 Sept", color: "#d97706" }
    ]
  },
  {
    url: "app.hotelwifi.in/laserene/dashboard",
    statusText: "● System Active · 17 Online",
    date: "05 Sept 2026",
    title: "Good afternoon, Admin!",
    badge: "Live Telemetry · 5 Sept 2026",
    caption: "2 of 6: Live Dashboard & Real-Time Telemetry",
    actions: [
      { label: "Restart AP Mesh", primary: true },
      { label: "Bandwidth Graph" }
    ],
    kpi: [
      { val: "14", label: "ACTIVE ROOMS", sub: "40% occupied (35 total)", color: "#2563eb" },
      { val: "17", label: "LIVE USERS", sub: "of 60 limit (28% used)", color: "#059669" },
      { val: "4", label: "TODAY CHECK-IN", sub: "guests arrived", color: "#d97706" },
      { val: "11", label: "TODAY CHECKOUT", sub: "scheduled departures", color: "#475569" }
    ]
  },
  {
    url: "app.hotelwifi.in/laserene/rooms",
    statusText: "● All 35 APs Connected",
    date: "05 Sept 2026",
    title: "Room Management",
    badge: "La Serene Hotel · 35 Rooms",
    caption: "3 of 6: Room Allocation & Hardware Status",
    actions: [
      { label: "+ Add Room", primary: true },
      { label: "Sync MikroTik" }
    ],
    kpi: [
      { val: "14", label: "Occupied Rooms", sub: "WiFi active & isolated", color: "#2563eb" },
      { val: "19", label: "Vacant Rooms", sub: "Ready for check-in", color: "#059669" },
      { val: "2", label: "Maintenance", sub: "AP inspection scheduled", color: "#d97706" },
      { val: "83%", label: "Occupancy Rate", sub: "Peak weekend demand", color: "#7c3aed" }
    ]
  },
  {
    url: "app.hotelwifi.in/laserene/vouchers",
    statusText: "● Voucher Pool Sync OK",
    date: "05 Sept 2026",
    title: "WiFi Cards (Vouchers)",
    badge: "Manage & Print Access Passes",
    caption: "4 of 6: Printable Guest WiFi Cards & Vouchers",
    actions: [
      { label: "+ Generate Batch", primary: true },
      { label: "Print 24-Grid" }
    ],
    kpi: [
      { val: "86", label: "Total Cards", sub: "Generated active batch", color: "#2563eb" },
      { val: "24", label: "Active Cards", sub: "Currently in-use by guests", color: "#059669" },
      { val: "62", label: "Unused Cards", sub: "In reception desk inventory", color: "#475569" },
      { val: "0", label: "Expired Cards", sub: "Auto-revoked by cron", color: "#d97706" }
    ]
  },
  {
    url: "app.hotelwifi.in/laserene/event-logs",
    statusText: "● Real-time Stream: OK",
    date: "05 Sept 2026",
    title: "Event Logs",
    badge: "Live RADIUS Audit Logs",
    caption: "5 of 6: Audit Logs, Security & Portal Events",
    actions: [
      { label: "Export Syslog", primary: true },
      { label: "Clear Cache" }
    ],
    kpi: [
      { val: "1,204", label: "Monthly Events", sub: "All system triggers logged", color: "#2563eb" },
      { val: "142", label: "Portal Auths", sub: "Captive portal authentications", color: "#059669" },
      { val: "18", label: "Checkouts", sub: "Credentials automatically revoked", color: "#d97706" },
      { val: "0", label: "Security Breaches", sub: "WireGuard network isolated", color: "#e11d48" }
    ]
  },
  {
    url: "app.hotelwifi.in/vendor/dashboard",
    statusText: "● FreeRADIUS: 0ms Latency",
    date: "05 Sept 2026",
    title: "Vendor Dashboard",
    badge: "Super-Admin Control",
    caption: "6 of 6: Multi-Property Management & Billing",
    actions: [
      { label: "+ Add Hotel Property", primary: true },
      { label: "Recharge Fast2SMS" }
    ],
    kpi: [
      { val: "3", label: "Total Hotels", sub: "All active properties", color: "#2563eb" },
      { val: "102", label: "Total Rooms", sub: "Managed property capacity", color: "#059669" },
      { val: "₹8,997", label: "MRR", sub: "Monthly recurring revenue", color: "#7c3aed" },
      { val: "1,200", label: "SMS Available", sub: "₹2,400 balance on Fast2SMS", color: "#d97706" }
    ]
  }
];

export default function HotelWifiPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalSlides = SLIDE_DATA.length;

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide((index + totalSlides) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  const nextSlide = useCallback(() => {
    goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  // Autoplay setup (6 seconds)
  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % totalSlides);
    }, 6000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prevSlide, nextSlide]);

  const activeData = SLIDE_DATA[currentSlide];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');

        .hw-page-root {
          min-height: 100vh;
          background-color: #f8fafc;
          background-image: radial-gradient(#cbd5e1 1.1px, transparent 1.1px);
          background-size: 24px 24px;
          color: #0f172a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 104px 20px 80px;
          -webkit-font-smoothing: antialiased;
        }

        .hw-font-display {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        @keyframes hw-pulse-dot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(37, 99, 235, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(37, 99, 235, 0); }
        }

        .hw-dot-pulse {
          animation: hw-pulse-dot 2s infinite;
        }

        .hw-gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hw-slide-panel {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          inset: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
          transform: translateY(6px);
          pointer-events: none;
        }
        .hw-slide-panel.active {
          opacity: 1;
          visibility: visible;
          position: relative;
          transform: translateY(0);
          pointer-events: auto;
        }

        .hw-scroll-custom::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .hw-scroll-custom::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }

        .hw-tabs-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          max-width: 1040px;
          margin: 0 auto 32px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 6px;
          border-radius: 18px;
          border: 1px solid rgba(226, 232, 240, 0.9);
          box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
          overflow-x: auto;
        }
        .hw-tab-btn {
          flex: 1 1 0px;
          min-width: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 12px;
          font-size: 12.5px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .hw-kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .hw-kpi-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .hw-slide-grid-7-5 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 960px) {
          .hw-slide-grid-7-5 {
            grid-template-columns: 1.35fr 1fr;
          }
        }

        .hw-slide-grid-5-7 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 960px) {
          .hw-slide-grid-5-7 {
            grid-template-columns: 1fr 1.35fr;
          }
        }

        .hw-features-grid {
          margin-top: 48px;
          max-width: 1040px;
          margin-left: auto;
          margin-right: auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .hw-features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <div className="hw-page-root">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

          {/* ═══════════════════════════════════════════════════
              PAGE HEADER HERO
              ═══════════════════════════════════════════════════ */}
          <header style={{ textAlign: 'center', marginBottom: '36px' }}>
            {/* Eyebrow Pill */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              background: '#eff6ff',
              border: '1px solid #bfdbfe',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#1d4ed8',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              marginBottom: '20px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#2563eb',
              }} className="hw-dot-pulse" />
              <span>HotelWifi.in · Guest WiFi Management Platform</span>
            </div>

            {/* H1 Headline */}
            <h1 className="hw-font-display" style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              Manage Hotel Guest WiFi <span className="hw-gradient-text">in One Dashboard.</span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '17px',
              color: '#475569',
              lineHeight: 1.6,
              maxWidth: '680px',
              margin: '0 auto 20px',
              fontWeight: 400
            }}>
              Check-in guests, activate WiFi instantly, track devices live, and manage all your hotel properties — built for Indian hospitality.
            </p>

            {/* Live Web App Badge */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <a
                href="https://app.cyberlink.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#2563eb',
                  color: '#ffffff',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(37, 99, 235, 0.28)',
                }}
              >
                <span>Visit Live App: app.cyberlink.co.in</span>
                <span>↗</span>
              </a>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════
              TAB SWITCHER NAVIGATION (6 Tabs)
              ═══════════════════════════════════════════════════ */}
          <nav className="hw-tabs-nav">
            {[
              {
                label: "01. Guest Check-in",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <line x1="19" y1="8" x2="19" y2="14"/>
                    <line x1="22" y1="11" x2="16" y2="11"/>
                  </svg>
                )
              },
              {
                label: "02. Live Dashboard",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1"/>
                    <rect x="14" y="3" width="7" height="5" rx="1"/>
                    <rect x="14" y="12" width="7" height="9" rx="1"/>
                    <rect x="3" y="16" width="7" height="5" rx="1"/>
                  </svg>
                )
              },
              {
                label: "03. Room Status",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                )
              },
              {
                label: "04. WiFi Cards",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2"/>
                    <line x1="2" y1="10" x2="22" y2="10"/>
                  </svg>
                )
              },
              {
                label: "05. Event Logs",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                )
              },
              {
                label: "06. Vendor Panel",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                    <line x1="9" y1="22" x2="9" y2="16"/>
                    <line x1="9" y1="16" x2="15" y2="16"/>
                    <line x1="15" y1="16" x2="15" y2="22"/>
                    <line x1="9" y1="12" x2="15" y2="12"/>
                    <line x1="9" y1="8" x2="15" y2="8"/>
                  </svg>
                )
              }
            ].map((tab, idx) => {
              const isActive = currentSlide === idx;
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className="hw-tab-btn"
                  style={{
                    background: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    boxShadow: isActive ? '0 2px 8px rgba(37, 99, 235, 0.25)' : 'none',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = '#f1f5f9';
                      e.currentTarget.style.color = '#0f172a';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = '#64748b';
                    }
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>

          {/* ═══════════════════════════════════════════════════
              BROWSER CHROME MOCKUP FRAME
              ═══════════════════════════════════════════════════ */}
          <div
            style={{
              position: 'relative',
              maxWidth: '1040px',
              margin: '0 auto',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.03)',
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Left Nav Arrow Button */}
            <button
              aria-label="Previous Slide"
              onClick={prevSlide}
              style={{
                position: 'absolute',
                left: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, color 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.color = '#2563eb';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.color = '#475569';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Nav Arrow Button */}
            <button
              aria-label="Next Slide"
              onClick={nextSlide}
              style={{
                position: 'absolute',
                right: '-18px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 30,
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, color 0.15s ease'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.08)';
                e.currentTarget.style.color = '#2563eb';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                e.currentTarget.style.color = '#475569';
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* macOS Top Bar */}
            <div style={{
              padding: '12px 24px',
              borderBottom: '1px solid #f1f5f9',
              background: '#f8fafc',
              borderTopLeftRadius: '20px',
              borderTopRightRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Window Dots */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#f43f5e' }} />
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#fbbf24' }} />
                  <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#10b981' }} />
                </div>

                {/* URL Pill Bar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  padding: '4px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2e8f0',
                  fontSize: '12px',
                  fontFamily: 'monospace',
                  color: '#64748b'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>{activeData.url}</span>
                </div>
              </div>

              {/* Live Status Right Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 10px',
                  borderRadius: '9999px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  color: '#047857',
                  fontWeight: 600
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                  <span>{activeData.statusText}</span>
                </div>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>{activeData.date}</span>
              </div>
            </div>

            {/* Inner Dashboard Content */}
            <div style={{ padding: '24px 28px', background: '#fafbfc' }}>

              {/* Subheader: Section Title, Badge, Action Buttons */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 className="hw-font-display" style={{
                    fontSize: '20px',
                    fontWeight: 700,
                    color: '#0f172a',
                    margin: 0,
                    letterSpacing: '-0.02em'
                  }}>
                    {activeData.title}
                  </h2>
                  <span style={{
                    padding: '2px 10px',
                    borderRadius: '6px',
                    fontSize: '11.5px',
                    fontWeight: 600,
                    background: '#dbeafe',
                    color: '#1d4ed8'
                  }}>
                    {activeData.badge}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {activeData.actions.map((act, i) => (
                    <button
                      key={i}
                      style={{
                        padding: '6px 14px',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        border: act.primary ? 'none' : '1px solid #e2e8f0',
                        background: act.primary ? '#2563eb' : '#ffffff',
                        color: act.primary ? '#ffffff' : '#475569',
                        boxShadow: act.primary ? '0 1px 4px rgba(37,99,235,0.3)' : '0 1px 2px rgba(0,0,0,0.03)',
                        cursor: 'pointer'
                      }}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Stat KPI Cards */}
              <div className="hw-kpi-grid">
                {activeData.kpi.map((item, i) => (
                  <div key={i} style={{
                    background: '#ffffff',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color: item.color, lineHeight: 1.1 }}>
                      {item.val}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '4px' }}>
                      {item.label}
                    </div>
                    <div style={{ fontSize: '12px', fontWeight: 500, color: '#334155', marginTop: '4px' }}>
                      {item.sub}
                    </div>
                  </div>
                ))}
              </div>

              {/* Slides Container */}
              <div style={{ position: 'relative', minHeight: '380px' }}>

                {/* ── SLIDE 0: GUEST CHECK-IN ── */}
                <div className={`hw-slide-panel ${currentSlide === 0 ? 'active' : ''}`}>
                  <div className="hw-slide-grid-7-5">
                    {/* Left Form Box */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingBottom: '12px',
                        marginBottom: '16px',
                        borderBottom: '1px solid #f1f5f9'
                      }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#2563eb' }} />
                          GUEST REGISTRATION & PASS GENERATION
                        </div>
                        <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                          ID: CHK-2026-0905
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Guest Full Name</label>
                          <input readOnly value="Mohammed Ali" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, color: '#1e293b', outline: 'none' }} />
                        </div>
                        <div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <label style={{ color: '#64748b', fontWeight: 500 }}>Mobile Number</label>
                            <span style={{ fontSize: '10px', color: '#059669', fontWeight: 700 }}>✓ DLT Verified</span>
                          </div>
                          <input readOnly value="+91 98665 43210" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, color: '#1e293b', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Allocated Room Number</label>
                          <input readOnly value="Room 305 (Floor 3)" style={{ width: '100%', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '8px', padding: '8px 12px', fontWeight: 700, color: '#1d4ed8', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Max Devices Allowed</label>
                          <input readOnly value="3 Concurrent Devices" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, color: '#1e293b', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Check-in Date & Time</label>
                          <input readOnly value="05 Sept 2026 · 10:15 AM" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', color: '#475569', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Expected Checkout</label>
                          <input readOnly value="08 Sept 2026 · 11:00 AM" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', color: '#475569', outline: 'none' }} />
                        </div>
                      </div>

                      <button style={{
                        width: '100%',
                        marginTop: '16px',
                        padding: '10px',
                        borderRadius: '8px',
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '13px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer'
                      }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                        Check In & Activate WiFi Access
                      </button>

                      <div style={{
                        marginTop: '16px',
                        padding: '12px 14px',
                        background: '#f0fdf4',
                        border: '1px solid #bbf7d0',
                        borderRadius: '10px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#166534', fontWeight: 700, fontSize: '11px', letterSpacing: '0.04em', marginBottom: '6px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                          </svg>
                          SMS SENT SUCCESSFULLY VIA FAST2SMS DLT
                        </div>
                        <div style={{ background: 'rgba(255,255,255,0.85)', padding: '10px', borderRadius: '6px', border: '1px solid #dcfce7', fontFamily: 'monospace', fontSize: '11.5px', color: '#14532d', lineHeight: 1.5 }}>
                          "Welcome to La Serene Hotel! Your guest WiFi credentials:<br/>
                          <strong>Username:</strong> 305 &nbsp;|&nbsp; <strong>Password:</strong> 9866543210<br/>
                          Valid until: 08 Sept 2026. Enjoy high-speed stay!"
                        </div>
                      </div>
                    </div>

                    {/* Right Today List */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>Recent Check-ins Today</span>
                          <span style={{ fontSize: '11px', fontWeight: 600, background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '9999px' }}>Live Sync · 1s</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { room: "Room 305", guest: "Mohammed Ali", time: "Just now", active: true },
                            { room: "Room 101", guest: "Rahul Kumar", time: "9:10 AM" },
                            { room: "Room 202", guest: "Priya Sharma", time: "8:45 AM" },
                            { room: "Room 403", guest: "Sneha Reddy", time: "8:12 AM" },
                            { room: "Room 106", guest: "Abbas Haider", time: "7:55 AM" }
                          ].map((item, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid #f8fafc' : 'none', fontSize: '12.5px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.active ? '#2563eb' : '#10b981' }} />
                                <strong style={{ color: '#0f172a' }}>{item.room}</strong>
                                <span style={{ color: '#64748b' }}>{item.guest}</span>
                              </div>
                              <span style={{
                                fontSize: '10.5px',
                                fontWeight: item.active ? 700 : 500,
                                background: item.active ? '#eff6ff' : 'transparent',
                                color: item.active ? '#1d4ed8' : '#94a3b8',
                                padding: item.active ? '2px 8px' : '0',
                                borderRadius: '4px'
                              }}>{item.time}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                        <span>DLT SMS Delivery Rate</span>
                        <strong style={{ color: '#059669' }}>99.98% OK (42 / 42)</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 1: LIVE DASHBOARD ── */}
                <div className={`hw-slide-panel ${currentSlide === 1 ? 'active' : ''}`}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <span style={{ color: '#64748b' }}>LIVE USERS LIMIT: <strong style={{ color: '#0f172a' }}>60</strong></span>
                      <span style={{ background: '#eff6ff', color: '#1d4ed8', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>28% used (17 active)</span>
                    </div>
                    <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <span style={{ color: '#64748b' }}>ROOMS LIMIT: <strong style={{ color: '#0f172a' }}>35</strong></span>
                      <span style={{ background: '#ecfdf5', color: '#047857', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>100% configured</span>
                    </div>
                    <div style={{ background: '#ffffff', padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
                      <span style={{ color: '#64748b' }}>SUBSCRIPTION: <strong style={{ color: '#0f172a' }}>Annual</strong></span>
                      <span style={{ background: '#faf5ff', color: '#7e22ce', fontWeight: 700, padding: '2px 8px', borderRadius: '4px', fontSize: '11px' }}>342 days left</span>
                    </div>
                  </div>

                  <div className="hw-slide-grid-5-7">
                    {/* Weekly Chart */}
                    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>Weekly Check-in Volume</span>
                          <span style={{ fontSize: '11px', color: '#64748b' }}>Last 7 days</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '170px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                          {[
                            { day: "Mon", val: 8, h: 55, active: false },
                            { day: "Tue", val: 12, h: 80, active: false },
                            { day: "Wed", val: 10, h: 65, active: false },
                            { day: "Thu", val: 15, h: 100, active: false },
                            { day: "Fri", val: 22, h: 145, active: true },
                            { day: "Sat", val: 18, h: 120, active: false },
                            { day: "Sun", val: 14, h: 95, active: false },
                          ].map((b, i) => (
                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', width: '28px' }}>
                              <span style={{ fontSize: '10.5px', fontWeight: 700, color: b.active ? '#2563eb' : '#64748b' }}>{b.val}</span>
                              <div style={{ width: '100%', height: `${b.h}px`, background: b.active ? '#2563eb' : '#bfdbfe', borderRadius: '4px 4px 0 0' }} />
                              <span style={{ fontSize: '11px', color: b.active ? '#2563eb' : '#94a3b8', fontWeight: b.active ? 700 : 500 }}>{b.day}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'center', marginTop: '12px' }}>
                        Avg 14.1 guest authentications daily
                      </div>
                    </div>

                    {/* Room Grid (35 Total) */}
                    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>Room Matrix (35 Total)</span>
                        <div style={{ display: 'flex', gap: '12px', fontSize: '11px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#1d4ed8', fontWeight: 600 }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#2563eb' }} /> 14 Occupied
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#e2e8f0' }} /> 21 Vacant
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px', fontSize: '11px', fontFamily: 'monospace', textAlign: 'center' }}>
                        {[
                          { r: "101", o: true }, { r: "102", o: true }, { r: "103", o: false }, { r: "104", o: true }, { r: "105", o: false }, { r: "106", o: true }, { r: "107", o: false },
                          { r: "201", o: true }, { r: "202", o: true }, { r: "203", o: false }, { r: "204", o: false }, { r: "205", o: true }, { r: "206", o: true }, { r: "207", o: false },
                          { r: "301", o: true }, { r: "302", o: false }, { r: "303", o: false }, { r: "304", o: true }, { r: "305", o: true, hl: true }, { r: "306", o: false }, { r: "307", o: false },
                          { r: "401", o: false }, { r: "402", o: true }, { r: "403", o: true }, { r: "404", o: false }, { r: "405", o: false }, { r: "406", o: false }, { r: "407", o: false },
                          { r: "501", o: false }, { r: "502", o: false }, { r: "503", o: true }, { r: "504", o: false }, { r: "505", o: false }, { r: "506", o: false }, { r: "507", o: false }
                        ].map((rm, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '6px 2px',
                              borderRadius: '4px',
                              fontWeight: 700,
                              background: rm.o ? '#2563eb' : '#f1f5f9',
                              color: rm.o ? '#ffffff' : '#64748b',
                              border: rm.hl ? '2px solid #60a5fa' : 'none'
                            }}
                          >
                            {rm.r}
                          </div>
                        ))}
                      </div>

                      <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                        <span>MikroTik Router AP Mesh: <strong style={{ color: '#059669' }}>100% Synchronized</strong></span>
                        <span style={{ color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>Download Topology PDF</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 2: ROOM STATUS ── */}
                <div className={`hw-slide-panel ${currentSlide === 2 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px', gap: '12px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', gap: '6px', fontSize: '12px' }}>
                        <span style={{ padding: '6px 12px', background: '#2563eb', color: '#ffffff', borderRadius: '8px', fontWeight: 600 }}>All Rooms (35)</span>
                        <span style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 500 }}>Occupied (14)</span>
                        <span style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 500 }}>Vacant (19)</span>
                        <span style={{ padding: '6px 12px', background: '#f1f5f9', color: '#475569', borderRadius: '8px', fontWeight: 500 }}>Maintenance (2)</span>
                      </div>
                      <div style={{ position: 'relative', width: '220px' }}>
                        <input placeholder="Search room or guest..." style={{ width: '100%', fontSize: '12px', padding: '6px 10px 6px 28px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', outline: 'none' }} />
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{ position: 'absolute', left: '9px', top: '8px' }}>
                          <circle cx="11" cy="11" r="8"/>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                      {[
                        { num: "101", occ: true, guest: "Rahul Kumar", exp: "09 Sept 2026", dev: "2 Devices connected" },
                        { num: "102", occ: true, guest: "Priya Sharma", exp: "07 Sept 2026", dev: "1 Device connected" },
                        { num: "103", occ: false, guest: "Ready for guest check-in", exp: "MikroTik AP 5GHz Online", dev: "WiFi in Standby" },
                        { num: "104", occ: true, guest: "Dr. A. Verma", exp: "09 Sept 2026", dev: "3 Devices connected" },
                        { num: "105", occ: false, guest: "Ready for guest check-in", exp: "MikroTik AP 5GHz Online", dev: "WiFi in Standby" },
                        { num: "201", occ: true, guest: "Sneha Reddy", exp: "06 Sept 2026", dev: "2 Devices connected" },
                      ].map((item, i) => (
                        <div key={i} style={{
                          padding: '14px',
                          borderRadius: '10px',
                          border: item.occ ? '1px solid #e2e8f0' : '1px dashed #cbd5e1',
                          background: item.occ ? '#f8fafc' : '#ffffff',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'space-between'
                        }}>
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <strong style={{ fontSize: '14px', color: item.occ ? '#0f172a' : '#94a3b8' }}>Room {item.num}</strong>
                              <span style={{
                                fontSize: '10.5px',
                                fontWeight: 700,
                                padding: '2px 8px',
                                borderRadius: '9999px',
                                background: item.occ ? '#dcfce7' : '#f1f5f9',
                                color: item.occ ? '#15803d' : '#64748b'
                              }}>
                                {item.occ ? '● Occupied' : '○ Vacant'}
                              </span>
                            </div>
                            <div style={{ fontSize: '12.5px', fontWeight: item.occ ? 600 : 400, color: item.occ ? '#334155' : '#94a3b8', fontStyle: item.occ ? 'normal' : 'italic' }}>
                              {item.guest}
                            </div>
                            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>
                              {item.occ ? `Valid till: ${item.exp}` : item.exp}
                            </div>
                          </div>

                          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
                            <span style={{ color: item.occ ? '#64748b' : '#94a3b8' }}>{item.dev}</span>
                            <button style={{
                              fontSize: '11.5px',
                              fontWeight: 600,
                              padding: '4px 10px',
                              borderRadius: '6px',
                              border: 'none',
                              background: item.occ ? '#fff1f2' : '#eff6ff',
                              color: item.occ ? '#be123c' : '#1d4ed8',
                              cursor: 'pointer'
                            }}>
                              {item.occ ? 'Checkout' : '+ Check In'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b' }}>
                      <span>Summary: 14 Occupied · 19 Vacant · 2 Under Maintenance</span>
                      <strong style={{ color: '#2563eb' }}>83% Weekend Projected Occupancy</strong>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 3: WIFI CARDS (VOUCHERS) ── */}
                <div className={`hw-slide-panel ${currentSlide === 3 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase' }}>Physical Access Voucher Tokens</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Printable cards for banquet guests, cafe walk-ins, and reception distribution.</div>
                      </div>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '6px 12px', borderRadius: '6px', background: '#2563eb', color: '#ffffff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Create Batch</button>
                        <button style={{ padding: '6px 12px', borderRadius: '6px', background: '#ffffff', color: '#475569', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Print Selected</button>
                        <button style={{ padding: '6px 12px', borderRadius: '6px', background: '#ffffff', color: '#475569', border: '1px solid #e2e8f0', fontSize: '12px', fontWeight: 500, cursor: 'pointer' }}>Export CSV</button>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                      {[
                        { title: "HOTELWIFI.IN", status: "● Active", sColor: "#059669", sBg: "#dcfce7", loc: "La Serene Hotel & Suites", user: "LSRN-4821", pass: "wifi@2026", cap: "10 Mbps Cap", val: "Valid: 24 hrs", bg: "linear-gradient(180deg, #eff6ff 0%, #ffffff 100%)", bdr: "#93c5fd" },
                        { title: "HOTELWIFI.IN", status: "○ Unused", sColor: "#475569", sBg: "#f1f5f9", loc: "La Serene Hotel & Suites", user: "LSRN-4822", pass: "stay@2026", cap: "20 Mbps Cap", val: "Valid: 48 hrs", bg: "linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)", bdr: "#cbd5e1" },
                        { title: "HOTELWIFI.IN VIP", status: "○ Unused", sColor: "#7c3aed", sBg: "#f3e8ff", loc: "Executive Suite Lounge", user: "LSRN-4823", pass: "guest@2026", cap: "50 Mbps VIP", val: "Valid: 7 Days", bg: "linear-gradient(180deg, #faf5ff 0%, #ffffff 100%)", bdr: "#d8b4fe" },
                      ].map((card, i) => (
                        <div key={i} style={{
                          background: card.bg,
                          borderRadius: '12px',
                          border: `2px dashed ${card.bdr}`,
                          padding: '16px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '8px', marginBottom: '8px' }}>
                            <strong style={{ fontSize: '11px', color: '#1e3a8a', letterSpacing: '0.05em' }}>{card.title}</strong>
                            <span style={{ fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '4px', background: card.sBg, color: card.sColor }}>{card.status}</span>
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b' }}>{card.loc}</div>
                          <div style={{ margin: '12px 0', display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '12px', fontFamily: 'monospace' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#94a3b8' }}>User:</span>
                              <strong style={{ color: '#0f172a' }}>{card.user}</strong>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#94a3b8' }}>Pass:</span>
                              <strong style={{ color: '#0f172a' }}>{card.pass}</strong>
                            </div>
                          </div>
                          <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.06)', display: 'flex', justifyContent: 'space-between', fontSize: '10.5px' }}>
                            <span style={{ color: '#64748b' }}>{card.val}</span>
                            <strong style={{ color: '#2563eb' }}>{card.cap}</strong>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: '#64748b', fontFamily: 'monospace' }}>
                      <span>Total Cards: 86 | Active: 24 | Unused: 62 | Expired: 0</span>
                      <span style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Batch Print 24-Grid A4 Template →</span>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 4: EVENT LOGS ── */}
                <div className={`hw-slide-panel ${currentSlide === 4 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
                        <span style={{ padding: '4px 10px', background: '#0f172a', color: '#ffffff', borderRadius: '6px' }}>All Events</span>
                        <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#475569', borderRadius: '6px' }}>Check-ins</span>
                        <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#475569', borderRadius: '6px' }}>Checkouts</span>
                        <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#475569', borderRadius: '6px' }}>Auth Pings</span>
                        <span style={{ padding: '4px 10px', background: '#f1f5f9', color: '#475569', borderRadius: '6px' }}>Warnings</span>
                      </div>
                      <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#059669', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
                        Live WebSocket Stream
                      </span>
                    </div>

                    <div className="hw-scroll-custom" style={{ overflowX: 'auto' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '12px' }}>
                        <thead>
                          <tr style={{ background: '#f8fafc', color: '#64748b', fontSize: '10.5px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                            <th style={{ padding: '10px 12px' }}>Event Type</th>
                            <th style={{ padding: '10px 12px' }}>Room / Target</th>
                            <th style={{ padding: '10px 12px' }}>Guest / Device</th>
                            <th style={{ padding: '10px 12px' }}>Triggered By</th>
                            <th style={{ padding: '10px 12px' }}>Timestamp</th>
                            <th style={{ padding: '10px 12px', textAlign: 'right' }}>Status</th>
                          </tr>
                        </thead>
                        <tbody style={{ fontFamily: 'monospace', color: '#334155' }}>
                          {[
                            {
                              type: "checkin",
                              icon: (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              ),
                              tColor: "#059669",
                              target: "Room 305",
                              guest: "Mohammed Ali",
                              trig: "Admin (Desk 1)",
                              time: "05 Sept, 10:11 AM",
                              status: "Success",
                              sBg: "#dcfce7",
                              sColor: "#166534"
                            },
                            {
                              type: "checkin",
                              icon: (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"/>
                                </svg>
                              ),
                              tColor: "#059669",
                              target: "Room 202",
                              guest: "Priya Sharma",
                              trig: "Admin (Desk 1)",
                              time: "05 Sept, 08:01 AM",
                              status: "Success",
                              sBg: "#dcfce7",
                              sColor: "#166534"
                            },
                            {
                              type: "checkout",
                              icon: (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"/>
                                  <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                              ),
                              tColor: "#e11d48",
                              target: "Room 206",
                              guest: "Rahul Kumar",
                              trig: "Admin (Desk 2)",
                              time: "05 Sept, 07:56 AM",
                              status: "Revoked",
                              sBg: "#ffe4e6",
                              sColor: "#9f1239"
                            },
                            {
                              type: "checkout",
                              icon: (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <line x1="18" y1="6" x2="6" y2="18"/>
                                  <line x1="6" y1="6" x2="18" y2="18"/>
                                </svg>
                              ),
                              tColor: "#e11d48",
                              target: "Room 103",
                              guest: "Abbas Haider",
                              trig: "Admin (Desk 1)",
                              time: "05 Sept, 07:55 AM",
                              status: "Revoked",
                              sBg: "#ffe4e6",
                              sColor: "#9f1239"
                            },
                            {
                              type: "portal auth",
                              icon: (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                                  <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                                  <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
                                  <line x1="12" y1="20" x2="12.01" y2="20"/>
                                </svg>
                              ),
                              tColor: "#2563eb",
                              target: "Room 101",
                              guest: "iPhone 15 Pro (MAC: 4A..)",
                              trig: "Captive Portal",
                              time: "05 Sept, 07:34 AM",
                              status: "RADIUS OK",
                              sBg: "#dbeafe",
                              sColor: "#1e40af"
                            },
                            {
                              type: "user warning",
                              icon: (
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
                                  <line x1="12" y1="9" x2="12" y2="13"/>
                                  <line x1="12" y1="17" x2="12.01" y2="17"/>
                                </svg>
                              ),
                              tColor: "#d97706",
                              target: "Room 304",
                              guest: "Quota Exceeded (3/3)",
                              trig: "FreeRADIUS AAA",
                              time: "04 Sept, 11:10 PM",
                              status: "Handled",
                              sBg: "#fef3c7",
                              sColor: "#92400e"
                            },
                          ].map((row, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '10px 12px', fontWeight: 600, color: row.tColor }}>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                                  {row.icon}
                                  <span>{row.type}</span>
                                </span>
                              </td>
                              <td style={{ padding: '10px 12px' }}>{row.target}</td>
                              <td style={{ padding: '10px 12px' }}>{row.guest}</td>
                              <td style={{ padding: '10px 12px', color: '#64748b' }}>{row.trig}</td>
                              <td style={{ padding: '10px 12px', color: '#64748b' }}>{row.time}</td>
                              <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '10.5px', fontWeight: 700, fontFamily: 'sans-serif', background: row.sBg, color: row.sColor }}>{row.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b' }}>
                      <span>Showing 6 of 1,204 logged radius events this month</span>
                      <span style={{ color: '#2563eb', cursor: 'pointer', fontWeight: 600 }}>Download Syslog Audit (.tar.gz)</span>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 5: VENDOR PANEL (ZERO EMOJIS, CLEAN ICONS) ── */}
                <div className={`hw-slide-panel ${currentSlide === 5 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase' }}>Multi-Hotel Master SaaS Control</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Complete property isolation with per-hotel WireGuard tunnel endpoints.</div>
                      </div>
                      <button style={{ padding: '6px 14px', borderRadius: '8px', background: '#2563eb', color: '#ffffff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Add Property</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      {[
                        {
                          name: "La Serene Hotel & Suites",
                          meta: "slug: laserene · 35/35 rooms · WireGuard: 10.8.0.4",
                          dev: "15 Devices Online",
                          plan: "Pro Plan (₹2,999/mo)",
                          accent: "#2563eb",
                          bg: "#eff6ff"
                        },
                        {
                          name: "Zenith Business Hotel",
                          meta: "slug: zenith · 28/30 rooms · WireGuard: 10.8.0.5",
                          dev: "8 Devices Online",
                          plan: "Pro Plan (₹2,999/mo)",
                          accent: "#4f46e5",
                          bg: "#eef2ff"
                        },
                        {
                          name: "The Grand Palace Resort",
                          meta: "slug: grandpal · 13/40 rooms · WireGuard: 10.8.0.2",
                          dev: "2 Devices Online",
                          plan: "Pro Plan (₹2,999/mo)",
                          accent: "#d97706",
                          bg: "#fffbeb"
                        }
                      ].map((h, i) => (
                        <div key={i} style={{
                          padding: '12px 16px',
                          background: '#f8fafc',
                          border: '1px solid #e2e8f0',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '12px',
                          flexWrap: 'wrap',
                          fontSize: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            {/* Professional Hotel/Building SVG icon instead of emoji */}
                            <div style={{
                              width: '36px',
                              height: '36px',
                              borderRadius: '8px',
                              background: h.bg,
                              color: h.accent,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
                                <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/>
                                <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/>
                                <path d="M10 6h4"/>
                                <path d="M10 10h4"/>
                                <path d="M10 14h4"/>
                                <path d="M10 18h4"/>
                              </svg>
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                {h.name}
                                <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '1px 6px', borderRadius: '4px', fontWeight: 700 }}>✓ Active</span>
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace', marginTop: '2px' }}>{h.meta}</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <div style={{ textAlign: 'right' }}>
                              <div style={{ fontWeight: 600, color: '#1e293b' }}>{h.dev}</div>
                              <div style={{ fontSize: '10.5px', color: '#64748b' }}>{h.plan}</div>
                            </div>
                            <button style={{
                              padding: '5px 12px',
                              background: '#ffffff',
                              border: '1px solid #cbd5e1',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: 600,
                              color: '#334155',
                              cursor: 'pointer'
                            }}>
                              Manage
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Infrastructure Telemetry Bar */}
                    <div style={{
                      padding: '12px 16px',
                      background: '#0f172a',
                      color: '#ffffff',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '11.5px',
                      fontFamily: 'monospace',
                      flexWrap: 'wrap',
                      gap: '12px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399' }} />
                        <span>FreeRADIUS Cluster: Online (0ms AAA)</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="2">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        <span>WireGuard VPN: 3 Active Tunnels</span>
                      </div>
                      <div style={{ color: '#fbbf24' }}>
                        Fast2SMS Balance: ₹2,400 (1,200 SMS)
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Mockup Footer / Slide Progress Controls */}
            <div style={{
              padding: '14px 24px',
              background: '#ffffff',
              borderTop: '1px solid #e2e8f0',
              borderBottomLeftRadius: '20px',
              borderBottomRightRadius: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '12px',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {/* Slide Indicator Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  SHOWCASE SLIDE:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[0, 1, 2, 3, 4, 5].map(idx => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      style={{
                        height: '8px',
                        width: currentSlide === idx ? '24px' : '8px',
                        borderRadius: '9999px',
                        background: currentSlide === idx ? '#2563eb' : '#cbd5e1',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.25s ease'
                      }}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <span style={{ color: '#334155', fontWeight: 600, marginLeft: '4px' }}>
                  {activeData.caption}
                </span>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700, color: '#047857' }}>
                <span>✓ FreeRADIUS AAA</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>✓ WireGuard VPN</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>✓ DLT Fast2SMS</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              FEATURE HIGHLIGHT CARDS (3 CARDS — NO EMOJIS, CLEAN ICONS)
              ═══════════════════════════════════════════════════ */}
          <section className="hw-features-grid">
            {/* Card 1: Multi-Property Management */}
            <div style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/>
                  <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/>
                  <circle cx="12" cy="12" r="2"/>
                  <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/>
                  <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/>
                </svg>
              </div>
              <h3 className="hw-font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Multi-Property Management
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Manage unlimited hotel properties from one master vendor panel with complete room, guest, and bandwidth isolation per branch.
              </p>
            </div>

            {/* Card 2: RADIUS + WireGuard Security */}
            <div style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#ecfdf5',
                color: '#059669',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <circle cx="12" cy="11" r="2"/>
                </svg>
              </div>
              <h3 className="hw-font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                RADIUS + WireGuard Security
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Each hotel connects through an encrypted WireGuard VPN tunnel with FreeRADIUS authentication and device isolation.
              </p>
            </div>

            {/* Card 3: DLT-Registered Fast2SMS */}
            <div style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 1px 3px rgba(0,0,0,0.03)'
            }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#faf5ff',
                color: '#7c3aed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                  <line x1="12" y1="18" x2="12.01" y2="18"/>
                </svg>
              </div>
              <h3 className="hw-font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                DLT-Registered Fast2SMS
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Automated WhatsApp & SMS delivery with DLT pre-approved templates so guests receive WiFi passwords in under 2 seconds.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
