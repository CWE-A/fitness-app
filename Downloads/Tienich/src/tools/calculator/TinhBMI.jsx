import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Activity, RotateCcw } from 'lucide-react';

export default function TinhBMI() {
  const [height, setHeight] = useState('170'); // cm
  const [weight, setWeight] = useState('65'); // kg
  const [gender, setGender] = useState('male');

  const hMeters = (parseFloat(height) || 0) / 100;
  const wKg = parseFloat(weight) || 0;

  const bmi = hMeters > 0 ? wKg / (hMeters * hMeters) : 0;

  // Thang đo Châu Á (IDI & WPRO)
  let status = 'Bình thường';
  let statusColor = 'var(--success)';
  let advice = '';

  if (bmi < 18.5) {
    status = 'Gầy (Thiếu cân)';
    statusColor = 'var(--warning)';
    advice = 'Bạn nên bổ sung dinh dưỡng hợp lý và rèn luyện cơ bắp để đạt thể trạng cân đối.';
  } else if (bmi <= 22.9) {
    status = 'Cân đối (Bình thường)';
    statusColor = 'var(--success)';
    advice = 'Chúc mừng bạn! Chỉ số cơ thể của bạn rất chuẩn mực, hãy duy trì lối sống lành mạnh.';
  } else if (bmi <= 24.9) {
    status = 'Tiền béo phì (Thừa cân)';
    statusColor = 'var(--warning)';
    advice = 'Bạn đang hơi thừa cân, nên chú ý chế độ ăn giảm tinh bột, đường và tập luyện thể thao.';
  } else if (bmi <= 29.9) {
    status = 'Béo phì độ 1';
    statusColor = 'var(--danger)';
    advice = 'Cần xây dựng chế độ giảm cân khoa học để tránh nguy cơ bệnh tim mạch và tiểu đường.';
  } else {
    status = 'Béo phì độ 2 (Nguy hiểm)';
    statusColor = 'var(--danger)';
    advice = 'Cần tham khảo ý kiến chuyên gia dinh dưỡng hoặc bác sĩ để có lộ trình kiểm soát cân nặng an toàn.';
  }

  // Cân nặng lý tưởng (BMI từ 18.5 đến 22.9)
  const minIdealWeight = hMeters > 0 ? 18.5 * (hMeters * hMeters) : 0;
  const maxIdealWeight = hMeters > 0 ? 22.9 * (hMeters * hMeters) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Chiều cao (cm)
          </label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Ví dụ: 170"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Cân nặng (kg)
          </label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Ví dụ: 65"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giới tính
          </label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={() => setGender('male')}
              className={`btn ${gender === 'male' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ flex: 1 }}
            >
              Nam
            </button>
            <button
              type="button"
              onClick={() => setGender('female')}
              className={`btn ${gender === 'female' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              style={{ flex: 1 }}
            >
              Nữ
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chỉ số BMI của bạn</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>
            {bmi.toFixed(2)}
          </div>
          <div style={{ fontSize: '0.92rem', color: statusColor, fontWeight: 700, marginTop: '0.25rem' }}>
            {status}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Khoảng cân nặng lý tưởng</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {minIdealWeight.toFixed(1)} - {maxIdealWeight.toFixed(1)} kg
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Dựa trên chuẩn thể trạng người Châu Á
          </div>
        </div>

        <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <strong>Lời khuyên sức khỏe:</strong> {advice}
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`Chỉ số BMI: ${bmi.toFixed(2)} (${status}) - Chiều cao: ${height}cm, Cân nặng: ${weight}kg`} label="Sao chép kết quả BMI" />
      </div>
    </div>
  );
}
