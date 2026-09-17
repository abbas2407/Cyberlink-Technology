"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   DATA DEFINITIONS & SLIDES CONFIGURATION
   ───────────────────────────────────────────────────────────── */

interface KPI {
  val: string;
  lbl: string;
  badge: string;
  badgeType: 'blue' | 'emerald' | 'amber' | 'rose' | 'purple';
}

interface SlideData {
  title: string;
  badge: string;
  chromeContext: string;
  label: string;
  kpis: KPI[];
}

const SLIDES_DATA: SlideData[] = [
  {
    title: "Attendance Overview",
    badge: "June 2025",
    chromeContext: "June 2025 · Live Geofence Active",
    label: "1 of 6: Live Attendance & Geo-Tracking",
    kpis: [
      { val: "142", lbl: "TOTAL EMPLOYEES", badge: "+4 new joins", badgeType: "blue" },
      { val: "118", lbl: "PRESENT TODAY", badge: "83% in office", badgeType: "emerald" },
      { val: "11", lbl: "ON LEAVE TODAY", badge: "Planned leaves", badgeType: "amber" },
      { val: "7", lbl: "LATE ARRIVALS", badge: "Traffic delays", badgeType: "rose" }
    ]
  },
  {
    title: "Payroll Register & Statutory Audit",
    badge: "June 2025",
    chromeContext: "June 2025 · Disbursal Ready",
    label: "2 of 6: Indian Payroll & Statutory Engine",
    kpis: [
      { val: "142", lbl: "PROCESSED STAFF", badge: "100% Processed", badgeType: "blue" },
      { val: "₹38.5L", lbl: "GROSS SALARY", badge: "On Schedule", badgeType: "emerald" },
      { val: "₹4.21L", lbl: "TOTAL DEDUCTIONS", badge: "Statutory Total", badgeType: "amber" },
      { val: "₹34.28L", lbl: "NET PAYABLE", badge: "Disbursal Ready", badgeType: "emerald" }
    ]
  },
  {
    title: "Employee Profile & 360° History",
    badge: "Staff Record",
    chromeContext: "June 2025 · Employee Records",
    label: "3 of 6: Employee Dossier & Timeline",
    kpis: [
      { val: "4.2 yrs", lbl: "TENURE AT CYBERLINK", badge: "Top 10% Tenure", badgeType: "blue" },
      { val: "22/22", lbl: "DAYS PRESENT (JUN)", badge: "100% On-time", badgeType: "emerald" },
      { val: "14 Days", lbl: "REMAINING LEAVES", badge: "No Lapse Risk", badgeType: "amber" },
      { val: "₹85,000", lbl: "GROSS MONTHLY CTC", badge: "Band L4 · Verified", badgeType: "emerald" }
    ]
  },
  {
    title: "Leave Management & Approvals",
    badge: "Accrual Cron Active",
    chromeContext: "June 2025 · Leave Management",
    label: "4 of 6: Leave Accruals & Queue",
    kpis: [
      { val: "3", lbl: "PENDING APPROVALS", badge: "Action Required", badgeType: "rose" },
      { val: "11", lbl: "ON LEAVE TODAY", badge: "Planned Absences", badgeType: "amber" },
      { val: "94.2%", lbl: "TEAM AVAILABILITY", badge: "Optimal Level", badgeType: "emerald" },
      { val: "6", lbl: "ACCRUED COMP-OFFS", badge: "Valid till Dec", badgeType: "purple" }
    ]
  },
  {
    title: "Indian Statutory Compliance Engine",
    badge: "FY 2024-25 Ready",
    chromeContext: "June 2025 · Audit & Filings",
    label: "5 of 6: EPFO, ESIC & TDS Challans",
    kpis: [
      { val: "9/9", lbl: "STATUTORY REPORTS", badge: "100% Compliant", badgeType: "emerald" },
      { val: "₹2.55L", lbl: "EPF CHALLAN (JUN)", badge: "ECR Generated", badgeType: "blue" },
      { val: "₹4.28L", lbl: "TDS FORM 24Q", badge: "Q1 Return Ready", badgeType: "purple" },
      { val: "142", lbl: "FORM 16 DRAFTS", badge: "Digital Sign Ready", badgeType: "emerald" }
    ]
  },
  {
    title: "Vendor Multi-Tenant Control Panel",
    badge: "SuperAdmin Mode",
    chromeContext: "June 2025 · Multi-Tenant SuperAdmin",
    label: "6 of 6: Multi-Tenant Architecture",
    kpis: [
      { val: "24", lbl: "ACTIVE CLIENT COMPANIES", badge: "Zero Cross-Tenant", badgeType: "blue" },
      { val: "₹2.16L", lbl: "MONTHLY RECURRING (MRR)", badge: "+14% MoM", badgeType: "emerald" },
      { val: "3,890", lbl: "TOTAL EMPLOYEE SEATS", badge: "99.98% Uptime", badgeType: "purple" },
      { val: "6", lbl: "ACTIVE TRIALS", badge: "3 Expiring in 48h", badgeType: "amber" }
    ]
  }
];

export default function CyberlinkHRPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const switchSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % SLIDES_DATA.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => (prev - 1 + SLIDES_DATA.length) % SLIDES_DATA.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto-play timer (6s)
  useEffect(() => {
    if (isPaused) return;
    autoPlayRef.current = setInterval(nextSlide, 6000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, nextSlide]);

  const copyEcrCode = () => {
    const text = `101489201934#ARJUN KUMAR#120000#15000#15000#1800#1250#550#0#0#0#0#1800#0#0#0#0\n101928374821#PRIYA SHARMA#95000#15000#15000#1800#1250#550#0#0#0#0#1800#0#0#0#0\n100982341276#MOHAMMED ALI#72500#15000#15000#1800#1250#550#0#0#0#0#1800#0#0#0#0\n102394817263#ROHAN VARMA#45000#15000#15000#1800#1250#550#0#0#0#0#1800#0#0#0#0\n101129384756#SNEHA IYER#32000#15000#15000#1800#1250#550#0#0#0#0#1800#0#0#0#0\n100483920192#SANJAY PATEL#110000#15000#15000#1800#1250#550#0#0#0#0#1800#0#0#0#0`;
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const activeData = SLIDES_DATA[currentSlide];

  return (
    <>
      {/* ── Scoped CSS styles matching reference screenshot pixel-for-pixel ── */}
      <style>{`
        @keyframes hr-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .hr-ping-dot {
          animation: hr-ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        .hr-page-root {
          min-height: 100vh;
          background-color: #f8fafc;
          background-image: radial-gradient(#cbd5e1 1.1px, transparent 1.1px);
          background-size: 24px 24px;
          color: #0f172a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 104px 20px 80px;
          -webkit-font-smoothing: antialiased;
        }

        .hr-gradient-text {
          background: linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hr-slide-panel {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          inset: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
          transform: translateY(6px);
          pointer-events: none;
        }
        .hr-slide-panel.active {
          opacity: 1;
          visibility: visible;
          position: relative;
          transform: translateY(0);
          pointer-events: auto;
        }

        /* Subtle scrollbars for tables */
        .hr-scroll-custom::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .hr-scroll-custom::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }

        .hr-kpi-badge-blue { background: #eff6ff; color: #1d4ed8; border: 1px solid #bfdbfe; }
        .hr-kpi-badge-emerald { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
        .hr-kpi-badge-amber { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
        .hr-kpi-badge-rose { background: #fff1f2; color: #be123c; border: 1px solid #fecdd3; }
        .hr-kpi-badge-purple { background: #faf5ff; color: #7e22ce; border: 1px solid #e9d5ff; }
      `}</style>

      <div className="hr-page-root">
        <div style={{ maxWidth: '1160px', margin: '0 auto' }}>

          {/* ═══════════════════════════════════════════════════
              SECTION 1 — PAGE HEADER
              ═══════════════════════════════════════════════════ */}
          <header style={{ textAlign: 'center', marginBottom: '32px' }}>
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
              <span style={{ position: 'relative', display: 'inline-flex', width: '8px', height: '8px' }}>
                <span className="hr-ping-dot" style={{
                  position: 'absolute', inset: 0, borderRadius: '9999px', background: '#60a5fa', opacity: 0.75
                }} />
                <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '9999px', background: '#2563eb' }} />
              </span>
              <span>CyberlinkHR · The People Platform</span>
            </div>

            {/* H1 Headline */}
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              Run Your Entire HR in <span className="hr-gradient-text">One Place</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: '17px',
              lineHeight: 1.6,
              color: '#475569',
              maxWidth: '720px',
              margin: '0 auto 20px'
            }}>
              Attendance, payroll, leave, compliance, and employee management — all connected, all automated. Built for growing teams worldwide.
            </p>

            {/* Live Web App Badge */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <a
                href="https://hrms.cyberlink.co.in/"
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
                <span>Visit Live App: hrms.cyberlink.co.in</span>
                <span>↗</span>
              </a>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════
              SECTION 2 — 6-TAB SWITCHER NAV
              ═══════════════════════════════════════════════════ */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '32px' }}>
            <nav style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid #e2e8f0',
              borderRadius: '18px',
              boxShadow: '0 4px 20px -2px rgba(0,0,0,0.06)',
              overflowX: 'auto',
              maxWidth: '100%'
            }}>
              {[
                { label: '01. Attendance', icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )},
                { label: '02. Payroll', icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="8" y1="6" x2="16" y2="6" />
                    <line x1="8" y1="10" x2="16" y2="10" />
                    <line x1="8" y1="14" x2="12" y2="14" />
                    <line x1="8" y1="18" x2="16" y2="18" />
                  </svg>
                )},
                { label: '03. Employee Profile', icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )},
                { label: '04. Leave', icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                )},
                { label: '05. Compliance', icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                )},
                { label: '06. Vendor Panel', icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" />
                    <line x1="9" y1="22" x2="9" y2="16" />
                    <line x1="9" y1="16" x2="15" y2="16" />
                    <line x1="15" y1="16" x2="15" y2="22" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="8" x2="15" y2="8" />
                  </svg>
                )},
              ].map((tab, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => switchSlide(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '12px',
                      fontSize: '13.5px',
                      fontWeight: isActive ? 600 : 500,
                      border: 'none',
                      cursor: 'pointer',
                      background: isActive ? '#2563eb' : 'transparent',
                      color: isActive ? '#ffffff' : '#475569',
                      boxShadow: isActive ? '0 2px 6px rgba(37,99,235,0.28)' : 'none',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ═══════════════════════════════════════════════════
              SECTION 3 — BROWSER CHROME FRAME
              ═══════════════════════════════════════════════════ */}
          <div
            id="carousel-outer"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.1), 0 0 1px 1px rgba(15, 23, 42, 0.04)',
              overflow: 'hidden'
            }}
          >
            {/* Top Chrome Bar */}
            <div style={{
              background: 'rgba(248, 250, 252, 0.95)',
              borderBottom: '1px solid #e2e8f0',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {/* Left: 3 macOS dots + URL pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fb7185' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#fbbf24' }} />
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399' }} />
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '9999px',
                  padding: '3px 12px',
                  fontSize: '12px'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  <span style={{ fontFamily: 'var(--mono, "JetBrains Mono", monospace)', fontWeight: 700, color: '#334155' }}>
                    hrms.cyberlink.co.in
                  </span>
                  <span style={{ color: '#94a3b8' }}>· HR Dashboard</span>
                </div>
              </div>

              {/* Right: LIVE beacon + Context Tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  background: '#ecfdf5',
                  border: '1px solid #a7f3d0',
                  borderRadius: '9999px',
                  fontSize: '11.5px',
                  fontWeight: 700,
                  fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
                  color: '#047857'
                }}>
                  <span className="hr-ping-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                  <span>LIVE (1s)</span>
                </div>
                <span id="chrome-context-tag" style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                  {activeData.chromeContext}
                </span>
              </div>
            </div>

            {/* Subheader Panel (H2 + Badges + 4 KPI Cards) */}
            <div style={{
              padding: '24px 24px 16px',
              borderBottom: '1px solid #f1f5f9',
              background: '#ffffff'
            }}>
              {/* Top Row: Title + Location Filter */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h2 id="dynamic-slide-title" style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
                    {activeData.title}
                  </h2>
                  <span id="dynamic-slide-badge" style={{
                    padding: '2px 8px',
                    background: '#eff6ff',
                    color: '#1d4ed8',
                    border: '1px solid #bfdbfe',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: 600
                  }}>
                    {activeData.badge}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#475569'
                  }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                    </svg>
                    <span>HQ · Hyderabad Hub</span>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#047857'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                    <span>Sync Active</span>
                  </div>
                </div>
              </div>

              {/* 4-Column KPI Grid */}
              <div id="dynamic-kpis-container" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '14px'
              }}>
                {activeData.kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'rgba(248, 250, 252, 0.85)',
                      border: '1px solid rgba(226, 232, 240, 0.95)',
                      borderRadius: '16px',
                      padding: '14px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {kpi.val}
                      </span>
                      <span className={`hr-kpi-badge-${kpi.badgeType}`} style={{
                        padding: '2px 8px',
                        borderRadius: '9999px',
                        fontSize: '11px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap'
                      }}>
                        {kpi.badge}
                      </span>
                    </div>
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      color: '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}>
                      {kpi.lbl}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 4 — CAROUSEL SLIDES VIEWPORT
                ═══════════════════════════════════════════════════ */}
            <div
              id="carousel-slides-viewport"
              style={{
                position: 'relative',
                minHeight: '520px',
                padding: '24px',
                background: 'rgba(248, 250, 252, 0.45)'
              }}
            >
              {/* Floating Prev Button */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#334155',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Floating Next Button */}
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 30,
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #cbd5e1',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#334155',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* ─────────────────────────────────────────────
                  SLIDE 0: ATTENDANCE & GEOFENCE
                  ───────────────────────────────────────────── */}
              <div id="slide-0" className={`hr-slide-panel ${currentSlide === 0 ? 'active' : ''}`}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

                  {/* Left Column (5-col feel): Mini Calendar + Geofence Box */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {/* Mini Calendar Card */}
                    <div style={{
                      background: '#ffffff',
                      border: '1px solid rgba(226, 232, 240, 0.9)',
                      borderRadius: '16px',
                      padding: '20px',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                          Attendance Calendar · June 2025
                        </span>
                        <span style={{
                          padding: '3px 8px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
                          borderRadius: '6px', fontSize: '11px', fontWeight: 600
                        }}>
                          Working Days: 22
                        </span>
                      </div>

                      {/* Day Headers */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '6px', marginBottom: '8px' }}>
                        {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map((d, i) => (
                          <span key={i} style={{ fontSize: '11px', fontWeight: 600, color: i >= 5 ? '#94a3b8' : '#64748b' }}>
                            {d}
                          </span>
                        ))}
                      </div>

                      {/* Day Number Cells (Exact match to screenshot) */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', textAlign: 'center', gap: '6px' }}>
                        {/* Row 1 */}
                        <span style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 0' }}>26</span>
                        <span style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 0' }}>27</span>
                        <span style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 0' }}>28</span>
                        <span style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 0' }}>29</span>
                        <span style={{ fontSize: '12px', color: '#cbd5e1', padding: '6px 0' }}>30</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>1</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>2</span>

                        {/* Row 2 */}
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>3</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>4</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>5</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>6</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', background: '#fef3c7', borderRadius: '6px', padding: '6px 0' }}>7</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>8</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>9</span>

                        {/* Row 3 */}
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>10</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>11</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#e11d48', background: '#ffe4e6', borderRadius: '6px', padding: '6px 0' }}>12</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>13</span>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>14</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>15</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>16</span>

                        {/* Row 4 */}
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: '#dcfce7', borderRadius: '6px', padding: '6px 0' }}>17</span>
                        <span style={{ fontSize: '12px', fontWeight: 800, color: '#2563eb', border: '2px solid #2563eb', borderRadius: '6px', padding: '5px 0' }}>18</span>
                        <span style={{ fontSize: '12px', color: '#475569', padding: '6px 0' }}>19</span>
                        <span style={{ fontSize: '12px', color: '#475569', padding: '6px 0' }}>20</span>
                        <span style={{ fontSize: '12px', color: '#475569', padding: '6px 0' }}>21</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>22</span>
                        <span style={{ fontSize: '12px', color: '#94a3b8', padding: '6px 0' }}>23</span>
                      </div>

                      {/* Legend */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '16px',
                        paddingTop: '12px',
                        borderTop: '1px solid #f1f5f9',
                        fontSize: '11px',
                        color: '#64748b'
                      }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                          Present
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f59e0b' }} />
                          Late Check-in
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e' }} />
                          Leave/LOP
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '2px', border: '1.5px solid #2563eb' }} />
                          Today
                        </span>
                      </div>
                    </div>

                    {/* Geofence Policy Banner */}
                    <div style={{
                      background: 'linear-gradient(135deg, #eff6ff 0%, #f0f9ff 100%)',
                      border: '1px solid #bfdbfe',
                      borderRadius: '16px',
                      padding: '16px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.2">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="16" x2="12" y2="12" />
                          <line x1="12" y1="8" x2="12.01" y2="8" />
                        </svg>
                        <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#1e40af' }}>
                          Geofence Policy Enforced
                        </span>
                      </div>
                      <p style={{ fontSize: '11.5px', color: '#2563eb', lineHeight: 1.5, margin: 0 }}>
                        Punches are validated against a 150m radius of HITEC City Hub or whitelisted client GPS coordinates with tamper detection.
                      </p>
                    </div>
                  </div>

                  {/* Right Column (7-col feel): Live Attendance Board */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Live Attendance Board</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Real-time check-ins today (18 June 2025)</div>
                      </div>
                      <span style={{
                        padding: '4px 10px',
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        borderRadius: '6px',
                        fontFamily: 'var(--mono, monospace)',
                        fontWeight: 700,
                        fontSize: '12px',
                        color: '#047857'
                      }}>
                        118 / 142 In Office
                      </span>
                    </div>

                    {/* 5 Employee Rows Matching Reference */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {/* 1. Arjun Kumar */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', background: '#dbeafe',
                            color: '#1d4ed8', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>AK</div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Arjun Kumar <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>#EMP-002</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Lead Frontend Engineer · 09:12 AM</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            padding: '3px 8px', background: '#ecfdf5', border: '1px solid #a7f3d0',
                            borderRadius: '9999px', fontSize: '11px', fontWeight: 600, color: '#047857'
                          }}>● HQ Geofence (12m)</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>On Time</span>
                        </div>
                      </div>

                      {/* 2. Priya Sharma */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', background: '#e0e7ff',
                            color: '#4338ca', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>PS</div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Priya Sharma <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>#EMP-014</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Product Manager · 09:28 AM</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            padding: '3px 8px', background: '#ecfdf5', border: '1px solid #a7f3d0',
                            borderRadius: '9999px', fontSize: '11px', fontWeight: 600, color: '#047857'
                          }}>● Biometric FaceID</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>On Time</span>
                        </div>
                      </div>

                      {/* 3. Mohammed Ali */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', background: '#fef3c7',
                            color: '#b45309', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>MA</div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Mohammed Ali <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>#EMP-041</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>DevOps Specialist · 10:48 AM</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{
                            padding: '3px 8px', background: '#fffbeb', border: '1px solid #fde68a',
                            borderRadius: '9999px', fontSize: '11px', fontWeight: 600, color: '#b45309'
                          }}>● Toli Chowki Traffic</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#d97706' }}>Late +48m</span>
                        </div>
                      </div>

                      {/* 4. Anjali Reddy */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', background: '#f3e8ff',
                            color: '#7e22ce', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>AR</div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Anjali Reddy <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>#EMP-067</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>UI/UX Designer · Approved Casual Leave</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '3px 8px', background: '#f1f5f9', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: '#64748b'
                          }}>Sick Leave</span>
                          <span style={{ fontSize: '12px', fontWeight: 600, color: '#94a3b8' }}>Away</span>
                        </div>
                      </div>

                      {/* 5. Sanjay Patel */}
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '10px 12px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px', height: '36px', borderRadius: '50%', background: '#dcfce7',
                            color: '#15803d', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                          }}>SP</div>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              Sanjay Patel <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>#EMP-089</span>
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748b' }}>Field Account Director · 08:58 AM</div>
                          </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{
                            padding: '3px 8px', background: '#eff6ff', border: '1px solid #bfdbfe',
                            borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: '#1d4ed8'
                          }}>Client Site (Bengaluru)</span>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ─────────────────────────────────────────────
                  SLIDE 1: PAYROLL WIZARD & REGISTER
                  ───────────────────────────────────────────── */}
              <div id="slide-1" className={`hr-slide-panel ${currentSlide === 1 ? 'active' : ''}`}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

                  {/* Left Column (4-col): Payroll Stepper Wizard */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                        Monthly Payroll Run Wizard
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '20px' }}>
                        Step 3 of 4: Statutory audit in progress
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {/* Step 1 */}
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce7', color: '#15803d',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0
                          }}>✓</div>
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>1. Attendance & Loss of Pay</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Synced from GPS punch engine (16 Jun)</div>
                          </div>
                        </div>

                        {/* Step 2 */}
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%', background: '#dcfce7', color: '#15803d',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0
                          }}>✓</div>
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>2. Variable Pay & Arrears</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>Salary revisions verified by Finance</div>
                          </div>
                        </div>

                        {/* Step 3 Active */}
                        <div style={{
                          display: 'flex', gap: '12px', alignItems: 'flex-start',
                          padding: '10px 12px', background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '12px'
                        }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%', background: '#2563eb', color: '#ffffff',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 800, flexShrink: 0
                          }}>3</div>
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 800, color: '#1d4ed8' }}>3. Review & Statutory Audit</div>
                            <div style={{ fontSize: '11px', color: '#2563eb' }}>PF, ESIC, PT & TDS auto-calculated</div>
                          </div>
                        </div>

                        {/* Step 4 Pending */}
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', opacity: 0.55 }}>
                          <div style={{
                            width: '24px', height: '24px', borderRadius: '50%', background: '#e2e8f0', color: '#64748b',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0
                          }}>4</div>
                          <div>
                            <div style={{ fontSize: '12.5px', fontWeight: 600, color: '#475569' }}>4. Bank Transfer & Payslips</div>
                            <div style={{ fontSize: '11px', color: '#94a3b8' }}>Scheduled for 30 June 10:00 AM</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => alert("June Payroll locked and queued for disbursal.")}
                      style={{
                        marginTop: '24px',
                        padding: '10px 16px',
                        background: '#2563eb',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: '0 2px 8px rgba(37,99,235,0.3)'
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Approve & Lock June Payroll</span>
                    </button>
                  </div>

                  {/* Right Column (8-col): Payroll Register Table */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    overflowX: 'auto'
                  }} className="hr-scroll-custom">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>June 2025 Payroll Register</div>
                      <span style={{ fontSize: '11.5px', color: '#64748b', fontFamily: 'var(--mono, monospace)' }}>
                        Cur: INR (₹)
                      </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                          <th style={{ padding: '8px 6px', fontWeight: 600 }}>Employee</th>
                          <th style={{ padding: '8px 6px', fontWeight: 600 }}>Gross (₹)</th>
                          <th style={{ padding: '8px 6px', fontWeight: 600 }}>LOP</th>
                          <th style={{ padding: '8px 6px', fontWeight: 600 }}>PF (12%)</th>
                          <th style={{ padding: '8px 6px', fontWeight: 600 }}>ESIC</th>
                          <th style={{ padding: '8px 6px', fontWeight: 600 }}>TDS</th>
                          <th style={{ padding: '8px 6px', fontWeight: 600, textAlign: 'right' }}>Net Pay (₹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Arjun Kumar', id: '#EMP-002', gross: '1,20,000', lop: '0d', pf: '-1,800', esic: '-0', tds: '-14,500', net: '1,03,700' },
                          { name: 'Priya Sharma', id: '#EMP-014', gross: '95,000', lop: '0d', pf: '-1,800', esic: '-0', tds: '-9,200', net: '84,000' },
                          { name: 'Mohammed Ali', id: '#EMP-041', gross: '75,000', lop: '1d', pf: '-1,800', esic: '-0', tds: '-5,400', net: '65,300' },
                          { name: 'Rohan Varma', id: '#EMP-055', gross: '45,000', lop: '0d', pf: '-1,800', esic: '-338', tds: '-1,200', net: '41,662' },
                          { name: 'Sneha Iyer', id: '#EMP-082', gross: '32,000', lop: '0d', pf: '-1,800', esic: '-240', tds: '-0', net: '29,960' }
                        ].map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f8fafc', fontFamily: 'var(--mono, monospace)' }}>
                            <td style={{ padding: '10px 6px', fontFamily: 'sans-serif' }}>
                              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '12.5px' }}>{row.name}</div>
                              <div style={{ fontSize: '10.5px', color: '#94a3b8' }}>{row.id}</div>
                            </td>
                            <td style={{ padding: '10px 6px', color: '#334155' }}>₹{row.gross}</td>
                            <td style={{ padding: '10px 6px', color: row.lop !== '0d' ? '#e11d48' : '#64748b' }}>{row.lop}</td>
                            <td style={{ padding: '10px 6px', color: '#e11d48' }}>{row.pf}</td>
                            <td style={{ padding: '10px 6px', color: '#e11d48' }}>{row.esic}</td>
                            <td style={{ padding: '10px 6px', color: '#e11d48' }}>{row.tds}</td>
                            <td style={{ padding: '10px 6px', textAlign: 'right', fontWeight: 800, color: '#15803d', fontSize: '13px' }}>
                              ₹{row.net}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: '16px',
                      padding: '10px 14px',
                      background: '#f8fafc',
                      borderRadius: '8px',
                      border: '1px solid #f1f5f9',
                      fontSize: '11px',
                      fontFamily: 'var(--mono, monospace)',
                      color: '#475569'
                    }}>
                      <span>EPF Total: ₹2,55,600</span>
                      <span>ESIC: ₹38,420</span>
                      <span>TDS 24Q: ₹4,28,100</span>
                      <span style={{ fontWeight: 700, color: '#15803d' }}>Net Disbursal: ₹34,28,400</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* ─────────────────────────────────────────────
                  SLIDE 2: EMPLOYEE PROFILE & 360° TIMELINE
                  ───────────────────────────────────────────── */}
              <div id="slide-2" className={`hr-slide-panel ${currentSlide === 2 ? 'active' : ''}`}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

                  {/* Left Column (5-col): Bio & KYC Card */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      {/* Avatar Header */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{
                          position: 'relative', width: '56px', height: '56px', borderRadius: '16px',
                          background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                          color: '#ffffff', fontSize: '20px', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                          <span>AK</span>
                          <span style={{
                            position: 'absolute', bottom: '-2px', right: '-2px', width: '12px', height: '12px',
                            borderRadius: '50%', background: '#10b981', border: '2px solid #ffffff'
                          }} />
                        </div>

                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>Arjun Kumar</div>
                          <div style={{ fontSize: '12px', color: '#64748b' }}>Lead Frontend Engineer — Core Platform</div>
                          <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                            <span style={{ padding: '2px 6px', background: '#eff6ff', color: '#1d4ed8', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>
                              Full-Time
                            </span>
                            <span style={{ padding: '2px 6px', background: '#ecfdf5', color: '#047857', borderRadius: '4px', fontSize: '10.5px', fontWeight: 600 }}>
                              Grade L4
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 2x2 Metadata Grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginTop: '16px' }}>
                        <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Employee ID</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', fontFamily: 'var(--mono, monospace)' }}>#EMP-002</div>
                        </div>
                        <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Work Email</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>arjun.k@cyberlink.co.in</div>
                        </div>
                        <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Manager</div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Vikas Rao (VP Eng)</div>
                        </div>
                        <div style={{ padding: '8px 10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontSize: '10px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>PF UAN</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#334155', fontFamily: 'var(--mono, monospace)' }}>101489201934</div>
                        </div>
                      </div>
                    </div>

                    {/* Verified Aadhaar & PAN Footer */}
                    <div style={{
                      marginTop: '16px',
                      padding: '10px 12px',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      borderRadius: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      color: '#047857'
                    }}>
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                      <span>Aadhaar (•••• 8912) & PAN Verified · Bank e-Mandate Active</span>
                    </div>
                  </div>

                  {/* Right Column (7-col): Timeline Card */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                      Employment & Compensation Timeline
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '18px' }}>
                      Every change tracked with old and new values
                    </div>

                    <div style={{
                      borderLeft: '2px solid #bfdbfe',
                      marginLeft: '8px',
                      paddingLeft: '18px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px'
                    }}>
                      {/* Event 1 */}
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: '-23px', top: '3px', width: '10px', height: '10px',
                          borderRadius: '50%', background: '#2563eb', border: '2px solid #ffffff'
                        }} />
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', textTransform: 'uppercase' }}>Apr 2024 · Salary Revision</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Promoted to Lead Frontend Engineer</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>CTC revised from ₹14.5 LPA → ₹18.0 LPA (+24.1%). Arrear calculated and credited.</div>
                      </div>

                      {/* Event 2 */}
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: '-23px', top: '3px', width: '10px', height: '10px',
                          borderRadius: '50%', background: '#4f46e5', border: '2px solid #ffffff'
                        }} />
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#4f46e5', textTransform: 'uppercase' }}>Jan 2023 · Promotion</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Senior Software Engineer → Technical Specialist</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>Reporting structure updated to VP Engineering. Team size: 6 engineers.</div>
                      </div>

                      {/* Event 3 */}
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: '-23px', top: '3px', width: '10px', height: '10px',
                          borderRadius: '50%', background: '#94a3b8', border: '2px solid #ffffff'
                        }} />
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Jul 2022 · Branch Relocation</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Bengaluru Campus → Hyderabad HITEC City HQ</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>GPS geofence coordinates migrated to HITEC City hub perimeter.</div>
                      </div>

                      {/* Event 4 */}
                      <div style={{ position: 'relative' }}>
                        <span style={{
                          position: 'absolute', left: '-23px', top: '3px', width: '10px', height: '10px',
                          borderRadius: '50%', background: '#94a3b8', border: '2px solid #ffffff'
                        }} />
                        <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Apr 2021 · Onboarding</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>Joined Cyberlink Technologies</div>
                        <div style={{ fontSize: '11.5px', color: '#64748b' }}>Initial appointment, background check, PF/ESIC statutory induction completed.</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* ─────────────────────────────────────────────
                  SLIDE 3: LEAVE ACCRUALS & QUEUE
                  ───────────────────────────────────────────── */}
              <div id="slide-3" className={`hr-slide-panel ${currentSlide === 3 ? 'active' : ''}`}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

                  {/* Left Column (5-col): Leave Balance Quotas */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                        Annual Leave Quotas & Accrual
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                        Monthly accrual cron executed on 1st June 00:00 UTC
                      </div>

                      {/* 2x2 Number Tiles */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div style={{ padding: '14px', background: '#eff6ff', borderRadius: '12px', border: '1px solid #bfdbfe' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#1d4ed8' }}>6.0</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e40af' }}>Casual Leave (CL)</div>
                          <div style={{ fontSize: '10.5px', color: '#60a5fa' }}>+1.25 accrued/mo</div>
                        </div>

                        <div style={{ padding: '14px', background: '#ecfdf5', borderRadius: '12px', border: '1px solid #a7f3d0' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#047857' }}>8.5</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#065f46' }}>Earned Leave (EL)</div>
                          <div style={{ fontSize: '10.5px', color: '#34d399' }}>Carry forward eligible</div>
                        </div>

                        <div style={{ padding: '14px', background: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#b45309' }}>4.0</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400e' }}>Sick Leave (SL)</div>
                          <div style={{ fontSize: '10.5px', color: '#f59e0b' }}>Medical proof req &gt; 2d</div>
                        </div>

                        <div style={{ padding: '14px', background: '#faf5ff', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: '#7e22ce' }}>2.0</div>
                          <div style={{ fontSize: '12px', fontWeight: 700, color: '#6b21a8' }}>Comp-Off Balance</div>
                          <div style={{ fontSize: '10.5px', color: '#c084fc' }}>Weekend deployments</div>
                        </div>
                      </div>
                    </div>

                    <div style={{ marginTop: '18px' }}>
                      <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>
                        Policy: Max 12 EL carry-over allowed to 2026. Unused CL lapses Dec 31.
                      </div>
                      <button
                        onClick={() => alert("Apply leave modal opened.")}
                        style={{
                          width: '100%',
                          padding: '10px',
                          background: '#2563eb',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        + Apply For Leave
                      </button>
                    </div>
                  </div>

                  {/* Right Column (7-col): Pending Approval Queue */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>Manager Approval Queue (3)</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Action required before payroll lock</div>
                      </div>
                      <span style={{ padding: '3px 8px', background: '#fff1f2', color: '#be123c', border: '1px solid #fecdd3', borderRadius: '6px', fontSize: '11px', fontWeight: 700 }}>
                        3 Pending
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        {
                          name: 'Priya Sharma', id: '#EMP-014', dept: 'Product Management', type: 'Casual Leave (CL)',
                          dates: '24 Jun – 26 Jun (3 days)', reason: 'Attending annual SaaS product conference in Mumbai as company delegate.'
                        },
                        {
                          name: 'Mohammed Ali', id: '#EMP-041', dept: 'DevOps & Cloud Infra', type: 'Comp-off',
                          dates: '21 Jun (1 day)', reason: 'Worked on Sunday production PostgreSQL database failover drill.'
                        },
                        {
                          name: 'Rohit Verma', id: '#EMP-078', dept: 'Customer Support', type: 'Sick Leave (SL)',
                          dates: '19 Jun – 20 Jun (2 days)', reason: 'Viral fever, doctor prescribed 2 days bed rest. Slip attached.'
                        }
                      ].map((item, idx) => (
                        <div key={idx} style={{
                          padding: '12px 14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                            <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                              {item.name} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>· {item.dept}</span>
                            </div>
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#2563eb', background: '#eff6ff', padding: '2px 6px', borderRadius: '4px' }}>
                              {item.type}
                            </span>
                          </div>
                          <div style={{ fontSize: '11.5px', color: '#475569', fontWeight: 600 }}>{item.dates}</div>
                          <div style={{ fontSize: '11px', color: '#64748b', fontStyle: 'italic', margin: '4px 0 8px' }}>
                            "{item.reason}"
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => alert(`Approved leave for ${item.name}`)}
                              style={{
                                padding: '4px 12px', background: '#10b981', color: '#ffffff', border: 'none',
                                borderRadius: '6px', fontSize: '11.5px', fontWeight: 700, cursor: 'pointer'
                              }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => alert(`Rejected leave for ${item.name}`)}
                              style={{
                                padding: '4px 12px', background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1',
                                borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, cursor: 'pointer'
                              }}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* ─────────────────────────────────────────────
                  SLIDE 4: STATUTORY COMPLIANCE & EPFO ECR
                  ───────────────────────────────────────────── */}
              <div id="slide-4" className={`hr-slide-panel ${currentSlide === 4 ? 'active' : ''}`}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>

                  {/* Left Column (5-col): Government Return Files */}
                  <div style={{
                    background: '#ffffff',
                    border: '1px solid rgba(226, 232, 240, 0.9)',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>
                        Statutory File Generator
                      </div>
                      <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                        Pre-formatted files for EPFO, ESIC & TRACES portals
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {[
                          { title: 'EPFO Monthly ECR Return', desc: 'Electronic Challan cum Return text file for 142 employees', badge: 'ECR', ext: '.TXT', color: '#2563eb' },
                          { title: 'ESIC Monthly Return File', desc: 'Form 5 monthly insurance contribution spreadsheet', badge: 'ESIC', ext: '.XLSX', color: '#059669' },
                          { title: 'TDS Quarterly Return Form 24Q', desc: 'Salary TDS e-filing statement with FVU validation hash', badge: '24Q', ext: '.FVU', color: '#7c3aed' },
                          { title: 'Telangana Professional Tax (PT)', desc: 'State tax challan breakdown for Hyderabad HQ', badge: 'PT', ext: '.CSV', color: '#d97706' }
                        ].map((file, idx) => (
                          <div key={idx} style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '10px 12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px'
                          }}>
                            <div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <span style={{ padding: '2px 5px', background: '#ffffff', border: `1px solid ${file.color}`, color: file.color, borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                                  {file.badge}
                                </span>
                                <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f172a' }}>{file.title}</span>
                              </div>
                              <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '2px' }}>{file.desc}</div>
                            </div>
                            <button
                              onClick={() => alert(`Downloaded ${file.title}`)}
                              style={{
                                padding: '5px 10px', background: '#ffffff', border: '1px solid #cbd5e1',
                                borderRadius: '6px', fontSize: '11px', fontWeight: 700, color: '#2563eb', cursor: 'pointer', whiteSpace: 'nowrap'
                              }}
                            >
                              Download {file.ext}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      marginTop: '16px', padding: '10px 12px', background: '#ecfdf5', border: '1px solid #a7f3d0',
                      borderRadius: '8px', fontSize: '11px', fontWeight: 600, color: '#047857'
                    }}>
                      ✓ 100% compliant with Indian Wage Code 2025 & TDS rates.
                    </div>
                  </div>

                  {/* Right Column (7-col): EPFO ECR Terminal Viewer */}
                  <div style={{
                    background: '#0f172a',
                    borderRadius: '16px',
                    padding: '18px 20px',
                    color: '#f8fafc',
                    boxShadow: '0 10px 25px -5px rgba(15, 23, 42, 0.4)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                        <span style={{ fontFamily: 'var(--mono, monospace)', fontSize: '12px', color: '#4ade80', fontWeight: 700 }}>
                          EPFO_ECR_JUN2025_TSHYD0091.TXT
                        </span>
                      </div>
                      <button
                        onClick={copyEcrCode}
                        style={{
                          padding: '4px 10px', background: '#1e293b', border: '1px solid #475569',
                          borderRadius: '6px', color: '#e2e8f0', fontSize: '11px', fontWeight: 600, cursor: 'pointer'
                        }}
                      >
                        {copiedCode ? '✓ Copied!' : 'Copy Format'}
                      </button>
                    </div>

                    <pre style={{
                      fontFamily: 'var(--mono, "JetBrains Mono", monospace)',
                      fontSize: '11px',
                      lineHeight: 1.6,
                      color: '#94a3b8',
                      overflowX: 'auto',
                      margin: 0,
                      maxHeight: '260px'
                    }}>
                      <code>{`# UAN#NAME#GROSS#EPF_WAGES#EPS_WAGES#EDLI_WAGES#EE_SHARE#ER_SHARE_EPS#ER_SHARE_EPF#NCP_DAYS#REFUNDS
101489201934#ARJUN KUMAR#120000#15000#15000#15000#1800#1250#550#0#0
101928374821#PRIYA SHARMA#95000#15000#15000#15000#1800#1250#550#0#0
100982341276#MOHAMMED ALI#72500#15000#15000#15000#1800#1250#550#1#0
102394817263#ROHAN VARMA#45000#15000#15000#15000#1800#1250#550#0#0
101129384756#SNEHA IYER#32000#15000#15000#15000#1800#1250#550#0#0
100483920192#SANJAY PATEL#110000#15000#15000#15000#1800#1250#550#0#0`}</code>
                    </pre>

                    <div style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #334155', fontSize: '11px', color: '#64748b'
                    }}>
                      <span style={{ color: '#22c55e' }}>✓ 142 Lines Validated</span>
                      <span>Checksum: SHA256-8F2A-99B1</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* ─────────────────────────────────────────────
                  SLIDE 5: VENDOR MULTI-TENANT PANEL
                  ───────────────────────────────────────────── */}
              <div id="slide-5" className={`hr-slide-panel ${currentSlide === 5 ? 'active' : ''}`}>
                <div style={{
                  background: '#ffffff',
                  border: '1px solid rgba(226, 232, 240, 0.9)',
                  borderRadius: '16px',
                  padding: '20px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
                }}>
                  {/* Top 3 KPI Strip */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '12px',
                    marginBottom: '18px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid #f1f5f9'
                  }}>
                    <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '10px', border: '1px solid #bfdbfe' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#1d4ed8' }}>MONTHLY RECURRING REVENUE</div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: '#1e40af' }}>₹2,16,000</div>
                      <div style={{ fontSize: '10.5px', color: '#15803d', fontWeight: 600 }}>+14% MoM growth</div>
                    </div>
                    <div style={{ padding: '12px', background: '#ecfdf5', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857' }}>DEPLOYED SEATS</div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: '#065f46' }}>3,890 Seats</div>
                      <div style={{ fontSize: '10.5px', color: '#047857' }}>Across 24 active schemas</div>
                    </div>
                    <div style={{ padding: '12px', background: '#fffbeb', borderRadius: '10px', border: '1px solid #fde68a' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#b45309' }}>ACTIVE TRIALS</div>
                      <div style={{ fontSize: '20px', fontWeight: 900, color: '#92400e' }}>6 Trials</div>
                      <div style={{ fontSize: '10.5px', color: '#b45309' }}>3 expiring within 48h</div>
                    </div>
                  </div>

                  {/* Tenant Table */}
                  <div style={{ overflowX: 'auto' }} className="hr-scroll-custom">
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#64748b', textAlign: 'left' }}>
                          <th style={{ padding: '8px 8px', fontWeight: 600 }}>Client Company</th>
                          <th style={{ padding: '8px 8px', fontWeight: 600 }}>Subscription Plan</th>
                          <th style={{ padding: '8px 8px', fontWeight: 600 }}>Seats</th>
                          <th style={{ padding: '8px 8px', fontWeight: 600 }}>Region</th>
                          <th style={{ padding: '8px 8px', fontWeight: 600 }}>Status</th>
                          <th style={{ padding: '8px 8px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: 'Apex Tech Solutions', slug: 'apex.cyberlink.co.in', tag: 'AT', plan: 'Enterprise (Annual)', seats: '142 / 150', state: 'Telangana (HYD)', status: 'Active', color: '#2563eb' },
                          { name: 'Sri Sai Logistics Ltd', slug: 'srisai.cyberlink.co.in', tag: 'SL', plan: 'Growth (Quarterly)', seats: '310 / 350', state: 'Karnataka (BLR)', status: 'Active', color: '#059669' },
                          { name: 'Nexus Retail Labs', slug: 'nexusretail.cyberlink.co.in', tag: 'NR', plan: 'Trial (14 Days)', seats: '68 / 100', state: 'Maharashtra (MUM)', status: 'Expires in 2d', color: '#d97706' },
                          { name: 'BuildRight Infra Corp', slug: 'buildright.cyberlink.co.in', tag: 'BR', plan: 'Enterprise (Annual)', seats: '520 / 600', state: 'Telangana (Cyberabad)', status: 'Active', color: '#7c3aed' }
                        ].map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #f8fafc' }}>
                            <td style={{ padding: '10px 8px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                  width: '32px', height: '32px', borderRadius: '8px', background: `${row.color}15`,
                                  color: row.color, fontWeight: 800, fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                }}>{row.tag}</div>
                                <div>
                                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{row.name}</div>
                                  <div style={{ fontSize: '11px', color: '#94a3b8', fontFamily: 'var(--mono, monospace)' }}>{row.slug}</div>
                                </div>
                              </div>
                            </td>
                            <td style={{ padding: '10px 8px', color: '#475569', fontWeight: 500 }}>{row.plan}</td>
                            <td style={{ padding: '10px 8px', color: '#0f172a', fontWeight: 600, fontFamily: 'var(--mono, monospace)' }}>{row.seats}</td>
                            <td style={{ padding: '10px 8px', color: '#64748b' }}>{row.state}</td>
                            <td style={{ padding: '10px 8px' }}>
                              <span style={{
                                padding: '3px 8px',
                                background: row.status === 'Active' ? '#ecfdf5' : '#fffbeb',
                                color: row.status === 'Active' ? '#047857' : '#b45309',
                                border: `1px solid ${row.status === 'Active' ? '#a7f3d0' : '#fde68a'}`,
                                borderRadius: '9999px',
                                fontSize: '11px',
                                fontWeight: 700
                              }}>
                                {row.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px 8px', textAlign: 'right' }}>
                              <button
                                onClick={() => alert(`Managing tenant: ${row.name}`)}
                                style={{
                                  padding: '4px 10px', background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe',
                                  borderRadius: '6px', fontSize: '11px', fontWeight: 700, cursor: 'pointer'
                                }}
                              >
                                Manage →
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>

            {/* ═══════════════════════════════════════════════════
                SECTION 5 — CAROUSEL FOOTER
                ═══════════════════════════════════════════════════ */}
            <footer style={{
              background: 'rgba(248, 250, 252, 0.95)',
              borderTop: '1px solid #e2e8f0',
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {/* Left: Indicator pills + slide counter label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  SHOWCASE SLIDE:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {[0, 1, 2, 3, 4, 5].map(idx => (
                    <button
                      key={idx}
                      onClick={() => switchSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                      style={{
                        height: '8px',
                        width: currentSlide === idx ? '28px' : '8px',
                        borderRadius: '9999px',
                        border: 'none',
                        background: currentSlide === idx ? '#2563eb' : '#cbd5e1',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>
                <span id="slide-counter-label" style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>
                  {activeData.label}
                </span>
              </div>

              {/* Right: Security & Certification Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '12px', color: '#64748b', fontWeight: 500 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', color: '#15803d', fontWeight: 600 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  SOC2 Type II & ISO 27001 Certified
                </span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>Auto-saves all records locally</span>
              </div>
            </footer>
          </div>

          {/* ═══════════════════════════════════════════════════
              SECTION 6 — BOTTOM 3 FEATURE CARDS
              ═══════════════════════════════════════════════════ */}
          <section style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px',
            marginTop: '32px'
          }}>
            {/* Card 1: Multi-Company SaaS */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', background: '#eff6ff',
                color: '#2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="4" y="2" width="16" height="20" rx="2" />
                  <line x1="9" y1="22" x2="9" y2="16" />
                  <line x1="9" y1="16" x2="15" y2="16" />
                  <line x1="15" y1="16" x2="15" y2="22" />
                  <line x1="9" y1="12" x2="15" y2="12" />
                  <line x1="9" y1="8" x2="15" y2="8" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Multi-Company SaaS Architecture
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Manage sister companies, subsidiaries, or independent clients under one master dashboard with complete data isolation and unified billing.
              </p>
            </div>

            {/* Card 2: Indian Statutory Compliance */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5',
                color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Indian Statutory Compliance Built-In
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Pre-built calculations for PF, ESIC, Professional Tax, and Income Tax (Old vs. New regimes) with 1-click government portal return exports.
              </p>
            </div>

            {/* Card 3: Mobile Geofenced Punching */}
            <div style={{
              background: '#ffffff',
              border: '1px solid rgba(226, 232, 240, 0.9)',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '10px', background: '#e0e7ff',
                color: '#4338ca', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Mobile Geofenced Punching
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Employees punch in via mobile with sub-meter GPS verification, selfie biometrics, and automatic route tracking for field and sales staff.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
