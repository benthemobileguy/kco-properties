import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  structuredData?: object;
}

export default function SEO({
  title = "KCO Properties - Quality Rental Homes",
  description = "Find your perfect rental home with KCO Properties. Comfortable, convenient, and customer-focused rental homes backed by responsive local management.",
  image = "/KCOLogoIcon.png",
  url,
  type = "website",
  structuredData,
}: SEOProps) {
  const fullTitle = title.includes("KCO Properties") ? title : `${title} | KCO Properties`;
  const siteUrl = url || window.location.href;
  const imageUrl = image.startsWith("http") ? image : `${window.location.origin}${image}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="KCO Properties" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
