import { useEffect, useRef } from 'react';

import prodCpuImg from '../images/prod-cpu.jpg';
import prodSsdImg from '../images/prod-ssd.jpg';
import prodSwitchImg from '../images/prod-switch.png';
import prodMemoryImg from '../images/prod-memory.jpg';

/* Product cards exactly as shown in the reference screenshot */
const PRODUCTS = [
  {
    category: 'PROCESSORS',
    catColor: 'var(--blue)',
    title: 'Intel Xeon Scalable',
    desc: 'Platinum and Gold series optimized for heavy computational workloads.',
    image: prodCpuImg,
  },
  {
    category: 'STORAGE SOLUTIONS',
    catColor: 'var(--blue)',
    title: 'Enterprise SSDs',
    desc: 'High-endurance SAS and NVMe drives from Samsung, Dell, and HP.',
    image: prodSsdImg,
  },
  {
    category: 'NETWORKING',
    catColor: 'var(--blue)',
    title: '100Gb Switches',
    desc: 'Ultra-low latency networking gear for high-bandwidth data centers.',
    image: prodSwitchImg,
  },
  {
    category: 'MEMORY',
    catColor: 'var(--blue)',
    title: 'DDR4/DDR5 ECC',
    desc: 'Error-correcting memory modules for mission-critical reliability.',
    image: prodMemoryImg,
  },
];

function ProductCard({ p, idx }: { p: typeof PRODUCTS[0]; idx: number }) {
  return (
    <div
      className="reveal infra-card"
      style={{
        transitionDelay: `${idx * 70}ms`,
      }}
    >
      {/* Photo */}
      <div className="infra-card-image">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
        />
        {/* Subtle gradient overlay at bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Content */}
      <div className="infra-card-content">
        {/* Category */}
        <span className="infra-card-category">
          {p.category}
        </span>

        {/* Title */}
        <h3 className="infra-card-title">
          {p.title}
        </h3>

        {/* Description */}
        <p className="infra-card-desc">
          {p.desc}
        </p>

        {/* CTA */}
        <button
          className="infra-card-btn"
          onClick={() => window.open('https://wa.me/919391440440', '_blank')}
        >
          Check Availability
        </button>
      </div>
    </div>
  );
}

export default function FeaturedLaptops() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="networking"
      ref={sectionRef}
      style={{ background: 'var(--bg)', padding: '96px 0 80px' }}
    >
      <div className="container">

        {/* ─── Section header ─── */}
        <div className="reveal" style={{ marginBottom: '48px' }}>
          <div>
            {/* Left: headline + sub */}
            <div>
              <h2 style={{
                fontFamily: 'var(--font)',
                fontWeight: 700,
                fontSize: 'clamp(36px, 5vw, 56px)',
                color: 'var(--text-primary)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                marginBottom: '12px',
              }}>
                The Infrastructure<br />Engine.
              </h2>
              <p style={{
                fontFamily: 'var(--font)',
                fontSize: '16px',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}>
                Critical components for enterprise stability and scaling performance.
              </p>
            </div>
          </div>
        </div>

        {/* ─── Product cards grid ─── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
        }} className="product-grid">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={i} p={p} idx={i} />
          ))}
        </div>
      </div>

      <style>{`
        .infra-card {
          position: relative;
          display: flex;
          flex-direction: column;
          border-radius: var(--r-xl, 16px);
          background: var(--surface-white);
          border: 1px solid var(--border);
          overflow: hidden;
          box-shadow: var(--shadow-sm);
          transition: all 0.64s cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
        }

        .infra-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--blue) 0%, #1e18a0 100%);
          border-radius: inherit;
          opacity: 0;
          transform: skew(-24deg);
          clip-path: circle(0% at 50% 50%);
          transition: all 0.64s cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
        }

        .infra-card:hover::before {
          opacity: 1;
          transform: skew(0deg);
          clip-path: circle(140.9% at 0 0);
        }

        .infra-card:hover {
          border-color: var(--blue);
          box-shadow: 0 12px 32px rgba(56, 48, 231, 0.22);
          transform: translateY(-4px);
        }

        .infra-card-image {
          position: relative;
          height: 190px;
          overflow: hidden;
          z-index: 1;
        }

        .infra-card-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.64s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .infra-card:hover .infra-card-image img {
          transform: scale(1.06);
        }

        .infra-card-content {
          position: relative;
          display: flex;
          flex-direction: column;
          flex: 1;
          padding: 20px 20px 22px;
          z-index: 1;
          transition: color 0.64s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .infra-card-category {
          font-family: var(--mono);
          font-size: 11px;
          font-weight: 600;
          color: var(--blue);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
          display: block;
          transition: color 0.64s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .infra-card-title {
          font-family: var(--font);
          font-weight: 700;
          font-size: 18px;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.3;
          margin-bottom: 8px;
          transition: color 0.64s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .infra-card-desc {
          font-family: var(--font);
          font-size: 13.5px;
          color: var(--text-secondary);
          line-height: 1.6;
          flex: 1;
          margin-bottom: 18px;
          transition: color 0.64s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .infra-card-btn {
          width: 100%;
          height: 38px;
          background: var(--surface-white);
          border: 1px solid var(--border);
          border-radius: var(--r);
          font-family: var(--font);
          font-size: 13px;
          font-weight: 500;
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.64s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .infra-card:hover .infra-card-category {
          color: #c7d2fe;
        }

        .infra-card:hover .infra-card-title {
          color: #ffffff;
        }

        .infra-card:hover .infra-card-desc {
          color: rgba(255, 255, 255, 0.88);
        }

        .infra-card:hover .infra-card-btn {
          background: #ffffff;
          color: var(--blue);
          border-color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
        }

        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 768px) {
          #networking {
            padding: 60px 0 50px !important;
          }
        }
        @media (max-width: 520px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          .infra-card-image { height: 160px !important; }
          .infra-card-content { padding: 16px 16px 18px !important; }
          .infra-card-btn { height: 42px !important; }
        }
      `}</style>
    </section>
  );
}

