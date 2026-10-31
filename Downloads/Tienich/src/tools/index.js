import { lazy } from 'react';

// Registry ánh xạ slug của 70 công cụ tới dynamic lazy component
export const TOOL_COMPONENTS = {
  // A. Tính toán (14)
  'tinh-phan-tram': lazy(() => import('./calculator/TinhPhanTram')),
  'tinh-phan-tram-tang-giam': lazy(() => import('./calculator/TinhPhanTramTangGiam')),
  'tinh-giam-gia': lazy(() => import('./calculator/TinhGiamGia')),
  'tinh-vat': lazy(() => import('./calculator/TinhVAT')),
  'tinh-lai-kep': lazy(() => import('./calculator/TinhLaiKep')),
  'tinh-lai-don': lazy(() => import('./calculator/TinhLaiDon')),
  'tinh-khoan-vay-tra-gop': lazy(() => import('./calculator/TinhKhoanVayTraGop')),
  'tinh-gpa': lazy(() => import('./calculator/TinhGPA')),
  'tinh-diem-thi-can-dat': lazy(() => import('./calculator/TinhDiemThiCanDat')),
  'chia-tien-nhom': lazy(() => import('./calculator/ChiaTienNhom')),
  'tinh-tuoi': lazy(() => import('./calculator/TinhTuoi')),
  'tinh-ngay-giua-hai-moc': lazy(() => import('./calculator/TinhNgayGiuaHaiMoc')),
  'chuyen-doi-don-vi': lazy(() => import('./calculator/ChuyenDoiDonVi')),
  'tinh-bmi': lazy(() => import('./calculator/TinhBMI')),

  // B. Văn bản (10)
  'dem-tu-va-ky-tu': lazy(() => import('./text/DemTuVaKyTu')),
  'chuyen-chu-thuong-thanh-hoa': lazy(() => import('./text/ChuyenChuThuongThanhHoa')),
  'chuyen-chu-hoa-thanh-thuong': lazy(() => import('./text/ChuyenChuHoaThanhThuong')),
  'viet-hoa-chu-cai-dau': lazy(() => import('./text/VietHoaChuCaiDau')),
  'xoa-khoang-trang-thua': lazy(() => import('./text/XoaKhoangTrangThua')),
  'xoa-dong-trong': lazy(() => import('./text/XoaDongTrong')),
  'dao-nguoc-van-ban': lazy(() => import('./text/DaoNguocVanBan')),
  'so-sanh-van-ban': lazy(() => import('./text/SoSanhVanBan')),
  'tao-lorem-ipsum': lazy(() => import('./text/TaoLoremIpsum')),
  'chuyen-slug-url': lazy(() => import('./text/ChuyenSlugURL')),

  // C. Lập trình (13)
  'json-formatter': lazy(() => import('./developer/JsonFormatter')),
  'json-validator': lazy(() => import('./developer/JsonValidator')),
  'json-minifier': lazy(() => import('./developer/JsonMinifier')),
  'json-beautifier': lazy(() => import('./developer/JsonBeautifier')),
  'base64-encode-decode': lazy(() => import('./developer/Base64Tool')),
  'url-encode-decode': lazy(() => import('./developer/UrlTool')),
  'html-formatter': lazy(() => import('./developer/HtmlFormatter')),
  'css-formatter': lazy(() => import('./developer/CssFormatter')),
  'javascript-formatter': lazy(() => import('./developer/JsFormatter')),
  'chuyen-doi-timestamp': lazy(() => import('./developer/TimestampTool')),
  'tao-uuid': lazy(() => import('./developer/UuidTool')),
  'tao-ma-mau-hex-rgb': lazy(() => import('./developer/ColorPickerTool')),
  'kiem-tra-regex': lazy(() => import('./developer/RegexTester')),

  // D. Tài liệu & PDF (9)
  'word-sang-pdf': lazy(() => import('./document/WordToPdf')),
  'pdf-sang-word': lazy(() => import('./document/PdfToWord')),
  'gop-file-pdf': lazy(() => import('./document/MergePdf')),
  'tach-trang-pdf': lazy(() => import('./document/SplitPdf')),
  'xoay-trang-pdf': lazy(() => import('./document/RotatePdf')),
  'nen-pdf': lazy(() => import('./document/CompressPdf')),
  'pdf-sang-hinh-anh': lazy(() => import('./document/PdfToImages')),
  'hinh-anh-sang-pdf': lazy(() => import('./document/ImagesToPdf')),
  'doc-thong-tin-pdf': lazy(() => import('./document/PdfInfo')),

  // E. Hình ảnh (11)
  'resize-anh': lazy(() => import('./image/ResizeImage')),
  'nen-anh': lazy(() => import('./image/CompressImage')),
  'chuyen-jpg-sang-png': lazy(() => import('./image/JpgToPng')),
  'chuyen-png-sang-jpg': lazy(() => import('./image/PngToJpg')),
  'chuyen-anh-sang-webp': lazy(() => import('./image/ImageToWebp')),
  'chuyen-webp-sang-jpg': lazy(() => import('./image/WebpToJpg')),
  'cat-anh': lazy(() => import('./image/CropImage')),
  'tao-anh-vuong': lazy(() => import('./image/SquareImage')),
  'lay-mau-tu-hinh-anh': lazy(() => import('./image/ImageColorPicker')),
  'tao-ma-qr': lazy(() => import('./image/QrGenerator')),
  'doc-ma-qr-tu-anh': lazy(() => import('./image/QrReader')),

  // F. Thời gian & Năng suất (7)
  'pomodoro-timer': lazy(() => import('./productivity/PomodoroTimer')),
  'dong-ho-bam-gio': lazy(() => import('./productivity/Stopwatch')),
  'dong-ho-dem-nguoc': lazy(() => import('./productivity/CountdownTimer')),
  'tinh-thoi-gian-lam-viec': lazy(() => import('./productivity/WorkHoursCalculator')),
  'dem-ngay-den-su-kien': lazy(() => import('./productivity/EventCountdown')),
  'tao-mat-khau-ngau-nhien': lazy(() => import('./productivity/PasswordGenerator')),
  'kiem-tra-do-manh-mat-khau': lazy(() => import('./productivity/PasswordStrength')),

  // G. Học tập & Tiện ích (6)
  'tao-flashcard-don-gian': lazy(() => import('./education/Flashcards')),
  'chuyen-doi-tien-te': lazy(() => import('./education/CurrencyConverter')),
  'chuyen-doi-dung-luong': lazy(() => import('./education/ByteConverter')),
  'tao-bang-thoi-khoa-bieu': lazy(() => import('./education/Timetable')),
  'tao-checklist-cong-viec': lazy(() => import('./education/Checklist')),
  'tao-ma-qr-wifi': lazy(() => import('./education/WifiQr'))
};
