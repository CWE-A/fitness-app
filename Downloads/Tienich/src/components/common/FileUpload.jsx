import { useRef, useState } from 'react';
import { UploadCloud, File, X, AlertCircle } from 'lucide-react';

export function FileUpload({
  accept,
  multiple = false,
  maxSizeMB = 25,
  onFilesSelected,
  label = 'Kéo thả file vào đây hoặc bấm để chọn',
  helperText = 'Hỗ trợ các file định dạng hợp lệ. Xử lý trực tiếp trên trình duyệt.'
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');

  const validateAndProcess = (fileList) => {
    setError('');
    const validFiles = [];
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file.size > maxSizeBytes) {
        setError(`File "${file.name}" vượt quá kích thước cho phép (${maxSizeMB}MB)`);
        return;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      if (multiple) {
        onFilesSelected(validFiles);
      } else {
        onFilesSelected(validFiles[0]);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndProcess(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndProcess(e.target.files);
    }
  };

  return (
    <div className="file-upload-container" style={{ margin: '1rem 0' }}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        style={{
          border: `2px dashed ${isDragging ? 'var(--primary)' : 'var(--border-color)'}`,
          backgroundColor: isDragging ? 'var(--primary-subtle)' : 'var(--bg-muted)',
          borderRadius: 'var(--radius-lg)',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'all var(--transition-fast)'
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          style={{ display: 'none' }}
        />
        <div style={{ display: 'inline-flex', padding: '0.9rem', borderRadius: '50%', backgroundColor: 'var(--bg-surface)', marginBottom: '1rem', boxShadow: 'var(--shadow-sm)' }}>
          <UploadCloud size={32} color="var(--primary)" />
        </div>
        <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {helperText} (Tối đa {maxSizeMB}MB)
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" style={{ marginTop: '0.75rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
