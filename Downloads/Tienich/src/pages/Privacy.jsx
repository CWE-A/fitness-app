import { SEOHead } from '../components/seo/SEOHead';

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Chính sách bảo mật quyền riêng tư | TIỆNÍCH"
        description="Cam kết bảo vệ quyền riêng tư người dùng. Không lưu trữ file, không gửi dữ liệu cá nhân lên máy chủ khi sử dụng các công cụ trực tuyến."
        canonical="https://tienich.vn/chinh-sach-bao-mat"
      />

      <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 className="title-section" style={{ fontSize: '2.25rem' }}>Chính sách bảo mật (Privacy Policy)</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Cập nhật lần cuối: Tháng 10/2026</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              1. Nguyên tắc xử lý dữ liệu Client-side
            </h2>
            <p>
              TIỆNÍCH được xây dựng với triết lý <strong>ưu tiên bảo mật máy khách (Client-side First)</strong>. Hầu hết các công cụ (bao gồm tính toán, xử lý văn bản, chỉnh sửa PDF, nén ảnh, tạo mã QR...) đều chạy hoàn toàn trong môi trường trình duyệt của bạn thông qua JavaScript và WebAssembly. Chúng tôi không tải tệp tin hay nội dung bạn nhập lên bất kỳ máy chủ bên ngoài nào.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              2. Thu thập và lưu trữ thông tin
            </h2>
            <p>
              Chúng tôi <strong>không yêu cầu đăng ký tài khoản</strong>, do đó không thu thập thông tin định danh cá nhân như tên, địa chỉ hay mật khẩu.
            </p>
            <p>
              Một số tùy chọn cá nhân hóa như chế độ Sáng/Tối (Dark Mode), danh sách công việc (Checklist), hoặc bộ thẻ từ vựng (Flashcard) được lưu trữ trực tiếp trong bộ nhớ cục bộ (LocalStorage) của trình duyệt trên thiết bị của bạn.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              3. Cookie và Quảng cáo của bên thứ ba (Google AdSense)
            </h2>
            <p>
              Website có thể sử dụng cookie để ghi nhớ tùy chọn người dùng và hiển thị quảng cáo từ đối tác thứ ba như Google AdSense. Google sử dụng cookie (bao gồm cookie DoubleClick) để phân phối quảng cáo dựa trên các lượt truy cập trước đó của người dùng vào trang web này hoặc các trang web khác.
            </p>
            <p>
              Người dùng có thể chọn không sử dụng quảng cáo được cá nhân hóa bằng cách truy cập Cài đặt quảng cáo của Google.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              4. Liên hệ về vấn đề quyền riêng tư
            </h2>
            <p>
              Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật này, xin vui lòng liên hệ qua trang <a href="/lien-he" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Liên hệ</a>.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
