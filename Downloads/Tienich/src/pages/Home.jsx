import { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Star, 
  Layers, 
  Grid, 
  TrendingUp,
  X,
  Flame,
  CheckCircle2,
  ChevronRight,
  CornerDownLeft
} from 'lucide-react';
import { TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdSlot } from '../components/common/AdSlot';
import { SEOHead } from '../components/seo/SEOHead';
import { searchTools } from '../utils/vietnameseSearch';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const navigate = useNavigate();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchContainerRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Click outside to close instant dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Filter tools với thuật toán tìm kiếm tiếng Việt không dấu & có dấu theo thời gian thực
  const filteredTools = useMemo(() => {
    const q = searchQuery.trim();
    const baseTools = selectedCategory === 'all' 
      ? TOOLS 
      : TOOLS.filter(t => t.category === selectedCategory);

    if (!q) return baseTools;
    return searchTools(baseTools, q);
  }, [searchQuery, selectedCategory]);

  // Top matching tools for instant live dropdown
  const instantResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return searchTools(TOOLS, q).slice(0, 8);
  }, [searchQuery]);

  const popularTools = useMemo(() => TOOLS.filter(t => t.isPopular).slice(0, 8), []);

  const clearSearch = () => {
    setSearchQuery('');
    setIsSearchFocused(false);
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  // Nhấn Enter để mở công cụ đầu tiên khi đang gõ
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && instantResults.length > 0) {
      e.preventDefault();
      setIsSearchFocused(false);
      navigate(`/cong-cu/${instantResults[0].slug}`);
    } else if (e.key === 'Escape') {
      setIsSearchFocused(false);
    }
  };

  // Từ khóa gợi ý nhanh
  const quickKeywords = [
    { label: 'Gộp PDF', query: 'gộp pdf' },
    { label: 'Tính VAT', query: 'tính vat' },
    { label: 'Đếm từ', query: 'đếm từ' },
    { label: 'Tạo mã QR', query: 'tạo qr' },
    { label: 'Nén ảnh', query: 'nén ảnh' },
    { label: 'Format JSON', query: 'json' },
    { label: 'Tính BMI', query: 'bmi' },
    { label: 'Tính tuổi', query: 'tính tuổi' }
  ];

  return (
    <>
      <SEOHead
        title="TIỆNÍCH - Bộ công cụ trực tuyến miễn phí và nhanh chóng"
        description="Website công cụ trực tuyến miễn phí hàng đầu Việt Nam: tính toán tài chính, xử lý văn bản, tiện ích lập trình, chỉnh sửa PDF, nén ảnh, tạo mã QR. Không cần đăng ký, an toàn 100% trên trình duyệt."
        canonical="https://tienich.vn"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
        {/* Hero Section */}
        <section
          style={{
            padding: searchQuery.trim() ? '2.5rem 0 1.5rem' : '4.5rem 0 2.5rem',
            textAlign: 'center',
            position: 'relative',
            transition: 'padding var(--transition-normal)'
          }}
        >
          <div className="container" style={{ maxWidth: '880px' }}>
            {!searchQuery.trim() && (
              <>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.4rem 1.1rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--primary-border)',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: 'var(--primary)',
                    boxShadow: '0 4px 20px rgba(37, 99, 235, 0.15)',
                    marginBottom: '1.25rem',
                    backdropFilter: 'blur(12px)',
                    animation: 'fadeIn 0.5s ease'
                  }}
                >
                  <Sparkles size={16} color="var(--primary)" />
                  <span>Hơn 70+ Công cụ trực tuyến miễn phí 100%</span>
                </div>

                <h1 className="title-hero" style={{ marginBottom: '1.25rem' }}>
                  Công cụ tiện ích thông minh cho <span className="gradient-text">người Việt</span>
                </h1>

                <p style={{ fontSize: '1.12rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2.2rem', maxWidth: '720px', margin: '0 auto 2.2rem' }}>
                  Nhanh chóng, chính xác và bảo mật. Mọi tác vụ tính toán, xử lý văn bản, tài liệu PDF và hình ảnh đều được thực thi trực tiếp trên trình duyệt của bạn.
                </p>
              </>
            )}

            {/* Glowing Search Bar Container with Real-Time Instant Live Search */}
            <div
              ref={searchContainerRef}
              style={{
                position: 'relative',
                maxWidth: '720px',
                margin: '0 auto',
                zIndex: 30
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 'var(--radius-xl)',
                  boxShadow: isSearchFocused || searchQuery.trim()
                    ? '0 0 35px rgba(59, 130, 246, 0.45), var(--shadow-xl)'
                    : 'var(--shadow-lg)',
                  transition: 'all var(--transition-normal)'
                }}
              >
                <div 
                  style={{ 
                    position: 'absolute', 
                    left: '1.35rem', 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    color: isSearchFocused || searchQuery.trim() ? 'var(--primary)' : 'var(--text-muted)', 
                    transition: 'color var(--transition-fast)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Search size={22} />
                </div>

                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Gõ tên công cụ (ví dụ: gop pdf, tinh vat, dem tu, bmi, qr, cat anh...)"
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setIsSearchFocused(true);
                  }}
                  style={{
                    padding: '1.25rem 7.5rem 1.25rem 3.6rem',
                    fontSize: '1.1rem',
                    borderRadius: 'var(--radius-xl)',
                    border: isSearchFocused || searchQuery.trim() ? '2px solid var(--primary)' : '2px solid var(--border-color)',
                    backgroundColor: 'var(--bg-surface)',
                    width: '100%',
                    outline: 'none',
                    boxShadow: 'none',
                    fontWeight: 500
                  }}
                />

                {/* Right controls inside search bar */}
                <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {searchQuery.trim() && (
                    <span 
                      style={{ 
                        fontSize: '0.78rem', 
                        fontWeight: 700, 
                        padding: '0.2rem 0.6rem', 
                        borderRadius: 'var(--radius-full)', 
                        background: 'var(--primary-subtle)', 
                        color: 'var(--primary)',
                        border: '1px solid var(--primary-border)'
                      }}
                    >
                      {filteredTools.length} kết quả
                    </span>
                  )}

                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      style={{ 
                        background: 'var(--bg-muted)', 
                        border: 'none',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--text-muted)', 
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                      title="Xóa tìm kiếm (Esc)"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Suggestion Tags */}
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  gap: '0.5rem', 
                  marginTop: '0.85rem', 
                  flexWrap: 'wrap',
                  fontSize: '0.82rem'
                }}
              >
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Flame size={14} color="#f97316" /> Gợi ý nhanh:
                </span>
                {quickKeywords.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      setSearchQuery(item.query);
                      setIsSearchFocused(true);
                      if (searchInputRef.current) searchInputRef.current.focus();
                    }}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-full)',
                      padding: '0.2rem 0.65rem',
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'var(--primary)';
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

            </div>

            {/* Feature Highlights - Ẩn khi đang tìm kiếm để đưa kết quả lên ngay sát bên dưới */}
            {!searchQuery.trim() && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: '2.5rem', marginTop: '2.5rem', flexWrap: 'wrap', fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600 }}>
                  <Zap size={18} color="var(--primary)" /> Tốc độ tức thì
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600 }}>
                  <ShieldCheck size={18} color="var(--success)" /> 100% Không lưu trữ file
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontWeight: 600 }}>
                  <Star size={18} color="#f59e0b" /> Miễn phí trọn đời
                </span>
              </div>
            )}
          </div>
        </section>

        {/* NẾU ĐANG TÌM KIẾM: KẾT QUẢ ĐƯỢC ĐƯA LÊN NGAY LẬP TỨC PHÍA DƯỚI THANH TÌM KIẾM */}
        {searchQuery.trim().length > 0 ? (
          <section id="search-results" className="container" style={{ scrollMarginTop: '80px', animation: 'fadeIn 0.25s ease' }}>
            <div className="card" style={{ padding: '1.25rem 1.75rem', marginBottom: '1.75rem', background: 'var(--primary-subtle)', border: '1px solid var(--primary-border)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Search size={20} />
                    <span>Kết quả tìm kiếm cho: "{searchQuery}"</span>
                  </h2>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Tìm thấy <strong>{filteredTools.length}</strong> công cụ phù hợp với từ khóa của bạn
                  </p>
                </div>

                <button
                  type="button"
                  onClick={clearSearch}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', borderRadius: 'var(--radius-full)' }}
                >
                  <X size={16} />
                  <span>Xóa tìm kiếm</span>
                </button>
              </div>
            </div>

            {filteredTools.length === 0 ? (
              <div
                className="card"
                style={{
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--bg-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                  <Search size={30} />
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Không tìm thấy công cụ phù hợp</h3>
                <p style={{ color: 'var(--text-muted)', maxWidth: '420px', fontSize: '0.92rem' }}>
                  Không có kết quả nào khớp với từ khóa "{searchQuery}". Bạn hãy thử tìm kiếm bằng từ khóa khác hoặc duyệt theo danh mục.
                </p>
                <button
                  type="button"
                  onClick={clearSearch}
                  className="btn btn-primary btn-sm"
                >
                  Xem tất cả công cụ
                </button>
              </div>
            ) : (
              <div className="grid-tools">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/cong-cu/${tool.slug}`}
                    className="card card-interactive tool-card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-md)',
                          background: 'linear-gradient(135deg, var(--primary-subtle) 0%, rgba(6, 182, 212, 0.15) 100%)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--primary-border)'
                        }}
                      >
                        <DynamicIcon name={tool.icon} size={22} />
                      </div>
                      {tool.isPopular && <span className="badge badge-popular">Phổ biến</span>}
                      {tool.isNew && <span className="badge badge-new">Mới</span>}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                        {tool.name}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {tool.description}
                      </p>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                      <span>Sử dụng ngay</span>
                      <ArrowRight size={16} className="arrow-icon" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        ) : (
          /* NẾU KHÔNG TÌM KIẾM: HIỂN THỊ BÌNH THƯỜNG DANH MỤC + PHỔ BIẾN + TẤT CẢ */
          <>
            {/* Ad slot under hero */}
            <div className="container">
              <AdSlot slot="banner" />
            </div>

            {/* Categories Section */}
            <section id="categories" className="container" style={{ scrollMarginTop: '90px' }}>
              <div style={{ marginBottom: '1.75rem' }}>
                <h2 className="title-section" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Layers size={26} color="var(--primary)" />
                  <span>Khám phá theo danh mục</span>
                </h2>
                <p className="subtitle-section">
                  Chọn danh mục để lọc nhanh các công cụ chuyên biệt theo nhu cầu
                </p>
              </div>

              <div className="grid-categories">
                {/* All Tools Card */}
                <div
                  onClick={() => handleCategorySelect('all')}
                  className="card card-interactive"
                  style={{
                    padding: '1.35rem',
                    border: selectedCategory === 'all' ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    background: selectedCategory === 'all' ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    boxShadow: selectedCategory === 'all' ? '0 0 20px rgba(37, 99, 235, 0.2)' : 'none'
                  }}
                >
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-md)',
                      background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(37, 99, 235, 0.35)'
                    }}
                  >
                    <Grid size={22} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>Tất cả công cụ</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{TOOLS.length} công cụ</div>
                  </div>
                </div>

                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const count = TOOLS.filter(t => t.category === cat.id).length;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleCategorySelect(cat.id)}
                      className="card card-interactive"
                      style={{
                        padding: '1.35rem',
                        border: isSelected ? `2px solid ${cat.color}` : '1px solid var(--border-color)',
                        background: isSelected ? `${cat.color}15` : 'var(--bg-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: isSelected ? `0 0 20px ${cat.color}35` : 'none'
                      }}
                    >
                      <div
                        style={{
                          width: '46px',
                          height: '46px',
                          borderRadius: 'var(--radius-md)',
                          background: `${cat.color}20`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: cat.color,
                          flexShrink: 0
                        }}
                      >
                        <DynamicIcon name={cat.icon} size={22} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem' }}>{cat.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{count} công cụ</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Popular Tools Section */}
            {selectedCategory === 'all' && (
              <section className="container">
                <div style={{ marginBottom: '1.75rem' }}>
                  <h2 className="title-section" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Flame size={26} color="#f59e0b" />
                    <span>Công cụ phổ biến nhất</span>
                  </h2>
                  <p className="subtitle-section">Được cộng đồng sử dụng nhiều nhất mỗi ngày</p>
                </div>

                <div className="grid-tools">
                  {popularTools.map((tool) => (
                    <Link
                      key={tool.id}
                      to={`/cong-cu/${tool.slug}`}
                      className="card card-interactive tool-card"
                      style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-md)',
                            background: 'linear-gradient(135deg, var(--primary-subtle) 0%, rgba(6, 182, 212, 0.15) 100%)',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid var(--primary-border)'
                          }}
                        >
                          <DynamicIcon name={tool.icon} size={22} />
                        </div>
                        <span className="badge badge-popular">Phổ biến</span>
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                          {tool.name}
                        </h3>
                        <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {tool.description}
                        </p>
                      </div>

                      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                        <span>Sử dụng ngay</span>
                        <ArrowRight size={16} className="arrow-icon" />
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Ad slot in between */}
            <div className="container">
              <AdSlot slot="infeed" />
            </div>

            {/* All / Filtered Tools Section */}
            <section id="all-tools" className="container" style={{ scrollMarginTop: '90px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
                <div>
                  <h2 className="title-section" style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <Grid size={26} color="var(--primary)" />
                    <span>
                      {selectedCategory === 'all'
                        ? 'Tất cả công cụ'
                        : CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Danh mục công cụ'}
                    </span>
                  </h2>
                  <p className="subtitle-section">
                    Hiển thị {filteredTools.length} công cụ
                  </p>
                </div>

                {selectedCategory !== 'all' && (
                  <button
                    type="button"
                    onClick={() => handleCategorySelect('all')}
                    className="btn btn-secondary btn-sm"
                  >
                    Xem tất cả 70+ công cụ
                  </button>
                )}
              </div>

              <div className="grid-tools">
                {filteredTools.map((tool) => (
                  <Link
                    key={tool.id}
                    to={`/cong-cu/${tool.slug}`}
                    className="card card-interactive tool-card"
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--radius-md)',
                          background: 'linear-gradient(135deg, var(--primary-subtle) 0%, rgba(6, 182, 212, 0.15) 100%)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--primary-border)'
                        }}
                      >
                        <DynamicIcon name={tool.icon} size={22} />
                      </div>
                      {tool.isPopular && <span className="badge badge-popular">Phổ biến</span>}
                      {tool.isNew && <span className="badge badge-new">Mới</span>}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                        {tool.name}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {tool.description}
                      </p>
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 700, color: 'var(--primary)' }}>
                      <span>Sử dụng ngay</span>
                      <ArrowRight size={16} className="arrow-icon" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </>
        )}
      </div>

      <style>{`
        .tool-card:hover .arrow-icon {
          transform: translateX(4px);
          transition: transform 0.2s ease;
        }
        .arrow-icon {
          transition: transform 0.2s ease;
        }
      `}</style>
    </>
  );
}
