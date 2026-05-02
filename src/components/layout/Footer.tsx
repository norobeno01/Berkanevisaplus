import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const { t } = useTranslation()
  const [contactInfo, setContactInfo] = useState({
    email: "evisaschengen@gmail.com"
  })

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json() as any)
      .then(data => {
        if (data.success && data.data) {
          if (data.data.email && data.data.email.trim() !== '') {
            setContactInfo({ email: data.data.email })
          }
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
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <span>{contactInfo.email}</span>
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
