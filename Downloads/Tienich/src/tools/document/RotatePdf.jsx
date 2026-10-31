import { useState } from 'react';
import { PDFDocument, degrees } from 'pdf-lib';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, RotateCw, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';

export default function RotatePdf() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rotationAngle, setRotationAngle] = useState(90);
  const [loading, setLoading] = useState(false);
  const [rotatedBlobUrl, setRotatedBlobUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Vui lòng chọn file PDF hợp lệ');
      return;
    }

    setFile(selectedFile);
    setError('');
    setRotatedBlobUrl(null);
    setLoading(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      setTotalPages(pdf.getPageCount());
      setLoading(false);
    } catch (err) {
      setError('Không thể mở file PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleRotate = async () => {
    if (!file) return;
    setError('');
    setRotatedBlobUrl(null);
    setLoading(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const pages = pdf.getPages();

      pages.forEach((page) => {
        const currentRotation = page.getRotation().angle;
        page.setRotation(degrees((currentRotation + rotationAngle) % 360));
      });

      const pdfBytes = await pdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setRotatedBlobUrl(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi xoay PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!rotatedBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = rotatedBlobUrl;
    a.download = `xoay_${file.name}`;
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setTotalPages(0);
    setRotatedBlobUrl(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept=".pdf"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file PDF cần xoay vào đây"
          helperText="Xoay các trang PDF bị ngược hoặc ngang về đúng hướng"
        />
      ) : (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                <FileText size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>{file.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {totalPages} trang • {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>

            <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn file khác
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
              Chọn góc xoay theo chiều kim đồng hồ
            </label>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {[
                { angle: 90, label: 'Xoay phải 90°' },
                { angle: 180, label: 'Lật ngược 180°' },
                { angle: 270, label: 'Xoay trái 270° (hoặc 90° ngược)' }
              ].map((item) => (
                <button
                  key={item.angle}
                  type="button"
                  onClick={() => setRotationAngle(item.angle)}
                  className={`btn ${rotationAngle === item.angle ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                >
                  <RotateCw size={15} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleRotate}
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <RotateCw size={20} />
              <span>{loading ? 'Đang xoay tài liệu...' : `Xoay tất cả ${totalPages} trang ${rotationAngle}°`}</span>
            </button>
          </div>

          {rotatedBlobUrl && (
            <div className="alert alert-success" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} />
                <span>Đã xoay trang thành công!</span>
              </div>
              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải file PDF đã xoay
              </button>
            </div>
          )}

          {error && (
            <div className="alert alert-danger" style={{ margin: 0 }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
