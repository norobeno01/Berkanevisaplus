import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Mail, Phone, Clock, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-background to-background" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6 text-center mx-auto"
          >
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-gradient">
              {t('contact.title', 'Get in Touch')}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {t('contact.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">{t('contact.formTitle')}</h2>
              <Card className="glass-panel border-border">
                <CardContent className="p-6 sm:p-8">
                  <form className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{t('contact.firstName')}</label>
                        <Input placeholder="John" className="bg-card border-border text-foreground" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{t('contact.lastName')}</label>
                        <Input placeholder="Doe" className="bg-card border-border text-foreground" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">{t('contact.email')}</label>
                      <Input type="email" placeholder="john@example.com" className="bg-card border-border text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">{t('contact.visaType')}</label>
                      <select className="flex h-10 w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                        <option value="">{t('contact.selectOption')}</option>
                        <option value="france">{t('contactPage.france', 'France (Schengen)')}</option>
                        <option value="spain">{t('contactPage.spain', 'Spain (Schengen)')}</option>
                        <option value="canada">{t('contactPage.canada', 'Canada')}</option>
                        <option value="other">{t('contactPage.other', 'Other')}</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-muted-foreground">{t('contact.message')}</label>
                      <textarea 
                        className="flex min-h-[120px] w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        placeholder={t('contact.placeholderMessage')}
                      />
                    </div>
                    <Button className="w-full h-12 text-lg bg-primary hover:bg-primary/90 text-primary-foreground">
                      {t('contact.send')}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info & Map */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-8"
            >
              <div className="grid sm:grid-cols-2 gap-6">
                <Card className="glass-card border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <Phone className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{t('contact.callUs')}</h3>
                    <p className="text-muted-foreground" dir="ltr">+212 536 61 23 45</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-500">
                      <Mail className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{t('contact.emailUs')}</h3>
                    <p className="text-muted-foreground">contact@visaplus-berkane.ma</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                      <MessageCircle className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{t('contact.whatsapp')}</h3>
                    <p className="text-muted-foreground" dir="ltr">+212 600 11 22 33</p>
                  </CardContent>
                </Card>

                <Card className="glass-card border-border">
                  <CardContent className="p-6 flex flex-col items-center text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                      <Clock className="h-6 w-6" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-foreground">{t('contact.workingHours')}</h3>
                    <p className="text-muted-foreground">{t('contactPage.workingHoursTime', 'Mon-Fri: 09:00 - 18:00')}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Map */}
              <div className="rounded-2xl overflow-hidden border border-border h-[300px] relative">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3278.431268641916!2d-2.3274205!3d34.9221764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7828105e1355db%3A0xbdf9ce9b8e217278!2sBerkane%2C%20Morocco!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location Berkane"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/212600112233" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-foreground shadow-lg shadow-green-500/30 hover:scale-110 transition-transform"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  )
}
