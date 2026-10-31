import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { HardDrive } from 'lucide-react';

export default function ByteConverter() {
  const [val, setVal] = useState('16');
  const [unit, setUnit] = useState('GB');
  const [standard, setStandard] = useState('1024'); // '1024' (Binary GiB) hoặc '1000' (Decimal GB)

  const num = parseFloat(val) || 0;
  const base = parseInt(standard);

  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  const unitPower = UNITS.indexOf(unit);

  const bytes = num * Math.pow(base, unitPower);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Dung lượng đầu vào
          </label>
          <input
            type="number"
            value={val}
            onChange={(e) => setVal(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Đơn vị gốc
          </label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            {UNITS.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Chuẩn quy đổi
          </label>
          <select value={standard} onChange={(e) => setStandard(e.target.value)}>
            <option value="1024">Hệ điều hành / Máy tính (1024)</option>
            <option value="1000">Nhà sản xuất ổ cứng (1000)</option>
          </select>
        </div>
      </div>

      {/* Grid all units */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
        {UNITS.map((u, i) => {
          const converted = bytes / Math.pow(base, i);
          const isSelected = u === unit;

          return (
            <div
              key={u}
              className="card"
              style={{
                padding: '1.25rem',
                border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-surface)'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{u}</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: isSelected ? 'var(--primary)' : 'var(--text-primary)', marginTop: '0.25rem', wordBreak: 'break-all' }}>
                {converted < 0.000001 && converted > 0 ? converted.toExponential(4) : converted.toLocaleString('vi-VN', { maximumFractionDigits: 4 })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
