import { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import { SEOHead } from '../components/seo/SEOHead';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Liên hệ & Đóng góp ý kiến | TIỆNÍCH"
        description="Gửi phản hồi, đề xuất tính năng hoặc yêu cầu thêm công cụ mới cho đội ngũ phát triển TIỆNÍCH."
        canonical="https://tienich.vn/lien-he"
      />

      <div className="container" style={{ maxWidth: '720px', paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h1 className="title-section" style={{ fontSize: '2.25rem' }}>Liên hệ & Đóng góp ý kiến</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Chúng tôi luôn lắng nghe ý kiến đóng góp từ bạn để cải tiến và phát triển thêm các công cụ mới hữu ích hơn.
          </p>
        </div>

        {submitted ? (
          <div className="alert alert-success" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem' }}>
            <CheckCircle2 size={36} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Cảm ơn bạn đã gửi đóng góp!</h3>
              <p style={{ marginTop: '0.25rem', fontSize: '0.9rem' }}>Đội ngũ phát triển TIỆNÍCH sẽ xem xét phản hồi của bạn sớm nhất.</p>
            </div>
            <button type="button" onClick={() => setSubmitted(false)} className="btn btn-primary btn-sm">
              Gửi tin nhắn khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Họ và tên của bạn
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Nguyễn Văn A"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Địa chỉ Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Nội dung góp ý / Đề xuất công cụ mới
              </label>
              <textarea
                rows={6}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mô tả ý kiến hoặc tính năng bạn muốn có trên TiệnÍch..."
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <Send size={18} /> Gửi tin nhắn
            </button>
          </form>
        )}
      </div>
    </>
  );
}
