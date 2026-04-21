import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle2, Clock, MapPin, Download, AlertCircle, Calendar } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Schengen() {
  const { t } = useTranslation()

  const requirements = [
    "Valid Passport (issued within last 10 years, valid for 3+ months beyond return date, 2+ blank pages)",
    "Two recent biometric passport photos (ICAO standard, white background)",
    "Schengen Visa application form, fully completed and signed",
    "Travel Medical Insurance (minimum coverage €30,000, valid for entire Schengen area)",
    "Proof of Accommodation (hotel reservation, host invitation 'Attestation d'accueil', or rental agreement)",
    "Round-trip flight reservation or travel itinerary",
    "Proof of Financial Means (bank statements for last 3 months showing min. 3000 MAD/day or sponsor letter)",
    "Proof of Socio-Economic Status (work certificate, last 3 salary slips, CNSS registration, or commerce registry for business owners)",
    "Family record book (Livret de famille) for married applicants"
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
              Type C — Short Stay (up to 90 days)
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-foreground">
              Schengen Visas
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              Complete assistance for Tourist, Business, and Family Visit visas to France, Spain, Italy, Germany, and all 27 Schengen member states.
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
                <h2 className="text-3xl font-display font-bold text-gradient">Application Procedure</h2>
                <div className="relative border-l border-border ml-3 md:ml-4 space-y-8 pb-4">
                  {[
                    { title: "Consultation & Document Review", desc: "We analyze your profile and compile the exact checklist needed." },
                    { title: "File Preparation & Translation", desc: "Translation of Arabic documents to French/English/Spanish, filling forms." },
                    { title: "Appointment Booking", desc: "Securing a slot at VFS Global, TLScontact, or BLS." },
                    { title: "Biometrics & Submission", desc: "You submit your file and biometrics at the application center." },
                    { title: "Passport Collection", desc: "Tracking your application until your passport is returned." }
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
                        Note: Additional documents may be required depending on your specific socio-economic status (e.g., pensioners, students, minors).
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
                      <p className="text-sm text-muted-foreground">15 - 30 working days (Varies by embassy)</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Validity</p>
                      <p className="text-sm text-muted-foreground">Up to 90 days within a 180-day period</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Application Centers</p>
                      <p className="text-sm text-muted-foreground">Rabat, Nador, Oujda, Casablanca</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-muted-foreground">Embassy Fee:</span>
                      <span className="font-semibold text-foreground">€90</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">VFS/TLS Service Fee:</span>
                      <span className="font-semibold text-foreground">~450 MAD</span>
                    </div>
                    <Button asChild className="w-full h-12 text-lg shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                      <Link to="/portal">Start Application</Link>
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
