import { useState, useRef, useEffect } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, Crop, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function CropImage() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [aspectRatio, setAspectRatio] = useState('free'); // 'free', '1:1', '16:9', '4:3'
  const [cropBox, setCropBox] = useState({ x: 0, y: 0, width: 200, height: 200 });
  const [croppedBlobUrl, setCroppedBlobUrl] = useState(null);
  const [originalDimensions, setOriginalDimensions] = useState({ w: 0, h: 0 });

  const canvasRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    setCroppedBlobUrl(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ w: img.width, h: img.height });
        setImageSrc(e.target.result);
        const initialSize = Math.min(img.width, img.height, 400);
        setCropBox({
          x: Math.round((img.width - initialSize) / 2),
          y: Math.round((img.height - initialSize) / 2),
          width: initialSize,
          height: initialSize
        });
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleAspectChange = (ratio) => {
    setAspectRatio(ratio);
    if (!originalDimensions.w) return;

    let newW = cropBox.width;
    let newH = cropBox.height;

    if (ratio === '1:1') {
      const s = Math.min(newW, newH);
      newW = s;
      newH = s;
    } else if (ratio === '16:9') {
      newH = Math.round((newW * 9) / 16);
    } else if (ratio === '4:3') {
      newH = Math.round((newW * 3) / 4);
    }

    setCropBox(prev => ({ ...prev, width: newW, height: newH }));
  };

  const handleCrop = () => {
    if (!imageSrc) return;
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = cropBox.width;
      canvas.height = cropBox.height;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        img,
        cropBox.x,
        cropBox.y,
        cropBox.width,
        cropBox.height,
        0,
        0,
        cropBox.width,
        cropBox.height
      );

      canvas.toBlob((blob) => {
        if (blob) {
          setCroppedBlobUrl(URL.createObjectURL(blob));
        }
      }, file.type || 'image/jpeg', 0.95);
    };
    img.src = imageSrc;
  };

  const handleDownload = () => {
    if (!croppedBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = croppedBlobUrl;
    a.download = `crop_${file.name}`;
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Kéo thả hình ảnh cần cắt cúp vào đây"
          helperText="Cắt cúp theo kích thước tự do hoặc tỷ lệ chuẩn 1:1, 16:9, 4:3"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Kích thước gốc: {originalDimensions.w} x {originalDimensions.h} px
              </div>
            </div>
            <button type="button" onClick={() => { setFile(null); setImageSrc(null); setCroppedBlobUrl(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          {/* Ratio Selector */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Tỷ lệ:</span>
            {['free', '1:1', '16:9', '4:3'].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => handleAspectChange(r)}
                className={`btn ${aspectRatio === r ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              >
                {r === 'free' ? 'Tự do' : r}
              </button>
            ))}
          </div>

          {/* Coordinate Inputs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tọa độ X</label>
              <input
                type="number"
                min="0"
                max={originalDimensions.w - cropBox.width}
                value={cropBox.x}
                onChange={(e) => setCropBox({ ...cropBox, x: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Tọa độ Y</label>
              <input
                type="number"
                min="0"
                max={originalDimensions.h - cropBox.height}
                value={cropBox.y}
                onChange={(e) => setCropBox({ ...cropBox, y: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Chiều rộng (W)</label>
              <input
                type="number"
                min="10"
                max={originalDimensions.w}
                value={cropBox.width}
                onChange={(e) => setCropBox({ ...cropBox, width: parseInt(e.target.value) || 10 })}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-muted)' }}>Chiều cao (H)</label>
              <input
                type="number"
                min="10"
                max={originalDimensions.h}
                value={cropBox.height}
                onChange={(e) => setCropBox({ ...cropBox, height: parseInt(e.target.value) || 10 })}
              />
            </div>
          </div>

          <div>
            <button type="button" onClick={handleCrop} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
              <Crop size={20} /> Thực hiện cắt ảnh ({cropBox.width} x {cropBox.height} px)
            </button>
          </div>

          {croppedBlobUrl && (
            <div
              style={{
                background: 'var(--success-subtle)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                alignItems: 'center'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                <div style={{ fontWeight: 700, color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CheckCircle2 size={18} /> Ảnh đã cắt sẵn sàng!
                </div>
                <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                  <Download size={16} /> Tải ảnh đã cắt
                </button>
              </div>

              <img
                src={croppedBlobUrl}
                alt="Bản cắt"
                style={{ maxHeight: '240px', maxWidth: '100%', objectFit: 'contain', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
