import { useState, useEffect, useRef } from 'react';
import { formatInputValue, parseNumberVi, readMoneyToVietnameseWords } from '../../utils/formatNumber';

export function NumberInput({
  label,
  value,
  onChange,
  placeholder = 'Nhập số tiền...',
  suffix = '',
  showWords = false,
  helperText = '',
  min,
  max,
  style = {},
  disabled = false
}) {
  const [displayValue, setDisplayValue] = useState('');
  const inputRef = useRef(null);

  // Đồng bộ displayValue khi prop value từ ngoài thay đổi
  useEffect(() => {
    if (value === '' || value === null || value === undefined) {
      setDisplayValue('');
    } else {
      setDisplayValue(formatInputValue(String(value)));
    }
  }, [value]);

  const handleChange = (e) => {
    const rawVal = e.target.value;
    const formatted = formatInputValue(rawVal);
    setDisplayValue(formatted);

    const numericVal = parseNumberVi(formatted);
    if (onChange) {
      onChange(numericVal, formatted);
    }
  };

  const words = showWords ? readMoneyToVietnameseWords(displayValue) : '';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%', ...style }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{
            width: '100%',
            padding: suffix ? '0.75rem 3.2rem 0.75rem 0.95rem' : '0.75rem 0.95rem',
            fontSize: '1rem',
            fontWeight: 600,
            borderRadius: 'var(--radius-md)',
            border: '1.5px solid var(--border-color)',
            backgroundColor: 'var(--bg-surface)',
            color: 'var(--text-primary)',
            outline: 'none',
            transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)';
            e.target.style.boxShadow = '0 0 0 3px var(--primary-subtle)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'var(--border-color)';
            e.target.style.boxShadow = 'none';
          }}
        />

        {suffix && (
          <span
            style={{
              position: 'absolute',
              right: '0.85rem',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              pointerEvents: 'none'
            }}
          >
            {suffix}
          </span>
        )}
      </div>

      {words && (
        <div style={{ fontSize: '0.78rem', color: 'var(--primary)', fontStyle: 'italic', paddingLeft: '0.2rem' }}>
          💬 {words}
        </div>
      )}

      {helperText && !words && (
        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', paddingLeft: '0.2rem' }}>
          {helperText}
        </div>
      )}
    </div>
  );
}
