import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, ArrowDownUp } from 'lucide-react';

export default function UrlTool() {
  const [mode, setMode] = useState('encode'); // 'encode' hoặc 'decode'
  const [componentMode, setComponentMode] = useState(true); // encodeURIComponent vs encodeURI
  const [input, setInput] = useState('https://tienich.vn/search?q=công cụ & tiện ích hay');

  let output = '';
  let error = '';

  if (input) {
    try {
      if (mode === 'encode') {
        output = componentMode ? encodeURIComponent(input) : encodeURI(input);
      } else {
        output = componentMode ? decodeURIComponent(input) : decodeURI(input);
      }
    } catch (err) {
      error = 'URL không hợp lệ hoặc chứa chuỗi mã hóa sai định dạng (%XX).';
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Mã hóa URL (Encode)
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Giải mã URL (Decode)
        </button>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', marginLeft: 'auto', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={componentMode}
            onChange={(e) => setComponentMode(e.target.checked)}
            style={{ width: 'auto' }}
          />
          <span>Mã hóa cả ký tự đặc biệt / ?:&= (Component mode)</span>
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {mode === 'encode' ? 'URL / Tham số cần mã hóa' : 'Chuỗi URL đã mã hóa (%XX)'}
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
            rows={8}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Dán đường dẫn URL..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              Kết quả
            </label>
            <CopyButton text={output} label="Sao chép" />
          </div>
          <textarea
            rows={8}
            value={output}
            readOnly
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-muted)' }}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <div>{error}</div>
        </div>
      )}
    </div>
  );
}
