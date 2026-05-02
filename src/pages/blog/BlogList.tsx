import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useMemo, useState, useEffect } from 'react'
import SEO from '@/components/SEO'

interface Blog {
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

export default function BlogList() {
  const { t, i18n } = useTranslation()
  const [searchParams, setSearchParams] = useSearchParams()
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    const categoryParam = (searchParams.get('category') || '').trim()
    if (categoryParam) {
      setActiveCategory(categoryParam)
    } else {
      setActiveCategory('all')
    }
  }, [searchParams])

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json() as any)
      .then(data => {
        if (data.success) {
          setBlogs(data.data)
        }
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  const categories = useMemo(() => {
    return Array.from(new Set(blogs.map(b => b.category).filter(Boolean))).sort((a, b) => a.localeCompare(b))
  }, [blogs])

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return blogs.filter(post => {
      const title = i18n.language === 'ar' && post.titleAr ? post.titleAr : i18n.language === 'fr' && post.titleFr ? post.titleFr : post.title
      const excerpt = i18n.language === 'ar' && post.excerptAr ? post.excerptAr : i18n.language === 'fr' && post.excerptFr ? post.excerptFr : post.excerpt

      const matchesCategory = activeCategory === 'all' ? true : post.category === activeCategory
      const matchesQuery = !q ? true : `${title} ${excerpt}`.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [blogs, searchQuery, activeCategory, i18n.language])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title="Visa & Immigration Blog | E-Visa Schengen" 
        description="Latest news, tips, and guides for Moroccan travelers and migrants regarding Schengen, Canada, and US visas."
      />
      <section className="relative w-full py-24 overflow-hidden border-b border-border">
        <div className="container px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto space-y-4"
          >
            <div className="inline-flex items-center rounded-full border border-border bg-foreground/5 px-3 py-1 text-sm font-medium backdrop-blur-md text-gold-400">
              Visa & Migration Insights
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl font-display text-gradient">
              {t('blogPage.title')}
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              {t('blogPage.subtitle')}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 flex-1">
        <div className="container px-4 md:px-6">
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              <div className="flex flex-col gap-4 mb-10">
                <div className="max-w-xl">
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('blogFilters.searchPlaceholder', 'Search articles...')}
                    className="bg-card border-border text-foreground"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCategory('all')
                      setSearchParams({})
                    }}
                    className={`px-3 py-1.5 rounded-full text-sm border ${activeCategory === 'all' ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:text-foreground'}`}
                  >
                    {t('blogFilters.allCategories', 'All categories')}
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat)
                        setSearchParams({ category: cat })
                      }}
                      className={`px-3 py-1.5 rounded-full text-sm border ${activeCategory === cat ? 'bg-primary text-primary-foreground border-primary' : 'bg-transparent text-muted-foreground border-border hover:text-foreground'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="h-full"
                  >
                    <Link to={`/blog/${post.slug}`} className="block h-full">
                      <Card className="glass-card border-border h-full flex flex-col overflow-hidden group cursor-pointer hover:border-border transition-all">
                        <div className="h-48 overflow-hidden relative">
                          <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10" />
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4 z-20">
                            <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                              {post.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-6 flex flex-col h-[calc(100%-12rem)]">
                          <div>
                            <div className="flex items-center text-sm text-muted-foreground mb-3">
                              <Calendar className="mr-2 h-4 w-4" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            <h2 className="text-2xl font-bold font-display mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                              {i18n.language === 'ar' && post.titleAr ? post.titleAr : i18n.language === 'fr' && post.titleFr ? post.titleFr : post.title}
                            </h2>
                            <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                              {i18n.language === 'ar' && post.excerptAr ? post.excerptAr : i18n.language === 'fr' && post.excerptFr ? post.excerptFr : post.excerpt}
                            </p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(post.createdAt).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1.5 text-primary group-hover:text-gold-400 transition-colors font-medium">
                              {t('blogPage.readMore')} <ArrowRight className="h-3 w-3" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  )
}
