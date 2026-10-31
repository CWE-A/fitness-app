import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUpload } from '../../components/common/FileUpload';
import { Info, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { CopyButton } from '../../components/common/CopyButton';

export default function PdfInfo() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [error, setError] = useState('');

  const handleFileSelect = async (selectedFile) => {
    if (!selectedFile || !selectedFile.name.toLowerCase().endsWith('.pdf')) {
      setError('Vui lòng chọn file PDF hợp lệ');
      return;
    }

    setFile(selectedFile);
    setError('');
    setMetadata(null);
    setLoading(true);

    try {
      const buffer = await selectedFile.arrayBuffer();
      const pdf = await PDFDocument.load(buffer, { ignoreEncryption: true });

      const pageCount = pdf.getPageCount();
      const title = pdf.getTitle() || '(Không có)';
      const author = pdf.getAuthor() || '(Không có)';
      const subject = pdf.getSubject() || '(Không có)';
      const creator = pdf.getCreator() || '(Không có)';
      const producer = pdf.getProducer() || '(Không có)';
      const creationDate = pdf.getCreationDate() ? pdf.getCreationDate().toLocaleString('vi-VN') : '(Không có)';
      const modDate = pdf.getModificationDate() ? pdf.getModificationDate().toLocaleString('vi-VN') : '(Không có)';

      setMetadata({
        fileName: selectedFile.name,
        fileSize: (selectedFile.size / 1024).toFixed(1) + ' KB',
        pageCount,
        title,
        author,
        subject,
        creator,
        producer,
        creationDate,
        modDate
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi đọc metadata file PDF: ' + err.message);
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setMetadata(null);
    setError('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {!file ? (
        <FileUpload
          accept=".pdf"
          onFilesSelected={handleFileSelect}
          label="Kéo thả file PDF vào đây để đọc thông tin"
          helperText="Xem số trang, tác giả, phần mềm tạo, tiêu đề và ngày chỉnh sửa"
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
              <RefreshCw size={14} /> Kiểm tra file khác
            </button>
          </div>

          {loading ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              Đang phân tích dữ liệu ẩn (Metadata)...
            </div>
          ) : metadata ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
                <div className="card" style={{ padding: '1rem', background: 'var(--bg-muted)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Tổng số trang</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
                    {metadata.pageCount} trang
                  </div>
                </div>

                <div className="card" style={{ padding: '1rem', background: 'var(--bg-muted)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Dung lượng tệp</div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
                    {metadata.fileSize}
                  </div>
                </div>
              </div>

              {/* Detail Table */}
              <div style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                  <tbody>
                    {[
                      { label: 'Tiêu đề (Title)', val: metadata.title },
                      { label: 'Tác giả (Author)', val: metadata.author },
                      { label: 'Chủ đề (Subject)', val: metadata.subject },
                      { label: 'Phần mềm tạo (Creator)', val: metadata.creator },
                      { label: 'Công cụ xuất (Producer)', val: metadata.producer },
                      { label: 'Ngày tạo (Creation Date)', val: metadata.creationDate },
                      { label: 'Ngày sửa đổi (Modified Date)', val: metadata.modDate }
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border-color)', background: i % 2 === 0 ? 'var(--bg-surface)' : 'var(--bg-muted)' }}>
                        <td style={{ padding: '0.65rem 1rem', fontWeight: 600, width: '35%', color: 'var(--text-secondary)' }}>
                          {row.label}
                        </td>
                        <td style={{ padding: '0.65rem 1rem', color: 'var(--text-primary)' }}>
                          {row.val}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <CopyButton
                  text={`Thông tin file PDF ${metadata.fileName}:\nSố trang: ${metadata.pageCount}\nDung lượng: ${metadata.fileSize}\nTiêu đề: ${metadata.title}\nTác giả: ${metadata.author}\nPhần mềm: ${metadata.producer}`}
                  label="Sao chép toàn bộ thông số"
                />
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
    </div>
  );
}
