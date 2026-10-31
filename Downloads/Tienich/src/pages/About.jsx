import { ShieldCheck, Zap, Heart, Users, Wrench } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export default function About() {
  return (
    <>
      <SEOHead
        title="Giới thiệu về TIỆNÍCH - Nền tảng công cụ trực tuyến miễn phí"
        description="Tìm hiểu về sứ mệnh, giá trị cốt lõi và cam kết bảo mật quyền riêng tư của nền tảng TIỆNÍCH dành cho người Việt."
        canonical="https://tienich.vn/gioi-thieu"
      />

      <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 className="title-section" style={{ fontSize: '2.25rem' }}>Giới thiệu về TIỆNÍCH</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginTop: '0.75rem' }}>
            Nền tảng cung cấp hơn 70 công cụ trực tuyến miễn phí, tiện lợi và an toàn hàng đầu dành cho người Việt Nam.
          </p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', lineHeight: 1.7 }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--text-primary)' }}>Sứ mệnh của chúng tôi</h2>
          <p>
            Trong kỷ nguyên số, người dùng thường xuyên phải xử lý những tác vụ văn phòng, học tập hoặc lập trình nhỏ như: tính phần trăm, nén ảnh, gộp PDF, định dạng JSON hay chuyển đổi đơn vị. Tuy nhiên, nhiều website hiện nay bắt người dùng phải đăng ký tài khoản, cài đặt phần mềm nặng máy, hoặc tải dữ liệu nhạy cảm lên máy chủ tiềm ẩn nguy cơ rò rỉ thông tin.
          </p>
          <p>
            <strong>TIỆNÍCH ra đời nhằm thay đổi điều đó:</strong> Cung cấp một website "Tất cả trong một" (All-in-one), hoàn toàn miễn phí, tốc độ tải trang cực nhanh và ưu tiên tối đa việc xử lý dữ liệu ngay trên trình duyệt máy khách (Client-side).
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <ShieldCheck size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Bảo mật 100%</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              File tài liệu, hình ảnh và văn bản của bạn không bao giờ được gửi lên bất kỳ máy chủ nào. Mọi phép tính diễn ra trên thiết bị của bạn.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Zap size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Tốc độ tức thì</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Tối ưu mã nguồn với React và Vite, tải trang trong chớp mắt và hoạt động ổn định trên cả máy tính lẫn điện thoại.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: '#ec4899', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
              <Heart size={22} />
            </div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>Phục vụ cộng đồng</h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Không thu phí, không bắt buộc đăng ký tài khoản, giao diện tiếng Việt thân thiện và dễ sử dụng cho mọi người.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
