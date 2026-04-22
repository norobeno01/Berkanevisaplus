import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Award, Users, Globe2, ShieldCheck } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export default function About() {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" alt="VisaPlus Team" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm font-medium backdrop-blur-md text-gold-400">
              {t('about.tag')}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-foreground">
              {t('about.title')}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {t('about.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-display font-bold text-gradient">{t('about.whoWeAre')}</h2>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('about.p1')}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {t('about.p2')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <Award className="h-8 w-8 text-gold-500 mx-auto" />
                  <div className="text-3xl font-bold text-foreground">10+</div>
                  <div className="text-sm text-muted-foreground">{t('about.stats.years')}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <Users className="h-8 w-8 text-primary mx-auto" />
                  <div className="text-3xl font-bold text-foreground">12k+</div>
                  <div className="text-sm text-muted-foreground">{t('about.stats.clients')}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <Globe2 className="h-8 w-8 text-green-500 mx-auto" />
                  <div className="text-3xl font-bold text-foreground">40+</div>
                  <div className="text-sm text-muted-foreground">{t('about.stats.countries')}</div>
                </CardContent>
              </Card>
              <Card className="glass-card border-border">
                <CardContent className="p-6 text-center space-y-2">
                  <ShieldCheck className="h-8 w-8 text-purple-500 mx-auto" />
                  <div className="text-3xl font-bold text-foreground">98%</div>
                  <div className="text-sm text-muted-foreground">{t('about.stats.success')}</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}