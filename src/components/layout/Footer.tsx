import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, Linkedin } from 'lucide-react'
import { useEffect, useState } from 'react'

// Custom X (Twitter) Logo
const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// Custom TikTok Logo
const TikTokLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.12-.71 4.22-1.92 5.92-1.31 1.83-3.17 3.12-5.32 3.55-2.03.42-4.22.18-6.07-.72-1.89-.9-3.41-2.48-4.23-4.34-.84-1.85-.97-3.99-.48-5.91.46-1.93 1.6-3.62 3.19-4.78 1.45-1.07 3.25-1.57 5.03-1.51v4.06c-1.07-.06-2.19.16-3.13.72-.94.57-1.64 1.47-1.92 2.52-.27 1.05-.12 2.19.38 3.12.51 1 1.41 1.74 2.46 2.08 1.08.35 2.29.31 3.32-.12 1.03-.43 1.88-1.18 2.37-2.15.48-.96.61-2.09.6-3.17-.03-5.26-.01-10.51-.01-15.77h3.91z"/>
  </svg>
)

export default function Footer() {
  const { t } = useTranslation()
  const [socialLinks, setSocialLinks] = useState({
    facebook: "https://facebook.com/visaplus",
    instagram: "https://instagram.com/visaplus",
    linkedin: "https://linkedin.com/company/visaplus",
    x: "https://x.com/visaplus",
    tiktok: "https://tiktok.com/@visaplus",
    address: "123 Boulevard Mohammed V, Berkane 60300, Morocco",
    phone: "+212 536 61 23 45",
    email: "contact@visaplus-berkane.ma",
    workingHours: "Mon-Fri: 09:00 - 18:00\nSat: 09:00 - 13:00"
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json() as any)
      .then(data => {
        if (data.success && data.data) {
          setSocialLinks(prev => {
            const merged = { ...prev }
            for (const key in data.data) {
              if (['facebook', 'instagram', 'linkedin', 'x', 'tiktok'].includes(key)) {
                // Allow social links to be empty (so we can hide them)
                merged[key as keyof typeof merged] = data.data[key] || ''
              } else if (data.data[key] && data.data[key].trim() !== '') {
                // For contact info, only override if not empty
                merged[key as keyof typeof merged] = data.data[key]
              }
            }
            return merged
          })
        }
      })
      .catch(console.error)
  }, [])

  return (
    <footer className="bg-background border-t border-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      <div className="container px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & About */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <span className="font-display font-bold text-2xl text-gradient-gold">
                {t('common.agencyName')}
              </span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-4">
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks.x && (
                <a href={socialLinks.x} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                  <XLogo className="h-4 w-4" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                  <TikTokLogo className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-foreground text-lg mb-6">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">{t('common.about')}</Link></li>
              <li><Link to="/visas/schengen" className="hover:text-gold-400 transition-colors">{t('common.schengenVisas')}</Link></li>
              <li><Link to="/visas/canada" className="hover:text-gold-400 transition-colors">{t('common.canadaVisas')}</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">{t('common.contact')}</Link></li>
              <li><Link to="/privacy" className="hover:text-gold-400 transition-colors">{t('footer.privacy')}</Link></li>
            </ul>
          </div>

          {/* Top Destinations */}
          <div>
            <h4 className="font-display font-bold text-foreground text-lg mb-6">{t('footer.topDestinations')}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link to="/visas/france" className="hover:text-gold-400 transition-colors">France</Link></li>
              <li><Link to="/visas/spain" className="hover:text-gold-400 transition-colors">Spain</Link></li>
              <li><Link to="/visas/italy" className="hover:text-gold-400 transition-colors">Italy</Link></li>
              <li><Link to="/visas/canada" className="hover:text-gold-400 transition-colors">Canada</Link></li>
              <li><Link to="/visas/germany" className="hover:text-gold-400 transition-colors">Germany</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-foreground text-lg mb-6">{t('footer.contactInfo')}</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <span>{socialLinks.address}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold-400 shrink-0" />
                <span dir="ltr">{socialLinks.phone}</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <span>{socialLinks.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{socialLinks.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} {t('footer.rights')}</p>
          <div className="space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-foreground transition-colors">{t('footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
