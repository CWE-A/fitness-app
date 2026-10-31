import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, Layers, ArrowUp, ArrowDown, Trash2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function MergePdf() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mergedBlobUrl, setMergedBlobUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFilesSelected = (newFiles) => {
    const valid = Array.from(newFiles).filter(f => f.name.toLowerCase().endsWith('.pdf'));
    if (valid.length === 0) {
      setError('Vui lòng chọn các file định dạng PDF');
      return;
    }
    setError('');
    setMergedBlobUrl(null);
    setFiles(prev => [...prev, ...valid]);
  };

  const moveFile = (index, direction) => {
    const newFiles = [...files];
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= newFiles.length) return;
    const temp = newFiles[index];
    newFiles[index] = newFiles[targetIndex];
    newFiles[targetIndex] = temp;
    setFiles(newFiles);
    setMergedBlobUrl(null);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setMergedBlobUrl(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) {
      setError('Vui lòng chọn ít nhất 2 file PDF để gộp');
      return;
    }

    setLoading(true);
    setError('');
    setMergedBlobUrl(null);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const file of files) {
        const fileBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setMergedBlobUrl(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Không thể gộp các file PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!mergedBlobUrl) return;
    const a = document.createElement('a');
    a.href = mergedBlobUrl;
    a.download = 'tienich_merged.pdf';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FileUpload
        accept=".pdf"
        multiple={true}
        onFilesSelected={handleFilesSelected}
        label="Chọn hoặc kéo thả các file PDF cần gộp vào đây"
        helperText="Chọn từ 2 file PDF trở lên. Bạn có thể sắp xếp lại thứ tự trước khi gộp."
      />

      {files.length > 0 && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Layers size={18} color="var(--primary)" /> Danh sách file đã chọn ({files.length} file)
            </h4>
            <button
              type="button"
              onClick={() => { setFiles([]); setMergedBlobUrl(null); }}
              className="btn btn-secondary btn-sm"
            >
              <RefreshCw size={14} /> Xóa danh sách
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {files.map((file, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 1rem',
                  background: 'var(--bg-muted)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  gap: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
                  <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
                    {idx + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {file.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {(file.size / 1024).toFixed(1)} KB
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', flexShrink: 0 }}>
                  <button
                    type="button"
                    onClick={() => moveFile(idx, -1)}
                    disabled={idx === 0}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem' }}
                    title="Di chuyển lên trên"
                  >
                    <ArrowUp size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveFile(idx, 1)}
                    disabled={idx === files.length - 1}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem' }}
                    title="Di chuyển xuống dưới"
                  >
                    <ArrowDown size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="btn btn-secondary btn-sm"
                    style={{ padding: '0.35rem 0.5rem', color: 'var(--danger)' }}
                    title="Xóa file khỏi danh sách"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleMerge}
              disabled={loading || files.length < 2}
              className="btn btn-primary btn-lg"
              style={{ flex: 1 }}
            >
              <Layers size={20} />
              <span>{loading ? 'Đang ghép nối PDF...' : `Gộp ${files.length} file PDF thành một`}</span>
            </button>
          </div>

          {mergedBlobUrl && (
            <div className="alert alert-success" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} />
                <span>Đã gộp thành công! Tải ngay tài liệu đã ghép.</span>
              </div>
              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải file PDF về máy
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
