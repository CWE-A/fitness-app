import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export default function Stopwatch() {
  const [time, setTime] = useState(0); // centiseconds (1/100s)
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time * 10;
      timerRef.current = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 10));
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const addLap = () => {
    setLaps([{ id: laps.length + 1, time }, ...laps]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const formatTime = (t) => {
    const mins = Math.floor(t / 6000);
    const secs = Math.floor((t % 6000) / 100);
    const centis = t % 100;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      <div style={{ fontSize: 'clamp(3.5rem, 9vw, 5.5rem)', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)', letterSpacing: '-0.03em' }}>
        {formatTime(time)}
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className="btn btn-primary btn-lg"
          style={{ minWidth: '150px', borderRadius: 'var(--radius-full)' }}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
          <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
        </button>

        <button
          type="button"
          onClick={addLap}
          disabled={!isRunning}
          className="btn btn-secondary btn-lg"
          style={{ borderRadius: 'var(--radius-full)' }}
          title="Ghi nhận vòng (Lap)"
        >
          <Flag size={20} />
          <span>Vòng</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn btn-secondary btn-lg"
          style={{ borderRadius: 'var(--radius-full)', padding: '0.85rem' }}
          title="Đặt lại về 0"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      {laps.length > 0 && (
        <div style={{ width: '100%', maxWidth: '450px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Danh sách vòng (Laps)</span>
            <CopyButton text={laps.map(l => `Vòng ${l.id}: ${formatTime(l.time)}`).join('\n')} label="Sao chép" size="sm" />
          </div>
          <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
            {laps.map(l => (
              <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem', borderBottom: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Vòng {l.id}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{formatTime(l.time)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
