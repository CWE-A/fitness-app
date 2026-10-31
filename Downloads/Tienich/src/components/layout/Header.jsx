import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Wrench, 
  Search, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  Layers, 
  Grid, 
  Home,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { TOOLS } from '../../data/tools';
import { DynamicIcon } from '../common/DynamicIcon';
import { searchTools } from '../../utils/vietnameseSearch';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Đóng mobile menu khi chuyển route
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Phím tắt Ctrl+K hoặc Cmd+K để mở tìm kiếm
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavClick = (targetId) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredTools = searchQuery.trim()
    ? searchTools(TOOLS, searchQuery).slice(0, 8)
    : [];

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: scrolled ? 'var(--bg-surface)' : 'rgba(255, 255, 255, 0.4)',
          borderBottom: '1px solid var(--border-color)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          boxShadow: scrolled ? 'var(--shadow-md)' : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
          {/* Logo with Glowing Gradient */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', group: 'logo' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 50%, #8b5cf6 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.08) rotate(5deg)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 99, 235, 0.4)';
              }}
            >
              <Wrench size={22} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.1 }}>
                TIỆN<span className="gradient-text">ÍCH</span>
              </span>
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Online Free Tools
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                fontSize: '0.94rem',
                color: location.pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
            >
              <Home size={17} />
              <span>Trang chủ</span>
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick('categories')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                fontSize: '0.94rem',
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Layers size={17} />
              <span>Danh mục</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick('all-tools')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontWeight: 600,
                fontSize: '0.94rem',
                color: 'var(--text-secondary)',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Grid size={17} />
              <span>Tất cả công cụ</span>
            </button>
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Search Trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                color: 'var(--text-muted)',
                borderRadius: 'var(--radius-full)',
                padding: '0.45rem 0.95rem'
              }}
              title="Tìm kiếm công cụ (Ctrl+K)"
            >
              <Search size={16} />
              <span style={{ display: 'none' }} className="desktop-search-label">Tìm công cụ...</span>
              <kbd style={{ fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'var(--bg-muted)', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                ⌘K
              </kbd>
            </button>

            {/* Dark Mode Toggle with Smooth Animation */}
            <button
              type="button"
              onClick={toggleTheme}
              className="btn btn-secondary btn-sm"
              style={{
                width: '40px',
                height: '40px',
                padding: 0,
                borderRadius: 'var(--radius-full)',
                transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              title={theme === 'dark' ? 'Chuyển sang chế độ Sáng' : 'Chuyển sang chế độ Tối'}
              aria-label="Chuyển chế độ giao diện"
            >
              {theme === 'dark' ? (
                <Sun size={19} color="#fbbf24" style={{ animation: 'rotateIn 0.35s ease' }} />
              ) : (
                <Moon size={19} color="#6366f1" style={{ animation: 'rotateIn 0.35s ease' }} />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="btn btn-secondary btn-sm mobile-hamburger"
              style={{ width: '40px', height: '40px', padding: 0, borderRadius: 'var(--radius-full)' }}
              aria-label="Mở menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: '70px',
            backgroundColor: 'var(--bg-surface)',
            backdropFilter: 'blur(20px)',
            zIndex: 35,
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            borderBottom: '1px solid var(--border-color)',
            animation: 'fadeIn 0.25s ease'
          }}
        >
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-muted)', fontWeight: 600 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Home size={18} color="var(--primary)" />
              <span>Trang chủ</span>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick('categories')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-muted)', fontWeight: 600, textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Layers size={18} color="var(--purple)" />
              <span>Danh mục công cụ</span>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('all-tools')}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-muted)', fontWeight: 600, textAlign: 'left' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Grid size={18} color="var(--accent)" />
              <span>Tất cả 70+ công cụ</span>
            </div>
            <ChevronRight size={18} color="var(--text-muted)" />
          </button>
        </div>
      )}

      {/* Quick Search Modal */}
      {searchOpen && (
        <div
          onClick={() => setSearchOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 50,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '12vh 1rem 1rem',
            animation: 'fadeIn 0.2s ease'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              width: '100%',
              maxWidth: '620px',
              boxShadow: 'var(--shadow-xl), var(--shadow-glow)',
              overflow: 'hidden',
              backdropFilter: 'blur(20px)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', gap: '0.85rem' }}>
              <Search size={22} color="var(--primary)" />
              <input
                type="text"
                autoFocus
                placeholder="Gõ từ khóa công cụ... (pdf, gpa, bmi, vat, json)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ border: 'none', background: 'transparent', boxShadow: 'none', padding: 0, fontSize: '1.05rem', fontWeight: 500 }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.25rem 0.6rem', fontSize: '0.75rem' }}
              >
                ESC
              </button>
            </div>

            <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '0.65rem' }}>
              {searchQuery.trim() === '' ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  <Sparkles size={24} style={{ margin: '0 auto 0.5rem', color: 'var(--primary)' }} />
                  Gõ từ khóa để tìm nhanh trong 70+ công cụ hữu ích.
                </div>
              ) : filteredTools.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Không tìm thấy công cụ nào phù hợp với "{searchQuery}".
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {filteredTools.map((t) => (
                    <Link
                      key={t.id}
                      to={`/cong-cu/${t.slug}`}
                      onClick={() => setSearchOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.85rem',
                        borderRadius: 'var(--radius-md)',
                        transition: 'all var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--primary-subtle)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                    >
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--primary-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary)',
                          flexShrink: 0
                        }}
                      >
                        <DynamicIcon name={t.icon} size={20} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                          {t.name}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {t.description}
                        </div>
                      </div>
                      <ChevronRight size={18} color="var(--text-muted)" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes rotateIn {
          from { transform: rotate(-90deg) scale(0.7); opacity: 0; }
          to { transform: rotate(0) scale(1); opacity: 1; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .desktop-search-label { display: inline !important; }
          .mobile-hamburger { display: none !important; }
        }
      `}</style>
    </>
  );
}
export { Header };
