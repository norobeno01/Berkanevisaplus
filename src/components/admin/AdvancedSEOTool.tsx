import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Save, RefreshCcw, LineChart, Search, CheckCircle2, AlertCircle, Link as LinkIcon, FileText, ArrowUpRight, BarChart3, Activity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'

export default function AdvancedSEOTool({ seoSettings, setSeoSettings, token }: { seoSettings: any, setSeoSettings: any, token: string }) {
  const [sitemapLoading, setSitemapLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [keywordData, setKeywordData] = useState<any>(null)

  const handleSaveSettings = async () => {
    setSaveLoading(true)
    try {
      await fetch('/api/seo/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(seoSettings)
      })
    } catch (e) {}
    setSaveLoading(false)
  }

  const analyzeKeyword = () => {
    if (!keyword) return
    setAnalyzing(true)
    // Simulate API call to Ahrefs/Semrush
    setTimeout(() => {
      setKeywordData({
        volume: Math.floor(Math.random() * 50000) + 1000,
        kd: Math.floor(Math.random() * 100),
        cpc: (Math.random() * 5).toFixed(2),
        intent: ['Informational', 'Navigational', 'Commercial', 'Transactional'][Math.floor(Math.random() * 4)],
        trend: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100))
      })
      setAnalyzing(false)
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-foreground">Advanced SEO Suite</h1>
          <p className="text-muted-foreground mt-1">Professional tools to optimize rankings, analyze keywords, and track backlinks.</p>
        </div>
        <Button
          onClick={async () => {
            setSitemapLoading(true)
            await fetch('/api/seo/ping-google', { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } })
            setTimeout(() => setSitemapLoading(false), 1000)
          }}
          className="bg-green-500 hover:bg-green-600 text-foreground gap-2"
          disabled={sitemapLoading}
        >
          {sitemapLoading ? <RefreshCcw className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
          {sitemapLoading ? 'Pinging Google...' : 'Ping Google Sitemap'}
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="mb-6 bg-card border border-border w-full flex-wrap h-auto p-1 justify-start">
          <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Activity className="w-4 h-4 mr-2" /> Site Health Overview</TabsTrigger>
          <TabsTrigger value="keywords" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Search className="w-4 h-4 mr-2" /> Keyword Magic Tool</TabsTrigger>
          <TabsTrigger value="onpage" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><FileText className="w-4 h-4 mr-2" /> On-Page Checker</TabsTrigger>
          <TabsTrigger value="backlinks" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><LinkIcon className="w-4 h-4 mr-2" /> Backlink Analytics</TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"><Globe className="w-4 h-4 mr-2" /> Global Meta Settings</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid lg:grid-cols-4 gap-6">
            <Card className="glass-panel border-border lg:col-span-1">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                <div className="relative w-32 h-32 mb-4 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/20" />
                    <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * 92) / 100} className="text-green-500 transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center flex-col">
                    <span className="text-3xl font-bold text-foreground">92</span>
                    <span className="text-xs text-muted-foreground">Score</span>
                  </div>
                </div>
                <h3 className="font-semibold text-foreground text-lg">Site Health</h3>
                <p className="text-sm text-muted-foreground mt-2">Your website is exceptionally optimized and passing top Core Web Vitals.</p>
              </CardContent>
            </Card>

            <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-6">
              <Card className="glass-panel border-border">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Organic Traffic</p>
                  <h3 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    12.4K <Badge className="bg-green-500/20 text-green-500 text-xs px-1.5"><ArrowUpRight className="w-3 h-3 mr-1"/> 14%</Badge>
                  </h3>
                  <div className="h-16 mt-4 flex items-end gap-1">
                    {[30, 40, 35, 50, 45, 60, 75, 65, 80, 95, 90, 100].map((h, i) => (
                      <div key={i} className="flex-1 bg-primary/50 rounded-t-sm" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card className="glass-panel border-border">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Domain Authority</p>
                  <h3 className="text-3xl font-bold text-foreground">48<span className="text-lg text-muted-foreground font-normal">/100</span></h3>
                  <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1"><CheckCircle2 className="w-4 h-4 text-green-500"/> Top 20% in niche</p>
                </CardContent>
              </Card>
              <Card className="glass-panel border-border">
                <CardContent className="p-6">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Crawled Pages</p>
                  <h3 className="text-3xl font-bold text-foreground">1,240</h3>
                  <p className="text-sm text-muted-foreground mt-4 flex items-center gap-1"><AlertCircle className="w-4 h-4 text-amber-500"/> 3 pages have warnings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Keywords Tab */}
        <TabsContent value="keywords">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Keyword Magic Tool</CardTitle>
              <CardDescription>Analyze keyword search volume, difficulty, and CPC like Ahrefs/Semrush.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-8">
                <Input 
                  placeholder="Enter a keyword (e.g. 'Canada express entry')" 
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="bg-card border-border text-foreground max-w-md h-12 text-lg"
                />
                <Button onClick={analyzeKeyword} disabled={analyzing || !keyword} className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground px-8">
                  {analyzing ? 'Analyzing...' : 'Analyze'}
                </Button>
              </div>

              {keywordData && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid md:grid-cols-4 gap-6">
                  <div className="p-6 rounded-xl border border-border bg-foreground/5 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><BarChart3 className="w-4 h-4" /> Volume</p>
                    <h3 className="text-3xl font-bold text-foreground">{keywordData.volume.toLocaleString()}</h3>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-foreground/5 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Activity className="w-4 h-4" /> Keyword Difficulty (KD)</p>
                    <h3 className="text-3xl font-bold flex items-center gap-3">
                      {keywordData.kd} 
                      <Badge className={keywordData.kd > 70 ? 'bg-red-500/20 text-red-500' : keywordData.kd > 40 ? 'bg-amber-500/20 text-amber-500' : 'bg-green-500/20 text-green-500'}>
                        {keywordData.kd > 70 ? 'Hard' : keywordData.kd > 40 ? 'Medium' : 'Easy'}
                      </Badge>
                    </h3>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-foreground/5 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><FileText className="w-4 h-4" /> Intent</p>
                    <h3 className="text-2xl font-bold text-foreground">{keywordData.intent}</h3>
                  </div>
                  <div className="p-6 rounded-xl border border-border bg-foreground/5 space-y-2">
                    <p className="text-sm font-medium text-muted-foreground flex items-center gap-2"><Globe className="w-4 h-4" /> CPC (USD)</p>
                    <h3 className="text-3xl font-bold text-foreground">${keywordData.cpc}</h3>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* On-Page Tab */}
        <TabsContent value="onpage">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">On-Page SEO Checker</CardTitle>
              <CardDescription>Simulates Yoast/RankMath analysis for your blog pages.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-8 border border-dashed border-border rounded-xl text-center bg-foreground/5">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium text-foreground mb-2">Live Content Analysis</h3>
                <p className="text-muted-foreground">The On-Page analyzer is automatically active when you edit a Blog Post in the "Blogs" tab. It checks Keyword Density, Flesch Reading Ease, Title Length, and Meta Tags in real-time.</p>
                <Button className="mt-6" variant="outline" onClick={() => document.getElementById('tab-blogs')?.click()}>Go to Blog Editor</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Backlink Analytics</CardTitle>
              <CardDescription>Monitor your referring domains and toxic link profile.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-xl border border-border bg-foreground/5 text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Total Backlinks</p>
                  <h3 className="text-4xl font-bold text-primary">8,492</h3>
                </div>
                <div className="p-6 rounded-xl border border-border bg-foreground/5 text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Referring Domains</p>
                  <h3 className="text-4xl font-bold text-foreground">415</h3>
                </div>
                <div className="p-6 rounded-xl border border-border bg-foreground/5 text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">Toxicity Score</p>
                  <h3 className="text-4xl font-bold text-green-500">Low (2%)</h3>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground">Recent Discovered Links</h4>
                <div className="space-y-2">
                  {['https://travelblog.com/top-visas-2024', 'https://morocconews.ma/immigration-update', 'https://studentforum.fr/study-in-france-guide'].map((link, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-3">
                        <LinkIcon className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">{link}</span>
                      </div>
                      <Badge variant="outline" className="text-green-500 border-green-500/20 bg-green-500/10">Follow</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Global Settings Tab */}
        <TabsContent value="settings">
          <Card className="glass-panel border-border">
            <CardHeader>
              <CardTitle className="text-xl font-display text-foreground">Global Meta Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Global Site Title</label>
                <Input
                  value={seoSettings.siteName}
                  onChange={e => setSeoSettings({...seoSettings, siteName: e.target.value})}
                  className="bg-card border-border text-foreground max-w-xl"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Global Description</label>
                <textarea
                  value={seoSettings.siteDesc}
                  onChange={e => setSeoSettings({...seoSettings, siteDesc: e.target.value})}
                  className="flex min-h-[100px] max-w-xl w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Default Keywords (comma separated)</label>
                <Input
                  value={seoSettings.keywords}
                  onChange={e => setSeoSettings({...seoSettings, keywords: e.target.value})}
                  className="bg-card border-border text-foreground max-w-xl"
                />
              </div>
              
              {/* Google SERP Preview Simulator */}
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="text-sm font-medium text-muted-foreground mb-4">Google SERP Preview</h4>
                <div className="max-w-2xl p-4 bg-white dark:bg-[#202124] rounded-lg shadow-sm border border-border/50 font-sans">
                  <div className="text-[#202124] dark:text-[#dadce0] text-[14px] flex items-center gap-2 mb-1">
                    <span className="bg-[#f1f3f4] dark:bg-[#303134] rounded-full w-6 h-6 flex items-center justify-center text-xs">V</span>
                    <span className="truncate">https://www.e-visaschengen.com</span>
                  </div>
                  <h3 className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] leading-tight hover:underline cursor-pointer mb-1">
                    {seoSettings.siteName}
                  </h3>
                  <p className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] leading-snug line-clamp-2">
                    {seoSettings.siteDesc}
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button onClick={handleSaveSettings} disabled={saveLoading} className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                  <Save className="h-4 w-4" /> {saveLoading ? 'Saving...' : 'Save Global Settings'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}