import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { ArrowLeftRight, Coins } from 'lucide-react';

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [fromCurr, setFromCurr] = useState('USD');
  const [toCurr, setToCurr] = useState('VND');

  // Tỷ giá tham khảo (đưa về VND)
  const [rates, setRates] = useState({
    VND: 1,
    USD: 25450,
    EUR: 27500,
    JPY: 165,
    GBP: 33100,
    KRW: 18.5,
    CNY: 3580,
    SGD: 19200
  });

  const num = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  const inVnd = num * (rates[fromCurr] || 1);
  const result = inVnd / (rates[toCurr] || 1);

  const swap = () => {
    const temp = fromCurr;
    setFromCurr(toCurr);
    setToCurr(temp);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'flex-start' }}>
        <div>
          <NumberInput
            label="Số tiền chuyển đổi"
            value={amount}
            onChange={(val) => setAmount(val)}
            placeholder="Ví dụ: 100 hoặc 20.000"
            suffix={fromCurr}
            showWords={fromCurr === 'VND'}
            style={{ marginBottom: '0.5rem' }}
          />
          <select value={fromCurr} onChange={(e) => setFromCurr(e.target.value)}>
            {Object.keys(rates).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swap}
          className="btn btn-secondary"
          style={{ height: '42px', marginBottom: '0.5rem' }}
          title="Đảo chiều tiền tệ"
        >
          <ArrowLeftRight size={18} />
        </button>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giá trị quy đổi
          </label>
          <div style={{ height: '42px', display: 'flex', alignItems: 'center', padding: '0 0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', fontWeight: 800, fontSize: '1.15rem', color: 'var(--primary)', marginBottom: '0.5rem', overflow: 'hidden' }}>
            {result.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}
          </div>
          <select value={toCurr} onChange={(e) => setToCurr(e.target.value)}>
            {Object.keys(rates).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tỷ giá quy đổi ước tính</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
            {num.toLocaleString('vi-VN')} {fromCurr} = {result.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} {toCurr}
          </div>
        </div>

        <CopyButton text={`${num.toLocaleString('vi-VN')} ${fromCurr} = ${result.toLocaleString('vi-VN', { maximumFractionDigits: 2 })} ${toCurr}`} label="Sao chép kết quả" />
      </div>
    </div>
  );
}
