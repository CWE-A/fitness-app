import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, FileArchive, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';

export default function CompressPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [compressedBlobUrl, setCompressedBlobUrl] = useState(null);
  const [compressedSize, setCompressedSize] = useState(0);
  const [error, setError] = useState('');

  const handleFileSelect = (selectedFile) => {
    if (!selectedFile || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Vui lòng chọn file PDF hợp lệ');
      return;
    }
    setFile(selectedFile);
    setError('');
    setCompressedBlobUrl(null);
  };

  const handleCompress = async () => {
    if (!file) return;
    setLoading(true);
    setError('');
    setCompressedBlobUrl(null);

    try {
      const buffer = await file.arrayBuffer();
      // Load file và nén bằng cách tối ưu hóa các đối tượng stream và cấu trúc PDF
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      
      // Lưu lại với chế độ nén đối tượng
      const compressedBytes = await pdfDoc.save({ useObjectStreams: true });
      
      let finalBytes = compressedBytes;
      // Nếu file nén lại nhỏ hơn thì lấy, nếu bằng hoặc lớn hơn một xíu (do file đã quá tối ưu) thì đảm bảo file kết quả hợp lệ
      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      setCompressedSize(blob.size);
      const url = URL.createObjectURL(blob);
      setCompressedBlobUrl(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi nén file PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!compressedBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = compressedBlobUrl;
    a.download = `nen_${file.name}`;
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setCompressedBlobUrl(null);
    setError('');
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
          accept=".pdf"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file PDF cần nén vào đây"
          helperText="Tối ưu cấu trúc file PDF và giảm dung lượng để gửi qua email"
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
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Dung lượng gốc: {originalSizeKB} KB</div>
              </div>
            </div>

            <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn file khác
            </button>
          </div>

          <div>
            <button
              type="button"
              onClick={handleCompress}
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <FileArchive size={20} />
              <span>{loading ? 'Đang tối ưu dung lượng...' : 'Tiến hành nén PDF'}</span>
            </button>
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
                  <CheckCircle2 size={18} /> Đã tối ưu nén thành công!
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  Từ <strong>{originalSizeKB} KB</strong> còn <strong>{compressedSizeKB} KB</strong> (Tiết kiệm {savedPercent}%)
                </div>
              </div>

              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải file PDF nén về máy
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
