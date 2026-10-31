import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

export default function CountdownTimer() {
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('10');
  const [seconds, setSeconds] = useState('0');
  const [timeLeft, setTimeLeft] = useState(600);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            // Chuông báo
            try {
              const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              osc.connect(audioCtx.destination);
              osc.frequency.value = 587.33; // D5 note
              osc.start();
              setTimeout(() => osc.stop(), 800);
            } catch (e) {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStart = () => {
    const totalSec = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    if (totalSec > 0) {
      setTimeLeft(totalSec);
      setIsRunning(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    const totalSec = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    setTimeLeft(totalSec || 600);
  };

  const h = Math.floor(timeLeft / 3600);
  const m = Math.floor((timeLeft % 3600) / 60);
  const s = timeLeft % 60;
  const timeFormatted = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {!isRunning && (
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Giờ</label>
            <input
              type="number"
              min="0"
              max="99"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              style={{ width: '80px', textAlign: 'center', fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>:</span>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Phút</label>
            <input
              type="number"
              min="0"
              max="59"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              style={{ width: '80px', textAlign: 'center', fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}
            />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>:</span>
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)' }}>Giây</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
              style={{ width: '80px', textAlign: 'center', fontSize: '1.25rem', fontFamily: 'var(--font-mono)' }}
            />
          </div>
        </div>
      )}

      {/* Big Display */}
      <div style={{ fontSize: 'clamp(3.5rem, 9vw, 5.5rem)', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
        {timeFormatted}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={isRunning ? () => setIsRunning(false) : handleStart}
          className="btn btn-primary btn-lg"
          style={{ minWidth: '150px', borderRadius: 'var(--radius-full)' }}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary btn-lg"
          style={{ borderRadius: 'var(--radius-full)', padding: '0.85rem' }}
          title="Đặt lại"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {/* Quick chips */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {[
          { label: '5 phút', m: '5' },
          { label: '10 phút', m: '10' },
          { label: '15 phút', m: '15' },
          { label: '30 phút', m: '30' },
          { label: '45 phút (Tiết học)', m: '45' }
        ].map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => { setHours('0'); setMinutes(item.m); setSeconds('0'); setTimeLeft(parseInt(item.m) * 60); setIsRunning(false); }}
            className="btn btn-secondary btn-sm"
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
