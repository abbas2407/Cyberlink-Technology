const BRANDS = [
  'HP Enterprise', 'Dell Technologies', 'IBM', 'Lenovo ThinkSystem',
  'Cisco Systems', 'Juniper Networks', 'Fortinet', 'Ubiquiti',
  'NetApp', 'EMC', 'Seagate', 'Western Digital',
  'Mikrotik', 'Aruba Networks', 'Supermicro', 'Intel',
];

export default function Marquee() {
  const doubled = [...BRANDS, ...BRANDS];
  return (
    <section style={{
      background: 'var(--surface-white)',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      padding: '14px 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(90deg, var(--surface-white), transparent)', zIndex: 2, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(270deg, var(--surface-white), transparent)', zIndex: 2, pointerEvents: 'none' }} />

      <div style={{ display: 'flex', animation: 'marquee 28s linear infinite', width: 'max-content' }}>
        {doubled.map((brand, idx) => (
          <div key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '16px', padding: '0 24px', whiteSpace: 'nowrap' }}>
            <span style={{
              fontFamily: 'var(--font)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-muted)',
            }}>
              {brand}
            </span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--border-strong)', flexShrink: 0 }} />
          </div>
        ))}
      </div>
    </section>
  );
}
