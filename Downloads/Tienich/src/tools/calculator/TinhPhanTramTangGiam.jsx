import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

export default function TinhPhanTramTangGiam() {
  const [oldVal, setOldVal] = useState('21000');
  const [newVal, setNewVal] = useState('23500');

  const oldNum = parseFloat(oldVal) || 0;
  const newNum = parseFloat(newVal) || 0;

  const diff = newNum - oldNum;
  const percentChange = oldNum !== 0 ? (diff / oldNum) * 100 : 0;
  const isIncrease = diff >= 0;

  const handleReset = () => {
    setOldVal('');
    setNewVal('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giá trị ban đầu (Cũ)
          </label>
          <input
            type="number"
            value={oldVal}
            onChange={(e) => setOldVal(e.target.value)}
            placeholder="Ví dụ: 21000"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giá trị sau khi đổi (Mới)
          </label>
          <input
            type="number"
            value={newVal}
            onChange={(e) => setNewVal(e.target.value)}
            placeholder="Ví dụ: 23500"
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ height: '42px' }}
        >
          <RotateCcw size={16} />
          <span>Đặt lại</span>
        </button>
      </div>

      <div
        style={{
          background: isIncrease ? 'var(--success-subtle)' : 'var(--danger-subtle)',
          border: `1px solid ${isIncrease ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: isIncrease ? 'var(--success)' : 'var(--danger)', textTransform: 'uppercase' }}>
          {isIncrease ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
          <span>{isIncrease ? 'Tăng trưởng (+)' : 'Suy giảm (-)'}</span>
        </div>

        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: isIncrease ? 'var(--success)' : 'var(--danger)', lineHeight: 1.2 }}>
          {isIncrease ? '+' : ''}{percentChange.toFixed(2)}%
        </div>

        <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Chênh lệch số tuyệt đối: <strong>{diff >= 0 ? '+' : ''}{diff.toLocaleString('vi-VN')}</strong> (từ {oldNum.toLocaleString('vi-VN')} đến {newNum.toLocaleString('vi-VN')})
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <CopyButton text={`${percentChange.toFixed(2)}%`} label="Sao chép kết quả %" />
        </div>
      </div>
    </div>
  );
}
