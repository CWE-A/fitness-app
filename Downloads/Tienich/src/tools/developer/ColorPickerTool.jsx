import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Palette, RefreshCw } from 'lucide-react';

export default function ColorPickerTool() {
  const [color, setColor] = useState('#2563eb');

  // Quy đổi HEX sang RGB
  const hexToRgb = (hex) => {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    if (isNaN(num) || cleanHex.length !== 6) return { r: 37, g: 99, b: 235 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  };

  const rgb = hexToRgb(color);

  // RGB sang HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  const hexCode = color.toUpperCase();
  const rgbCode = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslCode = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;

  const PRESETS = [
    '#2563EB', '#3B82F6', '#06B6D4', '#10B981', '#F59E0B', 
    '#EF4444', '#EC4899', '#8B5CF6', '#6366F1', '#1E293B'
  ];

  const randomColor = () => {
    const letters = '0123456789ABCDEF';
    let c = '#';
    for (let i = 0; i < 6; i++) {
      c += letters[Math.floor(Math.random() * 16)];
    }
    setColor(c);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Visual Color Preview & Picker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
        <div
          style={{
            height: '180px',
            borderRadius: 'var(--radius-lg)',
            backgroundColor: color,
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.25rem',
            color: hsl.l > 60 ? '#0f172a' : '#ffffff',
            transition: 'background-color 0.15s ease'
          }}
        >
          <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            {hexCode}
          </div>
          <div style={{ fontSize: '0.88rem', opacity: 0.9 }}>
            {rgbCode}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Chọn màu trực quan
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ width: '60px', height: '44px', padding: '2px', cursor: 'pointer' }}
              />
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}
              />
              <button
                type="button"
                onClick={randomColor}
                className="btn btn-secondary btn-sm"
                title="Chọn màu ngẫu nhiên"
                style={{ height: '42px' }}
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Màu phổ biến
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {PRESETS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setColor(p)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: p,
                    border: color.toUpperCase() === p ? '3px solid #fff' : '1px solid rgba(0,0,0,0.1)',
                    boxShadow: color.toUpperCase() === p ? '0 0 0 2px var(--primary)' : 'none',
                    cursor: 'pointer'
                  }}
                  title={p}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code Formats Table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {[
          { label: 'HEX', code: hexCode },
          { label: 'RGB', code: rgbCode },
          { label: 'HSL', code: hslCode },
          { label: 'CSS Background', code: `background-color: ${hexCode};` }
        ].map((item) => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              gap: '1rem'
            }}
          >
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginRight: '0.75rem' }}>
                {item.label}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '0.95rem' }}>
                {item.code}
              </span>
            </div>
            <CopyButton text={item.code} label="Sao chép" size="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
