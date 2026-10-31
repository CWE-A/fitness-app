import { useState } from 'react';
import * as Diff from 'diff';
import { CopyButton } from '../../components/common/CopyButton';
import { GitCompare, RotateCcw } from 'lucide-react';

export default function SoSanhVanBan() {
  const [text1, setText1] = useState(`Hợp đồng cung cấp dịch vụ trực tuyến.
Điều 1: Thời hạn hợp đồng là 12 tháng kể từ ngày ký.
Điều 2: Mức phí dịch vụ là 500.000 VNĐ mỗi tháng.`);

  const [text2, setText2] = useState(`Hợp đồng cung cấp dịch vụ trực tuyến năm 2025.
Điều 1: Thời hạn hợp đồng là 24 tháng kể từ ngày ký.
Điều 2: Mức phí dịch vụ là 450.000 VNĐ mỗi tháng (đã giảm giá).`);

  const [mode, setMode] = useState('words'); // 'words', 'lines', 'chars'

  let diffResults = [];
  try {
    if (mode === 'words') {
      diffResults = Diff.diffWords(text1, text2);
    } else if (mode === 'lines') {
      diffResults = Diff.diffLines(text1, text2);
    } else {
      diffResults = Diff.diffChars(text1, text2);
    }
  } catch (err) {
    diffResults = [];
  }

  const addedCount = diffResults.filter(p => p.added).length;
  const removedCount = diffResults.filter(p => p.removed).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={() => setMode('words')}
            className={`btn ${mode === 'words' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            So sánh theo Từ
          </button>
          <button
            type="button"
            onClick={() => setMode('lines')}
            className={`btn ${mode === 'lines' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            So sánh theo Dòng
          </button>
          <button
            type="button"
            onClick={() => setMode('chars')}
            className={`btn ${mode === 'chars' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            So sánh theo Ký tự
          </button>
        </div>

        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
          <span style={{ color: 'var(--danger)', fontWeight: 600 }}>• Đỏ: Đã xóa ({removedCount})</span>
          <span style={{ color: 'var(--success)', fontWeight: 600 }}>• Xanh: Đã thêm ({addedCount})</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Văn bản gốc (Bản cũ)
          </label>
          <textarea
            rows={7}
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Dán văn bản gốc..."
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Văn bản sửa đổi (Bản mới)
          </label>
          <textarea
            rows={7}
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Dán văn bản mới..."
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
          Kết quả trực quan so sánh khác biệt (Diff View)
        </label>
        <div
          style={{
            background: 'var(--bg-muted)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            lineHeight: 1.8,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            minHeight: '120px'
          }}
        >
          {diffResults.map((part, index) => {
            const color = part.added ? '#15803d' : part.removed ? '#b91c1c' : 'inherit';
            const bg = part.added ? 'rgba(34, 197, 94, 0.2)' : part.removed ? 'rgba(239, 68, 68, 0.2)' : 'transparent';
            const textDecoration = part.removed ? 'line-through' : 'none';

            return (
              <span
                key={index}
                style={{
                  color,
                  backgroundColor: bg,
                  textDecoration,
                  padding: part.added || part.removed ? '0.1rem 0.25rem' : '0',
                  borderRadius: '3px'
                }}
              >
                {part.value}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
