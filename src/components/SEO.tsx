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
  title = 'VisaPlus - Expert Visa & Immigration Services', 
  description = 'Your trusted partner for Schengen Visas, Canadian Study Permits, and global immigration services. Expert consulting for a seamless journey.',
  keywords = 'visa, immigration, schengen, travel, study permit, canada express entry, visa berkane',
  url = 'https://visaplus.com',
  image = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80'
}: SEOProps) {
  const { i18n } = useTranslation()
  const fullTitle = title.includes('VisaPlus') ? title : `${title} | VisaPlus`
  const currentLang = i18n.language || 'en'

  // LocalBusiness Schema JSON-LD (Essential for Local SEO/GEO in Berkane, Morocco)
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "VisaPlus Agency",
    "image": image,
    "@id": url,
    "url": url,
    "telephone": "+212600000000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Avenue Mohammed V",
      "addressLocality": "Berkane",
      "postalCode": "70300",
      "addressCountry": "MA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 34.9202,
      "longitude": -2.3188
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"
      ],
      "opens": "09:00",
      "closes": "18:00"
    },
    "sameAs": [
      "https://www.facebook.com/visaplus",
      "https://www.instagram.com/visaplus"
    ],
    "priceRange": "$$"
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
      <meta property="og:site_name" content="VisaPlus Agency" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Schema for Local SEO */}
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  )
}