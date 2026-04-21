import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { motion } from 'framer-motion'

export default function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const setAuth = useAuthStore((state) => state.setAuth)
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      })

      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      setAuth(data.user, data.token)
      
      if (data.user.role === 'ADMIN' || data.user.role === 'AGENT') {
        navigate('/admin')
      } else {
        navigate('/portal')
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md z-10">
        <Card className="glass-panel border-border shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-display text-foreground">{t('auth.registerTitle')}</CardTitle>
            <CardDescription className="text-muted-foreground">{t('auth.registerSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 text-sm bg-red-500/10 border border-red-500/50 text-red-500 rounded-md text-center">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('auth.name')}</label>
                <Input 
                  type="text" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('auth.email')}</label>
                <Input 
                  type="email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                  placeholder="you@example.com"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('auth.phone')}</label>
                <Input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                  placeholder="+212 600 000 000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">{t('auth.password')}</label>
                <Input 
                  type="password" 
                  required 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground"
                  placeholder="••••••••"
                />
              </div>
              <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 mt-4">
                {loading ? '...' : t('auth.signUp')}
              </Button>
            </form>
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {t('auth.hasAccount')}{' '}
              <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
                {t('auth.signIn')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
