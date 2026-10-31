import { useState, useEffect } from 'react';
import { Calendar, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function EventCountdown() {
  const [targetDate, setTargetDate] = useState('2027-01-01T00:00');
  const [eventName, setEventName] = useState('Năm mới 2027');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculate = () => {
      const target = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const PRESETS = [
    { name: 'Năm mới 2027', date: '2027-01-01T00:00' },
    { name: 'Tết Nguyên Đán 2027', date: '2027-02-06T00:00' },
    { name: 'Giáng Sinh 2026', date: '2026-12-25T00:00' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {/* Presets */}
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {PRESETS.map((p, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => { setEventName(p.name); setTargetDate(p.date); }}
            className={`btn ${eventName === p.name ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', width: '100%', maxWidth: '500px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Tên sự kiện
          </label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Thời điểm diễn ra
          </label>
          <input
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
          Đếm ngược đến: <span style={{ color: 'var(--primary)' }}>{eventName}</span>
        </h3>

        {/* Counter Blocks */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', maxWidth: '550px', margin: '0 auto' }}>
          {[
            { label: 'Ngày', val: timeLeft.days },
            { label: 'Giờ', val: timeLeft.hours },
            { label: 'Phút', val: timeLeft.minutes },
            { label: 'Giây', val: timeLeft.seconds }
          ].map((item, i) => (
            <div
              key={i}
              style={{
                background: 'var(--bg-muted)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem 0.5rem',
                textAlign: 'center',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)', lineHeight: 1 }}>
                {item.val.toString().padStart(2, '0')}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginTop: '0.5rem' }}>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
