import { useTranslation } from 'react-i18next'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Plane, FileText } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import SEO from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

const HERO_IMAGES = {
  main: "https://images.unsplash.com/photo-1506812574058-fc75fa93fead?auto=format&fit=crop&w=1400&q=80",
  front: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=900&q=80",
  top: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80"
}

type Blog = {
  id: string
  title: string
  titleAr?: string
  titleFr?: string
  slug: string
  excerpt: string
  excerptAr?: string
  excerptFr?: string
  image: string
  category: string
  createdAt: string
}

export default function Home() {
  const { t, i18n } = useTranslation()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [blogsLoading, setBlogsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 100])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json() as any)
      .then(data => {
        if (data?.success && Array.isArray(data.data)) {
          setBlogs(data.data)
        }
        setBlogsLoading(false)
      })
      .catch(() => setBlogsLoading(false))
  }, [])

  const featured = blogs[0]
  const latest = useMemo(() => blogs.slice(0, 9), [blogs])
  const categories = useMemo(() => Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).sort((a, b) => a.localeCompare(b)), [blogs])

  const getTitle = (p: Blog) => i18n.language === 'ar' && p.titleAr ? p.titleAr : i18n.language === 'fr' && p.titleFr ? p.titleFr : p.title
  const getExcerpt = (p: Blog) => i18n.language === 'ar' && p.excerptAr ? p.excerptAr : i18n.language === 'fr' && p.excerptFr ? p.excerptFr : p.excerpt

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO
        title="Visa & Immigration Blog | E-Visa Schengen"
        description="Guides, updates, and checklists on visa procedures and immigration pathways."
      />

      <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/25 rounded-full blur-[100px] animate-pulse-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold-500/15 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
        </div>

        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="container px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center min-h-[70vh] pb-12 lg:pb-0">
            <div className="flex flex-col space-y-6 lg:space-y-8 text-center lg:text-left pt-20 lg:pt-0 items-center lg:items-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 lg:space-y-6 max-w-2xl"
              >
                <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1.5 text-xs sm:text-sm font-medium backdrop-blur-md text-gold-400 w-fit mx-auto lg:mx-0 shadow-xl">
                  <FileText className="mr-2 h-4 w-4" />
                  {t('homeBlog.heroTag', 'Visa & Immigration Blog')}
                </div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gradient leading-tight font-display">
                  {t('homeBlog.heroTitle', 'Visa & Immigration Blog')}
                </h1>
                <p className="text-base sm:text-lg text-muted-foreground lg:text-xl font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                  {t('homeBlog.heroSubtitle', 'Guides, updates, and checklists to help you understand visa procedures and immigration pathways.')}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto px-4 sm:px-0"
              >
                <Button asChild size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(37,99,235,0.35)] border border-primary/40 w-full sm:w-auto rounded-xl">
                  <a href="#latest">{t('homeBlog.ctaReadLatest', 'Read Latest Articles')}</a>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-base glass hover:bg-foreground/5 border-border w-full sm:w-auto rounded-xl">
                  <Link to="/visas">{t('homeBlog.ctaExploreVisas', 'Explore Visa Requirements')}</Link>
                </Button>
              </motion.div>
            </div>

            <div className="relative h-[380px] sm:h-[500px] lg:h-[600px] w-full perspective-1000 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -12, rotateX: 8 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[85%] h-[260px] sm:h-[350px] lg:h-[400px] rounded-3xl overflow-hidden border border-border shadow-[0_0_50px_rgba(0,0,0,0.5)] z-10"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/25 to-transparent z-10" />
                <img src={HERO_IMAGES.main} alt="Blog hero" className="w-full h-full object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20, y: 50, rotateZ: -6 }}
                animate={{ opacity: 1, x: 0, y: [-10, 10, -10], rotateZ: 0 }}
                transition={{
                  opacity: { duration: 0.9, delay: 0.35 },
                  x: { duration: 0.9, delay: 0.35, ease: 'easeOut' },
                  rotateZ: { duration: 0.9, delay: 0.35, ease: 'easeOut' },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
                }}
                className="absolute left-0 bottom-4 lg:bottom-10 w-[160px] sm:w-[220px] lg:w-[250px] h-[220px] sm:h-[280px] lg:h-[320px] rounded-2xl overflow-hidden border border-border shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-20"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
                <img src={HERO_IMAGES.front} alt="Visa documents" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute bottom-3 left-3 z-20">
                  <div className="bg-foreground/5 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold text-foreground border border-border shadow-lg">
                    Visa Guides
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20, y: -30, rotateZ: 8 }}
                animate={{ opacity: 1, x: 0, y: [10, -10, 10], rotateZ: 0 }}
                transition={{
                  opacity: { duration: 0.9, delay: 0.55 },
                  x: { duration: 0.9, delay: 0.55, ease: 'easeOut' },
                  rotateZ: { duration: 0.9, delay: 0.55, ease: 'easeOut' },
                  y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }
                }}
                className="absolute right-4 lg:right-10 top-0 w-[110px] sm:w-[150px] lg:w-[200px] h-[110px] sm:h-[150px] lg:h-[200px] rounded-2xl overflow-hidden border border-border shadow-[0_20px_50px_rgba(0,0,0,0.6)] z-30"
              >
                <img src={HERO_IMAGES.top} alt="Checklist" loading="lazy" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                  <motion.div
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center text-foreground shadow-lg backdrop-blur-md border border-border"
                  >
                    <Plane className="h-5 w-5 rotate-45" />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {t('homeBlog.featuredTitle', 'Featured Article')}
            </h2>
            <Button asChild variant="outline" className="glass border-border text-foreground hover:bg-foreground/5">
              <Link to="/blog">{t('homeBlog.viewAll', 'View All Articles')}</Link>
            </Button>
          </div>

          {blogsLoading ? (
            <div className="flex justify-center items-center min-h-[180px]">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : featured ? (
            <Link to={`/blog/${featured.slug}`} className="block">
              <Card className="glass-card border-border overflow-hidden group">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-64 lg:h-auto overflow-hidden">
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <CardContent className="p-8 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {new Date(featured.createdAt).toLocaleDateString()}
                      </div>
                      <h3 className="text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors">
                        {getTitle(featured)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {getExcerpt(featured)}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center gap-2 text-primary group-hover:text-gold-400 transition-colors font-medium">
                      {t('blogPage.readMore', 'Read More')} <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </div>
              </Card>
            </Link>
          ) : (
            <div className="text-muted-foreground">{t('blogPage.postNotFoundDesc', 'No articles found.')}</div>
          )}
        </div>
      </section>

      <section id="latest" className="py-16 md:py-24 border-t border-border">
        <div className="container px-4 md:px-6">
          <div className="flex items-end justify-between gap-6 mb-8">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {t('homeBlog.latestTitle', 'Latest Articles')}
            </h2>
            <Button asChild variant="outline" className="glass border-border text-foreground hover:bg-foreground/5">
              <Link to="/blog">{t('homeBlog.viewAll', 'View All Articles')}</Link>
            </Button>
          </div>

          {blogsLoading ? (
            <div className="flex justify-center items-center min-h-[180px]">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latest.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link to={`/blog/${post.slug}`} className="block h-full">
                    <Card className="glass-card border-border h-full flex flex-col overflow-hidden group">
                      <div className="h-48 overflow-hidden relative">
                        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-6 flex flex-col flex-1">
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <Calendar className="mr-2 h-4 w-4" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <h3 className="text-2xl font-bold font-display mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {getTitle(post)}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                          {getExcerpt(post)}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border mt-auto">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(post.createdAt).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1.5 text-primary group-hover:text-gold-400 transition-colors font-medium">
                            {t('blogPage.readMore', 'Read More')} <ArrowRight className="h-3 w-3" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-border">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-8">
            {t('homeBlog.categoriesTitle', 'Browse by Category')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <Link
                key={cat}
                to={`/blog?category=${encodeURIComponent(cat)}`}
                className="px-3 py-1.5 rounded-full text-sm border border-border text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-t border-border">
        <div className="container px-4 md:px-6">
          <Card className="glass-panel border-border overflow-hidden">
            <CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-2">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  {t('homeBlog.ctaExploreVisas', 'Explore Visa Requirements')}
                </h2>
                <p className="text-muted-foreground">
                  {t('home.visas.subtitle', 'Select your destination country and discover the exact visa types and document requirements.')}
                </p>
              </div>
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/visas">
                  {t('homeBlog.ctaExploreVisas', 'Explore Visa Requirements')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
