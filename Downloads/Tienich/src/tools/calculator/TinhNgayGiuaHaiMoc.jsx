import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { CalendarRange } from 'lucide-react';

export default function TinhNgayGiuaHaiMoc() {
  const [startDate, setStartDate] = useState('2025-01-01');
  const [endDate, setEndDate] = useState('2025-04-30');
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [excludeWeekends, setExcludeWeekends] = useState(false);

  const start = new Date(startDate);
  const end = new Date(endDate);

  let totalDays = 0;
  let workDays = 0;
  let weekendDays = 0;

  if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
    const diffTime = Math.abs(end - start);
    let days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    if (includeEndDay) days += 1;
    totalDays = days;

    // Đếm ngày làm việc
    let cur = new Date(Math.min(start, end));
    const targetEnd = new Date(Math.max(start, end));
    if (includeEndDay) targetEnd.setDate(targetEnd.getDate() + 1);

    while (cur < targetEnd) {
      const dayOfWeek = cur.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        workDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }
  }

  const finalDays = excludeWeekends ? workDays : totalDays;
  const weeks = (finalDays / 7).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Ngày bắt đầu
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Ngày kết thúc
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={includeEndDay}
            onChange={(e) => setIncludeEndDay(e.target.checked)}
            style={{ width: 'auto' }}
          />
          <span>Bao gồm cả ngày kết thúc (+1 ngày)</span>
        </label>

        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={excludeWeekends}
            onChange={(e) => setExcludeWeekends(e.target.checked)}
            style={{ width: 'auto' }}
          />
          <span>Chỉ tính ngày làm việc (Trừ thứ 7 & CN)</span>
        </label>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            {excludeWeekends ? 'Tổng ngày làm việc' : 'Tổng số ngày'}
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>
            {finalDays} <span style={{ fontSize: '1.2rem' }}>ngày</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Số tuần tương đương</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {weeks} <span style={{ fontSize: '1rem' }}>tuần</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Phân tích ngày</div>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            <div>• Ngày làm việc trong tuần: <strong>{workDays}</strong> ngày</div>
            <div>• Ngày cuối tuần (T7, CN): <strong>{weekendDays}</strong> ngày</div>
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`Khoảng cách từ ${startDate} đến ${endDate} là ${finalDays} ngày (${weeks} tuần)`} label="Sao chép kết quả" />
      </div>
    </div>
  );
}
