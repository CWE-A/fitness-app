import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';
import { FileUpload } from '../../components/common/FileUpload';
import { Download, FileImage, ArrowUp, ArrowDown, Trash2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ImagesToPdf() {
  const [images, setImages] = useState([]);
  const [pageSize, setPageSize] = useState('a4_portrait'); // 'a4_portrait', 'a4_landscape', 'fit'
  const [loading, setLoading] = useState(false);
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [error, setError] = useState('');

  const handleFilesSelected = (newFiles) => {
    const valid = Array.from(newFiles).filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f.name));
    if (valid.length === 0) {
      setError('Vui lòng chọn các file hình ảnh JPG, PNG hoặc WebP');
      return;
    }
    setError('');
    setPdfBlobUrl(null);

    // Đọc preview thumbnail
    const fileObjects = valid.map((file) => ({
      file,
      preview: URL.createObjectURL(file)
    }));

    setImages(prev => [...prev, ...fileObjects]);
  };

  const moveImage = (index, direction) => {
    const list = [...images];
    const target = index + direction;
    if (target < 0 || target >= list.length) return;
    const temp = list[index];
    list[index] = list[target];
    list[target] = temp;
    setImages(list);
    setPdfBlobUrl(null);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
    setPdfBlobUrl(null);
  };

  const handleCreatePdf = async () => {
    if (images.length === 0) {
      setError('Vui lòng tải lên ít nhất 1 hình ảnh');
      return;
    }

    setLoading(true);
    setError('');
    setPdfBlobUrl(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const item of images) {
        const file = item.file;
        let imageBytes = await file.arrayBuffer();
        let pdfImage = null;

        // Nếu là WebP hoặc định dạng khác, vẽ lên canvas để chuyển sang PNG
        if (file.type === 'image/webp' || (!file.type.includes('jpeg') && !file.type.includes('png'))) {
          const imgBitmap = await createImageBitmap(file);
          const canvas = document.createElement('canvas');
          canvas.width = imgBitmap.width;
          canvas.height = imgBitmap.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(imgBitmap, 0, 0);
          const pngDataUrl = canvas.toDataURL('image/png');
          const pngBytes = await (await fetch(pngDataUrl)).arrayBuffer();
          pdfImage = await pdfDoc.embedPng(pngBytes);
        } else if (file.type.includes('png')) {
          pdfImage = await pdfDoc.embedPng(imageBytes);
        } else {
          pdfImage = await pdfDoc.embedJpg(imageBytes);
        }

        const imgWidth = pdfImage.width;
        const imgHeight = pdfImage.height;

        let pageWidth = 595.28; // A4 pt
        let pageHeight = 841.89;

        if (pageSize === 'a4_landscape') {
          pageWidth = 841.89;
          pageHeight = 595.28;
        } else if (pageSize === 'fit') {
          pageWidth = imgWidth;
          pageHeight = imgHeight;
        }

        const page = pdfDoc.addPage([pageWidth, pageHeight]);

        if (pageSize === 'fit') {
          page.drawImage(pdfImage, {
            x: 0,
            y: 0,
            width: imgWidth,
            height: imgHeight
          });
        } else {
          // Fit ảnh vào trang A4 có lề margin
          const margin = 20;
          const maxWidth = pageWidth - margin * 2;
          const maxHeight = pageHeight - margin * 2;
          const scale = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
          const renderWidth = imgWidth * scale;
          const renderHeight = imgHeight * scale;

          const x = (pageWidth - renderWidth) / 2;
          const y = (pageHeight - renderHeight) / 2;

          page.drawImage(pdfImage, {
            x,
            y,
            width: renderWidth,
            height: renderHeight
          });
        }
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      setPdfBlobUrl(url);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError('Lỗi khi tạo PDF từ ảnh: ' + err.message);
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!pdfBlobUrl) return;
    const a = document.createElement('a');
    a.href = pdfBlobUrl;
    a.download = 'tienich_hinh_anh.pdf';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FileUpload
        accept="image/*"
        multiple={true}
        onFilesSelected={handleFilesSelected}
        label="Chọn hoặc kéo thả các file hình ảnh vào đây"
        helperText="Hỗ trợ JPG, PNG, WebP. Ghép thành tài liệu PDF nhiều trang."
      />

      {images.length > 0 && (
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <FileImage size={18} color="var(--primary)" /> Danh sách trang ảnh ({images.length} ảnh)
            </h4>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Khổ giấy:</span>
              <select value={pageSize} onChange={(e) => setPageSize(e.target.value)} style={{ width: 'auto', padding: '0.35rem 0.65rem' }}>
                <option value="a4_portrait">Khổ A4 Đứng (Portrait)</option>
                <option value="a4_landscape">Khổ A4 Ngang (Landscape)</option>
                <option value="fit">Vừa khít kích thước ảnh gốc</option>
              </select>
            </div>
          </div>

          {/* List thumbnails */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.75rem' }}>
            {images.map((item, idx) => (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  padding: '0.5rem',
                  background: 'var(--bg-muted)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)' }}>
                  Trang {idx + 1}
                </div>
                <div style={{ height: '90px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                  <img src={item.preview} alt={`Trang ${idx + 1}`} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                  <button type="button" onClick={() => moveImage(idx, -1)} disabled={idx === 0} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.4rem' }}>
                    <ArrowUp size={12} />
                  </button>
                  <button type="button" onClick={() => moveImage(idx, 1)} disabled={idx === images.length - 1} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.4rem' }}>
                    <ArrowDown size={12} />
                  </button>
                  <button type="button" onClick={() => removeImage(idx)} className="btn btn-secondary btn-sm" style={{ padding: '0.2rem 0.4rem', color: 'var(--danger)' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              onClick={handleCreatePdf}
              disabled={loading}
              className="btn btn-primary btn-lg"
              style={{ width: '100%' }}
            >
              <FileImage size={20} />
              <span>{loading ? 'Đang tạo file PDF...' : `Chuyển ${images.length} ảnh sang PDF`}</span>
            </button>
          </div>

          {pdfBlobUrl && (
            <div className="alert alert-success" style={{ margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={20} />
                <span>Đã tạo file PDF thành công!</span>
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
