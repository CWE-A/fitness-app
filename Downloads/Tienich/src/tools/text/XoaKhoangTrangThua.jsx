import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function XoaKhoangTrangThua() {
  const [input, setInput] = useState('   Đây    là     đoạn  văn    bản   có    rất   nhiều    khoảng  trắng   thừa.   ');

  // Gộp nhiều dấu cách thành 1, xóa dấu cách đầu cuối dòng
  const output = input
    .split('\n')
    .map(line => line.trim().replace(/\s+/g, ' '))
    .join('\n');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Văn bản có khoảng trắng thừa
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
          placeholder="Dán văn bản bị thừa khoảng trắng vào đây..."
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
            Kết quả sau khi làm sạch
          </label>
          <CopyButton text={output} label="Sao chép" />
        </div>
        <textarea
          rows={5}
          value={output}
          readOnly
          style={{ background: 'var(--bg-muted)' }}
        />
      </div>
    </div>
  );
}
