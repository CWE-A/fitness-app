/**
 * Tiện ích định dạng số theo chuẩn Việt Nam
 * Hàng nghìn ngăn cách bằng dấu chấm (.), số thập phân bằng dấu phẩy (,)
 * Ví dụ: 20000 -> "20.000", 1500000 -> "1.500.000"
 */

/**
 * Định dạng số nguyên hoặc số thực sang chuỗi có dấu chấm phân cách hàng nghìn
 * @param {number|string} value - Giá trị cần format
 * @param {number} maxFractionDigits - Số chữ số thập phân tối đa (mặc định 2)
 * @returns {string} Chuỗi đã định dạng
 */
export function formatNumberVi(value, maxFractionDigits = 2) {
  if (value === null || value === undefined || value === '') return '';
  const num = typeof value === 'number' ? value : parseFloat(String(value).replace(/\./g, '').replace(/,/g, '.'));
  if (isNaN(num)) return '';

  return new Intl.NumberFormat('vi-VN', {
    maximumFractionDigits: maxFractionDigits
  }).format(num);
}

/**
 * Định dạng chuỗi nhập liệu trực tiếp (dùng cho ô input khi người dùng đang gõ)
 * Nhập 20000 -> tự động tách thành 20.000
 * @param {string} inputStr - Chuỗi người dùng vừa gõ
 * @returns {string} Chuỗi đã được thêm dấu chấm hàng nghìn
 */
export function formatInputValue(inputStr) {
  if (!inputStr) return '';
  const cleanStr = String(inputStr).replace(/[^0-9,]/g, '');
  if (!cleanStr) return '';

  const parts = cleanStr.split(',');
  const integerPart = parts[0];
  const decimalPart = parts.length > 1 ? ',' + parts.slice(1).join('') : '';

  // Định dạng phần nguyên với dấu chấm
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return formattedInteger + decimalPart;
}

/**
 * Parse chuỗi định dạng Việt Nam về số Number Javascript thuần túy
 * "20.000" -> 20000, "1.500.000,5" -> 1500000.5
 * @param {string} formattedStr
 * @returns {number}
 */
export function parseNumberVi(formattedStr) {
  if (!formattedStr) return 0;
  const clean = String(formattedStr).replace(/\./g, '').replace(/,/g, '.');
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

/**
 * Đọc số tiền thành chữ tiếng Việt (Ví dụ: 20.000 -> Hai mươi nghìn đồng)
 * Giúp người dùng kiểm tra số 0 chính xác khi giao dịch tài chính
 */
const chuSo = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
const tien = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];

function docSo3ChuSo(baso) {
  let tram = Math.floor(baso / 100);
  let chuc = Math.floor((baso % 100) / 10);
  let donvi = baso % 10;
  let ketQua = '';

  if (tram === 0 && chuc === 0 && donvi === 0) return '';

  if (tram !== 0) {
    ketQua += chuSo[tram] + ' trăm ';
    if (chuc === 0 && donvi !== 0) ketQua += 'lẻ ';
  }

  if (chuc !== 0 && chuc !== 1) {
    ketQua += chuSo[chuc] + ' mươi';
    if (chuc === 0 && donvi !== 0) ketQua += ' linh ';
  }

  if (chuc === 1) ketQua += 'mười';

  switch (donvi) {
    case 1:
      if (chuc !== 0 && chuc !== 1) ketQua += ' mốt';
      else ketQua += ' một';
      break;
    case 5:
      if (chuc === 0) ketQua += ' năm';
      else ketQua += ' lăm';
      break;
    default:
      if (donvi !== 0) ketQua += ' ' + chuSo[donvi];
      break;
  }
  return ketQua.trim();
}

export function readMoneyToVietnameseWords(soTien) {
  const num = typeof soTien === 'number' ? Math.floor(soTien) : Math.floor(parseNumberVi(soTien));
  if (num <= 0 || isNaN(num) || num > 999999999999999) return '';

  let s = String(num);
  let viTri = [];
  for (let i = s.length; i > 0; i -= 3) {
    viTri.push(s.substring(Math.max(0, i - 3), i));
  }

  let doc = [];
  for (let i = 0; i < viTri.length; i++) {
    let baChuSo = parseInt(viTri[i], 10);
    if (baChuSo > 0) {
      let docBa = docSo3ChuSo(baChuSo);
      if (docBa) {
        doc.unshift(docBa + (tien[i] ? ' ' + tien[i] : ''));
      }
    }
  }

  let res = doc.join(' ').replace(/\s+/g, ' ').trim();
  if (!res) return '';
  return res.charAt(0).toUpperCase() + res.slice(1) + ' đồng';
}
