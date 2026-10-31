import { Helmet } from 'react-helmet-async';

export function SEOHead({
  title = 'TIỆNÍCH - Bộ công cụ trực tuyến miễn phí và nhanh chóng',
  description = 'Website tổng hợp hơn 70 công cụ trực tuyến miễn phí hữu ích cho người Việt: tính toán, văn bản, lập trình, xử lý PDF, hình ảnh, thời gian. Miễn phí 100%, không cần đăng ký.',
  keywords = 'công cụ trực tuyến, tiện ích online, tính toán, văn bản, lập trình, pdf online, nén ảnh, tạo qr code',
  canonical = 'https://tienich.vn',
  ogImage = 'https://tienich.vn/og-image.png',
  schemaData = null
}) {
  const fullTitle = title.includes('TIỆNÍCH') ? title : `${title} | TIỆNÍCH`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="TiệnÍch" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Schema.org Structured Data */}
      {schemaData && (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      )}
    </Helmet>
  );
}
