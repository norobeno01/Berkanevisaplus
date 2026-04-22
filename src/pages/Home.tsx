import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Plane, GraduationCap, Briefcase, MapPin, CheckCircle2, Globe2, ArrowRight, ShieldCheck, FileCheck, Calendar, MessageSquare, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { countriesData } from '@/data/countries'
import SEO from '@/components/SEO'

export default function Home() {
  const { t } = useTranslation()

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  const stats = [
    { value: "12,000+", label: t('home.stats.approved') },
    { value: "98%", label: t('home.stats.successRate') },
    { value: "40+", label: t('home.stats.countries') },
    { value: "24/7", label: t('home.stats.support') },
  ]

  const processSteps = [
    { title: t('home.process.step1.title'), desc: t('home.process.step1.desc'), icon: <MessageSquare className="h-6 w-6" /> },
    { title: t('home.process.step2.title'), desc: t('home.process.step2.desc'), icon: <FileCheck className="h-6 w-6" /> },
    { title: t('home.process.step3.title'), desc: t('home.process.step3.desc'), icon: <Briefcase className="h-6 w-6" /> },
    { title: t('home.process.step4.title'), desc: t('home.process.step4.desc'), icon: <Globe2 className="h-6 w-6" /> },
    { title: t('home.process.step5.title'), desc: t('home.process.step5.desc'), icon: <Plane className="h-6 w-6" /> },
  ]

  const testimonials = [
    {
      text: "The team at E-Visa Schengen made my Canadian student visa process incredibly smooth. Their attention to detail in document preparation is unmatched. I got my approval in just 3 weeks!",
      name: "Yassine M.",
      type: "Student Visa, Canada",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
      initials: "YM",
      color: "from-primary to-gold-500"
    },
    {
      text: "Excellent service! They handled my Schengen visa for France flawlessly. They translated my documents and prepared me for the TLS appointment. Highly recommended in the Oriental region.",
      name: "Fatima E.",
      type: "Tourist Visa, France",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      initials: "FE",
      color: "from-purple-500 to-pink-500"
    },
    {
      text: "I was struggling with my Express Entry profile, but E-Visa Schengen helped me maximize my CRS score and handled all the complex paperwork. Thanks to them, I am now a permanent resident.",
      name: "Hassan R.",
      type: "Express Entry, Canada",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
      initials: "HR",
      color: "from-emerald-500 to-teal-500"
    }
  ]

  const nextTestimonial = () => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)
  const prevTestimonial = () => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="E-Visa Schengen - Expert Visa & Immigration Services" 
        description="Your trusted partner for Schengen Visas, Canadian Study Permits, and global immigration services." 
      />
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="container px-4 md:px-6 relative z-10"
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh] pb-12 lg:pb-0">
            <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left pt-20 lg:pt-0 items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 lg:space-y-6 max-w-2xl"
              >
                <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md text-gold-400 w-fit mx-auto lg:mx-0 shadow-xl">
                  <Globe2 className="mr-2 h-4 w-4" />
                  {t('home.heroTag')}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gradient leading-tight">
                  {t('home.heroTitle')}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground lg:text-xl font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {t('home.heroSubtitle')}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0"
              >
                <Button asChild size="lg" className="h-14 px-8 text-base lg:text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(37,99,235,0.4)] border border-primary/50 w-full sm:w-auto rounded-xl">
                  <Link to="/apply">{t('home.bookConsultation')}</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base lg:text-lg glass hover:bg-foreground/5 border-border w-full sm:w-auto rounded-xl">
                  <a href="#destinations">{t('home.exploreVisas')}</a>
                </Button>
              </motion.div>
            </div>

            {/* 3D Floating Images Composition - Now Visible and Optimized for Mobile */}
            <div className="relative h-[380px] sm:h-[500px] lg:h-[600px] w-full perspective-1000 mt-8 lg:mt-0">
              {/* Main Background Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotateY: -15, rotateX: 10 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] lg:w-[85%] h-[260px] sm:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden border border-border shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80" 
                  alt="Paris" 
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Floating Front Image (Canada) */}
              <motion.div
                initial={{ opacity: 0, x: 20, y: 50, rotateZ: -5 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: [-10, 10, -10], // Floating animation
                  rotateZ: 0
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 0.4 },
                  x: { duration: 1, delay: 0.4, ease: "easeOut" },
                  rotateZ: { duration: 1, delay: 0.4, ease: "easeOut" },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute left-0 bottom-4 lg:bottom-10 w-[160px] sm:w-[220px] lg:w-[250px] h-[220px] sm:h-[280px] lg:h-[320px] rounded-2xl overflow-hidden border border-border shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <img 
                  src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=600&q=80" 
                  alt="Canada" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="bg-foreground/5 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-foreground border border-border shadow-lg">
                    Canada Migration
                  </div>
                </div>
              </motion.div>

              {/* Floating Top Image (Spain) */}
              <motion.div
                initial={{ opacity: 0, x: -20, y: -30, rotateZ: 5 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: [10, -10, 10], // Floating animation (opposite phase)
                  rotateZ: 0
                }}
                transition={{ 
                  opacity: { duration: 1, delay: 0.6 },
                  x: { duration: 1, delay: 0.6, ease: "easeOut" },
                  rotateZ: { duration: 1, delay: 0.6, ease: "easeOut" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute right-4 lg:right-10 top-0 w-[110px] sm:w-[150px] lg:w-[200px] h-[110px] sm:h-[150px] lg:h-[200px] rounded-2xl overflow-hidden border border-border shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-30"
              >
                <img 
                  src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=500&q=80" 
                  alt="Spain" 
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full glass flex items-center justify-center text-foreground shadow-lg backdrop-blur-md border border-border">
                    <Plane className="h-4 w-4 lg:h-5 lg:w-5 rotate-45" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Live Stats */}
      <section className="relative z-20 mt-8 lg:-mt-20 px-4">
        <div className="container">
          <div className="glass-card rounded-2xl p-6 lg:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.4)] border border-border">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 divide-x-0 md:divide-x divide-white/10">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center justify-center text-center px-2 sm:px-4"
                >
                  <div className="text-3xl sm:text-4xl font-display font-bold text-gradient-gold mb-1 sm:mb-2 drop-shadow-md">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground uppercase tracking-wider font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid - Visa Destinations */}
      <section id="destinations" className="w-full py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gradient">
              {t('home.destinations.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              {t('home.destinations.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {countriesData.map((country, idx) => {
              // Highlight the first two as featured (larger)
              const isFeatured = idx === 0 || idx === 1
              return (
                <motion.div 
                  key={country.id}
                  className={`${isFeatured ? 'md:col-span-2 md:row-span-2 min-h-[300px]' : 'min-h-[200px]'} group relative overflow-hidden rounded-3xl border border-border glass-card`}
                  whileHover={{ scale: 0.99 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link to="/visas" state={{ countryId: country.id }} className="block w-full h-full">
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10" />
                    <img src={country.image} alt={t(`countryData.${country.id}.name`, country.name)} loading="lazy" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className={`absolute bottom-0 left-0 z-20 w-full ${isFeatured ? 'p-8' : 'p-6'}`}>
                      <h3 className={`${isFeatured ? 'text-3xl' : 'text-2xl'} font-display font-bold text-foreground mb-2`}>{t(`countryData.${country.id}.name`, country.name)}</h3>
                      {isFeatured && (
                        <>
                          <p className="text-muted-foreground mb-4 max-w-md line-clamp-2">{t(`countryData.${country.id}.description`, country.description)}</p>
                          <Button variant="outline" className="glass border-border text-foreground hover:bg-foreground/5 group-hover:border-gold-500 transition-colors pointer-events-none">
                            {t('common.viewRequirements')} <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {!isFeatured && (
                        <p className="text-muted-foreground text-sm mb-1">{t(`countryData.${country.id}.type`, country.type)}</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="w-full py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/30" />
        <div className="container px-4 md:px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gradient mb-4">
              {t('home.process.title')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.process.subtitle')}
            </p>
          </motion.div>

          <div className="relative mt-12 lg:mt-24">
            {/* Connecting Animated Line (Desktop) */}
            <div className="absolute top-10 left-[10%] w-[80%] h-1 bg-foreground/5 hidden lg:block rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-primary via-gold-500 to-primary"
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </div>

            {/* Connecting Animated Line (Mobile) */}
            <div className="absolute top-0 bottom-0 left-[39px] sm:left-[49px] w-1 bg-foreground/5 lg:hidden rounded-full overflow-hidden">
              <motion.div 
                className="w-full bg-gradient-to-b from-primary via-gold-500 to-primary"
                initial={{ height: "0%" }}
                whileInView={{ height: "100%" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -40, y: 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.2, type: "spring", stiffness: 50 }}
                  className="relative flex flex-row lg:flex-col items-center lg:text-center group gap-6 lg:gap-0"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-20 h-20 shrink-0 sm:w-24 sm:h-24 lg:w-20 lg:h-20 rounded-2xl glass flex items-center justify-center lg:mb-6 text-foreground group-hover:text-gold-400 group-hover:border-gold-500/50 transition-all duration-300 shadow-xl relative bg-card border border-border"
                  >
                    {step.icon}
                    {/* Step Number Badge */}
                    <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold shadow-lg border-2 border-background">
                      {idx + 1}
                    </div>
                  </motion.div>
                  <div className="flex flex-col">
                    <h3 className="text-xl sm:text-2xl lg:text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm sm:text-base lg:text-sm leading-relaxed max-w-[250px]">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Brands / Partners Marquee */}
      <section className="w-full py-16 bg-foreground/5 border-y border-border overflow-hidden">
        <div className="container px-4 md:px-6 mb-8 text-center">
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground mb-2">
            {t('home.brands.brandsTitle', 'Partners & Official Bodies')}
          </h3>
          <p className="text-sm text-muted-foreground">
            {t('home.brands.brandsSubtitle', 'We work directly with official application centers and universities globally.')}
          </p>
        </div>
        <div className="relative flex w-full max-w-[100vw] overflow-hidden group">
          <div className="flex animate-marquee whitespace-nowrap gap-12 items-center w-max">
            {/* Duplicate list for seamless loop */}
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex gap-16 md:gap-24 px-8 items-center opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                <div className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Globe2 className="h-6 w-6"/> VFS Global</div>
                <div className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><ShieldCheck className="h-6 w-6"/> TLScontact</div>
                <div className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Briefcase className="h-6 w-6"/> BLS International</div>
                <div className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><MapPin className="h-6 w-6"/> Campus France</div>
                <div className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><Plane className="h-6 w-6"/> UK Visas</div>
                <div className="text-2xl font-bold font-display text-foreground flex items-center gap-2"><CheckCircle2 className="h-6 w-6"/> IRCC Canada</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges & Testimonials */}
      <section className="w-full py-24">
        <div className="container px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm font-medium backdrop-blur-md text-primary">
                <ShieldCheck className="mr-2 h-4 w-4" />
                {t('home.testimonials.badge')}
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gradient">
                {t('home.testimonials.title')}
              </h2>
              <p className="text-muted-foreground text-lg">
                {t('home.testimonials.subtitle')}
              </p>
              
              <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Mock logos of embassies/partners */}
                <div className="h-12 w-32 glass rounded-lg flex items-center justify-center font-display font-bold text-xl">VFS Global</div>
                <div className="h-12 w-32 glass rounded-lg flex items-center justify-center font-display font-bold text-xl">TLScontact</div>
                <div className="h-12 w-32 glass rounded-lg flex items-center justify-center font-display font-bold text-xl">BLS</div>
              </div>
            </div>

            <div className="relative space-y-6">
              <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
              
              <div className="relative z-10 overflow-hidden h-[450px] sm:h-[400px] md:h-[350px]">
                {testimonials.map((test, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 100, scale: 0.9 }}
                    animate={{ 
                      opacity: idx === activeTestimonial ? 1 : 0, 
                      x: idx === activeTestimonial ? 0 : (idx > activeTestimonial ? 100 : -100),
                      scale: idx === activeTestimonial ? 1 : 0.9,
                      pointerEvents: idx === activeTestimonial ? 'auto' : 'none'
                    }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                    className="absolute inset-0"
                  >
                    <Card className="glass-panel h-full border-border hover:border-gold-500/30 transition-colors shadow-2xl">
                      <CardContent className="p-8 sm:p-10 flex flex-col h-full justify-between">
                        <div>
                          <div className="flex gap-1 text-gold-500 mb-4 sm:mb-6">
                            {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />)}
                          </div>
                          <blockquote className="text-lg sm:text-xl italic font-light leading-relaxed mb-6 text-muted-foreground line-clamp-6 sm:line-clamp-4">
                            "{test.text}"
                          </blockquote>
                        </div>
                        <div className="flex items-center gap-4 mt-auto">
                          <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr ${test.color} p-[2px] shrink-0`}>
                            <div className="w-full h-full rounded-full bg-background flex items-center justify-center font-bold text-lg shadow-inner overflow-hidden">
                              {test.image ? (
                                <img src={test.image} alt={test.name} className="w-full h-full object-cover" />
                              ) : (
                                test.initials
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="font-bold text-foreground text-base sm:text-lg">{test.name}</div>
                            <div className="text-xs sm:text-sm text-primary font-medium">{test.type}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Carousel Controls */}
              <div className="flex justify-end gap-3 mt-4 relative z-20">
                <Button variant="outline" size="icon" onClick={prevTestimonial} className="rounded-full h-12 w-12 glass border-border text-foreground hover:bg-foreground/5 hover:text-gold-400">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextTestimonial} className="rounded-full h-12 w-12 glass border-border text-foreground hover:bg-foreground/5 hover:text-gold-400">
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>
      {/* Agency Team Section */}
      <section className="w-full py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter text-gradient mb-4">
              {t('home.team.teamTitle', 'Our Expert Team')}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t('home.team.teamSubtitle', 'Meet the certified immigration consultants dedicated to your success.')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Mounir Latrache",
                role: t('home.team.team.ceo', 'CEO & Lead Consultant'),
                img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
                desc: "15+ years experience in European & Canadian immigration."
              },
              {
                name: "Amina El Fassi",
                role: t('home.team.team.specialist', 'Senior Visa Specialist'),
                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
                desc: "Expert in Express Entry and Student Visas."
              },
              {
                name: "Youssef Tazi",
                role: t('home.team.team.coordinator', 'Application Coordinator'),
                img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
                desc: "Ensures flawless document preparation and translation."
              }
            ].map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group"
              >
                <Card className="glass-card border-border overflow-hidden h-full">
                  <div className="h-64 overflow-hidden relative">
                    <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  </div>
                  <CardContent className="p-6 text-center relative -mt-12 bg-background/80 backdrop-blur-md mx-4 rounded-xl border border-border shadow-lg">
                    <h3 className="text-xl font-display font-bold text-foreground mb-1">{member.name}</h3>
                    <p className="text-primary font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
