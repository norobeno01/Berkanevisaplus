import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  url?: string
  image?: string
}

export default function SEO({ 
  title = 'E-Visa Schengen - Expert Visa & Immigration Services', 
  description = 'Your trusted partner for Schengen Visas, Canadian Study Permits, and global immigration services. Expert consulting for a seamless journey.',
  keywords = 'visa, immigration, schengen, travel, study permit, canada express entry',
  url = 'https://e-visaschengen.com',
  image = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'
}: SEOProps) {
  const { i18n } = useTranslation()
  const fullTitle = title.includes('E-Visa Schengen') ? title : `${title} | E-Visa Schengen`
  const currentLang = i18n.language || 'en'

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "E-Visa Schengen",
    "url": url,
    "logo": image,
    "sameAs": [
      "https://www.facebook.com/e-visaschengen",
      "https://www.instagram.com/e-visaschengen"
    ]
  }

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={currentLang} dir={currentLang === 'ar' ? 'rtl' : 'ltr'} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Hreflang Tags for Multi-Language SEO (Geo-targeting) */}
      <link rel="alternate" hrefLang="en" href={`${url}?lang=en`} />
      <link rel="alternate" hrefLang="fr" href={`${url}?lang=fr`} />
      <link rel="alternate" hrefLang="es" href={`${url}?lang=es`} />
      <link rel="alternate" hrefLang="ar" href={`${url}?lang=ar`} />
      <link rel="alternate" hrefLang="x-default" href={url} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={currentLang} />
      <meta property="og:site_name" content="E-Visa Schengen Agency" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema for Local SEO */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  )
}
