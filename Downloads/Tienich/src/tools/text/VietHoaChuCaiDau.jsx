import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw } from 'lucide-react';

export default function VietHoaChuCaiDau() {
  const [input, setInput] = useState('nguyễn văn an đã hoàn thành xuất sắc đồ án tốt nghiệp.');
  const [mode, setMode] = useState('word'); // 'word' (mỗi từ) hoặc 'sentence' (mỗi câu)

  const toTitleCase = (str) => {
    if (!str) return '';
    // Chuẩn hóa toàn bộ về chữ thường trước
    // Tách theo ranh giới khoảng trắng (giữ nguyên khoảng trắng giữa các từ)
    return str.toLowerCase().split(/(\s+)/).map(part => {
      if (!part || /^\s+$/.test(part)) return part;
      // Tìm chữ cái đầu tiên trong từ (kể cả khi từ bắt đầu bằng dấu ngoặc, gạch đầu dòng)
      return part.replace(/^([\p{P}\p{S}]*)([\p{L}])(.*)$/u, (m, punct, firstLetter, rest) => {
        return punct + firstLetter.toUpperCase() + rest;
      });
    }).join('');
  };

  const toSentenceCase = (str) => {
    if (!str) return '';
    const lower = str.toLowerCase();
    // Viết hoa chữ cái đầu tiên sau đầu chuỗi hoặc sau dấu kết thúc câu (. ? ! hoặc \n) kèm khoảng trắng
    return lower.replace(/(^|[\.\?!]\s+|\n\s*)([\p{L}])/gu, (match, prefix, firstLetter) => {
      return prefix + firstLetter.toUpperCase();
    });
  };

  const output = mode === 'word' ? toTitleCase(input) : toSentenceCase(input);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => setMode('word')}
          className={`btn ${mode === 'word' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Viết hoa chữ đầu mỗi từ (Title Case)
        </button>
        <button
          type="button"
          onClick={() => setMode('sentence')}
          className={`btn ${mode === 'sentence' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
        >
          Viết hoa chữ đầu mỗi câu (Sentence Case)
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
          placeholder="Nhập đoạn văn bản cần chuẩn hóa..."
        />
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)' }}>
            Kết quả chuẩn hóa
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
