import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, AlertCircle, CheckCircle } from 'lucide-react';

export default function JsonFormatter() {
  const [input, setInput] = useState('{"name":"Tiện Ích","version":1.0,"isFree":true,"features":["calc","text","developer","pdf","image"]}');
  const [indent, setIndent] = useState('2');
  const [error, setError] = useState('');
  const [output, setOutput] = useState('');

  const formatJson = (val, spaceCount) => {
    setError('');
    if (!val.trim()) {
      setOutput('');
      return;
    }
    try {
      const parsed = JSON.parse(val);
      const spaces = spaceCount === 'tab' ? '\t' : parseInt(spaceCount, 10);
      setOutput(JSON.stringify(parsed, null, spaces));
    } catch (err) {
      setError(err.message);
      setOutput('');
    }
  };

  const handleInputChange = (val) => {
    setInput(val);
    formatJson(val, indent);
  };

  const handleIndentChange = (ind) => {
    setIndent(ind);
    formatJson(input, ind);
  };

  // Run on mount
  useState(() => {
    formatJson(input, indent);
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Thụt lề:</span>
          {['2', '4', 'tab'].map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => handleIndentChange(opt)}
              className={`btn ${indent === opt ? 'btn-primary' : 'btn-secondary'} btn-sm`}
            >
              {opt === 'tab' ? 'Tab' : `${opt} spaces`}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => { setInput(''); setOutput(''); setError(''); }}
          className="btn btn-secondary btn-sm"
        >
          <RotateCcw size={14} /> Xóa dữ liệu
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            JSON thô đầu vào
          </label>
          <textarea
            rows={12}
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Dán chuỗi JSON thô vào đây..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
              Kết quả JSON định dạng
            </label>
            <CopyButton text={output} label="Sao chép" />
          </div>
          <textarea
            rows={12}
            value={output}
            readOnly
            placeholder="Kết quả JSON đã định dạng..."
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', background: 'var(--bg-muted)' }}
          />
        </div>
      </div>

      {error ? (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <div><strong>Lỗi cú pháp JSON:</strong> {error}</div>
        </div>
      ) : output ? (
        <div className="alert alert-success">
          <CheckCircle size={18} />
          <div>Cú pháp JSON hợp lệ và đã được định dạng chuẩn xác.</div>
        </div>
      ) : null}
    </div>
  );
}
