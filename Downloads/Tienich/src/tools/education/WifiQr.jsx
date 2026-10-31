import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { Download, Wifi, Lock } from 'lucide-react';

export default function WifiQr() {
  const [ssid, setSsid] = useState('TienIch_Cafe_5G');
  const [password, setPassword] = useState('88888888');
  const [encryption, setEncryption] = useState('WPA'); // 'WPA', 'WEP', 'nopass'
  const [hidden, setHidden] = useState(false);
  const [qrUrl, setQrUrl] = useState('');

  // Chuẩn Wi-Fi QR Code: WIFI:T:WPA;S:MySSID;P:MyPassword;H:false;;
  useEffect(() => {
    if (!ssid.trim()) {
      setQrUrl('');
      return;
    }

    const wifiString = `WIFI:T:${encryption};S:${ssid};P:${encryption === 'nopass' ? '' : password};H:${hidden ? 'true' : 'false'};;`;

    QRCode.toDataURL(wifiString, {
      width: 280,
      margin: 2,
      color: { dark: '#0f172a', light: '#ffffff' }
    })
      .then(url => setQrUrl(url))
      .catch(err => console.error(err));
  }, [ssid, password, encryption, hidden]);

  const handleDownload = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `wifi_qr_${ssid}.png`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Tên mạng Wi-Fi (SSID)
            </label>
            <input
              type="text"
              value={ssid}
              onChange={(e) => setSsid(e.target.value)}
              placeholder="Ví dụ: Coffee_Wifi_5G"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Mật khẩu Wi-Fi
            </label>
            <input
              type="text"
              value={password}
              disabled={encryption === 'nopass'}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={encryption === 'nopass' ? 'Không cần mật khẩu' : 'Nhập mật khẩu Wi-Fi'}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Loại bảo mật
            </label>
            <select value={encryption} onChange={(e) => setEncryption(e.target.value)}>
              <option value="WPA">WPA / WPA2 / WPA3 (Phổ biến nhất)</option>
              <option value="WEP">WEP (Cũ)</option>
              <option value="nopass">Không có mật khẩu (Mạng mở)</option>
            </select>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={hidden}
              onChange={(e) => setHidden(e.target.checked)}
              style={{ width: 'auto' }}
            />
            <span>Mạng Wi-Fi bị ẩn (Hidden SSID)</span>
          </label>
        </div>

        {/* QR Preview Box */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-muted)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', gap: '1rem' }}>
          {qrUrl ? (
            <>
              <img src={qrUrl} alt="Wi-Fi QR Code" style={{ borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', maxWidth: '100%' }} />
              <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Quét camera điện thoại để kết nối Wi-Fi <strong>{ssid}</strong>
              </div>
              <button type="button" onClick={handleDownload} className="btn btn-primary" style={{ width: '100%' }}>
                <Download size={18} /> Tải ảnh mã QR Wi-Fi
              </button>
            </>
          ) : (
            <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', padding: '2rem 0' }}>
              Nhập tên Wi-Fi để tạo mã QR
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
