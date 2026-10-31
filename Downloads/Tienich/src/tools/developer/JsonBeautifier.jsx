import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, Sparkles } from 'lucide-react';

export default function JsonBeautifier() {
  const [input, setInput] = useState(`{"site":"TiệnÍch","rating":5,"active":true,"tags":["tools","vietnam"],"meta":null}`);

  // Hàm chuyển đổi JSON sang HTML có highlight màu sắc an toàn
  const syntaxHighlight = (jsonStr) => {
    try {
      const obj = JSON.parse(jsonStr);
      const str = JSON.stringify(obj, null, 2);
      const escaped = str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return escaped.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        (match) => {
          let color = '#3b82f6'; // number - blue
          if (/^"/.test(match)) {
            if (/:$/.test(match)) {
              color = '#8b5cf6'; // key - purple
            } else {
              color = '#10b981'; // string - green
            }
          } else if (/true|false/.test(match)) {
            color = '#f59e0b'; // boolean - amber
          } else if (/null/.test(match)) {
            color = '#ef4444'; // null - red
          }
          return `<span style="color: ${color}; font-weight: 600;">${match}</span>`;
        }
      );
    } catch {
      return null;
    }
  };

  const highlighted = syntaxHighlight(input);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Nhập JSON
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
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dán JSON..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              Bản xem trước có màu sắc cú pháp
            </label>
            <CopyButton text={input} label="Sao chép" />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              background: 'var(--bg-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '1rem',
              height: '280px',
              overflow: 'auto',
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6
            }}
          >
            {highlighted ? (
              <div dangerouslySetInnerHTML={{ __html: highlighted }} />
            ) : (
              <span style={{ color: 'var(--danger)' }}>Chuỗi JSON bị lỗi cú pháp, vui lòng kiểm tra lại.</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        <span><strong style={{ color: '#8b5cf6' }}>■</strong> Tên khóa (Key)</span>
        <span><strong style={{ color: '#10b981' }}>■</strong> Chuỗi (String)</span>
        <span><strong style={{ color: '#3b82f6' }}>■</strong> Số (Number)</span>
        <span><strong style={{ color: '#f59e0b' }}>■</strong> Boolean</span>
        <span><strong style={{ color: '#ef4444' }}>■</strong> Null</span>
      </div>
    </div>
  );
}
