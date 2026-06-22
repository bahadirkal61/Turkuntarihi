import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: "website" | "article";
  image?: string;
  keywords?: string;
}

const DEFAULT_TITLE = "Türk Tarihi - 2500 Yıllık Medeniyetin Dijital Ansiklopedisi";
const DEFAULT_DESC =
  "M.Ö. 520'den günümüze Türk tarihi. 272 hükümdar, 21 devlet, destanlar, Orhun Yazıtları, Türk coğrafyası ve kültürü.";
const SITE_URL = "https://turkuntarihi.com";
const DEFAULT_IMAGE = "https://turkuntarihi.com/og-image.jpg";

export default function SEO({
  title,
  description = DEFAULT_DESC,
  canonical,
  type = "website",
  image = DEFAULT_IMAGE,
  keywords,
}: SEOProps) {
  const fullTitle = title ? `${title} | Türk Tarihi` : DEFAULT_TITLE;
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Türk Tarihi" />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org breadcrumbs will be added per-page */}
    </Helmet>
  );
}
