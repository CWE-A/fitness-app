import { Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { TOOLS } from '../data/tools';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { SEOHead } from '../components/seo/SEOHead';

export default function Sitemap() {
  return (
    <>
      <SEOHead
        title="Sitemap - Sơ đồ tất cả hơn 70 công cụ trực tuyến | TIỆNÍCH"
        description="Danh sách đầy đủ tất cả các công cụ trực tuyến miễn phí trên TIỆNÍCH phân chia theo chuyên mục rõ ràng."
        canonical="https://tienich.vn/sitemap"
      />

      <div className="container" style={{ paddingTop: '3rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        <div>
          <h1 className="title-section" style={{ fontSize: '2.25rem' }}>Sơ đồ trang web (Sitemap)</h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
            Tổng hợp danh mục và liên kết trực tiếp tới toàn bộ 70 công cụ trên TIỆNÍCH.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {CATEGORIES.map(cat => {
            const catTools = TOOLS.filter(t => t.category === cat.id);

            return (
              <div key={cat.id} className="card">
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
                  <DynamicIcon name={cat.icon} size={22} color={cat.color} />
                  <span>{cat.name} ({catTools.length} công cụ)</span>
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
                  {catTools.map(tool => (
                    <Link
                      key={tool.id}
                      to={`/cong-cu/${tool.slug}`}
                      style={{
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-muted)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        transition: 'color var(--transition-fast)'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = 'var(--primary)'}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                    >
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary)' }} />
                      <span>{tool.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
