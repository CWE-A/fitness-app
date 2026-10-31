import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, AlertCircle } from 'lucide-react';

export default function JsonMinifier() {
  const [input, setInput] = useState(`{
  "project": "TIỆNÍCH",
  "category": "developer",
  "minify": true,
  "stats": {
    "totalTools": 70,
    "price": "free"
  }
}`);
  const [output, setOutput] = useState('{"project":"TIỆNÍCH","category":"developer","minify":true,"stats":{"totalTools":70,"price":"free"}}');
  const [error, setError] = useState('');

  const minify = (str) => {
    setError('');
    if (!str.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(str);
      setOutput(JSON.stringify(parsed));
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    minify(val);
  };

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savedPercent = originalSize > 0 ? (((originalSize - minifiedSize) / originalSize) * 100).toFixed(1) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              JSON gốc ({originalSize} bytes)
            </label>
            <button
              type="button"
              onClick={() => { setInput(''); setOutput(''); setError(''); }}
              className="btn btn-secondary btn-sm"
            >
              <RotateCcw size={14} /> Xóa
            </button>
          </div>
          <textarea
            rows={10}
            value={input}
            onChange={handleChange}
            placeholder="Dán JSON cần nén..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              JSON đã nén ({minifiedSize} bytes - Giảm {savedPercent}%)
            </label>
            <CopyButton text={output} label="Sao chép" />
          </div>
          <textarea
            rows={10}
            value={output}
            readOnly
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-muted)' }}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
