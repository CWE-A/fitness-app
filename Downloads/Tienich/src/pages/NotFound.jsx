import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="404 - Không tìm thấy trang | TIỆNÍCH"
        description="Trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển sang địa chỉ mới."
      />

      <div className="container" style={{ paddingTop: '5rem', paddingBottom: '5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--danger-subtle)', color: 'var(--danger)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AlertTriangle size={36} />
        </div>

        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-primary)' }}>404</h1>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Không tìm thấy trang yêu cầu</h2>
        <p style={{ color: 'var(--text-muted)', maxWidth: '460px', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Địa chỉ bạn truy cập có thể đã bị đổi tên, xóa hoặc tạm thời không khả dụng. Hãy trở về trang chủ để khám phá hơn 70 công cụ hữu ích.
        </p>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <Link to="/" className="btn btn-primary btn-lg">
            <Home size={18} /> Về trang chủ
          </Link>
          <Link to="/sitemap" className="btn btn-secondary btn-lg">
            <Search size={18} /> Xem Sitemap
          </Link>
        </div>
      </div>
    </>
  );
}
