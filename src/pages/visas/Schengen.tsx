import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, MapPin, Download, AlertCircle, ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SEO from '@/components/SEO'

export default function Schengen() {
  const { t, i18n } = useTranslation()

  const requirements = [
    t('schengen.req1'),
    t('schengen.req2'),
    t('schengen.req3'),
    t('schengen.req4'),
    t('schengen.req5'),
    t('schengen.req6'),
    t('schengen.req7'),
    t('schengen.req8'),
    t('schengen.req9')
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <SEO 
        title="Schengen Visa Morocco | VisaPlus"
        description="Complete assistance for Schengen Tourist, Business, and Family Visit visas from Morocco. Fast processing and expert preparation."
        keywords="schengen visa morocco, france visa, spain visa, tlscontact, bls"
      />
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=2000&q=80" alt="Schengen" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <Button variant="ghost" asChild className={`mb-6 text-muted-foreground hover:text-foreground hover:bg-foreground/5 ${i18n.language === 'ar' ? '-mr-4' : '-ml-4'}`}>
            <Link to="/"><ArrowLeft className={`h-4 w-4 ${i18n.language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} /> {t('common.backToHome', 'Back to Home')}</Link>
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm font-medium backdrop-blur-md text-gold-400">
              {t('schengen.type')}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-foreground">
              {t('schengen.title')}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {t('schengen.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Left Column - Requirements & Info */}
            <div className="lg:col-span-2 space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-gradient">{t('schengen.procedureTitle')}</h2>
                <div className={`relative border-border space-y-8 pb-4 ${i18n.language === 'ar' ? 'border-r mr-3 md:mr-4' : 'border-l ml-3 md:ml-4'}`}>
                  {[
                    { title: t('schengen.step1Title'), desc: t('schengen.step1Desc') },
                    { title: t('schengen.step2Title'), desc: t('schengen.step2Desc') },
                    { title: t('schengen.step3Title'), desc: t('schengen.step3Desc') },
                    { title: t('schengen.step4Title'), desc: t('schengen.step4Desc') },
                    { title: t('schengen.step5Title'), desc: t('schengen.step5Desc') }
                  ].map((step, idx) => (
                    <div key={idx} className="relative pl-8 rtl:pr-8 rtl:pl-0">
                      <div className={`absolute top-1 w-3 h-3 bg-primary rounded-full ring-4 ring-background ${i18n.language === 'ar' ? '-right-1.5' : '-left-1.5'}`} />
                      <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold text-gradient">{t('schengen.checklistTitle')}</h2>
                  <Button variant="outline" size="sm" className="glass border-border">
                    <Download className={`h-4 w-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`} /> {t('schengen.downloadPdf')}
                  </Button>
                </div>
                <Card className="glass-card border-border">
                  <CardContent className="p-6">
                    <ul className="space-y-4">
                      {requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-relaxed">{req}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex gap-3">
                      <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                      <p className="text-sm text-primary-foreground/90">
                        {t('schengen.note')}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Right Column - Quick Facts & CTA */}
            <div className="space-y-6">
              <Card className="glass-panel border-border sticky top-24">
                <CardHeader>
                  <CardTitle className="text-2xl font-display">{t('schengen.summaryTitle')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t('schengen.processingTime')}</p>
                      <p className="text-sm text-muted-foreground">{t('schengen.processingDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t('schengen.validity')}</p>
                      <p className="text-sm text-muted-foreground">{t('schengen.validityDesc')}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{t('schengen.appCenters')}</p>
                      <p className="text-sm text-muted-foreground">{t('schengen.appCentersDesc')}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">{t('schengen.embassyFee')}</span>
                      <span className="font-semibold text-foreground">€90</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">{t('schengen.serviceFee')}</span>
                      <span className="font-semibold text-foreground">~450 MAD</span>
                    </div>
                    <Button asChild className="w-full h-12 text-lg shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                      <Link to="/apply">{t('schengen.startApp')}</Link>
                    </Button>
                  </div>
                  
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
