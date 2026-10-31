import { useState, useEffect } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RefreshCw, ShieldCheck } from 'lucide-react';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUpper, setUseUpper] = useState(true);
  const [useLower, setUseLower] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    let chars = '';
    if (useUpper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLower) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!chars) {
      setPassword('');
      return;
    }

    let pass = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      pass += chars[array[i] % chars.length];
    }
    setPassword(pass);
  };

  useEffect(() => {
    generate();
  }, [length, useUpper, useLower, useNumbers, useSymbols]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Generated Password Box */}
      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          flexWrap: 'wrap'
        }}
      >
        <div style={{ fontSize: '1.45rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)', wordBreak: 'break-all' }}>
          {password || 'Vui lòng chọn ít nhất 1 loại ký tự'}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="button" onClick={generate} className="btn btn-secondary btn-sm" title="Tạo lại mật khẩu khác">
            <RefreshCw size={16} />
          </button>
          <CopyButton text={password} label="Sao chép mật khẩu" />
        </div>
      </div>

      {/* Options */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Độ dài mật khẩu: <strong style={{ color: 'var(--primary)' }}>{length} ký tự</strong>
            </label>
          </div>
          <input
            type="range"
            min="6"
            max="64"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={useUpper} onChange={(e) => setUseUpper(e.target.checked)} style={{ width: 'auto' }} />
            <span>Chữ in hoa (A-Z)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={useLower} onChange={(e) => setUseLower(e.target.checked)} style={{ width: 'auto' }} />
            <span>Chữ in thường (a-z)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={useNumbers} onChange={(e) => setUseNumbers(e.target.checked)} style={{ width: 'auto' }} />
            <span>Chữ số (0-9)</span>
          </label>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
            <input type="checkbox" checked={useSymbols} onChange={(e) => setUseSymbols(e.target.checked)} style={{ width: 'auto' }} />
            <span>Ký tự đặc biệt (@#$%)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
