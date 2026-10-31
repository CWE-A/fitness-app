import { useState } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, RefreshCw, CheckCircle2, Sparkles } from 'lucide-react';

export default function ImageToWebp() {
  const [file, setFile] = useState(null);
  const [webpBlobUrl, setWebpBlobUrl] = useState(null);
  const [webpSize, setWebpSize] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setLoading(true);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            setWebpSize(blob.size);
            setWebpBlobUrl(URL.createObjectURL(blob));
            setLoading(false);
          }
        }, 'image/webp', 0.85);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (!webpBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = webpBlobUrl;
    a.download = file.name.replace(/\.[^.]+$/, '') + '.webp';
    a.click();
  };

  const originalSizeKB = file ? (file.size / 1024).toFixed(1) : 0;
  const webpSizeKB = (webpSize / 1024).toFixed(1);
  const savedPercent = file && webpSize > 0 
    ? Math.max(0, (((file.size - webpSize) / file.size) * 100)).toFixed(1)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Kéo thả ảnh JPG / PNG vào đây để chuyển sang WebP"
          helperText="Định dạng chuẩn thế hệ mới của Google, siêu nhẹ và tối ưu tốc độ website"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dung lượng gốc: {originalSizeKB} KB</div>
            </div>
            <button type="button" onClick={() => { setFile(null); setWebpBlobUrl(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
              Đang mã hóa hình ảnh sang WebP...
            </div>
          ) : webpBlobUrl ? (
            <div
              style={{
                background: 'var(--success-subtle)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={18} /> Đã chuyển đổi sang WebP thành công!
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Dung lượng: <strong>{originalSizeKB} KB</strong> ➔ <strong>{webpSizeKB} KB</strong> (Giảm {savedPercent}%)
                </div>
              </div>

              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải ảnh WebP về máy
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
