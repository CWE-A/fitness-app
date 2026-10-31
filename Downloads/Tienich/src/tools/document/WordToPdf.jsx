import { useState } from 'react';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, FileText, CheckCircle2, AlertCircle, Info, RefreshCw } from 'lucide-react';

export default function WordToPdf() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.name.endsWith('.docx')) {
      setError('Vui lòng chọn file Word định dạng .docx');
      return;
    }

    setFile(selectedFile);
    setError('');
    setPdfBlobUrl(null);
    setLoading(true);

    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      // Phân tích DOCX sang HTML bằng Mammoth
      const result = await mammoth.convertToHtml({ arrayBuffer });
      const html = result.value;
      setHtmlContent(html);

      // Chuyển sang PDF bằng jsPDF
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'pt',
        format: 'a4'
      });

      // Tạo container tạm thời để render văn bản
      const tempDiv = document.createElement('div');
      tempDiv.style.width = '550pt';
      tempDiv.style.padding = '20pt';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12pt';
      tempDiv.style.lineHeight = '1.5';
      tempDiv.innerHTML = html || '<p>Tài liệu không có nội dung văn bản.</p>';
      document.body.appendChild(tempDiv);

      await doc.html(tempDiv, {
        callback: (docResult) => {
          document.body.removeChild(tempDiv);
          const blob = docResult.output('blob');
          const url = URL.createObjectURL(blob);
          setPdfBlobUrl(url);
          setLoading(false);
        },
        x: 20,
        y: 20,
        width: 550,
        windowWidth: 750
      });
    } catch (err) {
      console.error(err);
      setError('Không thể đọc file DOCX. ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlobUrl || !file) return;
    const a = document.createElement('a');
    a.href = pdfBlobUrl;
    a.download = file.name.replace(/\.docx$/i, '.pdf');
    a.click();
  };

  const handleReset = () => {
    setFile(null);
    setHtmlContent('');
    setPdfBlobUrl(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Client-side info note */}
      <div className="alert alert-info" style={{ margin: 0 }}>
        <Info size={20} />
        <div style={{ fontSize: '0.85rem' }}>
          <strong>Xử lý 100% trên trình duyệt:</strong> Tài liệu của bạn không bao giờ bị tải lên máy chủ bên thứ ba, bảo mật tuyệt đối cho dữ liệu hợp đồng và tài liệu cá nhân.
        </div>
      </div>

      {!file ? (
        <FileUpload
          accept=".docx"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file Word (.docx) vào đây"
          helperText="Chuyển đổi văn bản, tiêu đề, danh sách sang PDF tức thì"
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
              <div>Đang chuyển đổi tài liệu sang PDF...</div>
            </div>
          ) : pdfBlobUrl ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="alert alert-success" style={{ margin: 0 }}>
                <CheckCircle2 size={18} />
                <span>Chuyển đổi thành công! Sẵn sàng tải xuống file PDF.</span>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" onClick={handleDownload} className="btn btn-primary btn-lg" style={{ flex: 1 }}>
                  <Download size={20} /> Tải file PDF về máy
                </button>
              </div>

              {/* Preview HTML trích xuất */}
              {htmlContent && (
                <div style={{ marginTop: '0.5rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Nội dung văn bản trích xuất:
                  </div>
                  <div
                    style={{
                      maxHeight: '220px',
                      overflowY: 'auto',
                      padding: '1rem',
                      background: 'var(--bg-muted)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.88rem',
                      lineHeight: 1.6
                    }}
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
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
