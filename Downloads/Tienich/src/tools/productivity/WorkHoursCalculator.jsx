import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { Briefcase, RotateCcw } from 'lucide-react';

export default function WorkHoursCalculator() {
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:30');
  const [breakMinutes, setBreakMinutes] = useState('60');
  const [hourlyRate, setHourlyRate] = useState(35000); // 35.000 VNĐ / giờ

  // Parse time
  const [startH, startM] = startTime.split(':').map(Number);
  const [endH, endM] = endTime.split(':').map(Number);

  let totalMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  if (totalMinutes < 0) totalMinutes += 24 * 60; // Ca đêm qua ngày hôm sau

  const netMinutes = Math.max(0, totalMinutes - (parseInt(breakMinutes) || 0));
  const netHours = (netMinutes / 60).toFixed(2);
  const hoursInt = Math.floor(netMinutes / 60);
  const minsRemaining = netMinutes % 60;

  const rate = typeof hourlyRate === 'number' ? hourlyRate : parseFloat(hourlyRate) || 0;
  const totalPay = (netMinutes / 60) * rate;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giờ bắt đầu làm việc
          </label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Giờ kết thúc ca
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Thời gian nghỉ giữa ca (Phút)
          </label>
          <input
            type="number"
            min="0"
            max="300"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
          />
        </div>

        <div>
          <NumberInput
            label="Tiền công mỗi giờ (VNĐ/giờ)"
            value={hourlyRate}
            onChange={(num) => setHourlyRate(num)}
            placeholder="Ví dụ: 35.000"
            suffix="đ/giờ"
          />
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
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Thời gian làm việc thực tế</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {hoursInt} giờ {minsRemaining} phút
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            (tương đương {netHours} giờ công)
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>Tổng tiền công ca làm</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.25rem' }}>
            {Math.round(totalPay).toLocaleString('vi-VN')} <span style={{ fontSize: '1rem' }}>VNĐ</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Với mức lương {rate.toLocaleString('vi-VN')}đ / giờ
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`Thời gian làm việc: ${hoursInt} giờ ${minsRemaining} phút (${netHours} giờ). Tiền lương: ${Math.round(totalPay).toLocaleString('vi-VN')} VNĐ.`} label="Sao chép kết quả chấm công" />
      </div>
    </div>
  );
}
