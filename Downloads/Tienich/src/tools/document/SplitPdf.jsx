import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, Scissors, CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';

export default function SplitPdf() {
  const [file, setFile] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [rangeInput, setRangeInput] = useState('1');
  const [loading, setLoading] = useState(false);
  const [splitBlobUrl, setSplitBlobUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Vui lòng chọn file PDF hợp lệ');
      return;
    }

    setFile(selectedFile);
    setError('');
    setSplitBlobUrl(null);
    setLoading(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer);
      const count = pdf.getPageCount();
      setTotalPages(count);
      setRangeInput(count > 1 ? `1-${Math.min(3, count)}` : '1');
      setLoading(false);
    } catch (err) {
      setError('Không thể mở file PDF: ' + err.message);
      setLoading(false);
    }
  };

  // Phân tích chuỗi khoảng trang "1-3, 5, 8-10" sang mảng 0-indexed page indices
  const parsePageRanges = (str, max) => {
    const indices = new Set();
    const parts = str.split(',');

    for (let part of parts) {
      part = part.trim();
      if (!part) continue;

      if (part.includes('-')) {
        const [startStr, endStr] = part.split('-');
        const start = parseInt(startStr, 10);
        const end = parseInt(endStr, 10);
        if (isNaN(start) || isNaN(end)) continue;

        for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
          if (i >= 1 && i <= max) {
            indices.add(i - 1);
          }
        }
      } else {
        const p = parseInt(part, 10);
        if (!isNaN(p) && p >= 1 && p <= max) {
          indices.add(p - 1);
        }
      }
    }

    return Array.from(indices).sort((a, b) => a - b);
  };

  const handleSplit = async () => {
    if (!file) return;
    setError('');
    setSplitBlobUrl(null);
    setLoading(true);

    try {
      const selectedIndices = parsePageRanges(rangeInput, totalPages);
      if (selectedIndices.length === 0) {
        setError(`Vui lòng nhập khoảng trang hợp lệ (từ 1 đến ${totalPages})`);
        setLoading(false);
        return;
      }

      const buffer = await file.arrayBuffer();
      const sourcePdf = await PDFDocument.load(buffer);
      const newPdf = await PDFDocument.create();

      const copiedPages = await newPdf.copyPages(sourcePdf, selectedIndices);
      copiedPages.forEach((p) => newPdf.addPage(p));

      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setSplitBlobUrl(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi tách trang PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!splitBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = splitBlobUrl;
    a.download = `tach_trang_${file.name}`;
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setTotalPages(0);
    setSplitBlobUrl(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept=".pdf"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file PDF cần tách trang vào đây"
          helperText="Trích xuất các trang bạn cần từ tài liệu PDF"
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
                  Tổng cộng: <strong>{totalPages} trang</strong> • {(file.size / 1024).toFixed(1)} KB
                </div>
              </div>
            </div>

            <button type="button" onClick={handleReset} className="btn btn-secondary btn-sm">
              <RefreshCw size={14} /> Chọn file khác
            </button>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
              Nhập các trang cần trích xuất (Ví dụ: 1-3, 5, 8)
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <input
                type="text"
                value={rangeInput}
                onChange={(e) => setRangeInput(e.target.value)}
                placeholder={`1-${totalPages}`}
                style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)' }}
              />
              <button
                type="button"
                onClick={handleSplit}
                disabled={loading}
                className="btn btn-primary"
                style={{ whiteSpace: 'nowrap' }}
              >
                <Scissors size={18} />
                <span>{loading ? 'Đang trích xuất...' : 'Tách trang'}</span>
              </button>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Bạn có thể nhập trang đơn lẻ (ví dụ: <strong>1, 3</strong>) hoặc dải trang liên tiếp (ví dụ: <strong>2-5</strong>).
            </div>
          </div>

          {splitBlobUrl && (
            <div className="alert alert-success" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} />
                <span>Đã tách trang thành công!</span>
              </div>
              <button type="button" onClick={handleDownload} className="btn btn-primary btn-sm">
                <Download size={16} /> Tải file PDF đã tách
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
