import { SEOHead } from '../components/seo/SEOHead';

export default function Terms() {
  return (
    <>
      <SEOHead
        title="Điều khoản sử dụng dịch vụ | TIỆNÍCH"
        description="Quy định và điều khoản sử dụng các công cụ trực tuyến miễn phí trên website TIỆNÍCH."
        canonical="https://tienich.vn/dieu-khoan-su-dung"
      />

      <div className="container" style={{ maxWidth: '800px', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 className="title-section" style={{ fontSize: '2.25rem' }}>Điều khoản sử dụng dịch vụ</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Cập nhật lần cuối: Tháng 10/2026</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', lineHeight: 1.7 }}>
          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              1. Chấp nhận các điều khoản
            </h2>
            <p>
              Bằng việc truy cập và sử dụng website TIỆNÍCH, bạn đồng ý tuân thủ các điều khoản và điều kiện được nêu tại đây. Nếu không đồng ý, bạn có thể ngừng sử dụng dịch vụ.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              2. Mục đích sử dụng
            </h2>
            <p>
              Các công cụ trên website được cung cấp hoàn toàn miễn phí cho mục đích cá nhân, học tập và công việc văn phòng hợp pháp. Nghiêm cấm sử dụng website vào các hành vi vi phạm pháp luật, phát tán mã độc hoặc tấn công từ chối dịch vụ.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              3. Tuyên bố miễn trừ trách nhiệm
            </h2>
            <p>
              Các kết quả tính toán (lãi suất, thuế, GPA, BMI...) được cung cấp nhằm mục đích tham khảo. Mặc dù chúng tôi nỗ lực tối đa để đảm bảo tính chuẩn xác, TIỆNÍCH không chịu trách nhiệm pháp lý đối với bất kỳ quyết định tài chính hoặc tổn thất nào phát sinh từ việc sử dụng thông tin trên trang.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
