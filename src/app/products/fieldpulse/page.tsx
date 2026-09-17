"use client";

import { useState, useCallback } from 'react';

/* ── Carousel slide titles ── */
const SLIDE_TITLES = [
  "1 of 3: Live Hyderabad Fleet Telemetry",
  "2 of 3: Geofence Boundaries & Active Delay Alerts",
  "3 of 3: Route Replay, Time Scrubber & Halt Analytics"
];

export default function FieldPulsePage() {
  const [currentSlide, setCurrentSlide] = useState(1);

  const switchSlide = useCallback((idx: number) => {
    setCurrentSlide(idx);
  }, []);

  const navigateSlide = useCallback((dir: number) => {
    setCurrentSlide(prev => {
      let next = prev + dir;
      if (next > 3) next = 1;
      if (next < 1) next = 3;
      return next;
    });
  }, []);

  const isActive = (idx: number) => idx === currentSlide;

  return (
    <>
      {/* ── Scoped styles for animations & glass effect ── */}
      <style>{`
        @keyframes fp-ping-slow {
          0% { transform: scale(1); opacity: 0.9; }
          50% { transform: scale(2.2); opacity: 0.2; }
          100% { transform: scale(2.8); opacity: 0; }
        }
        .fp-animate-radar {
          animation: fp-ping-slow 2.4s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes fp-dash-flow {
          to { stroke-dashoffset: -40; }
        }
        .fp-animate-route-flow {
          stroke-dasharray: 6, 6;
          animation: fp-dash-flow 1.5s linear infinite;
        }
        .fp-glass-hud {
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
        @keyframes fp-ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        .fp-animate-ping {
          animation: fp-ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        @keyframes fp-pulse {
          50% { opacity: .5; }
        }
        .fp-animate-pulse {
          animation: fp-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* ── Page-level typography & layout ── */
        .fp-page {
          font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          background: #f8fafc;
          color: #1e293b;
          -webkit-font-smoothing: antialiased;
          min-height: 100vh;
          padding: 102px 16px 40px;
        }
        @media (min-width: 640px) { .fp-page { padding-left: 24px; padding-right: 24px; } }
        @media (min-width: 1024px) { .fp-page { padding-left: 32px; padding-right: 32px; } }

        .fp-page ::selection {
          background: #e0e7ff;
          color: #312e81;
        }

        /* ── Gradient text ── */
        .fp-gradient-text {
          background: linear-gradient(to right, #4f46e5, #6366f1, #0ea5e9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Shadows ── */
        .fp-shadow-dashboard {
          box-shadow: 0 20px 45px -15px rgba(15, 23, 42, 0.08), 0 0 1px 1px rgba(15, 23, 42, 0.05);
        }
        .fp-shadow-float {
          box-shadow: 0 10px 30px -8px rgba(30, 41, 59, 0.15), 0 2px 6px -1px rgba(30, 41, 59, 0.06);
        }
        .fp-shadow-sm {
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
        }
        .fp-shadow-md {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        }
        .fp-shadow-lg {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
        }
        .fp-shadow-xl {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .fp-shadow-2xs {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        }
        .fp-shadow-xs {
          box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
      `}</style>

      <div className="fp-page">
        <main style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* ═══════════════════════════════════════════════════
              SECTION 1: SHOWCASE HEADER
              ═══════════════════════════════════════════════════ */}
          <header style={{ textAlign: 'center', maxWidth: '896px', margin: '0 auto 40px' }}>

            {/* Eyebrow Pill */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '9999px',
              background: '#eef2ff', border: '1px solid #e0e7ff',
              color: '#4338ca', fontSize: '12px', fontWeight: 600,
              letterSpacing: '0.05em', textTransform: 'uppercase' as const,
              marginBottom: '20px'
            }} className="fp-shadow-sm">
              <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                <span className="fp-animate-ping" style={{
                  position: 'absolute', display: 'inline-flex', width: '100%', height: '100%',
                  borderRadius: '9999px', background: '#818cf8', opacity: 0.75
                }} />
                <span style={{
                  position: 'relative', display: 'inline-flex', borderRadius: '9999px',
                  width: '8px', height: '8px', background: '#4f46e5'
                }} />
              </span>
              Feature Highlight • Real-Time Telemetry
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(1.875rem, 4vw, 3rem)', fontWeight: 800,
              color: '#0f172a', letterSpacing: '-0.025em',
              lineHeight: 1.15, marginBottom: '16px'
            }}>
              Live GPS Tracking That Keeps Field Teams in{' '}
              <span className="fp-gradient-text">Perfect Sync</span>
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)', color: '#475569',
              fontWeight: 400, lineHeight: 1.7, marginBottom: '20px',
              maxWidth: '768px', margin: '0 auto 20px'
            }}>
              Monitor field routes, punch-in status, and live geofenced operations across your city with sub-second telemetry, autonomous route replays, and dispatch analytics.
            </p>

            {/* Live Web App Badge */}
            <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <a
                href="https://fp.cyberlink.co.in/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: '#4f46e5',
                  color: '#ffffff',
                  padding: '7px 16px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  boxShadow: '0 2px 10px rgba(79, 70, 229, 0.28)',
                }}
              >
                <span>Visit Live App: fp.cyberlink.co.in</span>
                <span>↗</span>
              </a>
            </div>

            {/* Carousel Tab Switcher */}
            <div style={{
              display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center',
              justifyContent: 'center', gap: '8px', padding: '6px',
              background: '#ffffff', border: '1px solid rgba(226,232,240,0.8)',
              borderRadius: '16px', maxWidth: '768px', margin: '0 auto'
            }} className="fp-shadow-sm">
              {/* Tab 1 */}
              <button onClick={() => switchSlide(1)} style={{
                flex: '1 1 200px', minWidth: '200px', fontSize: '13px', fontWeight: isActive(1) ? 600 : 500,
                padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: isActive(1) ? '#4f46e5' : 'transparent',
                color: isActive(1) ? '#ffffff' : '#475569',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s',
                boxShadow: isActive(1) ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M9 20l-5.447-2.724A2 2 0 013 15.485V5.118a2 2 0 011.553-1.954l5.447 1.815 6-2 5.447 1.815A2 2 0 0123 7.732v10.367a2 2 0 01-1.553 1.954l-5.447-1.815-6 2zM9 4v16m6-18v16" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                01. Live Fleet &amp; Google Map
              </button>
              {/* Tab 2 */}
              <button onClick={() => switchSlide(2)} style={{
                flex: '1 1 200px', minWidth: '200px', fontSize: '13px', fontWeight: isActive(2) ? 600 : 500,
                padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: isActive(2) ? '#4f46e5' : 'transparent',
                color: isActive(2) ? '#ffffff' : '#475569',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s',
                boxShadow: isActive(2) ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
                <svg style={{ width: '16px', height: '16px', color: isActive(2) ? 'inherit' : '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                02. Geofence &amp; Delay Alerts
              </button>
              {/* Tab 3 */}
              <button onClick={() => switchSlide(3)} style={{
                flex: '1 1 200px', minWidth: '200px', fontSize: '13px', fontWeight: isActive(3) ? 600 : 500,
                padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                background: isActive(3) ? '#4f46e5' : 'transparent',
                color: isActive(3) ? '#ffffff' : '#475569',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                transition: 'all 0.2s',
                boxShadow: isActive(3) ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
              }}>
                <svg style={{ width: '16px', height: '16px', color: isActive(3) ? 'inherit' : '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                03. Route Replay &amp; Analytics
              </button>
            </div>
          </header>

          {/* ═══════════════════════════════════════════════════
              SECTION 2: DASHBOARD MOCKUP FRAME
              ═══════════════════════════════════════════════════ */}
          <section style={{
            position: 'relative', background: '#ffffff', borderRadius: '24px',
            border: '1px solid rgba(226,232,240,0.9)', overflow: 'hidden'
          }} className="fp-shadow-dashboard">

            {/* ── Top Chrome Bar ── */}
            <div style={{
              padding: '14px 20px', background: 'rgba(248,250,252,0.9)',
              borderBottom: '1px solid #e2e8f0', display: 'flex',
              flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px'
            }}>
              {/* Left: dots + URL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f87171', display: 'inline-block', border: '1px solid rgba(239,68,68,0.3)' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block', border: '1px solid rgba(245,158,11,0.3)' }} />
                  <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#34d399', display: 'inline-block', border: '1px solid rgba(16,185,129,0.3)' }} />
                </div>
                <div className="fp-shadow-2xs" style={{
                  display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px',
                  background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px',
                  fontSize: '12px', fontFamily: "'SF Mono', Menlo, Monaco, 'Courier New', monospace",
                  color: '#64748b', fontWeight: 500
                }}>
                  <svg style={{ width: '14px', height: '14px', color: '#94a3b8' }} fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" fillRule="evenodd" />
                  </svg>
                  app.fieldpulse.in · Live GPS Dashboard
                </div>
              </div>
              {/* Right: LIVE badge + sync time */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="fp-shadow-2xs" style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 10px',
                  background: '#ecfdf5', border: '1px solid rgba(16,185,129,0.2)',
                  color: '#15803d', fontSize: '12px', fontWeight: 700,
                  borderRadius: '8px', letterSpacing: '0.025em'
                }}>
                  <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                    <span className="fp-animate-ping" style={{
                      position: 'absolute', display: 'inline-flex', width: '100%', height: '100%',
                      borderRadius: '9999px', background: '#34d399', opacity: 0.75
                    }} />
                    <span style={{
                      position: 'relative', display: 'inline-flex', borderRadius: '9999px',
                      width: '8px', height: '8px', background: '#22c55e'
                    }} />
                  </span>
                  <span>LIVE (1s)</span>
                </div>
                <span style={{
                  fontSize: '12px', fontFamily: "'SF Mono', Menlo, Monaco, 'Courier New', monospace",
                  color: '#94a3b8'
                }}>Synced: 11:42:08 AM IST</span>
              </div>
            </div>

            {/* ── Dashboard Subheader & KPI Stats ── */}
            <div style={{ padding: '24px', background: '#ffffff', borderBottom: '1px solid #f1f5f9' }}>
              {/* Title row */}
              <div style={{
                display: 'flex', flexWrap: 'wrap' as const,
                alignItems: 'center', justifyContent: 'space-between',
                gap: '16px', marginBottom: '24px'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '24px', fontWeight: 700, color: '#0f172a',
                    letterSpacing: '-0.025em', display: 'flex', alignItems: 'center', gap: '10px'
                  }}>
                    Live GPS Tracking
                    <span style={{
                      fontSize: '12px', padding: '2px 8px', borderRadius: '9999px',
                      background: '#f1f5f9', fontWeight: 600, color: '#475569',
                      border: '1px solid #e2e8f0'
                    }}>Hyderabad Hub</span>
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748b', marginTop: '2px' }}>
                    High-precision field telemetry across HITEC City, Gachibowli &amp; Cyberabad zones.
                  </p>
                </div>
                {/* Filter buttons */}
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', gap: '8px' }}>
                  <button style={{
                    padding: '6px 12px', fontSize: '12px', fontWeight: 500,
                    background: '#f1f5f9', color: '#334155', borderRadius: '8px',
                    border: '1px solid #e2e8f0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <svg style={{ width: '14px', height: '14px', color: '#64748b' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </svg>
                    All Sectors (14)
                  </button>
                  <button style={{
                    padding: '6px 12px', fontSize: '12px', fontWeight: 500,
                    background: '#eef2ff', color: '#4338ca', borderRadius: '8px',
                    border: '1px solid rgba(99,102,241,0.2)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4f46e5' }} />
                    Active Routes (24)
                  </button>
                  <button className="fp-shadow-2xs" style={{
                    padding: '6px 12px', fontSize: '12px', fontWeight: 500,
                    background: '#ffffff', color: '#334155', borderRadius: '8px',
                    border: '1px solid #e2e8f0', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                    Traffic Layer: ON
                  </button>
                </div>
              </div>

              {/* 3 KPI Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                {/* Active Agents */}
                <div style={{
                  background: 'rgba(248,250,252,0.7)', border: '1px solid rgba(226,232,240,0.9)',
                  borderRadius: '16px', padding: '16px', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 800, color: '#4f46e5', letterSpacing: '-0.025em' }}>24</span>
                    <span style={{
                      display: 'flex', alignItems: 'center', fontSize: '12px', fontWeight: 600,
                      color: '#16a34a', background: '#f0fdf4', padding: '2px 8px',
                      borderRadius: '9999px', border: '1px solid #dcfce7'
                    }}>+3 vs yesterday</span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b' }}>Active Agents</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>21 moving • 3 stationary at client sites</p>
                </div>
                {/* On Leave */}
                <div style={{
                  background: 'rgba(248,250,252,0.7)', border: '1px solid rgba(226,232,240,0.9)',
                  borderRadius: '16px', padding: '16px', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 800, color: '#475569', letterSpacing: '-0.025em' }}>6</span>
                    <span style={{
                      fontSize: '12px', fontWeight: 500, color: '#94a3b8',
                      background: '#f1f5f9', padding: '2px 8px', borderRadius: '9999px',
                      border: '1px solid #e2e8f0'
                    }}>Planned leaves</span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b' }}>On Leave</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Next check-in scheduled Monday</p>
                </div>
                {/* Late Punch-in */}
                <div style={{
                  background: 'rgba(248,250,252,0.7)', border: '1px solid rgba(226,232,240,0.9)',
                  borderRadius: '16px', padding: '16px', transition: 'all 0.2s'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '30px', fontWeight: 800, color: '#d97706', letterSpacing: '-0.025em' }}>2</span>
                    <span style={{
                      display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 600,
                      color: '#b45309', background: '#fffbeb', padding: '2px 8px',
                      borderRadius: '9999px', border: '1px solid #fde68a'
                    }}>
                      <svg style={{ width: '12px', height: '12px', color: '#f59e0b' }} fill="currentColor" viewBox="0 0 20 20">
                        <path clipRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" fillRule="evenodd" />
                      </svg>
                      Traffic delay
                    </span>
                  </div>
                  <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.05em', color: '#64748b' }}>Late Punch-in</p>
                  <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Toli Chowki bottleneck reported</p>
                </div>
              </div>
            </div>

            {/* ═══ CAROUSEL VIEWPORT ═══ */}
            <div style={{ position: 'relative', background: '#f1f5f9', minHeight: '560px', overflow: 'hidden' }}>

              {/* ── SLIDE 1: LIVE MAP ── */}
              <div id="slide-1" style={{
                position: 'absolute', inset: 0,
                transition: 'opacity 0.5s', opacity: isActive(1) ? 1 : 0,
                pointerEvents: isActive(1) ? 'auto' : 'none'
              }}>
                {/* SVG Map */}
                <svg style={{ width: '100%', height: '100%' }} fill="none" viewBox="0 0 1200 680" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern height={48} id="fp-map-grid" patternUnits="userSpaceOnUse" width={48}>
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#e2e8f0" strokeOpacity="0.6" strokeWidth="0.8" />
                    </pattern>
                    <linearGradient id="fp-route-gradient" x1="0%" x2="100%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#4f46e5" />
                      <stop offset="50%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>
                  <rect fill="#f8fafc" height="680" width="1200" />
                  <rect fill="url(#fp-map-grid)" height="680" width="1200" />
                  {/* Parks */}
                  <path d="M520,240 C570,220 630,230 650,280 C670,320 640,360 590,370 C540,380 490,330 500,280 Z" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                  <text fill="#059669" fontFamily="sans-serif" fontSize="10" fontWeight="600" opacity="0.8" x="560" y="300">KBR National Park</text>
                  <path d="M120,400 C180,390 230,420 220,490 C210,540 150,560 100,530 C60,500 80,430 120,400 Z" fill="#ecfdf5" stroke="#a7f3d0" strokeWidth="1.2" />
                  <text fill="#059669" fontFamily="sans-serif" fontSize="10" fontWeight="600" opacity="0.8" x="130" y="470">Botanical Garden</text>
                  {/* Water */}
                  <path d="M840,160 C900,140 960,170 980,230 C990,290 940,340 880,350 C820,360 780,300 790,230 C800,180 810,165 840,160 Z" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5" />
                  <text fill="#0284c7" fontFamily="sans-serif" fontSize="11" fontWeight="700" x="860" y="250">Hussain Sagar Lake</text>
                  <path d="M330,310 C370,295 410,315 420,350 C425,375 390,400 350,395 C310,390 300,340 330,310 Z" fill="#e0f2fe" stroke="#7dd3fc" strokeWidth="1.5" />
                  <text fill="#0284c7" fontFamily="sans-serif" fontSize="9.5" fontWeight="600" x="335" y="355">Durgam Cheruvu</text>
                  {/* Roads */}
                  <g stroke="#e2e8f0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3">
                    <line x1="40" x2="1160" y1="120" y2="120" />
                    <line x1="40" x2="1160" y1="580" y2="580" />
                    <line x1="200" x2="200" y1="20" y2="660" />
                    <line x1="720" x2="720" y1="20" y2="660" />
                    <line x1="1020" x2="1020" y1="20" y2="660" />
                    <line x1="100" x2="450" y1="620" y2="280" />
                    <line x1="450" x2="800" y1="280" y2="120" />
                    <line x1="720" x2="1100" y1="460" y2="380" />
                  </g>
                  <g stroke="#cbd5e1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="6">
                    <path d="M60,650 C240,580 320,490 350,380 C390,260 480,180 620,150 C800,110 1020,130 1150,90" />
                    <path d="M120,220 C280,240 450,290 620,380 C780,460 920,480 1140,490" />
                  </g>
                  <g stroke="#ffffff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4">
                    <path d="M60,650 C240,580 320,490 350,380 C390,260 480,180 620,150 C800,110 1020,130 1150,90" />
                    <path d="M120,220 C280,240 450,290 620,380 C780,460 920,480 1140,490" />
                  </g>
                  {/* Route trail */}
                  <path d="M290,510 L380,450 L480,360 L540,360 L620,380 L730,340" fill="none" stroke="#818cf8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.35" strokeWidth="7" />
                  <path className="fp-animate-route-flow" d="M290,510 L380,450 L480,360 L540,360 L620,380 L730,340" fill="none" stroke="url(#fp-route-gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
                  {/* Waypoints */}
                  <circle cx="290" cy="510" fill="#4f46e5" r="4.5" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="380" cy="450" fill="#6366f1" r="3.5" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="480" cy="360" fill="#6366f1" r="3.5" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="620" cy="380" fill="#06b6d4" r="3.5" stroke="#ffffff" strokeWidth="1.5" />
                  {/* Locality labels */}
                  <g fill="#64748b" fontFamily="system-ui, -apple-system, sans-serif" fontSize="11" fontWeight="700" letterSpacing="0.05em">
                    <text x="240" y="270">HITEC CITY</text>
                    <text x="140" y="380">GACHIBOWLI</text>
                    <text x="440" y="200">JUBILEE HILLS</text>
                    <text x="590" y="440">BANJARA HILLS</text>
                    <text x="890" y="110">SECUNDERABAD</text>
                    <text x="960" y="440">BEGUMPET</text>
                    <text x="700" y="580">MEHDIPATNAM</text>
                  </g>
                  <text fill="#94a3b8" fontFamily="monospace" fontSize="14" letterSpacing="0.15em" textAnchor="middle" x="600" y="425">Hyderabad field map</text>
                  {/* Agent dots */}
                  <circle className="fp-animate-radar" cx="730" cy="340" fill="#6366f1" fillOpacity="0.25" r="22" />
                  <circle cx="730" cy="340" fill="#4f46e5" r="10" stroke="#ffffff" strokeWidth="3" />
                  <circle cx="730" cy="340" fill="#ffffff" r="3.5" />
                  <circle cx="480" cy="360" fill="#6366f1" fillOpacity="0.18" r="14" />
                  <circle cx="480" cy="360" fill="#4338ca" r="7" stroke="#ffffff" strokeWidth="2.5" />
                  <circle cx="820" cy="330" fill="#6366f1" fillOpacity="0.2" r="12" />
                  <circle cx="820" cy="330" fill="#4338ca" r="6.5" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="825" cy="180" fill="#4338ca" r="5" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx="348" cy="510" fill="#6366f1" fillOpacity="0.15" r="14" />
                  <circle cx="348" cy="510" fill="#4338ca" r="6.5" stroke="#ffffff" strokeWidth="2" />
                </svg>

                {/* Vikram K. floating badge */}
                <div style={{
                  position: 'absolute', top: '41%', left: '60%',
                  transform: 'translate(-50%, -100%)', cursor: 'pointer'
                }}>
                  <div className="fp-shadow-xl" style={{
                    background: '#0f172a', color: '#ffffff', padding: '6px 12px',
                    borderRadius: '12px', border: '1px solid #334155',
                    display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' as const
                  }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: '24px', height: '24px', borderRadius: '50%', background: '#6366f1',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '10px', color: '#ffffff',
                        boxShadow: '0 0 0 2px #a5b4fc'
                      }}>VK</div>
                      <span style={{
                        position: 'absolute', bottom: '-2px', right: '-2px',
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: '#22c55e', boxShadow: '0 0 0 2px #0f172a'
                      }} />
                    </div>
                    <div style={{ textAlign: 'left' as const }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.2, display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Vikram K.
                        <span style={{
                          fontSize: '10px', background: 'rgba(49,46,129,0.9)', color: '#a5b4fc',
                          padding: '1px 6px', borderRadius: '4px',
                          fontFamily: "'SF Mono', Menlo, monospace", fontWeight: 500
                        }}>38 km/h</span>
                      </div>
                      <div style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>
                        HVAC Diagnostics • Cyber Gateway
                      </div>
                    </div>
                  </div>
                  <div style={{
                    width: '10px', height: '10px', background: '#0f172a',
                    transform: 'rotate(45deg)', margin: '-5px auto 0',
                    borderRight: '1px solid #334155', borderBottom: '1px solid #334155'
                  }} />
                </div>

                {/* Ananya S. floating badge */}
                <div style={{
                  position: 'absolute', top: '32%', left: '39%',
                  transform: 'translate(-50%, -100%)', cursor: 'pointer'
                }}>
                  <div className="fp-shadow-md" style={{
                    background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)',
                    color: '#1e293b', padding: '6px 10px', borderRadius: '12px',
                    border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px'
                  }}>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%', background: '#16a34a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '9px', color: '#ffffff', fontWeight: 700
                    }}>AS</div>
                    <div style={{ textAlign: 'left' as const, lineHeight: 1.2 }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a', display: 'block' }}>Ananya S.</span>
                      <span style={{ fontSize: '9px', color: '#16a34a', fontWeight: 600 }}>● Client Visit (32m)</span>
                    </div>
                  </div>
                  <div style={{
                    width: '8px', height: '8px', background: '#ffffff',
                    transform: 'rotate(45deg)', margin: '-4px auto 0',
                    borderRight: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0'
                  }} />
                </div>

                {/* Telemetry HUD */}
                <aside className="fp-glass-hud fp-shadow-float" style={{
                  position: 'absolute', bottom: '20px', left: '20px', width: '384px',
                  maxWidth: 'calc(100% - 40px)', borderRadius: '16px',
                  border: '1px solid rgba(226,232,240,0.9)', padding: '20px'
                }}>
                  {/* Header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    paddingBottom: '12px', borderBottom: '1px solid #f1f5f9', marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="fp-shadow-sm" style={{
                        width: '40px', height: '40px', borderRadius: '12px',
                        background: 'linear-gradient(135deg, #4f46e5, #0ea5e9)',
                        color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '14px'
                      }}>VK</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px' }}>Vikram Kapoor</h3>
                          <span style={{
                            fontSize: '10px', fontFamily: "'SF Mono', Menlo, monospace",
                            padding: '2px 6px', borderRadius: '4px',
                            background: '#f1f5f9', color: '#475569', border: '1px solid #e2e8f0'
                          }}>#FP-104</span>
                        </div>
                        <p style={{
                          fontSize: '12px', color: '#16a34a', fontWeight: 500,
                          display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px'
                        }}>
                          <span className="fp-animate-pulse" style={{
                            width: '6px', height: '6px', borderRadius: '50%',
                            background: '#22c55e', display: 'inline-block'
                          }} />
                          En Route to Cyber Gateway Bldg 3
                        </p>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '12px', fontWeight: 700, color: '#4f46e5',
                      background: '#eef2ff', border: '1px solid #e0e7ff',
                      padding: '4px 8px', borderRadius: '8px'
                    }}>On Schedule</span>
                  </div>
                  {/* Stats grid */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px',
                    padding: '8px 10px', marginBottom: '12px',
                    background: 'rgba(248,250,252,0.8)', borderRadius: '12px',
                    textAlign: 'center' as const, border: '1px solid #f1f5f9'
                  }}>
                    <div>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#94a3b8', display: 'block' }}>Speed</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>38 km/h</span>
                    </div>
                    <div style={{ borderLeft: '1px solid #e2e8f0', borderRight: '1px solid #e2e8f0' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#94a3b8', display: 'block' }}>Battery</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>86% ⚡</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase' as const, fontWeight: 700, color: '#94a3b8', display: 'block' }}>Signal</span>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#4f46e5' }}>5G High</span>
                    </div>
                  </div>
                  {/* ETA */}
                  <div style={{ fontSize: '12px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#475569' }}>
                      <span style={{ color: '#64748b' }}>Next Destination ETA:</span>
                      <span style={{ fontWeight: 700, color: '#1e293b' }}>11:45 AM (1.8 km)</span>
                    </div>
                    <div style={{ width: '100%', background: '#e2e8f0', borderRadius: '9999px', height: '6px', overflow: 'hidden', margin: '8px 0' }}>
                      <div style={{ background: '#4f46e5', height: '6px', borderRadius: '9999px', width: '78%' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8', paddingTop: '4px' }}>
                      <span>Departed Hub: 11:15 AM</span>
                      <span>Distance covered: 6.4 km</span>
                    </div>
                  </div>
                </aside>

                {/* Map controls */}
                <nav style={{ position: 'absolute', top: '20px', right: '20px', display: 'flex', flexDirection: 'column' as const, gap: '8px' }}>
                  <div className="fp-glass-hud" style={{
                    display: 'flex', borderRadius: '12px', border: '1px solid #e2e8f0',
                    padding: '2px', fontSize: '12px', fontWeight: 600, overflow: 'hidden'
                  }}>
                    <button style={{ padding: '6px 12px', background: '#4f46e5', color: '#ffffff', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Map</button>
                    <button style={{ padding: '6px 12px', color: '#475569', background: 'transparent', border: 'none', cursor: 'pointer' }}>Satellite</button>
                  </div>
                  <div className="fp-glass-hud" style={{
                    borderRadius: '12px', border: '1px solid #e2e8f0',
                    display: 'flex', flexDirection: 'column' as const, overflow: 'hidden'
                  }}>
                    <button style={{ padding: '8px', color: '#475569', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </button>
                    <button style={{ padding: '8px', color: '#475569', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M20 12H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                    </button>
                    <button style={{ padding: '8px', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="7" strokeWidth="2" />
                        <circle cx="12" cy="12" fill="currentColor" r="2" />
                        <path d="M12 2v3m0 14v3M2 12h3m14 0h3" strokeLinecap="round" strokeWidth="2" />
                      </svg>
                    </button>
                  </div>
                  <button className="fp-glass-hud" style={{
                    padding: '8px', borderRadius: '12px', border: '1px solid #e2e8f0',
                    color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    alignSelf: 'flex-end', background: 'transparent', cursor: 'pointer'
                  }}>
                    <svg style={{ width: '20px', height: '20px' }} fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="6" r="3" />
                      <path d="M14 9h-4a2 2 0 00-2 2v5h2v6h4v-6h2v-5a2 2 0 00-2-2z" />
                    </svg>
                  </button>
                </nav>
              </div>

              {/* ── SLIDE 2: GEOFENCE ALERTS ── */}
              <div id="slide-2" style={{
                position: 'absolute', inset: 0, padding: '24px',
                transition: 'opacity 0.5s', opacity: isActive(2) ? 1 : 0,
                pointerEvents: isActive(2) ? 'auto' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div className="fp-shadow-lg" style={{
                  maxWidth: '896px', width: '100%', background: '#ffffff',
                  borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px 32px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ padding: '10px', borderRadius: '12px', background: '#fffbeb', color: '#d97706', border: '1px solid #fde68a' }}>
                        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
                      </span>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Active Geofence Boundaries &amp; Route Deviations</h3>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>Autonomous alerting triggered when field reps breach assigned territory fences.</p>
                      </div>
                    </div>
                    <span className="fp-animate-pulse" style={{ fontSize: '12px', fontWeight: 700, color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', padding: '4px 12px', borderRadius: '9999px' }}>2 Critical Alerts</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '12px' }}>
                    {/* Alert 1 */}
                    <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #fde68a', background: 'rgba(255,251,235,0.5)', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '280px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', marginTop: '6px', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' as const }}>
                            Rohit Varma #FP-112 • Late Punch-In (+28 min)
                            <span style={{ fontSize: '10px', fontWeight: 600, background: '#fef3c7', color: '#92400e', padding: '2px 8px', borderRadius: '4px' }}>Toli Chowki Sector 4</span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Heavy congestion along Mehdipatnam flyover. Expected check-in adjusted to 12:05 PM.</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <button className="fp-shadow-2xs" style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600, borderRadius: '8px', color: '#334155', cursor: 'pointer' }}>Reassign Ticket</button>
                        <button className="fp-shadow-2xs" style={{ padding: '6px 12px', background: '#d97706', color: '#ffffff', fontSize: '12px', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Acknowledge</button>
                      </div>
                    </div>
                    {/* Alert 2 */}
                    <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #fecaca', background: 'rgba(254,242,242,0.5)', display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, minWidth: '280px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', marginTop: '6px', flexShrink: 0 }} />
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' as const }}>
                            Suresh Nair #FP-087 • Geofence Breach (Sector Out-of-Bounds)
                            <span style={{ fontSize: '10px', fontWeight: 600, background: '#fee2e2', color: '#991b1b', padding: '2px 8px', borderRadius: '4px' }}>Jubilee Enclave</span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#475569', marginTop: '2px' }}>Vehicle tracked 2.4 km outside designated servicing polygon for 18 consecutive minutes.</p>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <button className="fp-shadow-2xs" style={{ padding: '6px 12px', background: '#ffffff', border: '1px solid #cbd5e1', fontSize: '12px', fontWeight: 600, borderRadius: '8px', color: '#334155', cursor: 'pointer' }}>Ping Agent</button>
                        <button className="fp-shadow-2xs" style={{ padding: '6px 12px', background: '#dc2626', color: '#ffffff', fontSize: '12px', fontWeight: 600, borderRadius: '8px', border: 'none', cursor: 'pointer' }}>Open Audit</button>
                      </div>
                    </div>
                    {/* Compliant */}
                    <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: 'rgba(248,250,252,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1e293b' }}>Cyberabad Zone 1 &amp; 2 Geofences</span>
                          <p style={{ fontSize: '12px', color: '#64748b' }}>22 agents currently operating strictly within assigned borders.</p>
                        </div>
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d', background: 'rgba(220,252,231,0.7)', padding: '4px 10px', borderRadius: '8px' }}>All Compliant</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── SLIDE 3: ROUTE REPLAY ── */}
              <div id="slide-3" style={{
                position: 'absolute', inset: 0, padding: '24px',
                transition: 'opacity 0.5s', opacity: isActive(3) ? 1 : 0,
                pointerEvents: isActive(3) ? 'auto' : 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <div className="fp-shadow-lg" style={{
                  maxWidth: '896px', width: '100%', background: '#ffffff',
                  borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px 32px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ padding: '10px', borderRadius: '12px', background: '#eef2ff', color: '#4f46e5', border: '1px solid #c7d2fe' }}>
                        <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                        </svg>
                      </span>
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Historical Route Replay &amp; Idle Halt Analysis</h3>
                        <p style={{ fontSize: '12px', color: '#64748b' }}>Inspect full timeline breadcrumbs, stoppage durations, and fuel economy efficiency.</p>
                      </div>
                    </div>
                    <span style={{ fontSize: '12px', fontFamily: "'SF Mono', Menlo, monospace", color: '#64748b' }}>Replay Speed: 4x</span>
                  </div>
                  {/* Scrubber */}
                  <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '8px' }}>
                      <span>08:30 AM (Punch In)</span>
                      <span style={{ color: '#4f46e5', fontWeight: 700 }}>11:42 AM (Current Position)</span>
                      <span>06:00 PM (Shift End)</span>
                    </div>
                    <div style={{ position: 'relative', width: '100%', height: '12px', background: '#e2e8f0', borderRadius: '9999px', cursor: 'pointer' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, height: '12px', background: '#4f46e5', borderRadius: '9999px', width: '55%' }} />
                      <div className="fp-shadow-md" style={{
                        position: 'absolute', top: '50%', transform: 'translateY(-50%)',
                        width: '20px', height: '20px', background: '#ffffff',
                        border: '2px solid #4f46e5', borderRadius: '50%', left: '54%'
                      }} />
                    </div>
                  </div>
                  {/* Analytics */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block' }}>Total Idle Time</span>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px', display: 'block' }}>34 mins</span>
                      <span style={{ fontSize: '11px', color: '#16a34a', fontWeight: 500 }}>18% below city average</span>
                    </div>
                    <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block' }}>Client Visits Completed</span>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#4f46e5', marginTop: '4px', display: 'block' }}>4 Sites</span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Average 42m on-premise</span>
                    </div>
                    <div style={{ padding: '14px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px' }}>
                      <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500, display: 'block' }}>Total Kilometers</span>
                      <span style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', marginTop: '4px', display: 'block' }}>46.8 km</span>
                      <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 500 }}>Estimated fuel: ₹340</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel arrows */}
              <button onClick={() => navigateSlide(-1)} className="fp-glass-hud fp-shadow-md" style={{
                position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)',
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid #e2e8f0', color: '#334155',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 20, transition: 'all 0.2s'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
              </button>
              <button onClick={() => navigateSlide(1)} className="fp-glass-hud fp-shadow-md" style={{
                position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                width: '44px', height: '44px', borderRadius: '50%',
                border: '1px solid #e2e8f0', color: '#334155',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', zIndex: 20, transition: 'all 0.2s'
              }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" /></svg>
              </button>
            </div>

            {/* ── Carousel Footer ── */}
            <footer style={{
              padding: '16px 24px', background: '#ffffff', borderTop: '1px solid #e2e8f0',
              display: 'flex', flexWrap: 'wrap' as const, alignItems: 'center', justifyContent: 'space-between', gap: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>Showcase Slide:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {[1, 2, 3].map(i => (
                    <button key={i} onClick={() => switchSlide(i)} style={{
                      width: isActive(i) ? '28px' : '8px', height: '8px',
                      borderRadius: '9999px', border: 'none', cursor: 'pointer',
                      background: isActive(i) ? '#4f46e5' : '#cbd5e1',
                      transition: 'all 0.3s'
                    }} />
                  ))}
                </div>
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#475569', marginLeft: '8px' }}>
                  {SLIDE_TITLES[currentSlide - 1]}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '12px', fontWeight: 500, color: '#64748b' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <svg style={{ width: '16px', height: '16px', color: '#22c55e' }} fill="currentColor" viewBox="0 0 20 20">
                    <path clipRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" fillRule="evenodd" />
                  </svg>
                  Sub-second GPS Accuracy
                </span>
                <span style={{ color: '#cbd5e1' }}>|</span>
                <span>Auto-refresh active</span>
              </div>
            </footer>
          </section>

          {/* ═══════════════════════════════════════════════════
              SECTION 3: FEATURE VALUE PROPS
              ═══════════════════════════════════════════════════ */}
          <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
            <div className="fp-shadow-xs" style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#eef2ff', color: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Instant Fleet Dispatching</h3>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>Auto-allocate emergent service tickets to the nearest rep with verified spare inventory.</p>
            </div>
            <div className="fp-shadow-xs" style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#ecfdf5', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Tamper-Proof Geofencing</h3>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>Eliminates proxy punch-ins and mock location apps with cryptographic device-level handshakes.</p>
            </div>
            <div className="fp-shadow-xs" style={{ background: '#ffffff', padding: '20px', borderRadius: '16px', border: '1px solid rgba(226,232,240,0.8)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#f0f9ff', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
              </div>
              <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '4px' }}>Fuel &amp; Route Optimizations</h3>
              <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6 }}>Reduce fleet transit expense by 22% with AI pathfinding avoiding peak Hyderabad congestion zones.</p>
            </div>
          </section>

        </main>
      </div>
    </>
  );
}
