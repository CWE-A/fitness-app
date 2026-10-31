import { useState, useRef } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { CopyButton } from '../../components/common/CopyButton';
import { Pipette, RefreshCw } from 'lucide-react';

export default function ImageColorPicker() {
  const [file, setFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [pickedColor, setPickedColor] = useState('#2563eb');
  const [palette, setPalette] = useState([]);
  const canvasRef = useRef(null);

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImageSrc(e.target.result);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        // Trích xuất palette mẫu
        extractPalette(ctx, img.width, img.height);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const extractPalette = (ctx, w, h) => {
    const colors = [];
    const stepX = Math.floor(w / 4);
    const stepY = Math.floor(h / 3);
    for (let x = stepX / 2; x < w; x += stepX) {
      for (let y = stepY / 2; y < h; y += stepY) {
        const p = ctx.getImageData(x, y, 1, 1).data;
        const hex = rgbToHex(p[0], p[1], p[2]);
        if (!colors.includes(hex)) colors.push(hex);
      }
    }
    setPalette(colors.slice(0, 8));
  };

  const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;

    const ctx = canvas.getContext('2d');
    const p = ctx.getImageData(x, y, 1, 1).data;
    const hex = rgbToHex(p[0], p[1], p[2]);
    setPickedColor(hex);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Kéo thả hình ảnh vào đây để lấy mã màu"
          helperText="Chạm hoặc nhấp chuột vào bất kỳ điểm nào trên ảnh để lấy mã HEX/RGB"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Nhấp chuột lên ảnh để chấm màu pixel
            </span>
            <button type="button" onClick={() => { setFile(null); setImageSrc(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Đổi ảnh
            </button>
          </div>

          <div style={{ textAlign: 'center', background: 'var(--bg-muted)', padding: '0.5rem', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <canvas
              ref={canvasRef}
              onClick={handleCanvasClick}
              style={{ maxWidth: '100%', maxHeight: '350px', cursor: 'crosshair', objectFit: 'contain' }}
            />
          </div>

          {/* Color Preview */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-muted)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-sm)', backgroundColor: pickedColor, boxShadow: 'var(--shadow-sm)' }} />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Màu vừa chọn</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{pickedColor}</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <CopyButton text={pickedColor} label="Sao chép" />
            </div>
          </div>

          {palette.length > 0 && (
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
                Bảng màu trích xuất tự động (Palette):
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {palette.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setPickedColor(c)}
                    style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-sm)', backgroundColor: c, border: '1px solid rgba(0,0,0,0.1)', cursor: 'pointer' }}
                    title={c}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
