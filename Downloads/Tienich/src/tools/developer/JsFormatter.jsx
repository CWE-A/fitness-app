import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function JsFormatter() {
  const [input, setInput] = useState(`function calculateTotal(items){let total=0;for(let i=0;i<items.length;i++){total+=items[i].price*items[i].qty;}return total;}`);

  // Thuật toán format JS căn bản
  const formatJs = (code) => {
    if (!code.trim()) return '';
    let formatted = '';
    let indent = 0;
    const pad = '  ';

    // Xử lý cơ bản dấu { } ;
    const lines = code
      .replace(/([\{\}])/g, '\n$1\n')
      .replace(/;/g, ';\n')
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    lines.forEach((line) => {
      if (line === '}' || line.startsWith('}')) {
        indent = Math.max(0, indent - 1);
      }
      formatted += pad.repeat(indent) + line + '\n';
      if (line === '{' || line.endsWith('{')) {
        indent++;
      }
    });

    return formatted.trim();
  };

  const output = formatJs(input);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Căn chỉnh thụt lề câu lệnh, dấu ngoặc và cấu trúc mã nguồn JS.
        </span>
        <button
          type="button"
          onClick={() => setInput('')}
          className="btn btn-secondary btn-sm"
        >
          <RotateCcw size={14} /> Xóa
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Code JavaScript thô
          </label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dán code JavaScript vào đây..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              Code JavaScript đã thụt lề
            </label>
            <CopyButton text={output} label="Sao chép" />
          </div>
          <textarea
            rows={12}
            value={output}
            readOnly
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-muted)' }}
          />
        </div>
      </div>
    </div>
  );
}
