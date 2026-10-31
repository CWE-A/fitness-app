import { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Coffee, Briefcase } from 'lucide-react';

export default function PomodoroTimer() {
  const [mode, setMode] = useState('work'); // 'work' (25m), 'short' (5m), 'long' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const timerRef = useRef(null);

  const getDuration = (m) => {
    if (m === 'work') return 25 * 60;
    if (m === 'short') return 5 * 60;
    return 15 * 60;
  };

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            // Phát âm thanh bip
            try {
              const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
              const osc = audioCtx.createOscillator();
              osc.connect(audioCtx.destination);
              osc.frequency.value = 880;
              osc.start();
              setTimeout(() => osc.stop(), 500);
            } catch (e) {}

            if (mode === 'work') {
              setSessionsCompleted((s) => s + 1);
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, mode]);

  const switchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(getDuration(newMode));
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(getDuration(mode));
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progress = ((getDuration(mode) - timeLeft) / getDuration(mode)) * 100;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {/* Mode Buttons */}
      <div style={{ display: 'flex', gap: '0.75rem', background: 'var(--bg-muted)', padding: '0.4rem', borderRadius: 'var(--radius-full)' }}>
        <button
          type="button"
          onClick={() => switchMode('work')}
          className={`btn ${mode === 'work' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Briefcase size={15} /> Làm việc (25m)
        </button>
        <button
          type="button"
          onClick={() => switchMode('short')}
          className={`btn ${mode === 'short' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Coffee size={15} /> Nghỉ ngắn (5m)
        </button>
        <button
          type="button"
          onClick={() => switchMode('long')}
          className={`btn ${mode === 'long' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          style={{ borderRadius: 'var(--radius-full)' }}
        >
          <Coffee size={15} /> Nghỉ dài (15m)
        </button>
      </div>

      {/* Big Clock Display */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 'clamp(4rem, 10vw, 6.5rem)', fontWeight: 800, fontFamily: 'var(--font-mono)', letterSpacing: '-0.04em', color: 'var(--primary)', lineHeight: 1 }}>
          {timeFormatted}
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          {mode === 'work' ? '🔥 Tập trung cao độ nào!' : '☕ Thư giãn và nạp lại năng lượng.'}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setIsRunning(!isRunning)}
          className="btn btn-primary btn-lg"
          style={{ minWidth: '160px', borderRadius: 'var(--radius-full)', gap: '0.65rem' }}
        >
          {isRunning ? <Pause size={22} /> : <Play size={22} />}
          <span>{isRunning ? 'Tạm dừng' : 'Bắt đầu'}</span>
        </button>

        <button
          type="button"
          onClick={resetTimer}
          className="btn btn-secondary btn-lg"
          style={{ borderRadius: 'var(--radius-full)', padding: '0.85rem' }}
          title="Đặt lại phiên"
        >
          <RotateCcw size={20} />
        </button>
      </div>

      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        Đã hoàn thành: <strong>{sessionsCompleted}</strong> phiên Pomodoro hôm nay 🎉
      </div>
    </div>
  );
}
