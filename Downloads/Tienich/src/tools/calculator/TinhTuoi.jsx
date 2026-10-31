import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Calendar, Cake, Clock } from 'lucide-react';

export default function TinhTuoi() {
  const [birthDate, setBirthDate] = useState('2000-05-15');

  const now = new Date();
  const birth = new Date(birthDate);

  let years = 0;
  let months = 0;
  let days = 0;
  let totalDays = 0;
  let nextBirthdayDays = 0;

  if (!isNaN(birth.getTime()) && birth <= now) {
    totalDays = Math.floor((now - birth) / (1000 * 60 * 60 * 24));

    // Tính năm, tháng, ngày
    years = now.getFullYear() - birth.getFullYear();
    months = now.getMonth() - birth.getMonth();
    days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Đếm ngược sinh nhật tiếp theo
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) {
      nextBday = new Date(now.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    nextBirthdayDays = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ maxWidth: '320px' }}>
        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
          Chọn ngày, tháng, năm sinh
        </label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
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
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tuổi hiện tại của bạn</div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>
            {years} <span style={{ fontSize: '1.2rem' }}>tuổi</span>
          </div>
          <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            {months} tháng, {days} ngày
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tổng số ngày đã sống</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {totalDays.toLocaleString('vi-VN')} <span style={{ fontSize: '1rem' }}>ngày</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
            Tương đương khoảng {(totalDays * 24).toLocaleString('vi-VN')} giờ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--warning)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Cake size={16} /> Sinh nhật tiếp theo
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--warning)', marginTop: '0.25rem' }}>
            {nextBirthdayDays === 0 ? 'Hôm nay!' : `Còn ${nextBirthdayDays} ngày`}
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`Tôi hiện tại ${years} tuổi ${months} tháng ${days} ngày (đã sống ${totalDays.toLocaleString('vi-VN')} ngày)`} label="Sao chép kết quả tuổi" />
      </div>
    </div>
  );
}
