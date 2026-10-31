import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, QrCode as QrIcon, Copy, Check } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export default function QrGenerator() {
  const [text, setText] = useState('https://tienich.vn');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState(280);

  useEffect(() => {
    if (!text.trim()) {
      setQrDataUrl('');
      return;
    }
    QRCode.toDataURL(text, {
      width: size,
      margin: 2,
      color: {
        dark: fgColor,
        light: bgColor
      }
    })
      .then(url => setQrDataUrl(url))
      .catch(err => console.error(err));
  }, [text, fgColor, bgColor, size]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'tienich_qrcode.png';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Nội dung mã QR (URL, văn bản, số điện thoại...)
            </label>
            <textarea
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập đường dẫn trang web hoặc nội dung..."
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Màu mã QR
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  style={{ width: '40px', height: '36px', padding: 0, cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{fgColor}</span>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.3rem' }}>
                Màu nền
              </label>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{ width: '40px', height: '36px', padding: 0, cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>{bgColor}</span>
              </div>
            </div>
          </div>
        </div>

        {/* QR Preview Box */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-muted)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', gap: '1rem' }}>
          {qrDataUrl ? (
            <>
              <img src={qrDataUrl} alt="Mã QR" style={{ borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', maxWidth: '100%' }} />
              <button type="button" onClick={handleDownload} className="btn btn-primary" style={{ width: '100%' }}>
                <Download size={18} /> Tải ảnh mã QR (PNG)
              </button>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem 0' }}>
              Nhập nội dung để tạo mã QR
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
