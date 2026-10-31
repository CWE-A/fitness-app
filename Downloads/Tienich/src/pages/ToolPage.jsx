import { Suspense, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { 
  ChevronRight, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Info
} from 'lucide-react';
import { TOOLS_BY_SLUG, TOOLS } from '../data/tools';
import { CATEGORIES } from '../data/categories';
import { TOOL_COMPONENTS } from '../tools';
import { DynamicIcon } from '../components/common/DynamicIcon';
import { AdSlot } from '../components/common/AdSlot';
import { SEOHead } from '../components/seo/SEOHead';

export default function ToolPage() {
  const { slug } = useParams();
  const tool = TOOLS_BY_SLUG[slug];

  if (!tool) {
    return <Navigate to="/404" replace />;
  }

  const category = CATEGORIES.find(c => c.id === tool.category);
  const ToolComponent = TOOL_COMPONENTS[tool.slug];

  // Related tools
  const relatedTools = useMemo(() => {
    if (!tool.related || tool.related.length === 0) {
      return TOOLS.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);
    }
    return tool.related
      .map(id => TOOLS.find(t => t.id === id || t.slug === id))
      .filter(Boolean);
  }, [tool]);

  // Schema.org structured data
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    url: `https://tienich.vn/cong-cu/${tool.slug}`,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'VND'
    }
  };

  return (
    <>
      <SEOHead
        title={`${tool.name} - Miễn phí trực tuyến`}
        description={tool.description}
        keywords={tool.keywords.join(', ')}
        canonical={`https://tienich.vn/cong-cu/${tool.slug}`}
        schemaData={schemaData}
      />

      <div className="container" style={{ paddingTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to={`/?category=${tool.category}#all-tools`}>{category?.name || 'Danh mục'}</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-active">{tool.name}</span>
        </nav>

        {/* Tool Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-lg)',
                background: 'linear-gradient(135deg, var(--primary) 0%, #06b6d4 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(37, 99, 235, 0.35)'
              }}
            >
              <DynamicIcon name={tool.icon} size={32} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.35rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.25rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
                  {tool.name}
                </h1>
                {tool.isPopular && <span className="badge badge-popular">Phổ biến</span>}
                {tool.isNew && <span className="badge badge-new">Mới</span>}
              </div>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)', maxWidth: '780px', lineHeight: 1.6 }}>
                {tool.description}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--success)' }}>
              <ShieldCheck size={18} /> 100% Client-side
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontWeight: 600, color: 'var(--accent)' }}>
              <Zap size={18} /> Chạy tức thì
            </span>
          </div>
        </div>

        {/* Top Tool Ad Slot */}
        <AdSlot slot="banner" />

        {/* Main Tool Working Area */}
        <div
          className="card"
          style={{
            padding: '2.25rem',
            boxShadow: 'var(--shadow-lg), 0 0 25px rgba(59, 130, 246, 0.1)',
            border: '1px solid var(--primary-border)',
            background: 'var(--bg-surface)'
          }}
        >
          {ToolComponent ? (
            <Suspense
              fallback={
                <div style={{ padding: '3.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid var(--border-color)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginBottom: '1rem' }} />
                  <div style={{ fontWeight: 600 }}>Đang chuẩn bị công cụ...</div>
                </div>
              }
            >
              <ToolComponent />
            </Suspense>
          ) : (
            <div className="alert alert-warning">
              Công cụ đang được cập nhật, vui lòng quay lại sau!
            </div>
          )}
        </div>

        {/* Mid-content Ad Slot */}
        <AdSlot slot="infeed" />

        {/* Instructions & Practical Examples */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Guide */}
          {tool.guide && tool.guide.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                <BookOpen size={22} color="var(--primary)" />
                <span>Hướng dẫn sử dụng</span>
              </h2>
              <ol style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {tool.guide.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Examples */}
          {tool.examples && tool.examples.length > 0 && (
            <div className="card">
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', color: 'var(--text-primary)' }}>
                <Sparkles size={22} color="#f59e0b" />
                <span>Ví dụ thực tế</span>
              </h2>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.94rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {tool.examples.map((ex, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <CheckCircle size={18} color="var(--success)" style={{ marginTop: '0.2rem', flexShrink: 0 }} />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* FAQs Section */}
        {tool.faqs && tool.faqs.length > 0 && (
          <div className="card">
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>
              <HelpCircle size={22} color="var(--primary)" />
              <span>Câu hỏi thường gặp (FAQ)</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {tool.faqs.map((faq, idx) => (
                <div key={idx} style={{ borderBottom: idx < tool.faqs.length - 1 ? '1px solid var(--border-color)' : 'none', paddingBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    Q: {faq.q}
                  </div>
                  <div style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                    A: {faq.a}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Ad Slot */}
        <AdSlot slot="infeed" />

        {/* Related Tools */}
        {relatedTools.length > 0 && (
          <section>
            <h2 className="title-section" style={{ fontSize: '1.45rem', marginBottom: '1.25rem' }}>
              Công cụ liên quan hữu ích
            </h2>

            <div className="grid-tools">
              {relatedTools.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/cong-cu/${rel.slug}`}
                  className="card card-interactive"
                  style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.15rem' }}
                >
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--primary-subtle)',
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <DynamicIcon name={rel.icon} size={22} />
                  </div>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.98rem', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {rel.name}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {rel.description}
                    </div>
                  </div>
                  <ArrowRight size={18} color="var(--primary)" />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
