import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { SearchCode, AlertCircle, CheckCircle } from 'lucide-react';

export default function RegexTester() {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState(`Xin chào, liên hệ hỗ trợ tại email contact@tienich.vn hoặc admin.test@gmail.com để được giải đáp thắc mắc.`);

  const PRESETS = [
    { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'g' },
    { label: 'Số điện thoại VN', pattern: '(03|05|07|08|09)\\d{8}', flags: 'g' },
    { label: 'Đường dẫn URL', pattern: 'https?:\\/\\/[\\w\\-\\.]+(\\:[0-9]+)?(\\/[\\w\\-\\./\\?%&=]*)?', flags: 'g' },
    { label: 'Ngày tháng (DD/MM/YYYY)', pattern: '\\b\\d{2}/\\d{2}/\\d{4}\\b', flags: 'g' },
    { label: 'Địa chỉ IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' }
  ];

  let matches = [];
  let error = '';
  let regexObj = null;

  try {
    regexObj = new RegExp(pattern, flags);
    if (pattern) {
      if (flags.includes('g')) {
        let match;
        while ((match = regexObj.exec(testString)) !== null) {
          matches.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (regexObj.lastIndex === match.index) {
            regexObj.lastIndex++; // tránh lặp vô tận
          }
        }
      } else {
        const match = regexObj.exec(testString);
        if (match) {
          matches.push({
            value: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }
    }
  } catch (err) {
    error = err.message;
  }

  // Highlight matches trong testString
  const renderHighlightedText = () => {
    if (!regexObj || matches.length === 0 || error) {
      return <span>{testString}</span>;
    }

    const elements = [];
    let lastIndex = 0;

    matches.forEach((m, idx) => {
      // Đoạn text trước match
      if (m.index > lastIndex) {
        elements.push(testString.substring(lastIndex, m.index));
      }
      // Đoạn match
      elements.push(
        <mark
          key={idx}
          style={{
            backgroundColor: '#fef08a',
            color: '#854d0e',
            fontWeight: 700,
            padding: '0.1rem 0.3rem',
            borderRadius: '3px'
          }}
        >
          {m.value}
        </mark>
      );
      lastIndex = m.index + m.value.length;
    });

    if (lastIndex < testString.length) {
      elements.push(testString.substring(lastIndex));
    }

    return elements;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Presets */}
      <div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
          Mẫu Regex thông dụng:
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => { setPattern(p.pattern); setFlags(p.flags); }}
              className="btn btn-secondary btn-sm"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Regex Pattern & Flags */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 100px', gap: '0.75rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Biểu thức Regex (Regular Expression)
          </label>
          <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '0 0.75rem' }}>
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Nhập mẫu regex..."
              style={{ border: 'none', background: 'transparent', boxShadow: 'none', fontFamily: 'var(--font-mono)' }}
            />
            <span style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>/</span>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Cờ (Flags)
          </label>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="g, i, m..."
            style={{ fontFamily: 'var(--font-mono)' }}
          />
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <AlertCircle size={18} />
          <div>{error}</div>
        </div>
      )}

      {/* Test String */}
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
          Văn bản kiểm tra (Test String)
        </label>
        <textarea
          rows={5}
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          placeholder="Dán chuỗi văn bản cần test..."
        />
      </div>

      {/* Visual Match Results */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Kết quả khớp ({matches.length} matches)
          </label>
          {matches.length > 0 && (
            <CopyButton text={matches.map(m => m.value).join('\n')} label="Sao chép các match" size="sm" />
          )}
        </div>

        <div
          style={{
            background: 'var(--bg-muted)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            lineHeight: 1.8,
            fontSize: '0.9rem',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all'
          }}
        >
          {renderHighlightedText()}
        </div>
      </div>
    </div>
  );
}
