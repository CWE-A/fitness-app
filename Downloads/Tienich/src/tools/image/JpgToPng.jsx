import { useState } from 'react';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function JpgToPng() {
  const [file, setFile] = useState(null);
  const [pngBlobUrl, setPngBlobUrl] = useState(null);
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
            setPngBlobUrl(URL.createObjectURL(blob));
            setLoading(false);
          }
        }, 'image/png');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDownload = () => {
    if (!pngBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = pngBlobUrl;
    a.download = file.name.replace(/\.(jpg|jpeg)$/i, '.png');
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept=".jpg,.jpeg"
          onFilesSelected={handleFileSelect}
          label="Kéo thả ảnh JPG / JPEG vào đây để chuyển sang PNG"
          helperText="Giữ nguyên chất lượng hình ảnh nguyên bản không nén suy hao"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1rem' }}>{file.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</div>
            </div>
            <button type="button" onClick={() => { setFile(null); setPngBlobUrl(null); }} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn ảnh khác
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '1.5rem', color: 'var(--text-muted)' }}>
              Đang chuyển đổi định dạng ảnh sang PNG...
            </div>
          ) : pngBlobUrl ? (
            <div className="alert alert-success" style={{ margin: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={18} /> Đã chuyển đổi sang định dạng PNG thành công!
              </div>
              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải ảnh PNG về máy
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
