import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { RotateCcw } from 'lucide-react';

export default function TinhLaiDon() {
  const [principal, setPrincipal] = useState(20000000);
  const [rate, setRate] = useState('6');
  const [timeValue, setTimeValue] = useState('6');
  const [timeUnit, setTimeUnit] = useState('months'); // 'days', 'months', 'years'

  const P = typeof principal === 'number' ? principal : parseFloat(principal) || 0;
  const R = (parseFloat(rate) || 0) / 100;
  const T_val = parseFloat(timeValue) || 0;

  let T_years = T_val;
  if (timeUnit === 'months') T_years = T_val / 12;
  if (timeUnit === 'days') T_years = T_val / 365;

  const interest = P * R * T_years;
  const total = P + interest;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <NumberInput
            label="Số tiền gốc (VNĐ)"
            value={principal}
            onChange={(num) => setPrincipal(num)}
            placeholder="Ví dụ: 20.000.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Lãi suất (% / năm)
          </label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Thời hạn
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="number"
              value={timeValue}
              onChange={(e) => setTimeValue(e.target.value)}
              style={{ flex: 1 }}
            />
            <select
              value={timeUnit}
              onChange={(e) => setTimeUnit(e.target.value)}
              style={{ width: '100px' }}
            >
              <option value="days">Ngày</option>
              <option value="months">Tháng</option>
              <option value="years">Năm</option>
            </select>
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tiền lãi nhận được</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.25rem' }}>
            +{Math.round(interest).toLocaleString('vi-VN')} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Tổng tiền nhận về (Gốc + Lãi)</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {Math.round(total).toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`${Math.round(total).toLocaleString('vi-VN')} VNĐ`} label="Sao chép tổng số tiền" />
      </div>
    </div>
  );
}
