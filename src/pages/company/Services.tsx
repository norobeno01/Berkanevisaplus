import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { servicesData } from '@/data/services'
import { Users, FileEdit, Calendar, Files, Plane, ShieldCheck, Languages, MessageSquare, RefreshCcw, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import SEO from '@/components/SEO'

const getIcon = (name: string) => {
  switch (name) {
    case 'Users': return <Users className="h-6 w-6" />
    case 'FileEdit': return <FileEdit className="h-6 w-6" />
    case 'Calendar': return <Calendar className="h-6 w-6" />
    case 'Files': return <Files className="h-6 w-6" />
    case 'Plane': return <Plane className="h-6 w-6" />
    case 'ShieldCheck': return <ShieldCheck className="h-6 w-6" />
    case 'Languages': return <Languages className="h-6 w-6" />
    case 'MessageSquare': return <MessageSquare className="h-6 w-6" />
    case 'RefreshCcw': return <RefreshCcw className="h-6 w-6" />
    default: return <Files className="h-6 w-6" />
  }
}

export default function Services() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-background overflow-hidden">
      <SEO 
        title={t('servicesPage.title', 'Our Services | E-Visa Schengen')}
        description={t('servicesPage.description', 'Comprehensive visa and immigration services in Morocco. We handle Schengen, USA, Canada, and Gulf visas from consultation to passport delivery.')}
      />

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
              {t('common.services')}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {t('servicesPage.heroSubtitle', 'From profile assessment to final visa delivery, we offer a comprehensive suite of services designed to maximize your approval chances.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="glass-panel border-border h-full hover:border-primary/50 transition-all duration-300 group">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/20 text-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      {getIcon(service.icon)}
                    </div>
                    <CardTitle className="text-xl font-display text-foreground">{t(`servicesData.${service.id}.title`, service.title)}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {t(`servicesData.${service.id}.desc`, service.description)}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Button asChild size="lg" className="h-14 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Link to="/apply">
                {t('common.applyNow', 'Apply Now')} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}