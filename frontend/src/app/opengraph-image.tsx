import { ImageResponse } from 'next/og';

export const alt = 'Leo Multiple District 317 — Beyond Boundaries';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '72px', color: '#f8fafc', background: 'radial-gradient(circle at 78% 20%, #5c4510 0%, transparent 26%), linear-gradient(135deg, #030714 0%, #071426 56%, #0a1e35 100%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', color: '#ead27a', fontSize: 28, fontWeight: 700, letterSpacing: 7 }}>
          LEO MD 317
        </div>
        <div style={{ display: 'flex', marginTop: 32, fontFamily: 'serif', fontSize: 88, fontWeight: 700, lineHeight: 1 }}>
          BEYOND
        </div>
        <div style={{ display: 'flex', fontFamily: 'serif', fontSize: 88, fontWeight: 700, lineHeight: 1, color: '#d4af37' }}>
          BOUNDARIES
        </div>
        <div style={{ display: 'flex', marginTop: 34, maxWidth: 760, fontSize: 28, color: '#cbd5e1', lineHeight: 1.35 }}>
          Youth leadership, community service and measurable impact across Multiple District 317.
        </div>
      </div>
    ),
    size,
  );
}
