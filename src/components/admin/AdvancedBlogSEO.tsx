import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'

export default function AdvancedBlogSEO({ editingBlog, blogLang }: { editingBlog: any, blogLang: string }) {
  const [focusKeyword, setFocusKeyword] = useState('')
  const [score, setScore] = useState(0)
  const [checks, setChecks] = useState<any[]>([])

  useEffect(() => {
    let currentScore = 100
    const newChecks = []

    const title = (blogLang === 'en' ? editingBlog.title : blogLang === 'ar' ? editingBlog.titleAr : editingBlog.titleFr) || ''
    const content = (blogLang === 'en' ? editingBlog.content : blogLang === 'ar' ? editingBlog.contentAr : editingBlog.contentFr) || ''
    const plainText = content.replace(/<[^>]+>/g, ' ').toLowerCase()
    const wordCount = plainText.split(/\s+/).filter((w: string) => w.length > 0).length

    // 1. Word Count Check
    if (wordCount < 300) {
      currentScore -= 20
      newChecks.push({ status: 'error', text: `Content is too thin (${wordCount} words). Aim for at least 300 words.` })
    } else if (wordCount < 600) {
      currentScore -= 5
      newChecks.push({ status: 'warning', text: `Content is okay (${wordCount} words), but > 600 is better for SEO.` })
    } else {
      newChecks.push({ status: 'success', text: `Great content length (${wordCount} words).` })
    }

    // 2. Title Length Check
    if (title.length < 30) {
      currentScore -= 10
      newChecks.push({ status: 'error', text: `Title is too short (${title.length} chars). Aim for 40-60.` })
    } else if (title.length > 60) {
      currentScore -= 5
      newChecks.push({ status: 'warning', text: `Title is too long (${title.length} chars). Keep under 60 to avoid truncation.` })
    } else {
      newChecks.push({ status: 'success', text: `Optimal title length (${title.length} chars).` })
    }

    // 3. Headings Check
    if (!content.includes('<h2') && !content.includes('<h3')) {
      currentScore -= 10
      newChecks.push({ status: 'error', text: 'No H2 or H3 headings found. Structure your content.' })
    } else {
      newChecks.push({ status: 'success', text: 'Good use of heading tags (H2/H3) found.' })
    }

    // 4. Internal/External Links
    if (!content.includes('href=')) {
      currentScore -= 10
      newChecks.push({ status: 'warning', text: 'No links found. Add internal or external links.' })
    } else {
      newChecks.push({ status: 'success', text: 'Links found in content.' })
    }

    // Focus Keyword Analysis
    if (focusKeyword) {
      const keywordLower = focusKeyword.toLowerCase()
      
      // Keyword in Title
      if (title.toLowerCase().includes(keywordLower)) {
        newChecks.push({ status: 'success', text: 'Focus keyword found in Title.' })
      } else {
        currentScore -= 15
        newChecks.push({ status: 'error', text: 'Focus keyword not found in Title.' })
      }

      // Keyword in Content / Density
      const keywordCount = (plainText.match(new RegExp(keywordLower, 'g')) || []).length
      if (keywordCount === 0) {
        currentScore -= 20
        newChecks.push({ status: 'error', text: 'Focus keyword not found in content.' })
      } else {
        const density = ((keywordCount / wordCount) * 100).toFixed(2)
        if (parseFloat(density) > 3) {
          currentScore -= 10
          newChecks.push({ status: 'warning', text: `Keyword density is too high (${density}%). Risk of keyword stuffing.` })
        } else {
          newChecks.push({ status: 'success', text: `Good keyword density (${density}%).` })
        }
      }
    } else {
      newChecks.push({ status: 'warning', text: 'Set a Focus Keyword to get advanced analysis.' })
      currentScore -= 10
    }

    setScore(Math.max(0, currentScore))
    setChecks(newChecks)
  }, [editingBlog, blogLang, focusKeyword])

  return (
    <Card className="glass-panel border-border">
      <CardHeader>
        <CardTitle className="text-lg font-display text-foreground flex justify-between items-center">
          On-Page SEO Analyzer
          <Badge className={score >= 80 ? 'bg-green-500/20 text-green-500' : score >= 50 ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'}>
            Score: {score}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Focus Keyword</label>
          <Input 
            placeholder="e.g. Schengen Visa Morocco" 
            value={focusKeyword}
            onChange={(e) => setFocusKeyword(e.target.value)}
            className="bg-card border-border text-foreground" 
          />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-foreground border-b border-border pb-1">Analysis Results</h4>
          <ul className="space-y-2 text-sm">
            {checks.map((check, i) => (
              <li key={i} className="flex items-start gap-2">
                {check.status === 'success' && <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500 shrink-0" />}
                {check.status === 'warning' && <AlertCircle className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" />}
                {check.status === 'error' && <XCircle className="w-4 h-4 mt-0.5 text-red-500 shrink-0" />}
                <span className={check.status === 'success' ? 'text-muted-foreground' : check.status === 'warning' ? 'text-amber-500' : 'text-red-500'}>
                  {check.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}