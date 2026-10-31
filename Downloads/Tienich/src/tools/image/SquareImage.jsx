import { useState } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, RefreshCw, Square } from 'lucide-react';

export default function SquareImage() {
  const [file, setFile] = useState(null);
  const [squareBlobUrl, setSquareBlobUrl] = useState(null);
  const [bgType, setBgType] = useState('blur'); // 'blur', 'white', 'black'

  const makeSquare = (src, bg) => {
    const img = new Image();
    img.onload = () => {
      const size = Math.max(img.width, img.height);
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      if (bg === 'white') {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
      } else if (bg === 'black') {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, size, size);
      } else {
        // Blur background từ chính ảnh đó
        ctx.save();
        ctx.filter = 'blur(20px)';
        ctx.drawImage(img, -20, -20, size + 40, size + 40);
        ctx.restore();
      }

      // Vẽ ảnh gốc vào chính giữa
      const x = (size - img.width) / 2;
      const y = (size - img.height) / 2;
      ctx.drawImage(img, x, y);

      canvas.toBlob((blob) => {
        if (blob) setSquareBlobUrl(URL.createObjectURL(blob));
      }, 'image/jpeg', 0.92);
    };
    img.src = src;
  };

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return;
    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => makeSquare(e.target.result, bgType);
    reader.readAsDataURL(selectedFile);
  };

  const handleBgChange = (bg) => {
    setBgType(bg);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => makeSquare(e.target.result, bg);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept="image/*"
          onFilesSelected={handleFileSelect}
          label="Kéo thả ảnh cần tạo ảnh vuông vào đây"
          helperText="Tạo ảnh vuông 1:1 cho Instagram/Facebook không bị cắt méo"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><strong>{file.name}</strong></div>
            <button type="button" onClick={() => { setFile(null); setSquareBlobUrl(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Hiệu ứng viền nền:</span>
            {[
              { id: 'blur', label: 'Làm mờ ảnh gốc (Blur)' },
              { id: 'white', label: 'Nền trắng' },
              { id: 'black', label: 'Nền đen' }
            ].map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => handleBgChange(b.id)}
                className={`btn ${bgType === b.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              >
                {b.label}
              </button>
            ))}
          </div>

          {squareBlobUrl && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <img src={squareBlobUrl} alt="Ảnh vuông" style={{ maxHeight: '280px', maxWidth: '100%', borderRadius: 'var(--radius-md)' }} />
              <a href={squareBlobUrl} download={`square_${file.name}`} className="btn btn-primary btn-lg">
                <Download size={20} /> Tải ảnh vuông về máy
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
