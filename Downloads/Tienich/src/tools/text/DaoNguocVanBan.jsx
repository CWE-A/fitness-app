import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function DaoNguocVanBan() {
  const [input, setInput] = useState('Tiện Ích - Công cụ trực tuyến miễn phí');
  const [mode, setMode] = useState('chars'); // 'chars', 'words', 'lines'

  const reverseChars = (str) => Array.from(str).reverse().join('');
  
  const reverseWords = (str) => {
    return str
      .split('\n')
      .map(line => line.split(/\s+/).reverse().join(' '))
      .join('\n');
  };

  const reverseLines = (str) => {
    return str.split('\n').reverse().join('\n');
  };

  let output = '';
  if (mode === 'chars') output = reverseChars(input);
  else if (mode === 'words') output = reverseWords(input);
  else output = reverseLines(input);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => setMode('chars')}
          className={`btn ${mode === 'chars' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Đảo từng ký tự (A B C ➔ C B A)
        </button>
        <button
          type="button"
          onClick={() => setMode('words')}
          className={`btn ${mode === 'words' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Đảo từng từ (Một Hai Ba ➔ Ba Hai Một)
        </button>
        <button
          type="button"
          onClick={() => setMode('lines')}
          className={`btn ${mode === 'lines' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Đảo thứ tự các dòng
        </button>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Văn bản gốc
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
          placeholder="Nhập văn bản cần đảo ngược..."
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
            Kết quả đảo ngược
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
