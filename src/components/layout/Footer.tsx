import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, Clock, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const { t } = useTranslation()

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
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="h-10 w-10 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors border border-border">
                <Twitter className="h-5 w-5" />
              </a>
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
                <span>123 Boulevard Mohammed V, Berkane 60300, Morocco</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gold-400 shrink-0" />
                <span dir="ltr">+212 536 61 23 45</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gold-400 shrink-0" />
                <span>contact@visaplus-berkane.ma</span>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-gold-400 shrink-0 mt-0.5" />
                <span>Mon-Fri: 09:00 - 18:00<br/>Sat: 09:00 - 13:00</span>
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
