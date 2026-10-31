import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { RotateCcw } from 'lucide-react';

export default function TinhVAT() {
  const [amount, setAmount] = useState(1000000);
  const [vatRate, setVatRate] = useState('10');
  const [mode, setMode] = useState('pre'); // 'pre' = Chưa có VAT, 'post' = Đã có VAT

  const numAmount = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const rate = parseFloat(vatRate) || 0;

  let basePrice = 0;
  let vatAmount = 0;
  let totalPrice = 0;

  if (mode === 'pre') {
    // Giá chưa VAT
    basePrice = numAmount;
    vatAmount = (basePrice * rate) / 100;
    totalPrice = basePrice + vatAmount;
  } else {
    // Giá đã gồm VAT
    totalPrice = numAmount;
    basePrice = totalPrice / (1 + rate / 100);
    vatAmount = totalPrice - basePrice;
  }

  const handleReset = () => {
    setAmount(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMode('pre')}
          className={`btn ${mode === 'pre' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Nhập giá CHƯA gồm thuế VAT
        </button>
        <button
          type="button"
          onClick={() => setMode('post')}
          className={`btn ${mode === 'post' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Nhập giá ĐÃ bao gồm thuế VAT
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <NumberInput
            label={mode === 'pre' ? 'Giá trước thuế (VNĐ)' : 'Tổng tiền sau thuế (VNĐ)'}
            value={amount}
            onChange={(num) => setAmount(num)}
            placeholder="Ví dụ: 1.000.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Mức thuế suất VAT (%)
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['8', '10', '5'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setVatRate(r)}
                className={`btn ${vatRate === r ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                style={{ flex: 1 }}
              >
                {r}%
              </button>
            ))}
            <input
              type="number"
              value={vatRate}
              onChange={(e) => setVatRate(e.target.value)}
              style={{ width: '80px', padding: '0.4rem 0.6rem' }}
              placeholder="Tùy chỉnh"
            />
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Giá trước thuế (Gốc)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {Math.round(basePrice).toLocaleString('vi-VN')} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--warning)', fontWeight: 600 }}>Tiền thuế VAT ({rate}%)</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--warning)', marginTop: '0.25rem' }}>
            {Math.round(vatAmount).toLocaleString('vi-VN')} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Tổng tiền thanh toán</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {Math.round(totalPrice).toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <CopyButton text={`${Math.round(totalPrice).toLocaleString('vi-VN')} VNĐ`} label="Sao chép tổng tiền" />
        <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
          <RotateCcw size={14} /> Xóa dữ liệu
        </button>
      </div>
    </div>
  );
}
