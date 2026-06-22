interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SchemaOrgProps {
  breadcrumbs?: BreadcrumbItem[];
  article?: {
    headline: string;
    description: string;
    image?: string;
    datePublished?: string;
    dateModified?: string;
    author?: string;
  };
}

export default function SchemaOrg({
  breadcrumbs,
  article,
}: SchemaOrgProps) {
  const schemas: Record<string, object> = {};

  // Website schema
  schemas.website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Türk Tarihi",
    url: "https://turkuntarihi.com",
    description:
      "M.Ö. 520'den günümüze Türk tarihinin kapsamlı dijital ansiklopedisi",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://turkuntarihi.com?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  // BreadcrumbList schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `https://turkuntarihi.com${item.url}`,
      })),
    };
  }

  // Article schema
  if (article) {
    schemas.article = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.headline,
      description: article.description,
      image: article.image || "https://turkuntarihi.com/og-image.jpg",
      datePublished: article.datePublished || "2024-01-01",
      dateModified: article.dateModified || article.datePublished || "2024-01-01",
      author: {
        "@type": "Organization",
        name: article.author || "Türk Tarihi",
      },
      publisher: {
        "@type": "Organization",
        name: "Türk Tarihi",
        logo: {
          "@type": "ImageObject",
          url: "https://turkuntarihi.com/logo.png",
        },
      },
    };
  }

  return (
    <>
      {/* Always include WebSite schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.website),
        }}
      />
      {schemas.breadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.breadcrumb),
          }}
        />
      )}
      {schemas.article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemas.article),
          }}
        />
      )}
    </>
  );
}
