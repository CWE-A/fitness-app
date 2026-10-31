import { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from 'docx';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, FileText, CheckCircle2, AlertCircle, Info, RefreshCw } from 'lucide-react';

// Cấu hình Worker cho PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

export default function PdfToWord() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [extractedPages, setExtractedPages] = useState([]);
  const [docxBlob, setDocxBlob] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Vui lòng chọn file PDF hợp lệ');
      return;
    }

    setFile(selectedFile);
    setError('');
    setDocxBlob(null);
    setLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
      const pdfDoc = await loadingTask.promise;
      const numPages = pdfDoc.numPages;

      const pagesText = [];
      const docxChildren = [];

      for (let pageNum = 1; pageNum <= numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        
        let lastY = null;
        let pageStr = '';
        const lines = [];
        let currentLine = '';

        textContent.items.forEach((item) => {
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            lines.push(currentLine.trim());
            currentLine = '';
          }
          currentLine += item.str + ' ';
          lastY = item.transform[5];
        });
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
        }

        pageStr = lines.filter(Boolean).join('\n');
        pagesText.push({ pageNum, text: pageStr });

        // Tạo tiêu đề trang trong file Word
        if (numPages > 1) {
          docxChildren.push(
            new Paragraph({
              text: `--- Trang ${pageNum} ---`,
              heading: HeadingLevel.HEADING_2,
              spacing: { before: 200, after: 100 }
            })
          );
        }

        // Tạo các đoạn văn bản trong file docx
        lines.filter(Boolean).forEach((line) => {
          docxChildren.push(
            new Paragraph({
              children: [new TextRun({ text: line, size: 24 })],
              spacing: { after: 120 }
            })
          );
        });
      }

      setExtractedPages(pagesText);

      // Đóng gói file Word (.docx)
      const doc = new Document({
        sections: [
          {
            properties: {},
            children: docxChildren.length > 0 ? docxChildren : [
              new Paragraph({ text: 'Không tìm thấy văn bản có thể trích xuất trong file PDF.' })
            ]
          }
        ]
      });

      const blob = await Packer.toBlob(doc);
      setDocxBlob(blob);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi đọc file PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!docxBlob || !file) return;
    const url = URL.createObjectURL(docxBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.name.replace(/\.pdf$/i, '.docx');
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setFile(null);
    setExtractedPages([]);
    setDocxBlob(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="alert alert-info" style={{ margin: 0 }}>
        <Info size={20} />
        <div style={{ fontSize: '0.85rem' }}>
          <strong>Trích xuất chữ trực tiếp trên trình duyệt:</strong> Chuyển văn bản từ các trang PDF thành tài liệu Word (.docx) có thể chỉnh sửa tự do.
        </div>
      </div>

      {!file ? (
        <FileUpload
          accept=".pdf"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file PDF vào đây để chuyển sang Word"
          helperText="Trích xuất các trang văn bản sang file .docx hoàn toàn miễn phí"
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
              <div>Đang đọc và trích xuất các trang tài liệu PDF...</div>
            </div>
          ) : docxBlob ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="alert alert-success" style={{ margin: 0 }}>
                <CheckCircle2 size={18} />
                <span>Đã tạo file Word (.docx) thành công từ {extractedPages.length} trang PDF!</span>
              </div>

              <div>
                <button type="button" onClick={handleDownload} className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                  <Download size={20} /> Tải file Word (.docx) về máy
                </button>
              </div>

              {/* Text Preview */}
              {extractedPages.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Xem trước nội dung trích xuất ({extractedPages.length} trang):
                  </div>
                  <div style={{ maxHeight: '200px', overflowY: 'auto', padding: '1rem', background: 'var(--bg-muted)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {extractedPages.map(p => `--- Trang ${p.pageNum} ---\n${p.text}\n\n`).join('')}
                  </div>
                </div>
              )}
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
