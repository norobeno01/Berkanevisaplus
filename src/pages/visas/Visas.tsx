import { useState, useMemo, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { CheckCircle2, Clock, Download, AlertCircle, ArrowLeft, FileText, Search, MapPin, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { countriesData } from '@/data/countries'
import SEO from '@/components/SEO'

type SourceLink = {
  title: string
  url: string
}

export default function Visas() {
  const { t, i18n } = useTranslation()
  const location = useLocation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountryId, setSelectedCountryId] = useState<string | null>(null)
  const [activeVisaTypeId, setActiveVisaTypeId] = useState<string | null>(null)
  const [topOrigins, setTopOrigins] = useState<string[]>([])
  const [originCode, setOriginCode] = useState<string>('')
  const [originSearch, setOriginSearch] = useState('')
  const [ruleDocuments, setRuleDocuments] = useState<string[] | null>(null)
  const [ruleSources, setRuleSources] = useState<SourceLink[]>([])
  const [ruleMatched, setRuleMatched] = useState(false)
  const [ruleLoading, setRuleLoading] = useState(false)

  useEffect(() => {
    if (location.state?.countryId) {
      setSelectedCountryId(location.state.countryId)
    }
  }, [location.state])

  useEffect(() => {
    if (selectedCountryId) {
      const country = countriesData.find(c => c.id === selectedCountryId)
      if (country?.visaTypes?.[0]?.id) {
        setActiveVisaTypeId(country.visaTypes[0].id)
      }
    } else {
      setActiveVisaTypeId(null)
    }
  }, [selectedCountryId])

  useEffect(() => {
    fetch('/api/origins')
      .then(res => res.json() as any)
      .then(data => {
        if (data?.success && data?.data?.top) {
          setTopOrigins(data.data.top)
          setOriginCode(prev => prev || String(data.data.top?.[0] || '').toUpperCase())
        }
      })
      .catch(() => {})
  }, [])

  const allOriginCountries = useMemo(() => {
    try {
      const supportedValuesOf = (Intl as any).supportedValuesOf
      const codes: string[] = supportedValuesOf ? supportedValuesOf('region') : []
      const displayNames = new (Intl as any).DisplayNames([i18n.language], { type: 'region' })
      return (codes || [])
        .filter((code: string) => /^[A-Z]{2}$/.test(code))
        .map((code: string) => ({ code, name: displayNames.of(code) || code }))
        .sort((a: any, b: any) => String(a.name).localeCompare(String(b.name)))
    } catch {
      return []
    }
  }, [i18n.language])

  const filteredOriginCountries = useMemo(() => {
    const term = originSearch.trim().toLowerCase()
    if (!term) return allOriginCountries
    return allOriginCountries.filter(c => c.name.toLowerCase().includes(term) || c.code.toLowerCase().includes(term))
  }, [originSearch, allOriginCountries])

  useEffect(() => {
    if (!selectedCountryId || !activeVisaTypeId || !originCode) return

    setRuleLoading(true)
    setRuleDocuments(null)
    setRuleSources([])
    setRuleMatched(false)

    const url = `/api/document-rules?destinationId=${encodeURIComponent(selectedCountryId)}&visaTypeId=${encodeURIComponent(activeVisaTypeId)}&origin=${encodeURIComponent(originCode)}`
    fetch(url)
      .then(res => res.json() as any)
      .then(data => {
        if (data?.success) {
          setRuleMatched(Boolean(data?.data?.matched))
          setRuleDocuments(data?.data?.documents ?? null)
          setRuleSources(Array.isArray(data?.data?.sources) ? data.data.sources : [])
        }
      })
      .catch(() => {})
      .finally(() => setRuleLoading(false))
  }, [selectedCountryId, activeVisaTypeId, originCode])

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countriesData
    return countriesData.filter(c => {
      const name = t(`countryData.${c.id}.name`, c.name).toLowerCase()
      return name.includes(searchTerm.toLowerCase())
    })
  }, [searchTerm, t])

  const selectedCountry = useMemo(() => {
    if (!selectedCountryId) return null
    return countriesData.find(c => c.id === selectedCountryId) || null
  }, [selectedCountryId])

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <SEO 
        title="Global Visas & Destinations | E-Visa Schengen"
        description="Select your destination country and discover the exact visa types, processing times, and document requirements for tourist, study, and work visas."
        keywords="visas, schengen visa, work visa, study visa, immigration, global destinations"
      />
      
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-20">
          <img 
            src={selectedCountry ? selectedCountry.image : "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=2000&q=80"} 
            alt="Visas" 
            className="w-full h-full object-cover transition-all duration-700" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
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
              <Globe className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" /> {t('common.visas', 'Global Destinations')}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-foreground">
              {selectedCountry 
                ? t(`countryData.${selectedCountry.id}.name`, selectedCountry.name) + ' Visas' 
                : t('home.visas.title', 'Select Your Destination')}
            </h1>
            <p className="text-xl text-muted-foreground font-light">
              {selectedCountry 
                ? t(`countryData.${selectedCountry.id}.description`, selectedCountry.description)
                : t('home.visas.subtitle', 'Choose from over 20+ global destinations and discover the exact visa types and requirements.')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          
          {/* Country Selection */}
          <AnimatePresence mode="wait">
            {!selectedCountry ? (
              <motion.div
                key="selector"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="max-w-md mx-auto relative">
                  <Search className={`absolute top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground ${i18n.language === 'ar' ? 'right-4' : 'left-4'}`} />
                  <Input 
                    type="text"
                    placeholder={t('common.searchCountry', 'Search for a country...')}
                    className={`h-14 text-lg bg-card/50 backdrop-blur-md border-border ${i18n.language === 'ar' ? 'pr-12' : 'pl-12'}`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredCountries.map(country => (
                    <Card 
                      key={country.id} 
                      className="glass-card border-border cursor-pointer hover:border-primary/50 transition-all group overflow-hidden"
                      onClick={() => setSelectedCountryId(country.id)}
                    >
                      <div className="h-24 w-full relative">
                        <img src={country.image} alt={country.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors" />
                      </div>
                      <CardContent className="p-4 text-center">
                        <h3 className="font-display font-bold text-foreground group-hover:text-primary transition-colors">
                          {t(`countryData.${country.id}.name`, country.name)}
                        </h3>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* Visa Details View */
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <Button variant="outline" onClick={() => setSelectedCountryId(null)} className="glass mb-4">
                  <ArrowLeft className={`h-4 w-4 ${i18n.language === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} /> {t('common.changeCountry', 'Change Destination')}
                </Button>

                <Tabs value={activeVisaTypeId || selectedCountry.visaTypes[0].id} onValueChange={setActiveVisaTypeId} className="w-full">
                  <TabsList className="mb-8 bg-card border border-border w-full flex-wrap h-auto p-1 justify-start">
                    {selectedCountry.visaTypes.map(visa => (
                      <TabsTrigger key={visa.id} value={visa.id} className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                        {t(`countryData.${selectedCountry.id}.visaTypes.${visa.id}.name`, visa.name)}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {selectedCountry.visaTypes.map(visa => {
                    const visaName = t(`countryData.${selectedCountry.id}.visaTypes.${visa.id}.name`, visa.name)
                    const visaDesc = t(`countryData.${selectedCountry.id}.visaTypes.${visa.id}.description`, visa.description)
                    const processingTime = t(`countryData.${selectedCountry.id}.visaTypes.${visa.id}.processingTime`, visa.processingTime)
                    const fee = t(`countryData.${selectedCountry.id}.visaTypes.${visa.id}.fee`, visa.fee)
                    const requirements = t(`countryData.${selectedCountry.id}.visaTypes.${visa.id}.requirements`, { returnObjects: true, defaultValue: visa.requirements }) as string[]
                    const documentsToShow = visa.id === activeVisaTypeId && ruleDocuments ? ruleDocuments : requirements

                    return (
                      <TabsContent key={visa.id} value={visa.id}>
                        <div className="grid lg:grid-cols-3 gap-12">
                          
                          {/* Left Column - Requirements & Info */}
                          <div className="lg:col-span-2 space-y-12">
                            <div className="space-y-6">
                              <div className="flex flex-wrap items-center justify-between gap-4">
                                <h2 className="text-3xl font-display font-bold text-gradient">{t('common.requirements', 'Document Checklist')}</h2>
                                <Button variant="outline" size="sm" className="glass border-border">
                                  <Download className={`h-4 w-4 ${i18n.language === 'ar' ? 'ml-2' : 'mr-2'}`} /> {t('common.downloadPdf', 'Download PDF')}
                                </Button>
                              </div>
                              <Card className="glass-card border-border">
                                <CardContent className="p-6 space-y-4">
                                  <div className="flex flex-col gap-3">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                      <p className="font-semibold text-foreground">{t('visas.originCountry', 'Origin Country')}</p>
                                      <div className="flex flex-wrap gap-2">
                                        {topOrigins.map(code => (
                                          <Button
                                            key={code}
                                            type="button"
                                            size="sm"
                                            variant={originCode === code ? 'default' : 'outline'}
                                            className={originCode === code ? '' : 'glass border-border'}
                                            onClick={() => setOriginCode(code)}
                                          >
                                            {code}
                                          </Button>
                                        ))}
                                      </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                      <Input
                                        value={originSearch}
                                        onChange={e => setOriginSearch(e.target.value)}
                                        placeholder={t('visas.searchOrigin', 'Search origin country...')}
                                        className="bg-card/50 backdrop-blur-md border-border"
                                      />
                                      <select
                                        value={originCode}
                                        onChange={e => setOriginCode(e.target.value)}
                                        className="h-10 rounded-md border border-border bg-card/50 px-3 text-sm text-foreground shadow-sm backdrop-blur-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                                      >
                                        <option value="" disabled>
                                          {t('visas.selectOrigin', 'Select origin...')}
                                        </option>
                                        {filteredOriginCountries.map(o => (
                                          <option key={o.code} value={o.code}>
                                            {o.name} ({o.code})
                                          </option>
                                        ))}
                                      </select>
                                    </div>
                                    {visa.id === activeVisaTypeId && (
                                      <div className="text-sm text-muted-foreground">
                                        {ruleLoading
                                          ? t('visas.loadingDocs', 'Loading requirements...')
                                          : ruleMatched
                                            ? t('visas.matchedRule', 'Showing tailored requirements for your origin country.')
                                            : t('visas.fallbackRule', 'Showing general requirements (no tailored rule found yet).')}
                                      </div>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                              <Card className="glass-card border-border">
                                <CardContent className="p-6">
                                  <p className="text-muted-foreground mb-6 font-medium">{visaDesc}</p>
                                  <ul className="space-y-4">
                                    {documentsToShow.map((req, idx) => (
                                      <li key={idx} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-gold-500 shrink-0 mt-0.5" />
                                        <span className="text-muted-foreground leading-relaxed">{req}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  {visa.id === activeVisaTypeId && ruleSources.length > 0 && (
                                    <div className="mt-8 pt-6 border-t border-border">
                                      <p className="font-semibold text-foreground mb-3">{t('visas.officialSources', 'Official sources')}</p>
                                      <ul className="space-y-2">
                                        {ruleSources.map((s, idx) => (
                                          <li key={idx}>
                                            <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline break-words">
                                              {s.title}
                                            </a>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  <div className="mt-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex gap-3">
                                    <AlertCircle className="h-5 w-5 text-primary shrink-0" />
                                    <p className="text-sm text-primary-foreground/90">
                                      {t('common.noteReq', 'Note: Embassy requirements frequently change. This checklist serves as a general guideline. Contact us for an exact profile assessment.')}
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
                                <CardTitle className="text-2xl font-display">{t('common.visaSummary', 'Visa Summary')}</CardTitle>
                              </CardHeader>
                              <CardContent className="space-y-6">
                                
                                <div className="flex items-start gap-4">
                                  <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                                    <Clock className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">{t('common.processingTime', 'Processing Time')}</p>
                                    <p className="text-sm text-muted-foreground">{processingTime}</p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-4">
                                  <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                                    <FileText className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">{t('common.visaType', 'Visa Type')}</p>
                                    <p className="text-sm text-muted-foreground">{visaName}</p>
                                  </div>
                                </div>

                                <div className="flex items-start gap-4">
                                  <div className="p-2 rounded-lg bg-foreground/5 text-gold-400">
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-foreground">{t('common.destination', 'Destination')}</p>
                                    <p className="text-sm text-muted-foreground">{t(`countryData.${selectedCountry.id}.name`, selectedCountry.name)}</p>
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-border">
                                  <div className="flex justify-between items-center mb-4">
                                    <span className="text-muted-foreground">{t('common.officialFees', 'Official Fees:')}</span>
                                    <span className="font-semibold text-foreground">{fee}</span>
                                  </div>
                                  <Button asChild className="w-full h-12 text-lg shadow-[0_0_20px_rgba(37,99,235,0.2)] bg-primary hover:bg-primary/90 text-primary-foreground">
                                    <Link to="/contact">{t('common.contact', 'Contact')}</Link>
                                  </Button>
                                </div>
                                
                              </CardContent>
                            </Card>
                          </div>

                        </div>
                      </TabsContent>
                    )
                  })}
                </Tabs>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
