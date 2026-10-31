import { useState } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, Minimize, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function CompressImage() {
  const [file, setFile] = useState(null);
  const [quality, setQuality] = useState(75);
  const [imageSrc, setImageSrc] = useState(null);
  const [compressedBlobUrl, setCompressedBlobUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) return;
    setFile(selectedFile);
    setCompressedBlobUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      compress(e.target.result, quality, selectedFile.type);
    };
    reader.readAsDataURL(selectedFile);
  };

  const compress = (src, qPercent, mimeType) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      // Nén sang JPEG hoặc WebP tùy type
      const targetMime = mimeType === 'image/png' ? 'image/webp' : mimeType;

      canvas.toBlob((blob) => {
        if (blob) {
          setCompressedSize(blob.size);
          const url = URL.createObjectURL(blob);
          setCompressedBlobUrl(url);
        }
      }, targetMime, qPercent / 100);
    };
    img.src = src;
  };

  const handleQualityChange = (val) => {
    const q = parseInt(val, 10);
    setQuality(q);
    if (imageSrc && file) {
      compress(imageSrc, q, file.type);
    }
  };

  const handleDownload = () => {
    if (!compressedBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = compressedBlobUrl;
    a.download = `nen_q${quality}_${file.name}`;
    a.click();
  };

  const originalSizeKB = file ? (file.size / 1024).toFixed(1) : 0;
  const compressedSizeKB = (compressedSize / 1024).toFixed(1);
  const savedPercent = file && compressedSize > 0 
    ? Math.max(0, (((file.size - compressedSize) / file.size) * 100)).toFixed(1) 
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Kéo thả hình ảnh cần nén vào đây"
          helperText="Hỗ trợ JPG, PNG, WebP. Giảm dung lượng file hiệu quả"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dung lượng gốc: {originalSizeKB} KB</div>
            </div>

            <button type="button" onClick={() => { setFile(null); setImageSrc(null); setCompressedBlobUrl(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Chất lượng nén hình ảnh
              </label>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary)' }}>
                {quality}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="5"
              value={quality}
              onChange={(e) => handleQualityChange(e.target.value)}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
              <span>Dung lượng siêu nhẹ (10%)</span>
              <span>Cân bằng khuyến nghị (75%)</span>
              <span>Chất lượng cao nhất (95%)</span>
            </div>
          </div>

          {compressedBlobUrl && (
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
                  <CheckCircle2 size={18} /> Đã nén thành công!
                </div>
                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Dung lượng: <strong>{originalSizeKB} KB</strong> ➔ <strong>{compressedSizeKB} KB</strong> (Giảm {savedPercent}%)
                </div>
              </div>

              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải ảnh đã nén
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
