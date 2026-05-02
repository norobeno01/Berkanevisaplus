import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import SEO from '@/components/SEO'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

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

      <section className="relative w-full py-24 md:py-32 overflow-hidden border-b border-border">
        <div className="absolute inset-0 z-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/40 via-background to-background" />
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm font-medium backdrop-blur-md text-gold-400">
              {t('homeBlog.heroTag', 'Visa & Immigration Blog')}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-gradient">
              {t('homeBlog.heroTitle', 'Visa & Immigration Blog')}
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              {t('homeBlog.heroSubtitle', 'Guides, updates, and checklists to help you understand visa procedures and immigration pathways.')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button asChild size="lg" className="h-12 px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="#latest">{t('homeBlog.ctaReadLatest', 'Read Latest Articles')}</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 px-8 glass border-border text-foreground hover:bg-foreground/5">
                <Link to="/visas">{t('homeBlog.ctaExploreVisas', 'Explore Visa Requirements')}</Link>
              </Button>
            </div>
          </motion.div>
        </div>
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
