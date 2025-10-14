import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "Jairozon - Educational Bookstore by Jairo Moreno", 
  description = "Discover the best educational books at Jairozon. Browse our extensive collection of academic textbooks, reference materials, and learning resources. Owned by Jairo Moreno, developed by Abhinova.com (Abhishek Shukla).",
  keywords = "educational books, textbooks, academic books, learning resources, Jairo Moreno, Jairozon, online bookstore, study materials",
  image = "/logo1.jpg",
  url = window.location.href,
  type = "website"
}) => {
  const siteTitle = "Jairozon - Educational Bookstore";
  const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Jairo Moreno" />
      <meta name="developer" content="Abhinova.com - Abhishek Shukla" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Jairozon" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@jairozon" />
      <meta name="twitter:creator" content="@jairozon" />
      
      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#2563EB" />
      <meta name="msapplication-TileColor" content="#2563EB" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Jairozon" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon */}
      <link rel="icon" type="image/x-icon" href="/logo1.jpg" />
      <link rel="apple-touch-icon" href="/logo1.jpg" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BookStore",
          "name": "Jairozon",
          "description": description,
          "url": url,
          "logo": image,
          "owner": {
            "@type": "Person",
            "name": "Jairo Moreno"
          },
          "developer": {
            "@type": "Organization",
            "name": "Abhinova.com",
            "founder": "Abhishek Shukla"
          },
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "US"
          },
          "sameAs": [
            "https://facebook.com/jairozon",
            "https://twitter.com/jairozon",
            "https://instagram.com/jairozon"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEO;