import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useState, useEffect } from 'react'
import SEO from '@/components/SEO'
import { blogPosts } from '@/data/blog'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  image: string
  category: string
  createdAt: string
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // We will use the local mock data instead of the API
    // so it works perfectly on Vercel without needing to seed the DB
    const formattedBlogs = blogPosts.map(post => ({
      id: post.id,
      title: post.title,
      slug: post.id,
      excerpt: post.excerpt,
      image: post.image,
      category: post.category,
      createdAt: post.date
    }))
    
    setBlogs(formattedBlogs)
    setLoading(false)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title="Visa & Immigration Blog | VisaPlus" 
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
              Our Blog
            </h1>
            <p className="text-lg text-muted-foreground font-light">
              Latest news, tips, and guides for Moroccan travelers and migrants.
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
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
                      <h3 className="font-display font-bold text-xl text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t border-border">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1.5 text-primary group-hover:text-gold-400 transition-colors font-medium">
                          Read More <ArrowRight className="h-3 w-3" />
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
    </div>
  )
}