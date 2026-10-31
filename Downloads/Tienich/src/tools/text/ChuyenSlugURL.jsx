import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Link, RotateCcw } from 'lucide-react';

export default function ChuyenSlugURL() {
  const [input, setInput] = useState('Tiện Ích - Bộ công cụ trực tuyến miễn phí & hữu ích cho người Việt');

  // Hàm tạo slug tiếng Việt chuẩn SEO
  const generateSlug = (str) => {
    let slug = str.toLowerCase();
    // Đổi ký tự có dấu thành không dấu
    slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
    slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
    slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
    slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
    slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
    slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
    slug = slug.replace(/đ/gi, 'd');
    // Xóa ký tự đặc biệt
    slug = slug.replace(/[^a-z0-9 -]/g, '');
    // Thay khoảng trắng và nhiều dấu gạch ngang liên tiếp thành 1 dấu gạch ngang
    slug = slug.replace(/\s+/g, '-').replace(/-+/g, '-');
    // Cắt bỏ gạch ngang ở đầu và cuối
    slug = slug.replace(/^-+|-+$/g, '');
    return slug;
  };

  const slug = generateSlug(input);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Tiêu đề bài viết / Chuỗi tiếng Việt
          </label>
          <button
            type="button"
            onClick={() => setInput('')}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} /> Xóa
          </button>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập tiêu đề hoặc tên bài viết..."
        />
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
          <Link size={18} />
          <span>Slug URL chuẩn SEO</span>
        </div>

        <div style={{ fontSize: '1.35rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
          {slug || '(chưa có slug)'}
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Ví dụ đường dẫn hoàn chỉnh: https://website.com/bai-viet/<strong>{slug}</strong>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <CopyButton text={slug} label="Sao chép Slug URL" />
        </div>
      </div>
    </div>
  );
}
