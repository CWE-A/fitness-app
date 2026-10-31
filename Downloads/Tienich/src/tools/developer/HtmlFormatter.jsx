import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function HtmlFormatter() {
  const [input, setInput] = useState('<div class="container"><header><h1>Tiện Ích</h1></header><main><p>Chào mừng bạn đến với Tiện Ích.</p><button>Bắt đầu ngay</button></main></div>');
  const [indentSize, setIndentSize] = useState(2);

  // Thuật toán format HTML client-side
  const formatHTML = (html, spaces = 2) => {
    let formatted = '';
    const pad = ' '.repeat(spaces);
    let indent = 0;

    // Tách các thẻ HTML
    const tokens = html.replace(/>\s*</g, '><').match(/(<[^>]+>|[^<]+)/g) || [];

    const voidElements = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype'];

    tokens.forEach((token) => {
      const isClosingTag = /^<\//.test(token);
      const isOpeningTag = /^<[^\/!][^>]*>/.test(token);
      const isSelfClosing = /\/>$/.test(token);
      const isComment = /^<!--/.test(token);
      
      const tagNameMatch = token.match(/^<\/?([a-zA-Z0-9\-]+)/);
      const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : '';
      const isVoid = voidElements.includes(tagName);

      if (isClosingTag) {
        indent = Math.max(0, indent - 1);
      }

      formatted += (indent > 0 ? pad.repeat(indent) : '') + token.trim() + '\n';

      if (isOpeningTag && !isSelfClosing && !isVoid && !isComment) {
        indent++;
      }
    });

    return formatted.trim();
  };

  const output = formatHTML(input, indentSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Khoảng cách thụt lề:</span>
          {[2, 4].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setIndentSize(s)}
              className={`btn ${indentSize === s ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {s} spaces
            </button>
          ))}
        </div>

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
            HTML thô (Raw HTML)
          </label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dán mã HTML vào đây..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              HTML đã thụt lề
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
