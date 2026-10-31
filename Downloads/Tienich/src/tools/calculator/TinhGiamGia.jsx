import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { RotateCcw, Tag } from 'lucide-react';

export default function TinhGiamGia() {
  const [originalPrice, setOriginalPrice] = useState(850000);
  const [discountPercent, setDiscountPercent] = useState('30');
  const [extraDiscount, setExtraDiscount] = useState('0');

  const price = typeof originalPrice === 'number' ? originalPrice : parseFloat(originalPrice) || 0;
  const percent = parseFloat(discountPercent) || 0;
  const extra = parseFloat(extraDiscount) || 0;

  const savedFromPercent = (price * percent) / 100;
  const priceAfterPercent = price - savedFromPercent;
  const savedFromExtra = (priceAfterPercent * extra) / 100;
  const finalPrice = Math.max(0, priceAfterPercent - savedFromExtra);
  const totalSaved = price - finalPrice;

  const handleReset = () => {
    setOriginalPrice(0);
    setDiscountPercent('0');
    setExtraDiscount('0');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <NumberInput
            label="Giá gốc (VNĐ)"
            value={originalPrice}
            onChange={(num) => setOriginalPrice(num)}
            placeholder="Ví dụ: 850.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giảm giá (%)
          </label>
          <input
            type="number"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            placeholder="Ví dụ: 30"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giảm thêm (Coupon / Voucher %)
          </label>
          <input
            type="number"
            value={extraDiscount}
            onChange={(e) => setExtraDiscount(e.target.value)}
            placeholder="Ví dụ: 5"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[10, 15, 20, 30, 50, 70].map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setDiscountPercent(p.toString())}
            className={`btn ${discountPercent === p.toString() ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            -{p}%
          </button>
        ))}
        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Đặt lại
        </button>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Giá thực trả (Sau giảm giá)
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>
            {Math.round(finalPrice).toLocaleString('vi-VN')} <span style={{ fontSize: '1.2rem' }}>VNĐ</span>
          </div>
        </div>

        <div style={{ borderLeft: '1px solid var(--border-color)', paddingLeft: '1.5rem' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--success)', textTransform: 'uppercase' }}>
            Bạn tiết kiệm được
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--success)', lineHeight: 1.2 }}>
            {Math.round(totalSaved).toLocaleString('vi-VN')} VNĐ
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Tiết kiệm {price > 0 ? ((totalSaved / price) * 100).toFixed(1) : 0}% so với giá gốc
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`${Math.round(finalPrice).toLocaleString('vi-VN')} VNĐ`} label="Sao chép số tiền thực trả" />
      </div>
    </div>
  );
}
