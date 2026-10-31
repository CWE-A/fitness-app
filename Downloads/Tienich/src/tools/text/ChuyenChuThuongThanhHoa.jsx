import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function ChuyenChuThuongThanhHoa() {
  const [input, setInput] = useState('cộng hòa xã hội chủ nghĩa việt nam - độc lập tự do hạnh phúc');

  const output = input.toUpperCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Văn bản gốc
          </label>
          <button
            type="button"
            onClick={() => setInput('')}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} /> Xóa
          </button>
        </div>
        <textarea
          rows={5}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập văn bản cần in hoa..."
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
            Kết quả chữ in hoa (UPPERCASE)
          </label>
          <CopyButton text={output} label="Sao chép" />
        </div>
        <textarea
          rows={5}
          value={output}
          readOnly
          style={{ background: 'var(--bg-muted)', fontWeight: 600 }}
        />
      </div>
    </div>
  );
}
