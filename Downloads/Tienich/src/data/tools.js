export const TOOLS = [
  // --- A. CÔNG CỤ TÍNH TOÁN (14 tools) ---
  {
    id: 'tinh-phan-tram',
    slug: 'tinh-phan-tram',
    name: 'Tính phần trăm',
    category: 'calculator',
    icon: 'Percent',
    isPopular: true,
    isNew: false,
    description: 'Tính toán tỷ lệ phần trăm của một số, giá trị tương ứng hoặc tỷ số giữa hai giá trị một cách nhanh chóng.',
    keywords: ['phần trăm', 'tính %', 'tỷ lệ', 'percentage', 'tính toán'],
    guide: [
      'Chọn kiểu tính phần trăm phù hợp (ví dụ: X% của Y là bao nhiêu).',
      'Nhập số liệu vào các ô tương ứng.',
      'Hệ thống tự động hiển thị kết quả kèm công thức chi tiết.',
      'Bấm nút "Sao chép" để lấy kết quả tính toán.'
    ],
    examples: [
      '15% của 2.500.000 VNĐ là 375.000 VNĐ.',
      'Số 50 chiếm 25% của số 200.'
    ],
    faqs: [
      { q: 'Công thức tính X% của Y là gì?', a: 'Công thức là: (X * Y) / 100.' },
      { q: 'Công cụ có giới hạn số tiền hay chữ số không?', a: 'Không, công cụ xử lý số thực tùy ý không giới hạn.' }
    ],
    related: ['tinh-phan-tram-tang-giam', 'tinh-giam-gia', 'tinh-vat']
  },
  {
    id: 'tinh-phan-tram-tang-giam',
    slug: 'tinh-phan-tram-tang-giam',
    name: 'Tính phần trăm tăng giảm',
    category: 'calculator',
    icon: 'TrendingUp',
    isPopular: true,
    isNew: false,
    description: 'Xác định mức độ tăng trưởng hoặc suy giảm giữa giá trị ban đầu và giá trị mới theo tỷ lệ phần trăm.',
    keywords: ['tăng giảm', 'tỷ lệ tăng', 'tỷ lệ giảm', 'growth rate', 'percentage change'],
    guide: [
      'Nhập giá trị cũ (ban đầu) và giá trị mới (sau khi thay đổi).',
      'Bấm Tính toán hoặc xem kết quả tức thì.',
      'Xem phân tích tăng hay giảm bao nhiêu % kèm chênh lệch số tuyệt đối.'
    ],
    examples: [
      'Giá xăng tăng từ 21.000đ lên 23.500đ tương ứng mức tăng 11.9%.',
      'Doanh thu giảm từ 100 triệu xuống 85 triệu tương ứng giảm 15%.'
    ],
    faqs: [
      { q: 'Công thức tính % tăng giảm?', a: 'Tỷ lệ % = ((Giá trị mới - Giá trị cũ) / Giá trị cũ) * 100%.' }
    ],
    related: ['tinh-phan-tram', 'tinh-giam-gia']
  },
  {
    id: 'tinh-giam-gia',
    slug: 'tinh-giam-gia',
    name: 'Tính giảm giá (Sale off)',
    category: 'calculator',
    icon: 'BadgePercent',
    isPopular: true,
    isNew: false,
    description: 'Tính giá sau khi giảm giá hoặc khuyến mãi, số tiền tiết kiệm được khi đi mua sắm.',
    keywords: ['giảm giá', 'sale', 'khuyến mãi', 'discount', 'tiết kiệm'],
    guide: [
      'Nhập giá gốc của sản phẩm.',
      'Nhập phần trăm giảm giá (hoặc số tiền giảm trực tiếp).',
      'Xem số tiền thực trả và số tiền bạn tiết kiệm được.'
    ],
    examples: [
      'Áo khoác 850.000 VNĐ giảm 30% -> Giá còn 595.000 VNĐ, tiết kiệm 255.000 VNĐ.'
    ],
    faqs: [
      { q: 'Có áp dụng được mã giảm giá kép không?', a: 'Công cụ có ô nhập thêm mã giảm bổ sung (nếu có).' }
    ],
    related: ['tinh-phan-tram', 'tinh-vat']
  },
  {
    id: 'tinh-vat',
    slug: 'tinh-vat',
    name: 'Tính thuế VAT',
    category: 'calculator',
    icon: 'Receipt',
    isPopular: false,
    isNew: false,
    description: 'Tính thuế giá trị gia tăng (VAT 8%, 10%...) trước thuế hoặc sau thuế theo quy định Việt Nam.',
    keywords: ['thuế vat', 'tính vat', 'giá trước thuế', 'giá sau thuế', 'hóa đơn'],
    guide: [
      'Chọn hình thức: Giá chưa có VAT hoặc Giá đã bao gồm VAT.',
      'Nhập số tiền và chọn mức thuế suất (8%, 10% hoặc tùy chỉnh).',
      'Xem số tiền thuế VAT và tổng thanh toán.'
    ],
    examples: [
      'Hóa đơn 1.000.000đ chưa VAT (10%) -> Thuế VAT: 100.000đ, Tổng thanh toán: 1.100.000đ.'
    ],
    faqs: [
      { q: 'Mức thuế suất VAT phổ biến ở VN hiện nay là bao nhiêu?', a: 'Phổ biến nhất là 8% (giảm theo chính sách hỗ trợ) và 10%.' }
    ],
    related: ['tinh-phan-tram', 'tinh-giam-gia']
  },
  {
    id: 'tinh-lai-kep',
    slug: 'tinh-lai-kep',
    name: 'Tính lãi kép (Compound Interest)',
    category: 'calculator',
    icon: 'LineChart',
    isPopular: true,
    isNew: false,
    description: 'Dự đoán số tiền tích lũy và sức mạnh kỳ diệu của lãi kép theo tháng, quý hoặc năm.',
    keywords: ['lãi kép', 'tiết kiệm', 'đầu tư', 'compound interest', 'tài chính cá nhân'],
    guide: [
      'Nhập số tiền gốc ban đầu.',
      'Nhập số tiền gửi định kỳ hàng tháng/năm (nếu có).',
      'Nhập lãi suất hàng năm (%) và thời gian đầu tư.',
      'Xem bảng và biểu đồ tăng trưởng số dư theo thời gian.'
    ],
    examples: [
      'Đầu tư 50 triệu với lãi suất 8%/năm trong 10 năm -> Tổng thu về hơn 107.9 triệu đồng.'
    ],
    faqs: [
      { q: 'Lãi kép khác gì lãi đơn?', a: 'Lãi kép là tiền lãi phát sinh lại được cộng dồn vào gốc để tiếp tục sinh lãi ở kỳ tiếp theo.' }
    ],
    related: ['tinh-lai-don', 'tinh-khoan-vay-tra-gop']
  },
  {
    id: 'tinh-lai-don',
    slug: 'tinh-lai-don',
    name: 'Tính lãi đơn',
    category: 'calculator',
    icon: 'Coins',
    isPopular: false,
    isNew: false,
    description: 'Tính toán nhanh lãi suất đơn giản trên số vốn gốc cho các khoản vay hoặc gửi tiền ngắn hạn.',
    keywords: ['lãi đơn', 'simple interest', 'tiền gửi ngắn hạn'],
    guide: [
      'Nhập số tiền gốc.',
      'Nhập lãi suất (% / năm).',
      'Nhập số ngày, tháng hoặc năm gửi.',
      'Nhận ngay tổng tiền lãi và tổng số tiền nhận được.'
    ],
    examples: [
      'Gửi 20 triệu lãi 6%/năm trong 6 tháng -> Tiền lãi nhận được là 600.000 VNĐ.'
    ],
    faqs: [
      { q: 'Công thức tính lãi đơn?', a: 'Tiền lãi = Gốc * Lãi suất * Thời gian.' }
    ],
    related: ['tinh-lai-kep', 'tinh-khoan-vay-tra-gop']
  },
  {
    id: 'tinh-khoan-vay-tra-gop',
    slug: 'tinh-khoan-vay-tra-gop',
    name: 'Tính khoản vay và trả góp',
    category: 'calculator',
    icon: 'CreditCard',
    isPopular: true,
    isNew: false,
    description: 'Lập bảng lịch trả góp hàng tháng theo dư nợ giảm dần hoặc dư nợ gốc ban đầu khi vay mua nhà, xe.',
    keywords: ['khoản vay', 'trả góp', 'vay ngân hàng', 'dư nợ giảm dần', 'lãi suất'],
    guide: [
      'Nhập số tiền vay và thời hạn vay (số tháng).',
      'Nhập lãi suất vay (%/năm).',
      'Chọn phương thức trả: Theo dư nợ giảm dần hoặc Gốc chia đều + lãi.',
      'Xem bảng chi tiết từng tháng số tiền gốc, tiền lãi và tổng phải trả.'
    ],
    examples: [
      'Vay 100.000.000đ trong 12 tháng lãi 10%/năm theo dư nợ giảm dần -> Tháng đầu trả khoảng 9.16 triệu, giảm dần về sau.'
    ],
    faqs: [
      { q: 'Nên chọn dư nợ ban đầu hay dư nợ giảm dần?', a: 'Hầu hết các ngân hàng hiện nay áp dụng phương thức tính theo dư nợ giảm dần để bảo vệ quyền lợi người vay.' }
    ],
    related: ['tinh-lai-kep', 'tinh-vat']
  },
  {
    id: 'tinh-gpa',
    slug: 'tinh-gpa',
    name: 'Tính GPA đại học',
    category: 'calculator',
    icon: 'GraduationCap',
    isPopular: true,
    isNew: false,
    description: 'Quy đổi và tính điểm trung bình tích lũy GPA hệ 4 và hệ 10 kèm xếp loại học lực học sinh, sinh viên.',
    keywords: ['gpa', 'điểm trung bình', 'tích lũy', 'hệ 4', 'hệ 10', 'học lực'],
    guide: [
      'Nhập tên môn học, số tín chỉ và điểm số (hoặc điểm chữ A, B, C...).',
      'Bấm thêm môn học để nhập nhiều môn.',
      'Hệ thống tự động tính điểm GPA hệ 4, hệ 10 và hiển thị xếp hạng học lực (Xuất sắc, Giỏi, Khá...).'
    ],
    examples: [
      'Môn Toán (3 tín) điểm 8.5, Lý (3 tín) điểm 7.0 -> Điểm GPA hệ 10: 7.75, hệ 4: 3.25 (Loại Khá/Giỏi).'
    ],
    faqs: [
      { q: 'Hệ 4 quy đổi điểm chữ như thế nào?', a: 'A = 4.0, B+ = 3.5, B = 3.0, C+ = 2.5, C = 2.0, D+ = 1.5, D = 1.0, F = 0.' }
    ],
    related: ['tinh-diem-thi-can-dat']
  },
  {
    id: 'tinh-diem-thi-can-dat',
    slug: 'tinh-diem-thi-can-dat',
    name: 'Tính điểm thi cần đạt',
    category: 'calculator',
    icon: 'Target',
    isPopular: false,
    isNew: true,
    description: 'Tính số điểm thi cuối kỳ hoặc môn còn lại cần đạt để qua môn hoặc đạt mục tiêu GPA mong muốn.',
    keywords: ['điểm thi', 'cần đạt', 'qua môn', 'điểm cuối kỳ', 'điểm quá trình'],
    guide: [
      'Nhập điểm quá trình (chuyên cần, giữa kỳ, bài tập...) và trọng số của chúng.',
      'Nhập trọng số điểm thi kết thúc môn (ví dụ 50%).',
      'Nhập điểm tổng kết mục tiêu (ví dụ 5.0 để qua môn, 8.0 để đạt Giỏi).',
      'Nhận ngay điểm thi tối thiểu bạn cần đạt.'
    ],
    examples: [
      'Điểm quá trình 6.0 (chiếm 40%), mục tiêu tổng kết 7.0 (thi chiếm 60%) -> Cần đạt ít nhất 7.67 ở bài thi cuối kỳ.'
    ],
    faqs: [
      { q: 'Nếu điểm cần đạt lớn hơn 10 thì sao?', a: 'Hệ thống sẽ cảnh báo mục tiêu không khả thi dựa trên điểm quá trình hiện tại.' }
    ],
    related: ['tinh-gpa']
  },
  {
    id: 'chia-tien-nhom',
    slug: 'chia-tien-nhom',
    name: 'Chia tiền theo nhóm (Bill Splitter)',
    category: 'calculator',
    icon: 'Users',
    isPopular: true,
    isNew: false,
    description: 'Chia tiền ăn uống, đi chơi du lịch công bằng, hỗ trợ tip và người không tham gia món nào đó.',
    keywords: ['chia tiền', 'bill split', 'chia bill', 'chia tiền ăn', 'nhóm'],
    guide: [
      'Nhập tổng số tiền trên hóa đơn (hoặc danh sách các món).',
      'Nhập số người tham gia và danh sách tên các thành viên.',
      'Thêm tiền tip hoặc phí dịch vụ nếu có.',
      'Xem số tiền mỗi người cần chuyển khoản chính xác đến từng đồng.'
    ],
    examples: [
      'Bữa ăn 680.000đ gồm 4 người -> Mỗi người thanh toán 170.000đ.'
    ],
    faqs: [
      { q: 'Có chia theo món cụ thể cho từng người được không?', a: 'Có, bạn có thể chọn chế độ chia đều hoặc chia theo món từng người ăn.' }
    ],
    related: ['tinh-phan-tram', 'tinh-vat']
  },
  {
    id: 'tinh-tuoi',
    slug: 'tinh-tuoi',
    name: 'Tính tuổi chính xác',
    category: 'calculator',
    icon: 'Calendar',
    isPopular: false,
    isNew: false,
    description: 'Tính chính xác tuổi của bạn theo năm, tháng, ngày, giờ, phút và đếm ngược sinh nhật tiếp theo.',
    keywords: ['tính tuổi', 'ngày sinh', 'tuổi chính xác', 'sinh nhật', 'bao nhiêu ngày tuổi'],
    guide: [
      'Chọn ngày, tháng, năm sinh của bạn.',
      'Xem tuổi của bạn theo năm, tháng, ngày.',
      'Khám phá tổng số ngày bạn đã sống trên trái đất và ngày sinh nhật tiếp theo.'
    ],
    examples: [
      'Sinh ngày 15/05/2000 -> 24 tuổi, 5 tháng, 16 ngày.'
    ],
    faqs: [
      { q: 'Công cụ có tính đến năm nhuận không?', a: 'Có, thuật toán tính toán lịch chính xác tuyệt đối kể cả năm nhuận.' }
    ],
    related: ['tinh-ngay-giua-hai-moc', 'dem-ngay-den-su-kien']
  },
  {
    id: 'tinh-ngay-giua-hai-moc',
    slug: 'tinh-ngay-giua-hai-moc',
    name: 'Tính ngày giữa hai mốc thời gian',
    category: 'calculator',
    icon: 'CalendarRange',
    isPopular: false,
    isNew: false,
    description: 'Đo lường khoảng cách giữa hai ngày bất kỳ: tổng số ngày, số tuần, ngày làm việc loại trừ cuối tuần.',
    keywords: ['khoảng cách ngày', 'đếm ngày', 'ngày giữa hai mốc', 'days between'],
    guide: [
      'Chọn ngày bắt đầu và ngày kết thúc.',
      'Chọn tùy chọn có bao gồm ngày kết thúc hay trừ ngày thứ 7 & chủ nhật.',
      'Xem kết quả chi tiết.'
    ],
    examples: [
      'Từ ngày 01/01/2025 đến 30/04/2025 là 119 ngày (khoảng 17 tuần).'
    ],
    faqs: [
      { q: 'Có trừ ngày lễ được không?', a: 'Công cụ hỗ trợ tùy chọn trừ ngày cuối tuần.' }
    ],
    related: ['tinh-tuoi', 'dem-ngay-den-su-kien']
  },
  {
    id: 'chuyen-doi-don-vi',
    slug: 'chuyen-doi-don-vi',
    name: 'Chuyển đổi đơn vị đo lường',
    category: 'calculator',
    icon: 'ArrowLeftRight',
    isPopular: true,
    isNew: false,
    description: 'Quy đổi chiều dài (m, km, inch, ft), khối lượng (kg, g, pound, ounce) và nhiệt độ (°C, °F, K).',
    keywords: ['đổi đơn vị', 'chiều dài', 'khối lượng', 'nhiệt độ', 'inch sang cm', 'kg sang lbs'],
    guide: [
      'Chọn nhóm đại lượng: Chiều dài, Khối lượng hoặc Nhiệt độ.',
      'Nhập giá trị và chọn đơn vị ban đầu.',
      'Chọn đơn vị đích cần chuyển đổi để xem kết quả ngay.'
    ],
    examples: [
      '1 inch = 2.54 cm; 1 pound (lbs) = 0.453592 kg; 100 °C = 212 °F.'
    ],
    faqs: [
      { q: 'Độ chính xác bao nhiêu chữ số thập phân?', a: 'Bạn có thể tùy chỉnh làm tròn từ 2 đến 6 chữ số thập phân.' }
    ],
    related: ['chuyen-doi-dung-luong', 'tinh-bmi']
  },
  {
    id: 'tinh-bmi',
    slug: 'tinh-bmi',
    name: 'Tính chỉ số BMI cơ thể',
    category: 'calculator',
    icon: 'Activity',
    isPopular: true,
    isNew: false,
    description: 'Đánh giá tình trạng thể trạng gầy, chuẩn, thừa cân hay béo phì theo tiêu chuẩn WHO và người Châu Á.',
    keywords: ['bmi', 'chỉ số bmi', 'cân nặng', 'chiều cao', 'sức khỏe', 'thừa cân'],
    guide: [
      'Nhập chiều cao (cm hoặc m) và cân nặng (kg).',
      'Chọn giới tính và độ tuổi (nếu cần phân tích sâu hơn).',
      'Xem chỉ số BMI, phân loại thể trạng và khoảng cân nặng lý tưởng.'
    ],
    examples: [
      'Cao 1m70 nặng 65kg -> BMI = 22.49 (Thể trạng bình thường, cân đối).'
    ],
    faqs: [
      { q: 'Chỉ số BMI chuẩn cho người Việt Nam là bao nhiêu?', a: 'Theo chuẩn Châu Á (IDI & WPRO), BMI từ 18.5 đến 22.9 là mức lý tưởng.' }
    ],
    related: ['chuyen-doi-don-vi', 'tinh-tuoi']
  },

  // --- B. CÔNG CỤ VĂN BẢN (10 tools) ---
  {
    id: 'dem-tu-va-ky-tu',
    slug: 'dem-tu-va-ky-tu',
    name: 'Đếm từ và ký tự',
    category: 'text',
    icon: 'Type',
    isPopular: true,
    isNew: false,
    description: 'Đếm số từ, ký tự (có và không dấu cách), số câu, số đoạn văn và thời gian đọc dự kiến.',
    keywords: ['đếm từ', 'đếm ký tự', 'word count', 'character count', 'đoạn văn'],
    guide: [
      'Dán hoặc nhập đoạn văn bản vào khung soạn thảo.',
      'Các chỉ số thống kê sẽ tự động cập nhật ngay lập tức.',
      'Bấm nút Copy kết quả hoặc Xóa để làm mới.'
    ],
    examples: [
      '"Tiện Ích Miễn Phí" -> 4 từ, 17 ký tự (bao gồm khoảng trắng).'
    ],
    faqs: [
      { q: 'Thời gian đọc được tính như thế nào?', a: 'Tính dựa trên tốc độ đọc trung bình 200 từ/phút của người lớn.' }
    ],
    related: ['xoa-khoang-trang-thua', 'chuyen-slug-url']
  },
  {
    id: 'chuyen-chu-thuong-thanh-hoa',
    slug: 'chuyen-chu-thuong-thanh-hoa',
    name: 'Chuyển chữ thường thành chữ hoa',
    category: 'text',
    icon: 'CaseUpper',
    isPopular: false,
    isNew: false,
    description: 'Chuyển toàn bộ văn bản sang chữ in hoa (UPPERCASE) hỗ trợ đầy đủ tiếng Việt có dấu.',
    keywords: ['chữ hoa', 'uppercase', 'in hoa', 'viết hoa'],
    guide: [
      'Dán văn bản cần chuyển đổi vào ô nhập liệu.',
      'Bấm nút "Chuyển thành chữ hoa".',
      'Sao chép kết quả về clipboard chỉ với 1 click.'
    ],
    examples: [
      '"xin chào việt nam" -> "XIN CHÀO VIỆT NAM"'
    ],
    faqs: [
      { q: 'Có bị lỗi font tiếng Việt không?', a: 'Không, công cụ xử lý chuẩn Unicode mọi ký tự tiếng Việt.' }
    ],
    related: ['chuyen-chu-hoa-thanh-thuong', 'viet-hoa-chu-cai-dau']
  },
  {
    id: 'chuyen-chu-hoa-thanh-thuong',
    slug: 'chuyen-chu-hoa-thanh-thuong',
    name: 'Chuyển chữ hoa thành chữ thường',
    category: 'text',
    icon: 'CaseLower',
    isPopular: false,
    isNew: false,
    description: 'Chuyển đổi toàn bộ văn bản in hoa về chữ viết thường (lowercase) nhanh chóng.',
    keywords: ['chữ thường', 'lowercase', 'viết thường', 'văn bản'],
    guide: [
      'Nhập hoặc dán đoạn văn bản in hoa.',
      'Xem kết quả chuyển sang chữ thường tự động.',
      'Bấm Copy để sử dụng.'
    ],
    examples: [
      '"CÔNG CỤ TIỆN ÍCH" -> "công cụ tiện ích"'
    ],
    faqs: [
      { q: 'Có giới hạn độ dài văn bản không?', a: 'Không, bạn có thể xử lý văn bản dài hàng nghìn từ.' }
    ],
    related: ['chuyen-chu-thuong-thanh-hoa', 'viet-hoa-chu-cai-dau']
  },
  {
    id: 'viet-hoa-chu-cai-dau',
    slug: 'viet-hoa-chu-cai-dau',
    name: 'Viết hoa chữ cái đầu mỗi từ',
    category: 'text',
    icon: 'Captions',
    isPopular: false,
    isNew: false,
    description: 'Viết hoa chữ cái đầu tiên của từng từ (Title Case / Capitalize) chuẩn hóa tiêu đề và tên riêng.',
    keywords: ['viết hoa chữ đầu', 'title case', 'capitalize', 'chuẩn hóa tiêu đề'],
    guide: [
      'Nhập câu hoặc danh sách tên cần chuẩn hóa.',
      'Chọn kiểu Viết Hoa Đầu Từ hoặc Viết hoa đầu câu.',
      'Sao chép kết quả đã được format gọn gàng.'
    ],
    examples: [
      '"nguyễn văn an" -> "Nguyễn Văn An"'
    ],
    faqs: [
      { q: 'Có viết hoa các từ như và, của không?', a: 'Bạn có thể chọn giữ nguyên hoặc viết hoa toàn bộ chữ cái đầu mỗi từ.' }
    ],
    related: ['chuyen-chu-thuong-thanh-hoa', 'xoa-khoang-trang-thua']
  },
  {
    id: 'xoa-khoang-trang-thua',
    slug: 'xoa-khoang-trang-thua',
    name: 'Xóa khoảng trắng thừa',
    category: 'text',
    icon: 'AlignLeft',
    isPopular: true,
    isNew: false,
    description: 'Loại bỏ khoảng trắng kép, khoảng trắng đầu dòng, cuối dòng và chuẩn hóa dấu cách văn bản.',
    keywords: ['xóa khoảng trắng', 'khoảng trắng thừa', 'trim', 'chuẩn hóa dấu cách', 'văn bản'],
    guide: [
      'Dán đoạn văn bản bị lỗi nhiều dấu cách.',
      'Công cụ tự động gộp các khoảng trắng liên tiếp thành 1 dấu cách duy nhất.',
      'Bấm sao chép kết quả sạch sẽ.'
    ],
    examples: [
      '"Đây   là    văn   bản" -> "Đây là văn bản"'
    ],
    faqs: [
      { q: 'Có xóa dấu cách đầu câu không?', a: 'Có, các khoảng trắng ở đầu và cuối mỗi dòng sẽ được loại bỏ.' }
    ],
    related: ['xoa-dong-trong', 'dem-tu-va-ky-tu']
  },
  {
    id: 'xoa-dong-trong',
    slug: 'xoa-dong-trong',
    name: 'Xóa dòng trống',
    category: 'text',
    icon: 'ListFilter',
    isPopular: false,
    isNew: false,
    description: 'Lọc và loại bỏ tất cả các dòng trống vô nghĩa trong danh sách, dữ liệu hoặc văn bản.',
    keywords: ['xóa dòng trống', 'remove empty lines', 'dòng trắng', 'làm sạch danh sách'],
    guide: [
      'Dán dữ liệu có nhiều dòng trống thừa thãi.',
      'Công cụ lọc bỏ toàn bộ các dòng không có nội dung.',
      'Tải về hoặc sao chép kết quả đã thu gọn.'
    ],
    examples: [
      'Danh sách 10 dòng có 4 dòng trống -> Còn lại 6 dòng liên tục.'
    ],
    faqs: [
      { q: 'Dòng chỉ có dấu cách có bị xóa không?', a: 'Có, các dòng chỉ chứa khoảng trắng cũng sẽ được nhận diện và xóa sạch.' }
    ],
    related: ['xoa-khoang-trang-thua', 'dao-nguoc-van-ban']
  },
  {
    id: 'dao-nguoc-van-ban',
    slug: 'dao-nguoc-van-ban',
    name: 'Đảo ngược văn bản',
    category: 'text',
    icon: 'RefreshCw',
    isPopular: false,
    isNew: false,
    description: 'Đảo ngược thứ tự các ký tự, đảo ngược từng từ hoặc đảo ngược thứ tự các dòng trong đoạn văn.',
    keywords: ['đảo ngược', 'reverse text', 'lật ngược chữ', 'đảo dòng'],
    guide: [
      'Nhập văn bản cần đảo ngược.',
      'Chọn chế độ: Đảo toàn bộ ký tự, Đảo thứ tự từ, hoặc Đảo thứ tự dòng.',
      'Xem kết quả ngay lập tức và sao chép.'
    ],
    examples: [
      '"ABCDE" -> "EDCBA"; "Một Hai Ba" -> "Ba Hai Một"'
    ],
    faqs: [
      { q: 'Có giữ nguyên dấu tiếng Việt không?', a: 'Có, công cụ sử dụng thuật toán mảng Unicode chuẩn để không bị tách rời dấu tiếng Việt.' }
    ],
    related: ['viet-hoa-chu-cai-dau', 'tao-lorem-ipsum']
  },
  {
    id: 'so-sanh-van-ban',
    slug: 'so-sanh-van-ban',
    name: 'So sánh hai đoạn văn bản (Diff)',
    category: 'text',
    icon: 'GitCompare',
    isPopular: true,
    isNew: false,
    description: 'So sánh 2 đoạn văn bản hoặc code để tìm các điểm thêm, bớt, chỉnh sửa với màu sắc trực quan.',
    keywords: ['so sánh văn bản', 'diff text', 'so sánh code', 'kiểm tra khác biệt', 'text compare'],
    guide: [
      'Dán văn bản gốc vào ô bên trái.',
      'Dán văn bản mới (đã sửa đổi) vào ô bên phải.',
      'Xem vùng hiển thị khác biệt: màu xanh lá (thêm mới), màu đỏ (bị xóa).'
    ],
    examples: [
      'So sánh 2 phiên bản hợp đồng hoặc 2 đoạn mã nguồn xem điểm thay đổi.'
    ],
    faqs: [
      { q: 'Có hỗ trợ so sánh từng ký tự hay theo từ không?', a: 'Hỗ trợ cả chế độ so sánh theo từ, theo dòng và theo ký tự.' }
    ],
    related: ['dem-tu-va-ky-tu', 'json-validator']
  },
  {
    id: 'tao-lorem-ipsum',
    slug: 'tao-lorem-ipsum',
    name: 'Tạo văn bản mẫu Lorem Ipsum',
    category: 'text',
    icon: 'FileCode2',
    isPopular: false,
    isNew: false,
    description: 'Tạo đoạn văn bản giả lập (dummy text) theo số đoạn, số từ hoặc câu phục vụ thiết kế giao diện.',
    keywords: ['lorem ipsum', 'văn bản mẫu', 'dummy text', 'placeholder text', 'thiết kế'],
    guide: [
      'Chọn số lượng đoạn văn (paragraphs), từ (words) hoặc câu (sentences) muốn tạo.',
      'Tùy chọn bắt đầu bằng "Lorem ipsum dolor sit amet...".',
      'Bấm Tạo và bấm Sao chép để dán vào bản thiết kế của bạn.'
    ],
    examples: [
      'Tạo nhanh 3 đoạn văn bản mẫu chuẩn cho bố cục website.'
    ],
    faqs: [
      { q: 'Lorem ipsum có nghĩa là gì?', a: 'Đây là đoạn văn tiếng Latinh cổ trích từ tác phẩm của Cicero, được giới in ấn dùng từ thế kỷ 16.' }
    ],
    related: ['dem-tu-va-ky-tu', 'chuyen-slug-url']
  },
  {
    id: 'chuyen-slug-url',
    slug: 'chuyen-slug-url',
    name: 'Chuyển văn bản thành slug URL',
    category: 'text',
    icon: 'Link',
    isPopular: true,
    isNew: false,
    description: 'Chuyển tiêu đề tiếng Việt có dấu thành đường dẫn URL thân thiện SEO không dấu nối bằng gạch ngang.',
    keywords: ['slug', 'tạo slug', 'slug url', 'bỏ dấu tiếng việt', 'url thân thiện', 'seo'],
    guide: [
      'Nhập tiêu đề bài viết hoặc chuỗi tiếng Việt.',
      'Hệ thống tự động loại bỏ dấu tiếng Việt, ký tự đặc biệt và thay khoảng trắng bằng dấu gạch ngang (-).',
      'Sao chép slug chuẩn SEO để gắn vào đường dẫn bài viết.'
    ],
    examples: [
      '"Tiện Ích - Công Cụ Trực Tuyến Miễn Phí" -> "tien-ich-cong-cu-truc-tuyen-mien-phi"'
    ],
    faqs: [
      { q: 'Có xử lý ký tự đặc biệt như @, #, $, % không?', a: 'Có, các ký tự này được tự động loại bỏ để đảm bảo URL an toàn và hợp lệ.' }
    ],
    related: ['url-encode-decode', 'dem-tu-va-ky-tu']
  },

  // --- C. CÔNG CỤ LẬP TRÌNH (13 tools) ---
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter',
    category: 'developer',
    icon: 'Braces',
    isPopular: true,
    isNew: false,
    description: 'Định dạng và thụt lề chuỗi JSON đẹp mắt, dễ đọc với màu cú pháp trực quan.',
    keywords: ['json format', 'json formatter', 'làm đẹp json', 'indent json', 'prettify'],
    guide: [
      'Dán chuỗi JSON dạng thô vào khung soạn thảo.',
      'Chọn kích thước thụt lề (2 spaces hoặc 4 spaces).',
      'Bấm Format và xem kết quả thụt lề rõ ràng.'
    ],
    examples: [
      '{"name":"John","age":30} được định dạng thành nhiều dòng thụt lề chuẩn.'
    ],
    faqs: [
      { q: 'Nếu JSON bị lỗi cú pháp thì sao?', a: 'Công cụ sẽ thông báo dòng và vị trí bị lỗi để bạn dễ dàng sửa.' }
    ],
    related: ['json-validator', 'json-minifier', 'json-beautifier']
  },
  {
    id: 'json-validator',
    slug: 'json-validator',
    name: 'JSON Validator',
    category: 'developer',
    icon: 'CheckCircle2',
    isPopular: false,
    isNew: false,
    description: 'Kiểm tra tính hợp lệ của cú pháp JSON, phát hiện chính xác vị trí lỗi thiếu dấu phẩy, ngoặc nhọn.',
    keywords: ['validate json', 'kiểm tra json', 'json check', 'lỗi json', 'json syntax'],
    guide: [
      'Dán chuỗi JSON cần kiểm tra vào ô nhập.',
      'Hệ thống tự động phân tích cú pháp.',
      'Nhận thông báo JSON hợp lệ hoặc mô tả chi tiết lỗi cú pháp kèm số dòng.'
    ],
    examples: [
      'Phát hiện dấu phẩy thừa ở cuối mảng hoặc thiếu dấu ngoặc đóng }.'
    ],
    faqs: [
      { q: 'Dữ liệu JSON có được gửi lên máy chủ không?', a: 'Không, mọi quá trình kiểm tra diễn ra 100% trong trình duyệt của bạn.' }
    ],
    related: ['json-formatter', 'json-beautifier']
  },
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    name: 'JSON Minifier (Nén JSON)',
    category: 'developer',
    icon: 'Minimize2',
    isPopular: false,
    isNew: false,
    description: 'Nén gọn chuỗi JSON bằng cách xóa toàn bộ khoảng trắng, dấu xuống dòng thừa để tiết kiệm dung lượng.',
    keywords: ['nén json', 'minify json', 'json minifier', 'compact json'],
    guide: [
      'Dán chuỗi JSON đã định dạng nhiều dòng.',
      'Bấm Nén (Minify).',
      'Sao chép chuỗi JSON 1 dòng siêu gọn để gửi qua API hoặc lưu trữ.'
    ],
    examples: [
      'JSON từ 10KB có thể giảm xuống còn 6KB sau khi nén bỏ khoảng trắng.'
    ],
    faqs: [
      { q: 'Nén có làm mất dữ liệu không?', a: 'Hoàn toàn không, cấu trúc và giá trị dữ liệu được giữ nguyên vẹn 100%.' }
    ],
    related: ['json-formatter', 'json-beautifier']
  },
  {
    id: 'json-beautifier',
    slug: 'json-beautifier',
    name: 'JSON Beautifier',
    category: 'developer',
    icon: 'Sparkles',
    isPopular: false,
    isNew: false,
    description: 'Làm đẹp chuỗi JSON với highlight màu sắc cho Key, String, Number, Boolean và Null.',
    keywords: ['beautify json', 'làm đẹp json', 'json highlight', 'json color'],
    guide: [
      'Nhập JSON vào khung làm việc.',
      'Xem bản preview màu sắc trực quan.',
      'Sao chép hoặc tải file .json về máy.'
    ],
    examples: [
      'Hiển thị trực quan các cấp lồng nhau trong dữ liệu API phức tạp.'
    ],
    faqs: [
      { q: 'Có thể tải file JSON từ máy lên không?', a: 'Có, bạn có thể tải file .json hoặc .txt trực tiếp.' }
    ],
    related: ['json-formatter', 'json-validator']
  },
  {
    id: 'base64-encode-decode',
    slug: 'base64-encode-decode',
    name: 'Base64 Encode & Decode',
    category: 'developer',
    icon: 'Binary',
    isPopular: true,
    isNew: false,
    description: 'Mã hóa văn bản thành chuỗi Base64 và giải mã chuỗi Base64 ngược lại về văn bản gốc UTF-8.',
    keywords: ['base64', 'encode base64', 'decode base64', 'mã hóa', 'giải mã'],
    guide: [
      'Chọn tab Mã hóa (Encode) hoặc Giải mã (Decode).',
      'Nhập chuỗi văn bản cần xử lý.',
      'Kết quả chuyển đổi hiển thị ngay lập tức.'
    ],
    examples: [
      '"Tiện Ích" mã hóa Base64 thành "VGnhu4duIMONY2g="'
    ],
    faqs: [
      { q: 'Có bị lỗi ký tự tiếng Việt không?', a: 'Công cụ mã hóa đúng chuẩn UTF-8 nên hiển thị chính xác mọi ký tự tiếng Việt.' }
    ],
    related: ['url-encode-decode', 'chuyen-slug-url']
  },
  {
    id: 'url-encode-decode',
    slug: 'url-encode-decode',
    name: 'URL Encode & Decode',
    category: 'developer',
    icon: 'Link2',
    isPopular: false,
    isNew: false,
    description: 'Mã hóa URL (chuyển ký tự đặc biệt thành %XX) hoặc giải mã URL query string chuẩn RFC 3986.',
    keywords: ['url encode', 'url decode', 'mã hóa url', 'giải mã url', 'percent encoding'],
    guide: [
      'Chọn chức năng Mã hóa hoặc Giải mã.',
      'Dán đường link URL hoặc tham số vào khung.',
      'Xem chuỗi đã mã hóa an toàn để truyền qua HTTP GET.'
    ],
    examples: [
      '"hà nội" mã hóa thành "h%C3%A0%20n%E1%BB%99i"'
    ],
    faqs: [
      { q: 'Khác nhau giữa encodeURI và encodeURIComponent là gì?', a: 'encodeURIComponent mã hóa cả các dấu như ?, &, = phù hợp cho tham số query.' }
    ],
    related: ['base64-encode-decode', 'chuyen-slug-url']
  },
  {
    id: 'html-formatter',
    slug: 'html-formatter',
    name: 'HTML Formatter & Beautifier',
    category: 'developer',
    icon: 'Code',
    isPopular: false,
    isNew: false,
    description: 'Tự động thụt lề các thẻ HTML lồng nhau, chuẩn hóa cấu trúc thẻ đóng mở gọn gàng, chuẩn W3C.',
    keywords: ['html format', 'beautify html', 'định dạng html', 'thụt lề html'],
    guide: [
      'Dán đoạn mã HTML thô vào ô bên trái.',
      'Bấm Định dạng (Format).',
      'Nhận mã HTML với các thẻ được thụt lề chuẩn xác.'
    ],
    examples: [
      '<div><p>Hello</p></div> được định dạng thành các dòng thụt lề phân cấp rõ ràng.'
    ],
    faqs: [
      { q: 'Có hỗ trợ định dạng cả đoạn script/style bên trong HTML không?', a: 'Có, các khối CSS và JS nhúng cũng được thụt lề tương ứng.' }
    ],
    related: ['css-formatter', 'javascript-formatter']
  },
  {
    id: 'css-formatter',
    slug: 'css-formatter',
    name: 'CSS Formatter & Minifier',
    category: 'developer',
    icon: 'FileCode',
    isPopular: false,
    isNew: false,
    description: 'Làm đẹp mã nguồn CSS hoặc nén CSS (xóa comment, khoảng trắng) để tăng tốc tải trang web.',
    keywords: ['css format', 'css beautifier', 'nén css', 'minify css', 'stylesheet'],
    guide: [
      'Dán mã CSS của bạn vào ô nhập.',
      'Chọn Làm đẹp (Beautify) để dễ đọc hoặc Nén (Minify) để giảm dung lượng file.',
      'Sao chép kết quả về dự án của bạn.'
    ],
    examples: [
      'Thụt lề các khối selector và thuộc tính CSS thẳng hàng, ngay ngắn.'
    ],
    faqs: [
      { q: 'Nén CSS có tối ưu tốc độ website không?', a: 'Có, giảm dung lượng CSS giúp trình duyệt tải và parse nhanh hơn.' }
    ],
    related: ['html-formatter', 'javascript-formatter']
  },
  {
    id: 'javascript-formatter',
    slug: 'javascript-formatter',
    name: 'JavaScript Formatter',
    category: 'developer',
    icon: 'FileJson',
    isPopular: false,
    isNew: false,
    description: 'Định dạng và thụt lề mã nguồn JavaScript / TypeScript rõ ràng, dễ bảo trì theo chuẩn ES6+.',
    keywords: ['js format', 'javascript beautifier', 'format code js', 'thụt lề js'],
    guide: [
      'Dán đoạn mã JavaScript vào khung soạn thảo.',
      'Chọn kiểu thụt lề (2 spaces, 4 spaces).',
      'Bấm Format để xem code được căn chỉnh chuẩn.'
    ],
    examples: [
      'Căn chỉnh dấu ngoặc nhọn, hàm, câu lệnh if-else thẳng hàng chuẩn mực.'
    ],
    faqs: [
      { q: 'Mã JS có được thực thi không?', a: 'Không, công cụ chỉ xử lý chuỗi ký tự, tuyệt đối không chạy code để bảo đảm an toàn.' }
    ],
    related: ['json-formatter', 'html-formatter']
  },
  {
    id: 'chuyen-doi-timestamp',
    slug: 'chuyen-doi-timestamp',
    name: 'Chuyển đổi Timestamp (Unix Time)',
    category: 'developer',
    icon: 'History',
    isPopular: true,
    isNew: false,
    description: 'Chuyển đổi giữa Unix Epoch Timestamp (giây / mili-giây) và ngày giờ người đọc được theo múi giờ Việt Nam (UTC+7).',
    keywords: ['timestamp', 'unix time', 'epoch converter', 'đổi timestamp', 'giờ utc'],
    guide: [
      'Nhập số timestamp (ví dụ 1730000000) để xem ngày giờ tương ứng.',
      'Hoặc chọn ngày giờ trên lịch để lấy mã timestamp tương ứng.',
      'Xem đồng hồ Unix Epoch thời gian thực đang chạy.'
    ],
    examples: [
      'Timestamp 1700000000 -> Thứ Tư, 15/11/2023 05:13:20 (GMT+7).'
    ],
    faqs: [
      { q: 'Phân biệt timestamp giây và mili-giây như thế nào?', a: 'Timestamp tính bằng giây thường có 10 chữ số, còn mili-giây có 13 chữ số.' }
    ],
    related: ['tinh-tuoi', 'tinh-ngay-giua-hai-moc']
  },
  {
    id: 'tao-uuid',
    slug: 'tao-uuid',
    name: 'Tạo mã UUID (v4)',
    category: 'developer',
    icon: 'KeyRound',
    isPopular: false,
    isNew: true,
    description: 'Tạo mã định danh duy nhất ngẫu nhiên UUID v4 (GUID) chuẩn RFC 4122 cho cơ sở dữ liệu và API.',
    keywords: ['uuid', 'uuid v4', 'guid', 'tạo uuid', 'unique identifier', 'ngẫu nhiên'],
    guide: [
      'Chọn số lượng UUID muốn tạo (từ 1 đến 100 mã).',
      'Tùy chọn: Chữ hoa/chữ thường, có hoặc không có dấu gạch ngang (-).',
      'Bấm Tạo và bấm Sao chép danh sách mã.'
    ],
    examples: [
      'e0b3c6f0-4c31-4e08-bf5b-6f81e3a12345'
    ],
    faqs: [
      { q: 'UUID v4 có nguy cơ bị trùng lặp không?', a: 'Khả năng trùng lặp là gần như bằng 0 (1 trên hàng tỷ tỷ tỷ trường hợp).' }
    ],
    related: ['tao-mat-khau-ngau-nhien', 'base64-encode-decode']
  },
  {
    id: 'tao-ma-mau-hex-rgb',
    slug: 'tao-ma-mau-hex-rgb',
    name: 'Bộ chọn và tạo mã màu HEX / RGB / HSL',
    category: 'developer',
    icon: 'Palette',
    isPopular: true,
    isNew: false,
    description: 'Bảng chọn màu trực quan, quy đổi qua lại giữa HEX, RGB, HSL và tạo dải gradient màu CSS tuyệt đẹp.',
    keywords: ['bảng màu', 'mã màu', 'color picker', 'hex sang rgb', 'rgb sang hex', 'hsl', 'gradient'],
    guide: [
      'Nhấp vào bảng màu để chọn màu bạn thích hoặc nhập trực tiếp mã HEX/RGB.',
      'Xem mã màu chuyển đổi tức thì ở các hệ màu HEX, RGB, HSL, CSS.',
      'Sao chép nhanh mã màu chỉ với 1 click.'
    ],
    examples: [
      '#2563EB tương đương rgb(37, 99, 235) hoặc hsl(221, 83%, 53%).'
    ],
    faqs: [
      { q: 'Có xem trước màu trên nền sáng và nền tối được không?', a: 'Có, công cụ hiển thị mẫu chữ và nút bấm trên cả 2 nền để kiểm tra độ tương phản.' }
    ],
    related: ['lay-mau-tu-hinh-anh', 'css-formatter']
  },
  {
    id: 'kiem-tra-regex',
    slug: 'kiem-tra-regex',
    name: 'Kiểm tra biểu thức chính quy (Regex Tester)',
    category: 'developer',
    icon: 'SearchCode',
    isPopular: true,
    isNew: false,
    description: 'Kiểm tra và thử nghiệm biểu thức Regex (Regular Expression) trực quan với văn bản mẫu theo thời gian thực.',
    keywords: ['regex', 'regular expression', 'test regex', 'biểu thức chính quy', 'khớp mẫu'],
    guide: [
      'Nhập biểu thức Regex vào ô mẫu (ví dụ: ^[a-z0-9_-]{3,16}$).',
      'Chọn các cờ (flags) như g (toàn cục), i (không phân biệt hoa thường), m (nhiều dòng).',
      'Dán chuỗi văn bản cần kiểm tra vào khung test string.',
      'Xem các đoạn khớp (matches) được tô màu nổi bật.'
    ],
    examples: [
      'Kiểm tra định dạng email: ^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
    ],
    faqs: [
      { q: 'Có các mẫu Regex thông dụng sẵn có không?', a: 'Có, công cụ có sẵn thư viện mẫu kiểm tra Email, Số điện thoại VN, URL, Ngày tháng.' }
    ],
    related: ['dem-tu-va-ky-tu', 'chuyen-slug-url']
  },

  // --- D. CÔNG CỤ TÀI LIỆU & PDF (9 tools) ---
  {
    id: 'word-sang-pdf',
    slug: 'word-sang-pdf',
    name: 'Chuyển Word sang PDF',
    category: 'document',
    icon: 'FileUp',
    isPopular: true,
    isNew: false,
    description: 'Chuyển đổi file văn bản Word (.docx) sang định dạng PDF tiện lợi, trích xuất cấu trúc văn bản và bảng biểu.',
    keywords: ['word sang pdf', 'docx to pdf', 'chuyển word thành pdf', 'đổi file docx'],
    guide: [
      'Tải lên hoặc kéo thả file Word (.docx) của bạn.',
      'Hệ thống phân tích cấu trúc, văn bản, bảng biểu trong tài liệu.',
      'Bấm "Chuyển sang PDF" và tải file PDF kết quả về máy.'
    ],
    examples: [
      'Chuyển hợp đồng hoặc báo cáo từ file Word sang PDF để gửi email không bị lỗi font.'
    ],
    faqs: [
      { q: 'File của tôi có được tải lên máy chủ không?', a: 'File được xử lý trực tiếp trên trình duyệt của bạn bằng thư viện chuyên dụng, bảo mật tuyệt đối.' },
      { q: 'Có hỗ trợ định dạng .doc cũ không?', a: 'Hiện tại công cụ hỗ trợ định dạng chuẩn .docx hiện đại của Microsoft Word.' }
    ],
    related: ['pdf-sang-word', 'hinh-anh-sang-pdf', 'doc-thong-tin-pdf']
  },
  {
    id: 'pdf-sang-word',
    slug: 'pdf-sang-word',
    name: 'Chuyển PDF sang Word (.docx)',
    category: 'document',
    icon: 'FileDown',
    isPopular: true,
    isNew: false,
    description: 'Trích xuất nội dung văn bản và định dạng từ file PDF sang tài liệu Microsoft Word (.docx) có thể chỉnh sửa.',
    keywords: ['pdf sang word', 'pdf to docx', 'chuyển pdf thành word', 'sửa file pdf'],
    guide: [
      'Kéo thả file PDF cần chuyển đổi vào khung tải lên.',
      'Trình duyệt trích xuất các đoạn văn bản từ các trang PDF.',
      'Tải file Word .docx đã được tạo sẵn sàng để bạn chỉnh sửa nội dung.'
    ],
    examples: [
      'Trích xuất tài liệu học tập hoặc hợp đồng PDF sang Word để gõ thêm nội dung.'
    ],
    faqs: [
      { q: 'PDF quét dạng hình ảnh (scanned) có trích xuất được chữ không?', a: 'Với PDF dạng scan (chỉ là ảnh), bạn cần dùng thêm công cụ nhận diện ký tự OCR.' }
    ],
    related: ['word-sang-pdf', 'pdf-sang-hinh-anh']
  },
  {
    id: 'gop-file-pdf',
    slug: 'gop-file-pdf',
    name: 'Gộp nhiều file PDF (Merge PDF)',
    category: 'document',
    icon: 'Layers',
    isPopular: true,
    isNew: false,
    description: 'Ghép nối hai hoặc nhiều file PDF thành một file duy nhất, tự do kéo thả sắp xếp lại thứ tự các file.',
    keywords: ['gộp pdf', 'ghép pdf', 'merge pdf', 'nối file pdf', 'kết hợp pdf'],
    guide: [
      'Chọn hoặc kéo thả nhiều file PDF cùng lúc.',
      'Kéo thả các file để sắp xếp lại thứ tự xuất hiện theo mong muốn.',
      'Bấm "Gộp file PDF" và tải file PDF hoàn chỉnh về máy.'
    ],
    examples: [
      'Gộp hồ sơ cá nhân gồm CMND, đơn xin việc và bằng cấp thành 1 file PDF thống nhất.'
    ],
    faqs: [
      { q: 'Có giới hạn số lượng file được gộp không?', a: 'Bạn có thể gộp từ 2 đến 20 file cùng một lúc tùy theo bộ nhớ máy tính.' }
    ],
    related: ['tach-trang-pdf', 'xoay-trang-pdf']
  },
  {
    id: 'tach-trang-pdf',
    slug: 'tach-trang-pdf',
    name: 'Tách trang PDF (Split PDF)',
    category: 'document',
    icon: 'Scissors',
    isPopular: true,
    isNew: false,
    description: 'Tách lấy các trang cụ thể từ file PDF lớn hoặc xuất từng trang thành các file PDF độc lập.',
    keywords: ['tách pdf', 'split pdf', 'cắt trang pdf', 'lấy trang pdf'],
    guide: [
      'Tải lên file PDF cần tách trang.',
      'Nhập khoảng trang cần lấy (ví dụ: 1-3, 5, 8-10) hoặc chọn tách từng trang.',
      'Bấm "Tách trang" và tải file PDF chứa các trang đã chọn.'
    ],
    examples: [
      'Tách riêng trang 5 đến trang 8 từ tài liệu dài 50 trang để gửi cho khách hàng.'
    ],
    faqs: [
      { q: 'Chất lượng trang sau khi tách có bị giảm không?', a: 'Không, chất lượng văn bản và hình ảnh gốc được giữ nguyên 100%.' }
    ],
    related: ['gop-file-pdf', 'xoay-trang-pdf']
  },
  {
    id: 'xoay-trang-pdf',
    slug: 'xoay-trang-pdf',
    name: 'Xoay trang PDF',
    category: 'document',
    icon: 'RotateCw',
    isPopular: false,
    isNew: false,
    description: 'Xoay các trang PDF bị ngược hoặc ngang 90°, 180° hoặc 270° theo chiều kim đồng hồ.',
    keywords: ['xoay pdf', 'rotate pdf', 'lật trang pdf', 'sửa hướng pdf'],
    guide: [
      'Tải file PDF bị lệch hướng lên.',
      'Chọn xoay toàn bộ trang hoặc chọn từng trang riêng lẻ theo góc 90 độ.',
      'Bấm "Lưu và Tải về" để nhận file PDF đã chuẩn hướng đọc.'
    ],
    examples: [
      'Xoay tài liệu scan bị quét ngược 180 độ về đúng hướng thẳng đứng.'
    ],
    faqs: [
      { q: 'Có xoay được file PDF có nhiều trang không?', a: 'Có, bạn có thể xoay tất cả các trang cùng lúc hoặc chỉ xoay trang bị lỗi.' }
    ],
    related: ['tach-trang-pdf', 'gop-file-pdf']
  },
  {
    id: 'nen-pdf',
    slug: 'nen-pdf',
    name: 'Nén file PDF (Giảm dung lượng)',
    category: 'document',
    icon: 'FileArchive',
    isPopular: true,
    isNew: false,
    description: 'Giảm kích thước file PDF để dễ dàng đính kèm gửi qua email hoặc đăng tải lên cổng thông tin.',
    keywords: ['nén pdf', 'compress pdf', 'giảm dung lượng pdf', 'hạ dung lượng file pdf'],
    guide: [
      'Kéo thả file PDF dung lượng lớn cần tối ưu.',
      'Chọn mức độ nén phù hợp (Khuyến nghị / Tối đa).',
      'Xem dung lượng giảm được bao nhiêu % và tải file nén về máy.'
    ],
    examples: [
      'Giảm file báo cáo từ 15MB xuống còn 4MB để gửi vừa giới hạn file đính kèm của Gmail.'
    ],
    faqs: [
      { q: 'Chữ trong file có bị mờ sau khi nén không?', a: 'Chữ viết giữ nguyên độ sắc nét vector, thuật toán chủ yếu tối ưu metadata và hình ảnh nhúng.' }
    ],
    related: ['gop-file-pdf', 'nen-anh']
  },
  {
    id: 'pdf-sang-hinh-anh',
    slug: 'pdf-sang-hinh-anh',
    name: 'Chuyển PDF sang Hình ảnh (JPG / PNG)',
    category: 'document',
    icon: 'Images',
    isPopular: true,
    isNew: false,
    description: 'Chuyển đổi từng trang của tài liệu PDF thành các tệp ảnh chất lượng cao PNG hoặc JPG.',
    keywords: ['pdf sang ảnh', 'pdf to jpg', 'pdf to png', 'chuyển pdf thành ảnh', 'xuất ảnh pdf'],
    guide: [
      'Tải lên file PDF cần trích xuất ảnh.',
      'Xem trước các trang tài liệu được render sắc nét.',
      'Tải xuống từng trang ảnh riêng lẻ hoặc tải trọn bộ file nén ZIP.'
    ],
    examples: [
      'Chuyển chứng chỉ hoặc poster PDF thành file ảnh để đăng lên mạng xã hội.'
    ],
    faqs: [
      { q: 'Độ phân giải của ảnh trích xuất như thế nào?', a: 'Render ở tỷ lệ 2x sắc nét giúp ảnh hiển thị rõ ràng trên mọi màn hình.' }
    ],
    related: ['hinh-anh-sang-pdf', 'pdf-sang-word']
  },
  {
    id: 'hinh-anh-sang-pdf',
    slug: 'hinh-anh-sang-pdf',
    name: 'Chuyển Hình ảnh sang PDF',
    category: 'document',
    icon: 'FileImage',
    isPopular: true,
    isNew: false,
    description: 'Gộp nhiều hình ảnh JPG, PNG hoặc WebP thành một tài liệu PDF nhiều trang chuyên nghiệp.',
    keywords: ['ảnh sang pdf', 'jpg to pdf', 'png sang pdf', 'ghép ảnh thành pdf'],
    guide: [
      'Chọn hoặc kéo thả các file ảnh từ máy của bạn.',
      'Kéo sắp xếp thứ tự các trang ảnh và chọn kích thước khổ giấy (A4, vừa khít ảnh).',
      'Bấm "Tạo file PDF" và tải về tài liệu hoàn chỉnh.'
    ],
    examples: [
      'Ghép các trang bài tập chụp bằng điện thoại thành 1 file PDF duy nhất để nộp bài.'
    ],
    faqs: [
      { q: 'Có thể chọn hướng giấy ngang hay dọc không?', a: 'Có, bạn có thể tùy chọn khổ dọc (Portrait) hoặc ngang (Landscape).' }
    ],
    related: ['pdf-sang-hinh-anh', 'gop-file-pdf']
  },
  {
    id: 'doc-thong-tin-pdf',
    slug: 'doc-thong-tin-pdf',
    name: 'Đọc thông tin file PDF (Metadata)',
    category: 'document',
    icon: 'Info',
    isPopular: false,
    isNew: true,
    description: 'Xem chi tiết các thuộc tính ẩn của file PDF: tiêu đề, tác giả, phần mềm tạo, phiên bản PDF, số trang và kích thước.',
    keywords: ['thông tin pdf', 'metadata pdf', 'chi tiết pdf', 'số trang pdf', 'tác giả pdf'],
    guide: [
      'Tải file PDF lên để phân tích.',
      'Hệ thống đọc dữ liệu metadata nhúng trong tệp.',
      'Xem bảng thống kê chi tiết các thông số kỹ thuật.'
    ],
    examples: [
      'Kiểm tra tác giả thực sự hoặc phần mềm đã dùng để xuất ra file PDF.'
    ],
    faqs: [
      { q: 'Có phát hiện file PDF có bị mã hóa/khóa mật khẩu không?', a: 'Có, công cụ sẽ hiển thị tình trạng bảo mật của tệp.' }
    ],
    related: ['gop-file-pdf', 'nen-pdf']
  },

  // --- E. CÔNG CỤ HÌNH ẢNH & QR (11 tools) ---
  {
    id: 'resize-anh',
    slug: 'resize-anh',
    name: 'Thay đổi kích thước ảnh (Resize)',
    category: 'image',
    icon: 'Maximize',
    isPopular: true,
    isNew: false,
    description: 'Điều chỉnh chiều rộng, chiều cao ảnh theo pixel hoặc phần trăm (%), giữ nguyên tỷ lệ khung hình.',
    keywords: ['resize ảnh', 'đổi kích thước ảnh', 'thu nhỏ ảnh', 'phóng to ảnh', 'chiều rộng chiều cao'],
    guide: [
      'Tải ảnh cần thay đổi kích thước lên.',
      'Nhập chiều rộng (W) hoặc chiều cao (H) mong muốn (tự động khóa tỷ lệ).',
      'Xem ảnh trước sau và tải về ảnh kích thước mới.'
    ],
    examples: [
      'Đổi ảnh chụp 4000x3000px xuống 1200x900px để đăng bài viết blog.'
    ],
    faqs: [
      { q: 'Ảnh có bị mờ hoặc méo không?', a: 'Thuật toán nội suy canvas chất lượng cao và tùy chọn giữ nguyên tỷ lệ giúp ảnh sắc nét và không bị méo.' }
    ],
    related: ['nen-anh', 'cat-anh', 'tao-anh-vuong']
  },
  {
    id: 'nen-anh',
    slug: 'nen-anh',
    name: 'Nén hình ảnh (Giảm dung lượng)',
    category: 'image',
    icon: 'Minimize',
    isPopular: true,
    isNew: false,
    description: 'Nén ảnh JPG, PNG, WebP giảm dung lượng từ vài MB xuống vài trăm KB mà mắt thường không thấy giảm chất lượng.',
    keywords: ['nén ảnh', 'giảm dung lượng ảnh', 'compress image', 'tối ưu ảnh', 'hạ kb ảnh'],
    guide: [
      'Chọn ảnh từ máy tính hoặc điện thoại.',
      'Kéo thanh trượt chất lượng nén (mặc định 80% là tối ưu).',
      'So sánh dung lượng gốc và dung lượng sau khi nén rồi tải về.'
    ],
    examples: [
      'Giảm ảnh từ 3.5MB xuống 450KB (tiết kiệm đến 85% dung lượng).'
    ],
    faqs: [
      { q: 'Có nén được nhiều ảnh cùng lúc không?', a: 'Công cụ hỗ trợ xử lý tức thì và tải về ảnh nén ngay trên máy bạn.' }
    ],
    related: ['resize-anh', 'chuyen-anh-sang-webp']
  },
  {
    id: 'chuyen-jpg-sang-png',
    slug: 'chuyen-jpg-sang-png',
    name: 'Chuyển JPG sang PNG',
    category: 'image',
    icon: 'FileType',
    isPopular: false,
    isNew: false,
    description: 'Chuyển đổi hình ảnh định dạng JPG / JPEG sang định dạng PNG giữ chất lượng nguyên bản không nén suy hao.',
    keywords: ['jpg sang png', 'jpeg to png', 'đổi đuôi ảnh', 'chuyển ảnh sang png'],
    guide: [
      'Tải file ảnh đuôi .jpg hoặc .jpeg lên.',
      'Bấm chuyển đổi sang định dạng PNG.',
      'Tải file ảnh mới với định dạng .png sắc nét.'
    ],
    examples: [
      'Chuyển ảnh JPG sang PNG để chuẩn bị cho việc xử lý đồ họa.'
    ],
    faqs: [
      { q: 'Chuyển sang PNG có làm ảnh trong suốt được không?', a: 'File JPG ban đầu vốn không có độ trong suốt (alpha), để xóa phông bạn cần dùng công cụ tách nền.' }
    ],
    related: ['chuyen-png-sang-jpg', 'chuyen-anh-sang-webp']
  },
  {
    id: 'chuyen-png-sang-jpg',
    slug: 'chuyen-png-sang-jpg',
    name: 'Chuyển PNG sang JPG',
    category: 'image',
    icon: 'FileImage',
    isPopular: false,
    isNew: false,
    description: 'Chuyển ảnh PNG dung lượng nặng sang JPG nhẹ nhàng hơn, tùy chọn nền trắng cho vùng trong suốt.',
    keywords: ['png sang jpg', 'png to jpg', 'đổi png thành jpeg', 'giảm kích thước file png'],
    guide: [
      'Tải ảnh PNG lên.',
      'Chọn chất lượng ảnh và màu nền thay thế cho vùng trong suốt (mặc định màu trắng).',
      'Tải ảnh .jpg gọn nhẹ về máy.'
    ],
    examples: [
      'Ảnh chụp màn hình PNG 4MB chuyển sang JPG chỉ còn 300KB.'
    ],
    faqs: [
      { q: 'Tại sao ảnh JPG lại nhẹ hơn PNG?', a: 'JPG sử dụng thuật toán nén có suy hao chuyên cho ảnh chụp tự nhiên, giúp giảm dung lượng đáng kể.' }
    ],
    related: ['chuyen-jpg-sang-png', 'nen-anh']
  },
  {
    id: 'chuyen-anh-sang-webp',
    slug: 'chuyen-anh-sang-webp',
    name: 'Chuyển ảnh sang WebP',
    category: 'image',
    icon: 'Sparkle',
    isPopular: true,
    isNew: false,
    description: 'Chuyển đổi ảnh sang chuẩn WebP thế hệ mới của Google, giúp website tải nhanh vượt trội và chuẩn SEO Google.',
    keywords: ['ảnh sang webp', 'convert to webp', 'chuẩn webp', 'tối ưu web', 'google webp'],
    guide: [
      'Tải ảnh JPG hoặc PNG cần tối ưu lên.',
      'Hệ thống tự động mã hóa sang định dạng WebP.',
      'Tải file WebP siêu nhẹ về sử dụng cho website.'
    ],
    examples: [
      'Ảnh PNG 1MB chuyển sang WebP chỉ còn khoảng 180KB mà chất lượng hình ảnh tương đương.'
    ],
    faqs: [
      { q: 'Các trình duyệt hiện đại có xem được WebP không?', a: 'Tất cả các trình duyệt hiện nay (Chrome, Safari, Edge, Firefox) đều hỗ trợ WebP hoàn hảo.' }
    ],
    related: ['chuyen-webp-sang-jpg', 'nen-anh']
  },
  {
    id: 'chuyen-webp-sang-jpg',
    slug: 'chuyen-webp-sang-jpg',
    name: 'Chuyển WebP sang JPG',
    category: 'image',
    icon: 'ImagePlay',
    isPopular: false,
    isNew: false,
    description: 'Chuyển đổi hình ảnh tải từ trên mạng có đuôi .webp về định dạng JPG phổ thông dễ xem trên mọi thiết bị.',
    keywords: ['webp sang jpg', 'webp to jpg', 'mở file webp', 'đổi ảnh webp'],
    guide: [
      'Tải tệp ảnh WebP bạn vừa tải về lên.',
      'Chuyển đổi sang JPG chỉ trong 1 giây.',
      'Tải về ảnh JPG tương thích với mọi ứng dụng chỉnh sửa.'
    ],
    examples: [
      'Đổi ảnh sản phẩm WebP từ website bán hàng sang JPG để gửi cho khách xem trên Zalo.'
    ],
    faqs: [
      { q: 'Phần mềm Photoshop cũ có mở được ảnh sau khi chuyển không?', a: 'Có, file JPG tạo ra tương thích 100% với mọi phiên bản Photoshop và trình xem ảnh máy tính.' }
    ],
    related: ['chuyen-anh-sang-webp', 'chuyen-png-sang-jpg']
  },
  {
    id: 'cat-anh',
    slug: 'cat-anh',
    name: 'Cắt ảnh trực tuyến (Crop Image)',
    category: 'image',
    icon: 'Crop',
    isPopular: true,
    isNew: false,
    description: 'Cắt cúp ảnh theo khung tự do hoặc theo tỷ lệ chuẩn 16:9, 4:3, 1:1 (avatar) nhanh chóng.',
    keywords: ['cắt ảnh', 'crop ảnh', 'xén ảnh', 'tỷ lệ 16:9', 'ảnh đại diện'],
    guide: [
      'Tải ảnh cần cắt cúp lên.',
      'Chọn khung tỷ lệ (tự do, 1:1, 16:9, 4:3) hoặc kéo các góc khung cắt.',
      'Xem bản cắt và bấm Tải ảnh về máy.'
    ],
    examples: [
      'Cắt bỏ các chi tiết thừa xung quanh ảnh để tập trung vào chủ thể.'
    ],
    faqs: [
      { q: 'Có bị giảm chất lượng ở phần ảnh được cắt không?', a: 'Không, phần ảnh được cắt giữ nguyên độ phân giải pixel gốc.' }
    ],
    related: ['tao-anh-vuong', 'resize-anh']
  },
  {
    id: 'tao-anh-vuong',
    slug: 'tao-anh-vuong',
    name: 'Tạo ảnh vuông (Tỷ lệ 1:1)',
    category: 'image',
    icon: 'Square',
    isPopular: false,
    isNew: false,
    description: 'Tạo ảnh vuông 1:1 cho avatar Instagram, Facebook bằng cách thêm viền màu mờ (blur) hoặc màu trắng mà không bị méo.',
    keywords: ['ảnh vuông', 'square photo', 'ảnh avatar', 'ảnh không bị cắt', 'instagram no crop'],
    guide: [
      'Tải ảnh chữ nhật (dọc hoặc ngang) lên.',
      'Chọn hiệu ứng nền cho 2 bên: Làm mờ chính ảnh đó (Blur), Nền trắng hoặc Nền đen.',
      'Tải ảnh vuông đẹp mắt để đặt ảnh đại diện không bị crop mất hình.'
    ],
    examples: [
      'Biến ảnh toàn thân thành ảnh vuông đăng Instagram mà không cần cắt bỏ phần chân hay đầu.'
    ],
    faqs: [
      { q: 'Hiệu ứng nền mờ (Blurred background) hoạt động như thế nào?', a: 'Ảnh gốc được phóng to và làm mờ nghệ thuật để lấp đầy khoảng trống ở 2 bên mép ảnh.' }
    ],
    related: ['cat-anh', 'resize-anh']
  },
  {
    id: 'lay-mau-tu-hinh-anh',
    slug: 'lay-mau-tu-hinh-anh',
    name: 'Lấy mã màu từ hình ảnh (Image Color Picker)',
    category: 'image',
    icon: 'Pipette',
    isPopular: true,
    isNew: false,
    description: 'Chấm điểm bất kỳ trên ảnh để lấy chính xác mã màu HEX, RGB và tự động trích xuất bảng màu chủ đạo (Palette).',
    keywords: ['lấy màu ảnh', 'color picker image', 'trích xuất màu', 'bảng màu ảnh', 'eyedropper'],
    guide: [
      'Tải ảnh lên hoặc dán ảnh từ clipboard.',
      'Di chuột hoặc chạm vào vị trí bất kỳ trên ảnh với kính lúp phóng to.',
      'Nhấp chuột để sao chép mã màu HEX hoặc xem danh sách màu chủ đạo được phát hiện tự động.'
    ],
    examples: [
      'Lấy mã màu thương hiệu từ logo khách hàng gửi trong file ảnh.'
    ],
    faqs: [
      { q: 'Có kính lúp phóng to điểm ảnh không?', a: 'Có, kính lúp phóng to giúp bạn chọn chính xác từng pixel nhỏ nhất.' }
    ],
    related: ['tao-ma-mau-hex-rgb', 'resize-anh']
  },
  {
    id: 'tao-ma-qr',
    slug: 'tao-ma-qr',
    name: 'Tạo mã QR trực tuyến',
    category: 'image',
    icon: 'QrCode',
    isPopular: true,
    isNew: false,
    description: 'Tạo mã QR code cho đường link trang web, đoạn văn bản, số điện thoại, email, tùy chỉnh màu sắc và tải ảnh PNG/SVG.',
    keywords: ['tạo qr', 'qr code generator', 'mã qr', 'tạo mã qr miễn phí', 'qr link'],
    guide: [
      'Nhập nội dung cần tạo mã QR (URL, văn bản, thông tin liên hệ).',
      'Tùy chỉnh màu mã QR, màu nền và kích thước ảnh.',
      'Bấm "Tải ảnh QR" định dạng PNG chất lượng cao.'
    ],
    examples: [
      'Tạo mã QR cho link thực đơn menu quán cafe hoặc link Facebook cá nhân.'
    ],
    faqs: [
      { q: 'Mã QR này có bao giờ hết hạn không?', a: 'Không, đây là mã QR tĩnh (Static QR) chứa dữ liệu trực tiếp nên có hiệu lực vĩnh viễn.' }
    ],
    related: ['doc-ma-qr-tu-anh', 'tao-ma-qr-wifi']
  },
  {
    id: 'doc-ma-qr-tu-anh',
    slug: 'doc-ma-qr-tu-anh',
    name: 'Đọc mã QR từ hình ảnh',
    category: 'image',
    icon: 'Scan',
    isPopular: true,
    isNew: false,
    description: 'Quét và đọc nội dung mã QR từ tệp hình ảnh hoặc ảnh chụp màn hình mà không cần dùng camera điện thoại.',
    keywords: ['đọc mã qr', 'quét qr từ ảnh', 'scan qr image', 'giải mã qr', 'qr reader'],
    guide: [
      'Tải ảnh chụp chứa mã QR lên hoặc dán ảnh trực tiếp bằng Ctrl+V.',
      'Hệ thống tự động phát hiện và giải mã nội dung trong mã QR.',
      'Xem liên kết hoặc văn bản giải mã được và bấm mở link nhanh.'
    ],
    examples: [
      'Đọc mã QR trong ảnh chụp màn hình chuyển khoản ngân hàng trên máy tính.'
    ],
    faqs: [
      { q: 'Ảnh bị mờ hoặc hơi nghiêng có đọc được không?', a: 'Thuật toán jsqr xử lý góc xoay và cân chỉnh độ tương phản giúp đọc tốt đa số hình ảnh.' }
    ],
    related: ['tao-ma-qr', 'tao-ma-qr-wifi']
  },

  // --- F. CÔNG CỤ THỜI GIAN & NĂNG SUẤT (7 tools) ---
  {
    id: 'pomodoro-timer',
    slug: 'pomodoro-timer',
    name: 'Đồng hồ Pomodoro Timer',
    category: 'productivity',
    icon: 'Timer',
    isPopular: true,
    isNew: false,
    description: 'Ứng dụng quản lý thời gian theo phương pháp Quả cà chua: 25 phút tập trung làm việc và 5 phút nghỉ ngơi.',
    keywords: ['pomodoro', 'đồng hồ pomodoro', 'tập trung', 'năng suất', 'nghỉ giải lao'],
    guide: [
      'Bấm Bắt đầu để đếm ngược 25 phút làm việc tập trung cao độ.',
      'Khi chuông báo kết thúc, bấm chuyển sang 5 phút nghỉ ngắn.',
      'Sau 4 phiên Pomodoro, thưởng cho bản thân 15-30 phút nghỉ dài.'
    ],
    examples: [
      'Học tập và làm việc hiệu quả không mệt mỏi với chu kỳ 25/5.'
    ],
    faqs: [
      { q: 'Có âm thanh thông báo khi hết giờ không?', a: 'Có, trình duyệt sẽ phát âm thanh chuông báo và gửi thông báo khi hoàn thành phiên.' }
    ],
    related: ['dong-ho-bam-gio', 'dong-ho-dem-nguoc']
  },
  {
    id: 'dong-ho-bam-gio',
    slug: 'dong-ho-bam-gio',
    name: 'Đồng hồ bấm giờ (Stopwatch)',
    category: 'productivity',
    icon: 'Watch',
    isPopular: false,
    isNew: false,
    description: 'Đo thời gian chính xác từng mili-giây, hỗ trợ ghi nhận nhiều vòng chạy (Lap) cho thể thao và công việc.',
    keywords: ['bấm giờ', 'stopwatch', 'đo thời gian', 'bấm giờ thể thao', 'ghi vòng lap'],
    guide: [
      'Bấm Bắt đầu để đồng hồ chạy.',
      'Bấm "Vòng" (Lap) để ghi nhận các mốc thời gian trung gian.',
      'Bấm Tạm dừng hoặc Đặt lại để bắt đầu lượt đo mới.'
    ],
    examples: [
      'Đo thời gian chạy 100m hoặc thời gian hoàn thành một tác vụ máy tính.'
    ],
    faqs: [
      { q: 'Độ chính xác là bao nhiêu?', a: 'Độ phân giải hiển thị đến 1/100 của giây (centiseconds).' }
    ],
    related: ['pomodoro-timer', 'dong-ho-dem-nguoc']
  },
  {
    id: 'dong-ho-dem-nguoc',
    slug: 'dong-ho-dem-nguoc',
    name: 'Đồng hồ đếm ngược (Countdown Timer)',
    category: 'productivity',
    icon: 'Hourglass',
    isPopular: true,
    isNew: false,
    description: 'Cài đặt thời gian đếm ngược theo giờ, phút, giây cho các buổi thuyết trình, nấu ăn hoặc thi cử có chuông báo.',
    keywords: ['đếm ngược', 'countdown', 'hẹn giờ', 'chuông báo hết giờ', 'timer'],
    guide: [
      'Chọn số giờ, phút, giây bạn muốn đếm ngược (hoặc chọn nhanh 5m, 10m, 15m, 30m).',
      'Bấm Bắt đầu.',
      'Khi thời gian về 0:00:00, âm thanh chuông báo sẽ reo nhắc nhở bạn.'
    ],
    examples: [
      'Hẹn giờ luộc trứng 6 phút hoặc hẹn giờ làm bài thi 45 phút.'
    ],
    faqs: [
      { q: 'Nếu chuyển tab khác đồng hồ có chạy tiếp không?', a: 'Có, đồng hồ tính dựa trên thời gian hệ thống nên vẫn đếm chuẩn xác khi bạn chuyển tab.' }
    ],
    related: ['pomodoro-timer', 'dong-ho-bam-gio']
  },
  {
    id: 'tinh-thoi-gian-lam-viec',
    slug: 'tinh-thoi-gian-lam-viec',
    name: 'Tính thời gian làm việc (Work Hours)',
    category: 'productivity',
    icon: 'Briefcase',
    isPopular: false,
    isNew: false,
    description: 'Tính tổng số giờ làm việc trong ngày hoặc tuần, trừ giờ nghỉ trưa và tính tiền công theo giờ (lương Part-time).',
    keywords: ['giờ làm việc', 'chấm công', 'work hours', 'tính lương part time', 'tiền công theo giờ'],
    guide: [
      'Nhập giờ vào làm và giờ tan làm.',
      'Nhập thời gian nghỉ trưa (ví dụ 60 phút).',
      'Nhập mức lương theo giờ để tính ngay tổng thu nhập nhận được trong ca làm.'
    ],
    examples: [
      'Làm từ 8:30 đến 17:30, nghỉ trưa 1 tiếng -> Tổng giờ làm thực tế: 8.0 giờ.'
    ],
    faqs: [
      { q: 'Có tính được làm việc ca đêm qua ngày hôm sau không?', a: 'Có, công cụ tự động xử lý các ca làm việc bắt đầu từ tối và kết thúc vào sáng hôm sau.' }
    ],
    related: ['tinh-ngay-giua-hai-moc', 'chia-tien-nhom']
  },
  {
    id: 'dem-ngay-den-su-kien',
    slug: 'dem-ngay-den-su-kien',
    name: 'Tính ngày còn lại đến sự kiện (Event Countdown)',
    category: 'productivity',
    icon: 'Sparkle',
    isPopular: true,
    isNew: false,
    description: 'Đếm ngược số ngày, giờ, phút còn lại đến Tết Nguyên Đán, Giáng Sinh, đám cưới, sinh nhật hay kỳ thi quan trọng.',
    keywords: ['đếm ngày sự kiện', 'còn bao nhiêu ngày đến tết', 'ngày thi tốt nghiệp', 'đám cưới', 'countdown sự kiện'],
    guide: [
      'Chọn một sự kiện có sẵn (Tết Âm Lịch, Năm Mới, Giáng Sinh) hoặc tự tạo sự kiện riêng của bạn.',
      'Chọn ngày giờ diễn ra sự kiện.',
      'Xem đồng hồ đếm ngược sinh động thời gian thực và chia sẻ cho bạn bè.'
    ],
    examples: [
      'Còn bao nhiêu ngày nữa là đến Tết Nguyên Đán hoặc ngày bảo vệ đồ án tốt nghiệp.'
    ],
    faqs: [
      { q: 'Có lưu lại các sự kiện cá nhân của tôi không?', a: 'Sự kiện bạn tạo được lưu cục bộ trong trình duyệt (LocalStorage) để bạn quay lại xem bất cứ lúc nào.' }
    ],
    related: ['tinh-ngay-giua-hai-moc', 'tinh-tuoi']
  },
  {
    id: 'tao-mat-khau-ngau-nhien',
    slug: 'tao-mat-khau-ngau-nhien',
    name: 'Tạo mật khẩu ngẫu nhiên an toàn',
    category: 'productivity',
    icon: 'ShieldCheck',
    isPopular: true,
    isNew: false,
    description: 'Tạo mật khẩu mạnh ngẫu nhiên với độ dài tùy chọn, kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt chống hacker.',
    keywords: ['tạo mật khẩu', 'password generator', 'mật khẩu an toàn', 'mật khẩu mạnh', 'bảo mật'],
    guide: [
      'Chọn độ dài mật khẩu mong muốn (khuyến nghị từ 12 đến 20 ký tự).',
      'Tích chọn các thành phần: Chữ hoa (A-Z), Chữ thường (a-z), Chữ số (0-9), Ký tự đặc biệt (@#$%).',
      'Bấm "Tạo mật khẩu" và bấm Copy để lưu vào trình quản lý mật khẩu của bạn.'
    ],
    examples: [
      'Tạo mật khẩu 16 ký tự an toàn: K#9vP$2mX@8qL&5t'
    ],
    faqs: [
      { q: 'Mật khẩu tạo ra có bị gửi lên internet không?', a: 'Tuyệt đối không, mật khẩu được sinh bằng thuật toán crypto ngẫu nhiên ngay trong máy tính của bạn.' }
    ],
    related: ['kiem-tra-do-manh-mat-khau', 'tao-uuid']
  },
  {
    id: 'kiem-tra-do-manh-mat-khau',
    slug: 'kiem-tra-do-manh-mat-khau',
    name: 'Kiểm tra độ mạnh mật khẩu',
    category: 'productivity',
    icon: 'ShieldAlert',
    isPopular: false,
    isNew: false,
    description: 'Đánh giá độ an toàn của mật khẩu, ước tính thời gian hacker bẻ khóa (Brute Force) và đưa ra gợi ý cải thiện.',
    keywords: ['kiểm tra mật khẩu', 'độ mạnh mật khẩu', 'password strength', 'bảo mật tài khoản'],
    guide: [
      'Nhập mật khẩu bạn đang dùng hoặc dự định đặt vào ô kiểm tra.',
      'Xem thang đo độ mạnh: Rất yếu, Yếu, Trung bình, Mạnh hoặc Rất mạnh.',
      'Xem ước tính thời gian máy tính cần để dò tìm ra mật khẩu này.'
    ],
    examples: [
      'Mật khẩu "123456" bị bẻ khóa trong 0.001 giây, trong khi "H@iPhong2025!" cần hàng thế kỷ.'
    ],
    faqs: [
      { q: 'Nhập mật khẩu vào đây có an toàn không?', a: 'Hoàn toàn an toàn vì ứng dụng chạy offline trên trình duyệt, không có bất kỳ request mạng nào gửi đi.' }
    ],
    related: ['tao-mat-khau-ngau-nhien', 'base64-encode-decode']
  },

  // --- G. CÔNG CỤ HỌC TẬP & TIỆN ÍCH (6 tools) ---
  {
    id: 'tao-flashcard-don-gian',
    slug: 'tao-flashcard-don-gian',
    name: 'Tạo Flashcard học từ vựng đơn giản',
    category: 'education',
    icon: 'BookOpen',
    isPopular: true,
    isNew: false,
    description: 'Tạo thẻ ghi nhớ Flashcard lật 2 mặt (Mặt trước câu hỏi/từ mới, mặt sau câu trả lời/nghĩa) để ôn thi và học ngoại ngữ.',
    keywords: ['flashcard', 'thẻ từ vựng', 'học tiếng anh', 'ghi nhớ', 'ôn thi'],
    guide: [
      'Thêm các thẻ flashcard mới với mặt trước (Từ vựng/Câu hỏi) và mặt sau (Nghĩa/Đáp án).',
      'Bấm chế độ "Bắt đầu học" để lật thẻ và kiểm tra trí nhớ.',
      'Đánh dấu thẻ đã thuộc hoặc cần ôn lại.'
    ],
    examples: [
      'Mặt trước: "Accommodate" -> Lật mặt sau: "Cung cấp chỗ ở, đáp ứng nhu cầu".'
    ],
    faqs: [
      { q: 'Bộ thẻ có lưu lại cho lần học sau không?', a: 'Có, các bộ thẻ flashcard của bạn được lưu tự động trong bộ nhớ trình duyệt.' }
    ],
    related: ['tao-checklist-cong-viec', 'tao-bang-thoi-khoa-bieu']
  },
  {
    id: 'chuyen-doi-tien-te',
    slug: 'chuyen-doi-tien-te',
    name: 'Chuyển đổi tiền tệ trực tuyến',
    category: 'education',
    icon: 'BadgeDollarSign',
    isPopular: true,
    isNew: false,
    description: 'Quy đổi tỷ giá ngoại tệ phổ biến: USD, EUR, JPY, GBP, KRW, CNY, SGD sang Việt Nam Đồng (VND) và ngược lại.',
    keywords: ['đổi tiền', 'tỷ giá', 'tiền tệ', 'usd sang vnd', 'jpy sang vnd', 'ngoại tệ'],
    guide: [
      'Nhập số tiền cần quy đổi.',
      'Chọn đồng tiền gốc (ví dụ: USD) và đồng tiền đích (ví dụ: VND).',
      'Xem giá trị quy đổi tức thì kèm tỷ giá tham khảo.'
    ],
    examples: [
      '100 USD quy đổi sang VND theo tỷ giá thị trường khoảng 2.540.000 VNĐ.'
    ],
    faqs: [
      { q: 'Có thể tự điều chỉnh tỷ giá thực tế mua/bán tại ngân hàng không?', a: 'Có, bạn có thể chỉnh sửa trực tiếp ô tỷ giá theo ngân hàng bạn đang giao dịch.' }
    ],
    related: ['chuyen-doi-don-vi', 'tinh-vat']
  },
  {
    id: 'chuyen-doi-dung-luong',
    slug: 'chuyen-doi-dung-luong',
    name: 'Chuyển đổi dung lượng dữ liệu (Byte, KB, MB, GB, TB)',
    category: 'education',
    icon: 'HardDrive',
    isPopular: false,
    isNew: false,
    description: 'Quy đổi qua lại giữa các đơn vị lưu trữ máy tính: B, KB, MB, GB, TB, PB theo cả chuẩn nhị phân (1024) và thập phân (1000).',
    keywords: ['đổi dung lượng', 'byte sang mb', 'gb sang mb', 'dung lượng ổ cứng', 'đơn vị dữ liệu'],
    guide: [
      'Nhập dung lượng và chọn đơn vị ban đầu (ví dụ: 16 GB).',
      'Chọn chuẩn quy đổi: Chuẩn máy tính (1024) hoặc Chuẩn nhà sản xuất ổ cứng (1000).',
      'Xem bảng quy đổi ra tất cả các đơn vị còn lại cùng lúc.'
    ],
    examples: [
      'Ổ cứng 1 TB chuẩn nhà sản xuất thực tế cắm vào máy tính nhận khoảng 931.3 GB.'
    ],
    faqs: [
      { q: 'Tại sao ổ cứng 500GB mua về chỉ hiển thị 465GB?', a: 'Nhà sản xuất tính 1GB = 1.000.000.000 Bytes, trong khi Windows tính 1GB = 1024^3 Bytes.' }
    ],
    related: ['chuyen-doi-don-vi', 'chuyen-doi-timestamp']
  },
  {
    id: 'tao-bang-thoi-khoa-bieu',
    slug: 'tao-bang-thoi-khoa-bieu',
    name: 'Tạo bảng thời khóa biểu học tập',
    category: 'education',
    icon: 'Table',
    isPopular: false,
    isNew: true,
    description: 'Thiết kế thời khóa biểu học tập tuần từ Thứ 2 đến Chủ nhật, tùy chỉnh màu sắc môn học và in ấn hoặc tải ảnh về máy.',
    keywords: ['thời khóa biểu', 'lịch học', 'thời gian biểu', 'in thời khóa biểu', 'lịch tuần'],
    guide: [
      'Điền tên môn học, phòng học hoặc giáo viên vào từng tiết học trong tuần.',
      'Chọn màu sắc sinh động cho từng môn học.',
      'Bấm In hoặc Xuất hình ảnh/PDF thời khóa biểu để dán góc học tập.'
    ],
    examples: [
      'Lập lịch học đại học hoặc lịch học thêm trong tuần cho học sinh sinh viên.'
    ],
    faqs: [
      { q: 'Thời khóa biểu có tự lưu lại không?', a: 'Dữ liệu được lưu trong trình duyệt của bạn để bạn có thể mở lại sửa bất kỳ lúc nào.' }
    ],
    related: ['tao-checklist-cong-viec', 'tao-flashcard-don-gian']
  },
  {
    id: 'tao-checklist-cong-viec',
    slug: 'tao-checklist-cong-viec',
    name: 'Tạo Checklist công việc (To-Do List)',
    category: 'education',
    icon: 'CheckSquare',
    isPopular: true,
    isNew: false,
    description: 'Lập danh sách việc cần làm hằng ngày, đánh dấu tích hoàn thành, theo dõi thanh tiến độ % công việc đã xong.',
    keywords: ['checklist', 'to do list', 'việc cần làm', 'danh sách công việc', 'quản lý công việc'],
    guide: [
      'Gõ công việc cần làm và bấm Enter để thêm vào danh sách.',
      'Tích chọn vào ô vuông khi đã hoàn thành một đầu việc.',
      'Theo dõi thanh phần trăm tiến độ hoàn thành trong ngày.'
    ],
    examples: [
      'Checklist chuẩn bị đồ đạc đi du lịch hoặc danh sách bài tập cần nộp hôm nay.'
    ],
    faqs: [
      { q: 'Dữ liệu có bị mất khi tắt tab trình duyệt không?', a: 'Không, danh sách được lưu trữ an toàn trong LocalStorage của máy tính bạn.' }
    ],
    related: ['pomodoro-timer', 'tao-bang-thoi-khoa-bieu']
  },
  {
    id: 'tao-ma-qr-wifi',
    slug: 'tao-ma-qr-wifi',
    name: 'Tạo mã QR kết nối Wi-Fi nhanh',
    category: 'education',
    icon: 'Wifi',
    isPopular: true,
    isNew: false,
    description: 'Tạo mã QR thông tin mạng Wi-Fi (Tên Wifi SSID, Mật khẩu, Loại bảo mật) để khách quét kết nối ngay không cần gõ pass.',
    keywords: ['qr wifi', 'mã qr wifi', 'kết nối wifi', 'pass wifi', 'chia sẻ wifi'],
    guide: [
      'Nhập tên mạng Wi-Fi (SSID) của gia đình hoặc quán.',
      'Nhập mật khẩu Wi-Fi và chọn kiểu mã hóa (WPA/WPA2/WPA3 hoặc Không mật khẩu).',
      'Tải mã QR về in ra dán lên bàn để bạn bè, khách quét kết nối tức thì.'
    ],
    examples: [
      'Quán cà phê in mã QR Wi-Fi để khách hàng quét camera điện thoại là vào mạng được ngay.'
    ],
    faqs: [
      { q: 'Điện thoại iPhone và Android có quét được mã QR này không?', a: 'Cả iOS và Android đều hỗ trợ tự động nhận diện và kết nối Wi-Fi ngay từ ứng dụng Camera gốc.' }
    ],
    related: ['tao-ma-qr', 'doc-ma-qr-tu-anh']
  }
];

// Map lookup nhanh theo slug và id
export const TOOLS_BY_SLUG = TOOLS.reduce((acc, tool) => {
  acc[tool.slug] = tool;
  return acc;
}, {});

export const TOOLS_BY_ID = TOOLS.reduce((acc, tool) => {
  acc[tool.id] = tool;
  return acc;
}, {});
