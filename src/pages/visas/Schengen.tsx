import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, MapPin, Download, AlertCircle, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Schengen() {
  const { t } = useTranslation()

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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop" alt="Paris" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
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
              
              {/* Timeline */}
              <div className="space-y-6">
                <h2 className="text-3xl font-display font-bold text-gradient">{t('schengen.procedureTitle')}</h2>
                <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
                  {[
                    { title: t('schengen.step1Title'), desc: t('schengen.step1Desc') },
                    { title: t('schengen.step2Title'), desc: t('schengen.step2Desc') },
                    { title: t('schengen.step3Title'), desc: t('schengen.step3Desc') },
                    { title: t('schengen.step4Title'), desc: t('schengen.step4Desc') },
                    { title: t('schengen.step5Title'), desc: t('schengen.step5Desc') }
                  ].map((step, idx) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute -left-3.5 top-1 h-7 w-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{idx + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold text-gradient">{t('schengen.checklistTitle')}</h2>
                  <Button variant="outline" size="sm" className="glass border-border">
                    <Download className="mr-2 h-4 w-4" /> {t('schengen.downloadPdf')}
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
                      <Link to="/portal">{t('schengen.startApp')}</Link>
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
