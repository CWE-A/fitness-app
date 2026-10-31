import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, ArrowDownUp } from 'lucide-react';

export default function Base64Tool() {
  const [mode, setMode] = useState('encode'); // 'encode' hoặc 'decode'
  const [input, setInput] = useState('Tiện Ích - Công cụ trực tuyến miễn phí');
  const [error, setError] = useState('');

  // Hàm encode/decode UTF-8 an toàn
  const utf8ToBase64 = (str) => {
    try {
      return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode('0x' + p1);
      }));
    } catch (e) {
      return '';
    }
  };

  const base64ToUtf8 = (str) => {
    try {
      return decodeURIComponent(Array.prototype.map.call(atob(str.trim()), (c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
    } catch (e) {
      throw new Error('Chuỗi Base64 không hợp lệ hoặc bị lỗi ký tự!');
    }
  };

  let output = '';
  let currentError = '';

  if (input.trim()) {
    try {
      if (mode === 'encode') {
        output = utf8ToBase64(input);
      } else {
        output = base64ToUtf8(input);
      }
    } catch (err) {
      currentError = err.message;
    }
  }

  const swapMode = () => {
    if (output && !currentError) {
      setInput(output);
      setMode(mode === 'encode' ? 'decode' : 'encode');
    } else {
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setMode('encode')}
          className={`btn ${mode === 'encode' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Mã hóa sang Base64 (Encode)
        </button>
        <button
          type="button"
          onClick={() => setMode('decode')}
          className={`btn ${mode === 'decode' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Giải mã từ Base64 (Decode)
        </button>
        <button
          type="button"
          onClick={swapMode}
          className="btn btn-secondary btn-sm"
          style={{ marginLeft: 'auto' }}
          title="Đảo chiều Encode/Decode"
        >
          <ArrowDownUp size={16} /> Đảo chiều
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {mode === 'encode' ? 'Văn bản gốc cần mã hóa' : 'Chuỗi Base64 cần giải mã'}
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
            placeholder={mode === 'encode' ? 'Nhập văn bản cần mã hóa...' : 'Dán chuỗi Base64...'}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              {mode === 'encode' ? 'Kết quả chuỗi Base64' : 'Kết quả văn bản gốc'}
            </label>
            <CopyButton text={output} label="Sao chép" />
          </div>
          <textarea
            rows={8}
            value={output}
            readOnly
            placeholder="Kết quả hiển thị tại đây..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-muted)' }}
          />
        </div>
      </div>

      {currentError && (
        <div className="alert alert-danger">
          <div>{currentError}</div>
        </div>
      )}
    </div>
  );
}
