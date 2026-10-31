import { useState, useRef } from 'react';
import jsQR from 'jsqr';
import { FileUpload } from '../../components/common/FileUpload';
import { CopyButton } from '../../components/common/CopyButton';
import { Scan, RefreshCw, ExternalLink, CheckCircle2, AlertCircle } from 'lucide-react';

export default function QrReader() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setResult('');
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setResult(code.data);
        } else {
          setError('Không phát hiện thấy mã QR nào trong hình ảnh này. Hãy thử ảnh rõ nét hơn.');
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const isUrl = result.startsWith('http://') || result.startsWith('https://');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Tải ảnh chứa mã QR lên để quét"
          helperText="Đọc liên kết, thông tin thanh toán, văn bản từ ảnh chụp màn hình"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 600 }}>{file.name}</span>
            <button type="button" onClick={() => { setFile(null); setResult(''); setError(''); setImageSrc(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Quét ảnh khác
            </button>
          </div>

          {result ? (
            <div
              style={{
                background: 'var(--success-subtle)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 700 }}>
                <CheckCircle2 size={20} />
                <span>Nội dung mã QR giải mã thành công:</span>
              </div>

              <div
                style={{
                  background: 'var(--bg-surface)',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1rem',
                  wordBreak: 'break-all',
                  border: '1px solid var(--border-color)'
                }}
              >
                {result}
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <CopyButton text={result} label="Sao chép nội dung" />
                {isUrl && (
                  <a href={result} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                    <ExternalLink size={16} /> Mở liên kết trong tab mới
                  </a>
                )}
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger" style={{ margin: 0 }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
