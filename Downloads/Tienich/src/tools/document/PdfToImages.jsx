import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import JSZip from 'jszip';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, Images, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PdfToImages() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Vui lòng chọn file PDF hợp lệ');
      return;
    }

    setFile(selectedFile);
    setError('');
    setImages([]);
    setLoading(true);
    setProgress('Đang đọc tệp PDF...');

    try {
      const buffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: buffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;

      const renderedImages = [];

      for (let i = 1; i <= numPages; i++) {
        setProgress(`Đang xuất ảnh trang ${i} / ${numPages}...`);
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 }); // 2x chất lượng cao

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport }).promise;
        const dataUrl = canvas.toDataURL('image/png');
        renderedImages.push({
          pageNumber: i,
          dataUrl,
          width: viewport.width,
          height: viewport.height
        });
      }

      setImages(renderedImages);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi render trang PDF thành ảnh: ' + err.message);
      setLoading(false);
    }
  };

  const downloadSingleImage = (img) => {
    const a = document.createElement('a');
    a.href = img.dataUrl;
    a.download = `${file.name.replace(/\.pdf$/i, '')}_trang_${img.pageNumber}.png`;
    a.click();
  };

  const downloadAllZip = async () => {
    if (images.length === 0) return;
    const zip = new JSZip();

    images.forEach((img) => {
      // Tách base64 data
      const base64Data = img.dataUrl.replace(/^data:image\/png;base64,/, '');
      zip.file(`trang_${img.pageNumber}.png`, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    const url = URL.createObjectURL(zipBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, '')}_images.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setImages([]);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept=".pdf"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file PDF vào đây để xuất sang hình ảnh"
          helperText="Chuyển đổi từng trang tài liệu thành hình ảnh PNG sắc nét"
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
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{(file.size / 1024).toFixed(1)} KB</div>
              </div>
            </div>

            <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn file khác
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <div style={{ display: 'inline-block', width: '28px', height: '28px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '0.75rem' }} />
              <div>{progress}</div>
            </div>
          ) : images.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  Đã chuyển đổi thành công {images.length} trang thành ảnh PNG:
                </span>
                <button type="button" onClick={downloadAllZip} className="btn btn-primary btn-sm">
                  <Download size={16} /> Tải toàn bộ file ZIP
                </button>
              </div>

              {/* Image Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
                {images.map((img) => (
                  <div
                    key={img.pageNumber}
                    style={{
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      background: 'var(--bg-muted)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem', fontWeight: 600, borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>Trang {img.pageNumber}</span>
                    </div>
                    <div style={{ padding: '0.5rem', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img
                        src={img.dataUrl}
                        alt={`Trang ${img.pageNumber}`}
                        style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                      />
                    </div>
                    <div style={{ padding: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => downloadSingleImage(img)}
                        className="btn btn-secondary btn-sm"
                        style={{ width: '100%', fontSize: '0.8rem' }}
                      >
                        <Download size={14} /> Tải ảnh này
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {error && (
            <div className="alert alert-danger" style={{ margin: 0 }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
