import { useEffect, useRef, useState } from 'react';

const STATS = [
  {
    n: 500, suffix: '+', label: 'Parts In Stock',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V10"/>
        <path d="M1 6l11-4 11 4M1 6h22M12 2v8"/>
        <polyline points="8 6 12 8 16 6"/>
      </svg>
    ),
  },
  {
    n: 30, suffix: '+', label: 'Trusted Brands',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6"/>
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>
      </svg>
    ),
  },
  {
    n: 24, suffix: 'hr', label: 'Quote Turnaround',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    n: 90, suffix: '-day', label: 'Warranty',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
];

function useCountUp(target: number, duration: number, go: boolean) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!go) return;
    const t0 = performance.now();
    const ease = (x: number) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setV(Math.floor(ease(p) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [go, target, duration]);
  return v;
}

function StatItem({ n, suffix, label, icon, go, idx }: {
  n: number; suffix: string; label: string; icon: React.ReactNode; go: boolean; idx: number;
}) {
  const count = useCountUp(n, 1700, go);
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '44px 20px', flex: 1, cursor: 'default',
        opacity: go ? 1 : 0,
        transform: go ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 0.5s ease ${idx * 100}ms, transform 0.5s ease ${idx * 100}ms`,
      }}
    >
      {/* Icon */}
      <div style={{
        width: '48px', height: '48px',
        background: hov ? 'var(--blue-tint)' : 'var(--surface-low)',
        border: `1px solid ${hov ? 'var(--blue-border)' : 'var(--border)'}`,
        borderRadius: 'var(--r)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: hov ? 'var(--blue)' : 'var(--text-muted)',
        marginBottom: '16px',
        transform: hov ? 'scale(1.1) translateY(-3px)' : 'scale(1) translateY(0)',
        transition: 'all 0.25s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{ width: '22px', height: '22px' }}>{icon}</div>
      </div>

      {/* Number */}
      <div style={{
        fontFamily: 'var(--font)', fontWeight: 800,
        fontSize: 'clamp(38px, 5vw, 54px)',
        color: hov ? 'var(--blue)' : 'var(--text-primary)',
        letterSpacing: '-0.04em', lineHeight: 1,
        marginBottom: '8px',
        transition: 'color 0.25s',
      }}>
        {count}{suffix}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: 'var(--mono)', fontSize: '12px', fontWeight: 500,
        color: 'var(--text-muted)', textTransform: 'uppercase',
        letterSpacing: '0.08em',
      }}>
        {label}
      </div>
    </div>
  );
}

export default function StatsRow() {
  const [go, setGo] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      e => { if (e[0].isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{
      background: 'var(--surface-white)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div className="container">
        <div className="stats-row">
          {STATS.map((s, i) => (
            <div key={i} className="stat-col">
              <StatItem {...s} go={go} idx={i} />
              {i < STATS.length - 1 && (
                <div className="stat-divider" />
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .stats-row {
          display: flex;
          align-items: stretch;
        }
        .stat-col {
          display: flex;
          align-items: stretch;
          flex: 1;
        }
        .stat-divider {
          width: 1px;
          background: var(--border);
          align-self: stretch;
          margin: 24px 0;
        }

        /* ── 2x2 Bento Grid for Mobile ── */
        @media (max-width: 768px) {
          .stats-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
            padding: 24px 0 !important;
          }
          .stat-col {
            background: var(--surface-low);
            border: 1px solid var(--border);
            border-radius: var(--r, 16px);
            box-shadow: var(--shadow-xs);
            transition: all 0.2s ease;
          }
          .stat-col:active {
            transform: scale(0.98);
            border-color: var(--blue-border);
            background: var(--blue-tint);
          }
          .stat-divider {
            display: none !important;
          }
          .stats-row .stat-col > div {
            padding: 20px 14px !important;
            width: 100%;
          }
          .stats-row .stat-col .label-mono,
          .stats-row .stat-col div[style*="font-family: var(--mono)"] {
            font-size: 11px !important;
          }
        }
      `}</style>
    </section>
  );
}
