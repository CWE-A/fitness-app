import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function CssFormatter() {
  const [input, setInput] = useState(`.btn{display:inline-flex;align-items:center;padding:8px 16px;border-radius:6px;background-color:#2563eb;color:#fff;font-weight:600}.btn:hover{background-color:#1d4ed8}`);
  const [mode, setMode] = useState('beautify'); // 'beautify' hoặc 'minify'

  const formatCss = (css, isBeautify) => {
    if (!css.trim()) return '';
    if (isBeautify) {
      // Beautify
      return css
        .replace(/\s*\{\s*/g, ' {\n  ')
        .replace(/\s*;\s*/g, ';\n  ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/\s*\}\s*/g, '\n}\n\n')
        .replace(/\n\s*\n\s*\}/g, '\n}')
        .trim();
    } else {
      // Minify
      return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
        .replace(/\s+/g, ' ')
        .replace(/\s*([\{\}\:\;\,])\s*/g, '$1')
        .replace(/\;(?=\})/g, '') // remove last semicolon in rule
        .trim();
    }
  };

  const output = formatCss(input, mode === 'beautify');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setMode('beautify')}
          className={`btn ${mode === 'beautify' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Làm đẹp (Beautify CSS)
        </button>
        <button
          type="button"
          onClick={() => setMode('minify')}
          className={`btn ${mode === 'minify' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Nén CSS (Minify CSS)
        </button>

        <button
          type="button"
          onClick={() => setInput('')}
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: 'auto' }}
        >
          <RotateCcw size={14} /> Xóa
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Mã nguồn CSS đầu vào
          </label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dán CSS vào đây..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              Kết quả {mode === 'beautify' ? 'làm đẹp' : 'nén'} CSS
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
