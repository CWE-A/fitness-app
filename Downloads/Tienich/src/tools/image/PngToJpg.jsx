import { useState } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function PngToJpg() {
  const [file, setFile] = useState(null);
  const [jpgBlobUrl, setJpgBlobUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bgColor, setBgColor] = useState('#ffffff');

  const convertToJpg = (selectedFile, bg) => {
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        // Vẽ nền màu thay thế cho vùng trong suốt
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            setJpgBlobUrl(URL.createObjectURL(blob));
            setLoading(false);
          }
        }, 'image/jpeg', 0.92);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    convertToJpg(selectedFile, bgColor);
  };

  const handleBgColorChange = (newColor) => {
    setBgColor(newColor);
    if (file) {
      convertToJpg(file, newColor);
    }
  };

  const handleDownload = () => {
    if (!jpgBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = jpgBlobUrl;
    a.download = file.name.replace(/\.png$/i, '.jpg');
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept=".png"
          onFilesSelected={handleFileSelect}
          label="Kéo thả ảnh PNG vào đây để chuyển sang JPG"
          helperText="Tự động lấp đầy vùng trong suốt bằng màu nền trang nhã"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</div>
            </div>
            <button type="button" onClick={() => { setFile(null); setJpgBlobUrl(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Màu nền thay thế vùng trong suốt:</span>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => handleBgColorChange(e.target.value)}
              style={{ width: '40px', height: '32px', padding: '2px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{bgColor}</span>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
              Đang chuyển đổi sang JPG...
            </div>
          ) : jpgBlobUrl ? (
            <div className="alert alert-success" style={{ margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={18} /> Đã chuyển đổi sang định dạng JPG thành công!
              </div>
              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải ảnh JPG về máy
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
