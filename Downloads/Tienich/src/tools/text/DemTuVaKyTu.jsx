import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { RotateCcw, Type } from 'lucide-react';

export default function DemTuVaKyTu() {
  const [text, setText] = useState('Tiện Ích là website cung cấp bộ công cụ trực tuyến miễn phí và nhanh chóng cho người Việt.');

  const charCountWithSpaces = text.length;
  const charCountNoSpaces = text.replace(/\s/g, '').length;
  
  const words = text.trim() ? text.trim().split(/\s+/).filter(Boolean) : [];
  const wordCount = words.length;

  const lines = text ? text.split(/\r\n|\r|\n/) : [];
  const lineCount = text ? lines.length : 0;

  const sentences = text ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
  const sentenceCount = sentences.length;

  const paragraphs = text ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0) : [];
  const paragraphCount = paragraphs.length;

  // Thời gian đọc dự kiến (200 từ/phút)
  const readingTimeMin = (wordCount / 200).toFixed(1);
  const speakingTimeMin = (wordCount / 130).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Nhập hoặc dán đoạn văn bản cần đếm
          </label>
          <button
            type="button"
            onClick={() => setText('')}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} /> Xóa trắng
          </button>
        </div>
        <textarea
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dán hoặc gõ văn bản tại đây..."
          style={{ width: '100%', lineHeight: 1.6 }}
        />
      </div>

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1rem'
        }}
      >
        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Số từ</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
            {wordCount.toLocaleString('vi-VN')}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ký tự (có cách)</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {charCountWithSpaces.toLocaleString('vi-VN')}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Ký tự (không cách)</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {charCountNoSpaces.toLocaleString('vi-VN')}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Số câu</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent)', marginTop: '0.2rem' }}>
            {sentenceCount}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Đoạn văn</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent)', marginTop: '0.2rem' }}>
            {paragraphCount}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Thời gian đọc</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.35rem' }}>
            ~{readingTimeMin} <span style={{ fontSize: '0.85rem' }}>phút</span>
          </div>
        </div>
      </div>

      <div>
        <CopyButton
          text={`Thống kê: ${wordCount} từ, ${charCountWithSpaces} ký tự, ${sentenceCount} câu, ${paragraphCount} đoạn.`}
          label="Sao chép bảng thống kê"
        />
      </div>
    </div>
  );
}
