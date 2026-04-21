import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, MapPin, Download, AlertCircle, ArrowLeft, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { countriesData } from '@/data/countries'
import SEO from '@/components/SEO'

export default function CountryVisa() {
  const { country } = useParams<{ country: string }>()
  const { t } = useTranslation()
  const data = countriesData.find(c => c.id === country)

  if (!data) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <h1 className="text-4xl font-display font-bold">Country Not Found</h1>
        <p className="text-muted-foreground">The visa information you're looking for doesn't exist or has been moved.</p>
        <Button asChild><Link to="/">Return to Home</Link></Button>
      </div>
    )
  }

  // Use translation data if available, fallback to hardcoded data
  const name = t(`countryData.${data.id}.name`, data.name)
  const type = t(`countryData.${data.id}.type`, data.type)
  const processingTime = t(`countryData.${data.id}.processingTime`, data.processingTime)
  const fee = t(`countryData.${data.id}.fee`, data.fee)
  const description = t(`countryData.${data.id}.description`, data.description)
  // Requirements array from translation
  const requirements = t(`countryData.${data.id}.requirements`, { returnObjects: true, defaultValue: data.requirements }) as string[]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title={`${name} Visa Application | VisaPlus`}
        description={`Expert assistance for your ${name} ${type}. Processing time: ${processingTime}. Apply now with VisaPlus.`}
        keywords={`${name} visa, schengen visa ${name}, immigration ${name}, morocco`}
      />
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={data.image} alt={name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <Button variant="ghost" asChild className="mb-6 text-muted-foreground hover:text-foreground hover:bg-foreground/5 -ml-4">
            <Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> {t('common.backToHome', 'Back to Home')}</Link>
          </Button>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm font-medium backdrop-blur-md text-gold-400">
              {type}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-foreground">
              {name} Visas
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {description}
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
              {/* Requirements */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-display font-bold text-gradient">Document Checklist</h2>
                  <Button variant="outline" size="sm" className="glass border-border">
                    <Download className="mr-2 h-4 w-4" /> Download PDF
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
                        Note: Embassy requirements frequently change. This checklist serves as a general guideline. Contact us for an exact profile assessment.
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
                  <CardTitle className="text-2xl font-display">Visa Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Processing Time</p>
                      <p className="text-sm text-muted-foreground">{processingTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Visa Type</p>
                      <p className="text-sm text-muted-foreground">{type}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">Official Fees:</span>
                      <span className="font-semibold text-foreground">{fee}</span>
                    </div>
                    <Button asChild className="w-full h-12 text-lg shadow-[0_0_20px_rgba(37,99,235,0.2)] bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link to="/apply">{t('common.applyNow', 'Apply Now')}</Link>
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
