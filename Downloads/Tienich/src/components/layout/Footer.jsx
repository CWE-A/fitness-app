import { Link } from 'react-router-dom';
import { Wrench, Heart, ShieldCheck, Zap, ArrowUp } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-color)',
        padding: '3.5rem 0 2rem',
        marginTop: 'auto'
      }}
    >
      <div className="container">
        {/* Top footer grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3rem'
          }}
        >
          {/* Brand Col */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff'
                }}
              >
                <Wrench size={18} />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
                TIỆN<span style={{ color: 'var(--primary)' }}>ÍCH</span>
              </span>
            </Link>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Bộ công cụ trực tuyến miễn phí và nhanh chóng cho người Việt. 100% xử lý an toàn ngay trên trình duyệt mà không cần cài đặt phần mềm.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--success)' }}>
                <ShieldCheck size={16} /> 100% Riêng tư
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent)' }}>
                <Zap size={16} /> Tốc độ cao
              </span>
            </div>
          </div>

          {/* Categories Col */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Danh mục công cụ
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <Link to={`/?category=${cat.id}#all-tools`} style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Liên kết hữu ích
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li>
                <Link to="/gioi-thieu" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  Giới thiệu về TiệnÍch
                </Link>
              </li>
              <li>
                <Link to="/lien-he" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  Liên hệ đóng góp ý kiến
                </Link>
              </li>
              <li>
                <Link to="/sitemap" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  Sitemap danh sách công cụ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal / Policies */}
          <div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Chính sách & Điều khoản
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              <li>
                <Link to="/chinh-sach-bao-mat" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  Chính sách bảo mật (Privacy)
                </Link>
              </li>
              <li>
                <Link to="/dieu-khoan-su-dung" style={{ transition: 'color var(--transition-fast)' }} onMouseEnter={(e) => e.target.style.color = 'var(--primary)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}>
                  Điều khoản sử dụng (Terms)
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontSize: '0.85rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} TIỆNÍCH. Mọi quyền được bảo lưu. Phát triển phục vụ cộng đồng.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="btn btn-secondary btn-sm"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
            title="Cuộn lên đầu trang"
          >
            <span>Lên đầu trang</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
