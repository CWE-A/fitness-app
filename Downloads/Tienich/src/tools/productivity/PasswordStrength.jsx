import { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';

export default function PasswordStrength() {
  const [password, setPassword] = useState('P@ssw0rd2025!');

  // Phân tích
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const isLongEnough = password.length >= 8;
  const isOptimalLength = password.length >= 12;

  let score = 0;
  if (password.length > 0) score += 1;
  if (isLongEnough) score += 1;
  if (isOptimalLength) score += 1;
  if (hasLower && hasUpper) score += 1;
  if (hasNumber) score += 1;
  if (hasSpecial) score += 1;

  let strengthLabel = 'Rất yếu';
  let strengthColor = 'var(--danger)';
  let crackTime = 'Tức thì (0.001 giây)';

  if (score <= 2) {
    strengthLabel = 'Rất yếu';
    strengthColor = 'var(--danger)';
    crackTime = 'Vài giây';
  } else if (score === 3 || score === 4) {
    strengthLabel = 'Trung bình';
    strengthColor = 'var(--warning)';
    crackTime = 'Vài giờ đến vài ngày';
  } else if (score === 5) {
    strengthLabel = 'Mạnh';
    strengthColor = 'var(--primary)';
    crackTime = 'Vài năm';
  } else {
    strengthLabel = 'Rất mạnh (Tuyệt vời)';
    strengthColor = 'var(--success)';
    crackTime = 'Hàng thế kỷ (Triệu năm)';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
          Nhập mật khẩu cần kiểm tra độ an toàn
        </label>
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Nhập mật khẩu..."
          style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1rem' }}
        />
      </div>

      {/* Strength Bar */}
      <div
        style={{
          background: 'var(--bg-muted)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Đánh giá an toàn</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: strengthColor }}>{strengthLabel}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Thời gian bẻ khóa dự kiến</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>{crackTime}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${(score / 6) * 100}%`,
              height: '100%',
              backgroundColor: strengthColor,
              transition: 'all 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Checklist */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.25rem' }}>Các tiêu chuẩn bảo mật:</h4>
        {[
          { label: 'Độ dài tối thiểu 8 ký tự (khuyến nghị từ 12 ký tự)', met: isLongEnough },
          { label: 'Có cả chữ hoa (A-Z) và chữ thường (a-z)', met: hasLower && hasUpper },
          { label: 'Có ít nhất 1 chữ số (0-9)', met: hasNumber },
          { label: 'Có ít nhất 1 ký tự đặc biệt (!@#$%)', met: hasSpecial }
        ].map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem' }}>
            {item.met ? <CheckCircle2 size={18} color="var(--success)" /> : <XCircle size={18} color="var(--text-muted)" />}
            <span style={{ color: item.met ? 'var(--text-primary)' : 'var(--text-muted)' }}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
