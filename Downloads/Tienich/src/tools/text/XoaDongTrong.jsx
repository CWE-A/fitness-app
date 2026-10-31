import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function XoaDongTrong() {
  const [input, setInput] = useState(`Mục 1: Cài đặt môi trường

Mục 2: Xây dựng giao diện


Mục 3: Tối ưu SEO


Mục 4: Hoàn thiện sản phẩm`);

  const output = input
    .split(/\r?\n/)
    .filter(line => line.trim().length > 0)
    .join('\n');

  const beforeLines = input.split(/\r?\n/).length;
  const afterLines = output ? output.split('\n').length : 0;
  const removedCount = Math.max(0, beforeLines - afterLines);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Văn bản gốc ({beforeLines} dòng)
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
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dán danh sách có nhiều dòng trống thừa..."
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              Kết quả ({afterLines} dòng - Đã xóa {removedCount} dòng trống)
            </label>
            <CopyButton text={output} label="Sao chép" />
          </div>
          <textarea
            rows={10}
            value={output}
            readOnly
            style={{ background: 'var(--bg-muted)' }}
          />
        </div>
      </div>
    </div>
  );
}
