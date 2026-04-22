import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import SEO from '@/components/SEO'
import { blogPosts } from '@/data/blog'

interface Blog {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  createdAt: string
  metaTitle?: string
  metaDesc?: string
  keywords?: string
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Blog | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Find the post locally instead of calling the API
    const foundPost = blogPosts.find(p => p.id === id)
    if (foundPost) {
      setPost({
        id: foundPost.id,
        title: foundPost.title,
        slug: foundPost.id,
        excerpt: foundPost.excerpt,
        content: foundPost.content,
        image: foundPost.image,
        category: foundPost.category,
        author: foundPost.author,
        createdAt: foundPost.date
      })
    }
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4 bg-background text-foreground">
        <h1 className="text-4xl font-display font-bold">Post Not Found</h1>
        <p className="text-muted-foreground">The article you are looking for does not exist.</p>
        <Button asChild className="bg-primary hover:bg-primary/90"><Link to="/blog">Return to Blog</Link></Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SEO 
        title={post.metaTitle || post.title} 
        description={post.metaDesc || post.excerpt} 
        keywords={post.keywords || `${post.category}, visa, immigration`} 
      />
      {/* Hero Section */}
      <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute inset-0 z-0 opacity-20">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/40" />
        </div>
        
        <div className="container px-4 md:px-6 relative z-10">
          <Button variant="ghost" asChild className="mb-8 text-muted-foreground hover:text-foreground hover:bg-foreground/5 -ml-4">
            <Link to="/blog"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog</Link>
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl space-y-6"
          >
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5 bg-primary/20 text-primary px-3 py-1 rounded-full font-medium">
                <Tag className="h-3.5 w-3.5" /> {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-foreground leading-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24 flex-1">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <Card className="glass-panel border-border">
            <CardContent className="p-8 md:p-12 prose dark:prose-invert prose-lg max-w-none text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}