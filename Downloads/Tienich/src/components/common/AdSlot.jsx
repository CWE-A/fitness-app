/**
 * Component AdSlot dành cho việc tích hợp Google AdSense trong tương lai.
 * Không hiển thị quảng cáo giả mạo, chỉ tạo khung chờ chuẩn kích thước theo chính sách AdSense.
 */
export function AdSlot({
  slot = 'responsive',
  format = 'auto',
  className = '',
  style = {}
}) {
  const getFormatClass = () => {
    switch (slot) {
      case 'banner':
        return 'ad-slot-banner';
      case 'rectangle':
        return 'ad-slot-rectangle';
      case 'infeed':
        return 'ad-slot-infeed';
      default:
        return 'ad-slot-infeed';
    }
  };

  return (
    <div className={`ad-slot-wrapper ${className}`} style={style} aria-label="Khu vực quảng cáo">
      <div className={`ad-slot ${getFormatClass()}`}>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.6 }}>
          Quảng cáo (Ad Space)
        </span>
        {/* Khi có mã AdSense từ Google, nhúng mã <ins className="adsbygoogle" ... /> tại đây */}
      </div>
    </div>
  );
}
