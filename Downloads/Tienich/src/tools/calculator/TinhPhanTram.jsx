import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { RotateCcw, ArrowRight } from 'lucide-react';

export default function TinhPhanTram() {
  const [valX, setValX] = useState('15');
  const [valY, setValY] = useState(2500000);
  const [mode, setMode] = useState('mode1'); // mode1: X% của Y | mode2: X là bao nhiêu % của Y

  const numX = parseFloat(valX) || 0;
  const numY = typeof valY === 'number' ? valY : parseFloat(valY) || 0;

  let result = 0;
  let formulaText = '';

  if (mode === 'mode1') {
    result = (numX * numY) / 100;
    formulaText = `${numX}% của ${numY.toLocaleString('vi-VN')} = (${numX} × ${numY.toLocaleString('vi-VN')}) / 100 = ${result.toLocaleString('vi-VN', { maximumFractionDigits: 4 })}`;
  } else {
    result = numY !== 0 ? (numX / numY) * 100 : 0;
    formulaText = `${numX.toLocaleString('vi-VN')} so với ${numY.toLocaleString('vi-VN')} = (${numX.toLocaleString('vi-VN')} / ${numY.toLocaleString('vi-VN')}) × 100 = ${result.toLocaleString('vi-VN', { maximumFractionDigits: 2 })}%`;
  }

  const handleReset = () => {
    setValX('');
    setValY(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Mode Selector */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMode('mode1')}
          className={`btn ${mode === 'mode1' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          X% của Y là bao nhiêu?
        </button>
        <button
          type="button"
          onClick={() => setMode('mode2')}
          className={`btn ${mode === 'mode2' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          X là bao nhiêu % của Y?
        </button>
      </div>

      {/* Input Form */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            {mode === 'mode1' ? 'Tỷ lệ phần trăm (X%)' : 'Giá trị X'}
          </label>
          <input
            type="number"
            value={valX}
            onChange={(e) => setValX(e.target.value)}
            placeholder={mode === 'mode1' ? 'Ví dụ: 15' : 'Ví dụ: 50'}
          />
        </div>

        <div>
          <NumberInput
            label={mode === 'mode1' ? 'Số gốc (Y)' : 'Tổng số (Y)'}
            value={valY}
            onChange={(num) => setValY(num)}
            placeholder="Ví dụ: 2.500.000"
          />
        </div>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary"
          style={{ height: '42px' }}
          title="Đặt lại dữ liệu"
        >
          <RotateCcw size={16} />
          <span>Đặt lại</span>
        </button>
      </div>

      {/* Result Display */}
      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Kết quả tính toán
        </div>
        <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>
          {result.toLocaleString('vi-VN', { maximumFractionDigits: 4 })}
          {mode === 'mode2' && '%'}
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {formulaText}
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <CopyButton text={`${result.toLocaleString('vi-VN', { maximumFractionDigits: 4 })}${mode === 'mode2' ? '%' : ''}`} label="Sao chép kết quả" />
        </div>
      </div>
    </div>
  );
}
