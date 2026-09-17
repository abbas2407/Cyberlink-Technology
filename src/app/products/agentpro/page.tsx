"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────
   AGENTPRO SHOWCASE — DATA DEFINITIONS & SLIDES CONFIGURATION
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
    url: "app.agentpro.ai/scraper/google-maps-mca21",
    statusText: "Scraper Active · 1,420 Extracted",
    date: "15 Sept 2026",
    title: "Lead Scraper & Enrichment",
    badge: "Google Maps + MCA21 Live",
    caption: "1 of 6: Real Business Scraping & MCA21 Extraction",
    actions: [
      { label: "+ New Extraction", primary: true },
      { label: "MCA21 Registry ✓" },
      { label: "Export CSV" }
    ],
    kpi: [
      { val: "1,420", label: "LEADS EXTRACTED", sub: "Hyderabad & Bangalore", color: "#4f46e5" },
      { val: "94.8%", label: "VERIFIED EMAILS", sub: "Zero Bounce Guard", color: "#059669" },
      { val: "842", label: "MCA21 DIRECTORS", sub: "DIN & CIN enriched", color: "#7c3aed" },
      { val: "18s", label: "AVG EXTRACTION", sub: "Instant AI Parser", color: "#d97706" }
    ]
  },
  {
    url: "app.agentpro.ai/ai-writer/cold-emails",
    statusText: "GPT-4o Engine · 100% Tailored",
    date: "15 Sept 2026",
    title: "AI Cold Email Generation",
    badge: "Hyper-Personalized",
    caption: "2 of 6: AI-Powered Email Copy & Value Props",
    actions: [
      { label: "Generate Batch", primary: true },
      { label: "A/B Variant Test" }
    ],
    kpi: [
      { val: "68.4%", label: "OPEN RATE", sub: "2.4x industry average", color: "#4f46e5" },
      { val: "18.2%", label: "REPLY RATE", sub: "Positive sentiment", color: "#059669" },
      { val: "1,250", label: "EMAILS GENERATED", sub: "Today's campaign", color: "#7c3aed" },
      { val: "0.2%", label: "BOUNCE RATE", sub: "Mailbox warm-up OK", color: "#d97706" }
    ]
  },
  {
    url: "app.agentpro.ai/sequences/follow-ups",
    statusText: "Cron Engine: Day 3 & Day 6 Active",
    date: "15 Sept 2026",
    title: "Automated Follow-up Engine",
    badge: "Multi-Touch Cadence",
    caption: "3 of 6: Smart Sequences on Day 3 & Day 6",
    actions: [
      { label: "+ Add Step", primary: true },
      { label: "Sequence Settings" }
    ],
    kpi: [
      { val: "Day 3 & 6", label: "NUDGE INTERVALS", sub: "Auto-pause on reply", color: "#4f46e5" },
      { val: "38%", label: "REPLIES FROM D3", sub: "First follow-up win", color: "#059669" },
      { val: "22%", label: "REPLIES FROM D6", sub: "Breakup email win", color: "#7c3aed" },
      { val: "100%", label: "INBOX DELIVERABILITY", sub: "Gmail API native", color: "#d97706" }
    ]
  },
  {
    url: "app.agentpro.ai/replies/intent-classifier",
    statusText: "Gmail Webhook Active · < 15m Auto-reply",
    date: "15 Sept 2026",
    title: "Gmail Reply Detection & Intent AI",
    badge: "Instant Classification",
    caption: "4 of 6: Intent AI & Hot Lead Instant Alerts",
    actions: [
      { label: "Review Inquiries", primary: true },
      { label: "WhatsApp Alert Logs" }
    ],
    kpi: [
      { val: "24", label: "HOT LEADS TODAY", sub: "Ready for demo calls", color: "#4f46e5" },
      { val: "< 15 min", label: "AUTO-REPLY TIME", sub: "AI drafted & sent", color: "#059669" },
      { val: "99.2%", label: "INTENT ACCURACY", sub: "Meeting / pricing / no", color: "#7c3aed" },
      { val: "WhatsApp", label: "OWNER ALERTS", sub: "Sent via Cloud API", color: "#d97706" }
    ]
  },
  {
    url: "app.agentpro.ai/crm/pipeline",
    statusText: "Pipeline Synced · ₹18.4L in Deals",
    date: "15 Sept 2026",
    title: "Built-in CRM & Pipeline",
    badge: "Lead Kanban & Deal Stages",
    caption: "5 of 6: Lead Pipeline, Status & Revenue Tracking",
    actions: [
      { label: "+ Add Lead Manually", primary: true },
      { label: "Pipeline Filters" }
    ],
    kpi: [
      { val: "184", label: "ACTIVE DEALS", sub: "Across 5 pipeline stages", color: "#4f46e5" },
      { val: "₹18.4L", label: "PIPELINE VALUE", sub: "Weighted conversion", color: "#059669" },
      { val: "32", label: "WON THIS MONTH", sub: "Average ₹42k deal", color: "#7c3aed" },
      { val: "14.2 Days", label: "AVG DEAL CYCLE", sub: "From cold to close", color: "#d97706" }
    ]
  },
  {
    url: "app.agentpro.ai/vendor/saas-control",
    statusText: "Razorpay Gateway OK · 18 Active Tenants",
    date: "15 Sept 2026",
    title: "Multi-Tenant SaaS & Vendor Control",
    badge: "SuperAdmin Dashboard",
    caption: "6 of 6: Multi-Tenant Management & Razorpay Billing",
    actions: [
      { label: "+ Add Tenant SME", primary: true },
      { label: "Razorpay Webhook ✓" }
    ],
    kpi: [
      { val: "18", label: "CLIENT TENANTS", sub: "Indian SME companies", color: "#4f46e5" },
      { val: "₹1,44,000", label: "MRR", sub: "Monthly recurring", color: "#059669" },
      { val: "14-Day", label: "FREE TRIALS", sub: "Automated expiry cron", color: "#7c3aed" },
      { val: "100%", label: "DATA ISOLATION", sub: "Row-level security", color: "#d97706" }
    ]
  }
];

export default function AgentProPage() {
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

  // Autoplay (6 seconds)
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

        .ap-page-root {
          min-height: 100vh;
          background-color: #f8fafc;
          background-image: radial-gradient(#cbd5e1 1.1px, transparent 1.1px);
          background-size: 24px 24px;
          color: #0f172a;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 104px 20px 80px;
          -webkit-font-smoothing: antialiased;
        }

        .ap-font-display {
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
        }

        @keyframes ap-pulse-dot {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(99, 102, 241, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
        }

        .ap-dot-pulse {
          animation: ap-pulse-dot 2s infinite;
        }

        .ap-gradient-text {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .ap-slide-panel {
          opacity: 0;
          visibility: hidden;
          position: absolute;
          inset: 0;
          transition: opacity 0.35s ease, transform 0.35s ease;
          transform: translateY(6px);
          pointer-events: none;
        }
        .ap-slide-panel.active {
          opacity: 1;
          visibility: visible;
          position: relative;
          transform: translateY(0);
          pointer-events: auto;
        }

        .ap-scroll-custom::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .ap-scroll-custom::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 9999px;
        }

        .ap-tabs-nav {
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
        .ap-tab-btn {
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

        .ap-kpi-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }
        @media (min-width: 768px) {
          .ap-kpi-grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        .ap-slide-grid-7-5 {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 960px) {
          .ap-slide-grid-7-5 {
            grid-template-columns: 1.35fr 1fr;
          }
        }

        .ap-features-grid {
          margin-top: 48px;
          max-width: 1040px;
          margin-left: auto;
          margin-right: auto;
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .ap-features-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      <div className="ap-page-root">
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
              background: '#eef2ff',
              border: '1px solid #c7d2fe',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#4338ca',
              boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
              marginBottom: '20px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#4f46e5',
              }} className="ap-dot-pulse" />
              <span>AgentPro.ai · AI Marketing Automation Platform</span>
            </div>

            {/* H1 Headline */}
            <h1 className="ap-font-display" style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              color: '#0f172a',
              marginBottom: '16px'
            }}>
              Automate B2B Outbound &amp; Close Leads <span className="ap-gradient-text">on Autopilot.</span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontSize: '17px',
              color: '#475569',
              lineHeight: 1.6,
              maxWidth: '720px',
              margin: '0 auto 20px',
              fontWeight: 400
            }}>
              AI-powered cold email generation, lead scraping from Google Maps &amp; MCA21, automated multi-touch follow-ups, and instant hot lead WhatsApp alerts for Indian SMEs.
            </p>

            {/* Live Web App Badge */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <a
                href="https://agent.cyberlink.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#7c3aed',
                  color: '#ffffff',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(124, 58, 237, 0.28)',
                }}
              >
                <span>Visit Live App: agent.cyberlink.co.in</span>
                <span>↗</span>
              </a>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════
              TAB SWITCHER NAVIGATION (6 Tabs — NO EMOJIS)
              ═══════════════════════════════════════════════════ */}
          <nav className="ap-tabs-nav">
            {[
              {
                label: "01. Lead Scraper",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )
              },
              {
                label: "02. AI Email Generator",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" />
                    <circle cx="12" cy="5" r="2" />
                    <path d="M12 7v4" />
                    <line x1="8" y1="16" x2="8.01" y2="16" />
                    <line x1="16" y1="16" x2="16.01" y2="16" />
                  </svg>
                )
              },
              {
                label: "03. Follow-up Engine",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                )
              },
              {
                label: "04. Intent Classifier",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                )
              },
              {
                label: "05. Pipeline CRM",
                icon: (
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="5" height="12" rx="1"/>
                    <rect x="10" y="3" width="5" height="18" rx="1"/>
                    <rect x="17" y="3" width="5" height="8" rx="1"/>
                  </svg>
                )
              },
              {
                label: "06. Multi-Tenant SaaS",
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
                  className="ap-tab-btn"
                  style={{
                    background: isActive ? '#4f46e5' : 'transparent',
                    color: isActive ? '#ffffff' : '#64748b',
                    boxShadow: isActive ? '0 2px 8px rgba(79, 70, 229, 0.28)' : 'none',
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
                e.currentTarget.style.color = '#4f46e5';
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
                e.currentTarget.style.color = '#4f46e5';
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
                  background: '#eef2ff',
                  border: '1px solid #c7d2fe',
                  color: '#4338ca',
                  fontWeight: 600
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4f46e5' }} />
                  <span>{activeData.statusText}</span>
                </div>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>{activeData.date}</span>
              </div>
            </div>

            {/* Inner Dashboard Content */}
            <div style={{ padding: '24px 28px', background: '#fafbfc' }}>

              {/* Subheader */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <h2 className="ap-font-display" style={{
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
                    background: '#e0e7ff',
                    color: '#3730a3'
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
                        background: act.primary ? '#4f46e5' : '#ffffff',
                        color: act.primary ? '#ffffff' : '#475569',
                        boxShadow: act.primary ? '0 1px 4px rgba(79,70,229,0.3)' : '0 1px 2px rgba(0,0,0,0.03)',
                        cursor: 'pointer'
                      }}
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 4 Stat KPI Cards */}
              <div className="ap-kpi-grid">
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

                {/* ── SLIDE 0: LEAD SCRAPER & ENRICHMENT ── */}
                <div className={`ap-slide-panel ${currentSlide === 0 ? 'active' : ''}`}>
                  <div className="ap-slide-grid-7-5">
                    {/* Left Scraping Setup */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', marginBottom: '16px', borderBottom: '1px solid #f1f5f9' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }} />
                          LEAD EXTRACTION ENGINE (MAPS &amp; MCA21)
                        </div>
                        <span style={{ fontSize: '11px', background: '#f1f5f9', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                          TASK: SCRP-IN-9052
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '12px' }}>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Target Industry / Keywords</label>
                          <input readOnly value="Solar EPC Contractors &amp; Logistics" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, color: '#1e293b', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Target Location (India)</label>
                          <input readOnly value="Hyderabad &amp; Bangalore (50km radius)" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, color: '#1e293b', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Data Sources</label>
                          <input readOnly value="Google Maps · OpenStreetMap · MCA21" style={{ width: '100%', background: '#eef2ff', border: '1px solid #c7d2fe', borderRadius: '8px', padding: '8px 12px', fontWeight: 700, color: '#4338ca', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: '#64748b', fontWeight: 500, marginBottom: '4px' }}>Director Contact Enrichment</label>
                          <input readOnly value="Active DIN &amp; Phone Verified" style={{ width: '100%', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '8px 12px', fontWeight: 600, color: '#1e293b', outline: 'none' }} />
                        </div>
                      </div>

                      <button style={{
                        width: '100%',
                        marginTop: '16px',
                        padding: '10px',
                        borderRadius: '8px',
                        background: '#4f46e5',
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
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8"/>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        Start Real-Time Lead Extraction
                      </button>

                      {/* Instant Paste Text Parser Banner */}
                      <div style={{ marginTop: '16px', padding: '12px 14px', background: '#faf5ff', border: '1px solid #e9d5ff', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6b21a8', fontWeight: 700, fontSize: '11px', letterSpacing: '0.04em', marginBottom: '4px' }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
                            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          </svg>
                          PASTE ANY RAW TEXT — AI EXTRACTS LEADS INSTANTLY
                        </div>
                        <p style={{ margin: 0, fontSize: '11.5px', color: '#581c87', lineHeight: 1.5 }}>
                          Paste meeting notes, PDF directories, or WhatsApp exports. AgentPro's regex and LLM parser automatically isolates company names, GSTIN, verified emails, and decision-maker phone numbers.
                        </p>
                      </div>
                    </div>

                    {/* Right Live Leads Stream */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '14px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase' }}>Recent Enriched Leads</span>
                          <span style={{ fontSize: '11px', fontWeight: 600, background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '9999px' }}>Live Scrape · 2s</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {[
                            { name: "SunTech Power EPC Ltd", loc: "Gachibowli, HYD", dir: "Rajesh Varma (MD)", status: "Verified" },
                            { name: "Apex Translogistics LLP", loc: "Whitefield, BLR", dir: "Anand Murthy (CEO)", status: "MCA21 OK" },
                            { name: "Delta Infra Projects", loc: "Kukatpally, HYD", dir: "S. Rao (Director)", status: "Verified" },
                            { name: "Zenith Cold Chain Solutions", loc: "Peenya, BLR", dir: "Pooja Hegde (COO)", status: "Verified" },
                            { name: "Bharat Switchgears India", loc: "Balanagar, HYD", dir: "V. Sharma (Partner)", status: "MCA21 OK" }
                          ].map((lead, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid #f8fafc' : 'none', fontSize: '12.5px' }}>
                              <div>
                                <div style={{ fontWeight: 700, color: '#0f172a' }}>{lead.name}</div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{lead.loc} · {lead.dir}</div>
                              </div>
                              <span style={{ fontSize: '10.5px', fontWeight: 700, background: '#eef2ff', color: '#4338ca', padding: '2px 8px', borderRadius: '4px' }}>
                                {lead.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div style={{ paddingTop: '12px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                        <span>Google Maps &amp; MCA21 Filter</span>
                        <strong style={{ color: '#059669' }}>100% Zero-Bounce Validated</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 1: AI COLD EMAIL GENERATION ── */}
                <div className={`ap-slide-panel ${currentSlide === 1 ? 'active' : ''}`}>
                  <div className="ap-slide-grid-7-5">
                    {/* Left Email Preview */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', paddingBottom: '10px', borderBottom: '1px solid #f1f5f9' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>Subject: Quick question regarding SunTech Power's solar procurement</span>
                        <span style={{ fontSize: '11px', background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>Personalized · Variant A</span>
                      </div>
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', fontSize: '13px', color: '#334155', lineHeight: 1.6, fontFamily: 'monospace' }}>
                        <p style={{ margin: '0 0 12px' }}>Hi Rajesh,</p>
                        <p style={{ margin: '0 0 12px' }}>
                          Noticed SunTech Power's recent expansion in Gachibowli solar installations. Many EPC leaders in Telangana are losing 12–15% margin on hardware procurement delays and non-standardized SFP/Switch inventory.
                        </p>
                        <p style={{ margin: '0 0 12px' }}>
                          We supply certified optical transceivers &amp; enterprise network switches with same-day Hyderabad dispatch, helping EPC teams cut lead time from 14 days to 4 hours.
                        </p>
                        <p style={{ margin: '0 0 12px' }}>
                          Would you be open to a 10-minute chat this Thursday at 3 PM to review our bulk procurement rates?
                        </p>
                        <p style={{ margin: 0 }}>Best regards,<br/><strong>Arjun Rao · Growth Lead</strong></p>
                      </div>
                      <div style={{ marginTop: '14px', display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#4f46e5', color: '#ffffff', border: 'none', fontSize: '12px', fontWeight: 600 }}>Approve &amp; Send</button>
                        <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#ffffff', border: '1px solid #e2e8f0', color: '#475569', fontSize: '12px', fontWeight: 500 }}>Regenerate Copy</button>
                      </div>
                    </div>

                    {/* Right AI Controls */}
                    <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', marginBottom: '14px' }}>AI Personalization Parameters</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '12px' }}>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#64748b' }}>Tone of Voice:</span>
                          <strong style={{ color: '#0f172a', marginLeft: '6px' }}>Consultative &amp; Direct (Indian SME B2B)</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#64748b' }}>Dynamic Data Injection:</span>
                          <strong style={{ color: '#0f172a', marginLeft: '6px' }}>Director Name, Location, MCA21 Industry</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#64748b' }}>Spam Score Check:</span>
                          <strong style={{ color: '#059669', marginLeft: '6px' }}>0.0 / 10.0 (100% Primary Inbox)</strong>
                        </div>
                        <div style={{ background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                          <span style={{ color: '#64748b' }}>Daily Volume Throttle:</span>
                          <strong style={{ color: '#0f172a', marginLeft: '6px' }}>45 emails / inbox / day (Warm-up Safe)</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 2: AUTOMATED FOLLOW-UPS (DAY 3 & 6) ── */}
                <div className={`ap-slide-panel ${currentSlide === 2 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b', textTransform: 'uppercase', marginBottom: '16px' }}>
                      Automated Follow-up Sequence Pipeline
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                      {/* Step 1 */}
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, background: '#4f46e5', color: '#ffffff', padding: '2px 8px', borderRadius: '4px' }}>STEP 1 · DAY 0</span>
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Sent (1,420)</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Initial Value Pitch</div>
                        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>Identifies key operational pain point with localized case study.</div>
                      </div>
                      {/* Step 2 */}
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, background: '#7c3aed', color: '#ffffff', padding: '2px 8px', borderRadius: '4px' }}>STEP 2 · DAY 3</span>
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Queued (890)</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Quick Nudge &amp; ROI Metric</div>
                        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>Friendly reference to previous email with a 1-sentence ROI proof.</div>
                      </div>
                      {/* Step 3 */}
                      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, background: '#d97706', color: '#ffffff', padding: '2px 8px', borderRadius: '4px' }}>STEP 3 · DAY 6</span>
                          <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>Scheduled (410)</span>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a', marginBottom: '4px' }}>Clean Breakup &amp; Direct Phone CTA</div>
                        <div style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5 }}>Gives polite permission to pass or replies with WhatsApp direct line.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 3: INTENT CLASSIFIER & HOT ALERTS ── */}
                <div className={`ap-slide-panel ${currentSlide === 3 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Live Gmail Replies &amp; AI Intent Classification</span>
                      <span style={{ fontSize: '11px', color: '#059669', fontWeight: 600 }}>WhatsApp Webhook Online</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { from: "Anand Murthy (Apex Logistics)", text: "“Yes, please send across your product catalog and price list for 10G SFP modules.”", tag: "HOT LEAD · INTERESTED", color: "#059669", bg: "#dcfce7", action: "Auto-Replied in 8m + WhatsApp Alert Sent" },
                        { from: "Rajesh Varma (SunTech Power)", text: "“Can you meet in our office near Cyber Towers on Friday 4 PM?”", tag: "MEETING REQUEST", color: "#4f46e5", bg: "#eef2ff", action: "Calendar Link Dispatched" },
                        { from: "Pooja Hegde (Zenith Cold Chain)", text: "“What is your payment terms for MSME vendors?”", tag: "PRICING INQUIRY", color: "#d97706", bg: "#fef3c7", action: "Rate Card PDF Sent" },
                        { from: "K. Reddy (Infra EPC)", text: "“Not interested right now, please remove us.”", tag: "UNSUBSCRIBE", color: "#e11d48", bg: "#ffe4e6", action: "Auto-Revoked & Blacklisted" }
                      ].map((item, idx) => (
                        <div key={idx} style={{ padding: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '13px', color: '#0f172a' }}>{item.from}</div>
                            <div style={{ fontSize: '12px', color: '#475569', fontStyle: 'italic', marginTop: '2px' }}>{item.text}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '11px', fontWeight: 700, background: item.bg, color: item.color, padding: '3px 8px', borderRadius: '4px' }}>{item.tag}</span>
                            <div style={{ fontSize: '10.5px', color: '#64748b', marginTop: '4px' }}>{item.action}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 4: BUILT-IN CRM & PIPELINE ── */}
                <div className={`ap-slide-panel ${currentSlide === 4 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>Active Deal Stages &amp; Pipeline Kanban</span>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#4f46e5' }}>Total Value: ₹18,40,000</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                      {[
                        { stage: "Leads Contacted", count: "1,420", val: "₹52.0L", color: "#64748b" },
                        { stage: "Replied / Engaged", count: "258", val: "₹24.5L", color: "#4f46e5" },
                        { stage: "Demo / Meeting", count: "48", val: "₹12.8L", color: "#7c3aed" },
                        { stage: "Proposal Sent", count: "24", val: "₹7.4L", color: "#d97706" },
                        { stage: "Closed Won", count: "32", val: "₹18.4L", color: "#059669" }
                      ].map((st, i) => (
                        <div key={i} style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
                          <div style={{ fontSize: '11px', fontWeight: 700, color: st.color, textTransform: 'uppercase' }}>{st.stage}</div>
                          <div style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '6px' }}>{st.count}</div>
                          <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>Value: {st.val}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* ── SLIDE 5: MULTI-TENANT SAAS & BILLING ── */}
                <div className={`ap-slide-panel ${currentSlide === 5 ? 'active' : ''}`}>
                  <div style={{ background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '14px', borderBottom: '1px solid #f1f5f9', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase' }}>SME Tenant Management &amp; Razorpay Auto-Debit</div>
                        <div style={{ fontSize: '12px', color: '#64748b' }}>Complete tenant isolation with automated recurring subscription billing.</div>
                      </div>
                      <button style={{ padding: '6px 14px', borderRadius: '8px', background: '#4f46e5', color: '#ffffff', border: 'none', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}>+ Add Client SME</button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                      {[
                        { name: "Deccan Logistics Pvt Ltd", plan: "Growth Plan (₹8,000/mo)", leads: "4,200 leads scraped", status: "Razorpay Active", sBg: "#dcfce7", sColor: "#15803d" },
                        { name: "Pragati Solar Energy Corp", plan: "Growth Plan (₹8,000/mo)", leads: "3,800 leads scraped", status: "Razorpay Active", sBg: "#dcfce7", sColor: "#15803d" },
                        { name: "Vanguard Tech Distribution", plan: "Trial (14-Day)", leads: "450 leads scraped", status: "Expires in 5d", sBg: "#fef3c7", sColor: "#b45309" },
                      ].map((tenant, i) => (
                        <div key={i} style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap', fontSize: '12px' }}>
                          <div>
                            <div style={{ fontWeight: 700, color: '#0f172a' }}>{tenant.name}</div>
                            <div style={{ fontSize: '11px', color: '#64748b' }}>{tenant.plan} · {tenant.leads}</div>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '10.5px', fontWeight: 700, background: tenant.sBg, color: tenant.sColor, padding: '2px 8px', borderRadius: '4px' }}>{tenant.status}</span>
                            <button style={{ padding: '4px 10px', background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '11.5px', fontWeight: 600, color: '#334155' }}>Manage</button>
                          </div>
                        </div>
                      ))}
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
                        background: currentSlide === idx ? '#4f46e5' : '#cbd5e1',
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', fontWeight: 700, color: '#4338ca' }}>
                <span>✓ Google Maps &amp; MCA21</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>✓ Gmail API Native</span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>✓ Razorpay Auto-Debit</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════
              FEATURE HIGHLIGHT CARDS (3 CARDS — NO EMOJIS, CLEAN ICONS)
              ═══════════════════════════════════════════════════ */}
          <section className="ap-features-grid">
            {/* Card 1: Intelligent Lead Extraction */}
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
                background: '#eef2ff',
                color: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </div>
              <h3 className="ap-font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Maps &amp; MCA21 Lead Scraping
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Extract verified decision-maker emails, direct phones, and GSTIN details from Google Maps and official government MCA21 registries.
              </p>
            </div>

            {/* Card 2: High-Deliverability AI Sequencing */}
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
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <h3 className="ap-font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Automated Day 3 &amp; Day 6 Nudges
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Multi-touch follow-ups triggered automatically on Day 3 and Day 6, pausing immediately when a prospect replies to preserve deliverability.
              </p>
            </div>

            {/* Card 3: Intent Classification & WhatsApp Alerts */}
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
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <h3 className="ap-font-display" style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>
                Hot Lead WhatsApp Alerts
              </h3>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                Incoming replies are classified by AI in real time; interested buyers trigger an instant WhatsApp ping to the business owner to close fast.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
