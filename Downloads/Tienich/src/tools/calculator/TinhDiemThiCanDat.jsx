import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { AlertCircle, CheckCircle, Target } from 'lucide-react';

export default function TinhDiemThiCanDat() {
  const [processScore, setProcessScore] = useState('6.5'); // Điểm quá trình
  const [processWeight, setProcessWeight] = useState('40'); // Tỷ trọng điểm quá trình (%)
  const [targetScore, setTargetScore] = useState('7.0'); // Điểm tổng kết mong muốn

  const pScore = parseFloat(processScore) || 0;
  const pWeight = (parseFloat(processWeight) || 0) / 100;
  const examWeight = Math.max(0.01, 1 - pWeight);
  const target = parseFloat(targetScore) || 0;

  // target = pScore * pWeight + examScore * examWeight
  // examScore = (target - pScore * pWeight) / examWeight
  const neededScore = (target - pScore * pWeight) / examWeight;
  const isAchievable = neededScore <= 10;
  const isAlreadyPassed = neededScore <= 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Điểm quá trình hiện tại (hệ 10)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={processScore}
            onChange={(e) => setProcessScore(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Tỷ trọng điểm quá trình (%)
          </label>
          <input
            type="number"
            min="10"
            max="90"
            value={processWeight}
            onChange={(e) => setProcessWeight(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Điểm tổng kết mục tiêu (hệ 10)
          </label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={targetScore}
            onChange={(e) => setTargetScore(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { label: 'Qua môn (4.0)', val: '4.0' },
          { label: 'Khá (6.5)', val: '6.5' },
          { label: 'Giỏi (8.0)', val: '8.0' },
          { label: 'Xuất sắc (9.0)', val: '9.0' }
        ].map((item) => (
          <button
            key={item.val}
            type="button"
            onClick={() => setTargetScore(item.val)}
            className={`btn ${targetScore === item.val ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        style={{
          background: !isAchievable ? 'var(--danger-subtle)' : isAlreadyPassed ? 'var(--success-subtle)' : 'var(--primary-subtle)',
          border: `1px solid ${!isAchievable ? 'rgba(239, 68, 68, 0.3)' : isAlreadyPassed ? 'rgba(16, 185, 129, 0.3)' : 'var(--primary-border)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
          <Target size={18} />
          <span>Điểm thi cuối kỳ (chiếm {(examWeight * 100).toFixed(0)}%) cần đạt</span>
        </div>

        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: !isAchievable ? 'var(--danger)' : 'var(--primary)', lineHeight: 1.2 }}>
          {isAlreadyPassed ? '0.0' : neededScore.toFixed(2)} / 10
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {!isAchievable ? (
            <span style={{ color: 'var(--danger)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <AlertCircle size={16} /> Mục tiêu vượt quá 10 điểm, không khả thi với điểm quá trình hiện tại!
            </span>
          ) : isAlreadyPassed ? (
            <span style={{ color: 'var(--success)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <CheckCircle size={16} /> Bạn đã chắc chắn đạt mục tiêu ngay cả khi chỉ cần dự thi!
            </span>
          ) : (
            `Bạn cần đạt tối thiểu ${neededScore.toFixed(2)} điểm ở bài thi kết thúc môn để tổng kết môn đạt ${target}.`
          )}
        </div>

        {isAchievable && (
          <div style={{ marginTop: '0.5rem' }}>
            <CopyButton text={`Cần đạt tối thiểu ${neededScore.toFixed(2)} điểm thi cuối kỳ`} label="Sao chép kết quả" />
          </div>
        )}
      </div>
    </div>
  );
}
