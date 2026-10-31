import { useState, useEffect } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Clock, RefreshCw, ArrowRight } from 'lucide-react';

export default function TimestampTool() {
  const [currentEpoch, setCurrentEpoch] = useState(Math.floor(Date.now() / 1000));
  
  // Timestamp to Date
  const [inputEpoch, setInputEpoch] = useState(Math.floor(Date.now() / 1000).toString());
  
  // Date to Timestamp
  const [inputDateTime, setInputDateTime] = useState(() => {
    const d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 19);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Tính kết quả từ timestamp sang ngày giờ
  let epochNum = parseFloat(inputEpoch) || 0;
  // Nếu là mili-giây (13 chữ số)
  if (epochNum > 100000000000) {
    epochNum = Math.floor(epochNum / 1000);
  }
  const dateFromEpoch = new Date(epochNum * 1000);
  const localDateStr = !isNaN(dateFromEpoch.getTime()) ? dateFromEpoch.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }) : 'Không hợp lệ';
  const utcDateStr = !isNaN(dateFromEpoch.getTime()) ? dateFromEpoch.toUTCString() : 'Không hợp lệ';
  const isoDateStr = !isNaN(dateFromEpoch.getTime()) ? dateFromEpoch.toISOString() : 'Không hợp lệ';

  // Tính kết quả từ ngày giờ sang timestamp
  const dateObj = new Date(inputDateTime);
  const epochSec = !isNaN(dateObj.getTime()) ? Math.floor(dateObj.getTime() / 1000) : 0;
  const epochMs = !isNaN(dateObj.getTime()) ? dateObj.getTime() : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Realtime Epoch Bar */}
      <div
        style={{
          background: 'var(--bg-muted)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Clock size={24} color="var(--primary)" />
          <div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Unix Timestamp hiện tại
            </div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
              {currentEpoch}
            </div>
          </div>
        </div>
        <CopyButton text={currentEpoch.toString()} label="Sao chép Epoch hiện tại" />
      </div>

      {/* Converter 1: Timestamp -> Ngày giờ */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          1. Đổi Unix Timestamp sang Ngày giờ
        </h4>
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
          <input
            type="number"
            value={inputEpoch}
            onChange={(e) => setInputEpoch(e.target.value)}
            placeholder="Ví dụ: 1730000000"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem' }}
          />
          <button
            type="button"
            onClick={() => setInputEpoch(currentEpoch.toString())}
            className="btn btn-secondary btn-sm"
          >
            Lấy giờ này
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: 'var(--primary-subtle)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Giờ Việt Nam (GMT+7)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.2rem' }}>
              {localDateStr}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Giờ quốc tế (UTC)</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {utcDateStr}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Chuẩn ISO 8601</div>
            <div style={{ fontSize: '0.88rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              {isoDateStr}
            </div>
          </div>
        </div>
      </div>

      {/* Converter 2: Ngày giờ -> Timestamp */}
      <div className="card">
        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
          2. Đổi Ngày giờ sang Unix Timestamp
        </h4>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="datetime-local"
            step="1"
            value={inputDateTime}
            onChange={(e) => setInputDateTime(e.target.value)}
            style={{ maxWidth: '320px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timestamp (Giây - 10 số)</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)', marginTop: '0.2rem' }}>
              {epochSec}
            </div>
            <div style={{ marginTop: '0.4rem' }}>
              <CopyButton text={epochSec.toString()} label="Sao chép" />
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Timestamp (Mili-giây - 13 số)</div>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
              {epochMs}
            </div>
            <div style={{ marginTop: '0.4rem' }}>
              <CopyButton text={epochMs.toString()} label="Sao chép" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
