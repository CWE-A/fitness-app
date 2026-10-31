import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw, KeyRound } from 'lucide-react';

export default function UuidTool() {
  const [quantity, setQuantity] = useState('5');
  const [uppercase, setUppercase] = useState(false);
  const [removeHyphens, setRemoveHyphens] = useState(false);

  const generateSingleUuid = () => {
    // Chuẩn crypto.randomUUID()
    let id = '';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      id = crypto.randomUUID();
    } else {
      id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (removeHyphens) id = id.replace(/-/g, '');
    if (uppercase) id = id.toUpperCase();
    return id;
  };

  const generateList = () => {
    const q = Math.min(100, Math.max(1, parseInt(quantity) || 1));
    const list = [];
    for (let i = 0; i < q; i++) {
      list.push(generateSingleUuid());
    }
    return list;
  };

  const [uuids, setUuids] = useState(generateList);

  const handleRegenerate = () => {
    setUuids(generateList());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Số lượng mã muốn tạo
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button
          type="button"
          onClick={handleRegenerate}
          className="btn btn-primary"
          style={{ height: '42px' }}
        >
          <RefreshCw size={16} /> Tạo mã mới
        </button>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={uppercase}
            onChange={(e) => { setUppercase(e.target.checked); }}
            style={{ width: 'auto' }}
          />
          <span>Chữ in hoa (UPPERCASE)</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={removeHyphens}
            onChange={(e) => { setRemoveHyphens(e.target.checked); }}
            style={{ width: 'auto' }}
          />
          <span>Bỏ dấu gạch ngang (-)</span>
        </label>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Danh sách UUID ({uuids.length} mã)
          </label>
          <CopyButton text={uuids.join('\n')} label="Sao chép toàn bộ danh sách" />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {uuids.map((id, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1rem',
                background: 'var(--bg-muted)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem'
              }}
            >
              <span>{id}</span>
              <CopyButton text={id} label="Chép" size="sm" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
