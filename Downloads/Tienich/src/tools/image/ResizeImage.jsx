import { useState, useRef } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, Maximize, Lock, Unlock, RefreshCw, Image as ImageIcon } from 'lucide-react';

export default function ResizeImage() {
  const [file, setFile] = useState(null);
  const [originalWidth, setOriginalWidth] = useState(0);
  const [originalHeight, setOriginalHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [keepAspect, setKeepAspect] = useState(true);
  const [resizedBlobUrl, setResizedBlobUrl] = useState(null);
  const [resizedSize, setResizedSize] = useState(0);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile || !selectedFile.type.startsWith('image/')) return;
    setFile(selectedFile);
    setResizedBlobUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalWidth(img.width);
        setOriginalHeight(img.height);
        setWidth(img.width);
        setHeight(img.height);
        setImageSrc(e.target.result);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleWidthChange = (val) => {
    const w = parseInt(val) || 0;
    setWidth(w);
    if (keepAspect && originalWidth > 0) {
      setHeight(Math.round((w * originalHeight) / originalWidth));
    }
  };

  const handleHeightChange = (val) => {
    const h = parseInt(val) || 0;
    setHeight(h);
    if (keepAspect && originalHeight > 0) {
      setWidth(Math.round((h * originalWidth) / originalHeight));
    }
  };

  const handleApplyResize = () => {
    if (!imageSrc || width <= 0 || height <= 0) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob((blob) => {
        if (blob) {
          setResizedSize(blob.size);
          const url = URL.createObjectURL(blob);
          setResizedBlobUrl(url);
        }
      }, file.type || 'image/jpeg', 0.92);
    };
    img.src = imageSrc;
  };

  const handleDownload = () => {
    if (!resizedBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = resizedBlobUrl;
    a.download = `resized_${width}x${height}_${file.name}`;
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setImageSrc(null);
    setResizedBlobUrl(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Kéo thả ảnh cần thay đổi kích thước vào đây"
          helperText="Hỗ trợ JPG, PNG, WebP. Tự động giữ nguyên tỷ lệ khung hình"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Kích thước gốc: <strong>{originalWidth} x {originalHeight} px</strong> • {(file.size / 1024).toFixed(1)} KB
              </div>
            </div>

            <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Chiều rộng (Width px)
              </label>
              <input
                type="number"
                value={width}
                onChange={(e) => handleWidthChange(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '0.5rem' }}>
              <button
                type="button"
                onClick={() => setKeepAspect(!keepAspect)}
                className={`btn ${keepAspect ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                title={keepAspect ? 'Đang khóa tỷ lệ' : 'Đang mở khóa tỷ lệ'}
              >
                {keepAspect ? <Lock size={16} /> : <Unlock size={16} />}
                <span>{keepAspect ? 'Khóa tỷ lệ' : 'Tự do'}</span>
              </button>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Chiều cao (Height px)
              </label>
              <input
                type="number"
                value={height}
                onChange={(e) => handleHeightChange(e.target.value)}
              />
            </div>

            <div>
              <button
                type="button"
                onClick={handleApplyResize}
                className="btn btn-primary"
                style={{ width: '100%', height: '42px' }}
              >
                <Maximize size={16} /> Áp dụng kích thước
              </button>
            </div>
          </div>

          {/* Quick presets */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[
              { label: '50%', scale: 0.5 },
              { label: '75%', scale: 0.75 },
              { label: '1080p Full HD', w: 1920, h: 1080 },
              { label: '720p HD', w: 1280, h: 720 },
              { label: 'Avatar (500x500)', w: 500, h: 500 }
            ].map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  if (p.scale) {
                    setWidth(Math.round(originalWidth * p.scale));
                    setHeight(Math.round(originalHeight * p.scale));
                  } else {
                    setWidth(p.w);
                    setHeight(p.h);
                  }
                }}
                className="btn btn-secondary btn-sm"
              >
                {p.label}
              </button>
            ))}
          </div>

          {resizedBlobUrl && (
            <div
              style={{
                background: 'var(--primary-subtle)',
                border: '1px solid var(--primary-border)',
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
                <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                  Đã resize thành công: {width} x {height} px
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Dung lượng mới: {(resizedSize / 1024).toFixed(1)} KB
                </div>
              </div>

              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải ảnh kích thước mới
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
