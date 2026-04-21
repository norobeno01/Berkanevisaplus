import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, X, LogOut, User } from 'lucide-react'
import { useState, useEffect, Suspense, lazy } from 'react'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/authStore'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import Footer from './components/layout/Footer'
import PrivacyPopup from './components/layout/PrivacyPopup'
import Chatbot from './components/Chatbot'
import { ThemeProvider } from './components/ThemeProvider'
import ThemeToggle from './components/ThemeToggle'
import AnimatedBackground from './components/AnimatedBackground'
import ScrollToTop from './components/ScrollToTop'

// Lazy-loaded routes for performance optimization
const Home = lazy(() => import('./pages/Home'))
const Portal = lazy(() => import('./pages/Portal'))
const Admin = lazy(() => import('./pages/Admin'))
const Schengen = lazy(() => import('./pages/visas/Schengen'))
const CountryVisa = lazy(() => import('./pages/visas/CountryVisa'))
const Contact = lazy(() => import('./pages/company/Contact'))
const About = lazy(() => import('./pages/company/About'))
const Services = lazy(() => import('./pages/company/Services'))
const Privacy = lazy(() => import('./pages/company/Privacy'))
const BlogList = lazy(() => import('./pages/blog/BlogList'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Apply = lazy(() => import('./pages/Apply'))

// Loading Spinner for Suspense Fallback
const PageLoader = () => (
  <div className="min-h-[60vh] flex items-center justify-center bg-background">
    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
  </div>
)

function Layout({ children }: { children: React.ReactNode }) {
  const { t, i18n } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, token, logout } = useAuthStore()

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    if (lang === 'ar') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }

  // Verify auth token on mount
  useEffect(() => {
    if (isAuthenticated && token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => {
        if (res.status === 401) {
          logout()
        }
      }).catch(console.error)
    }
  }, [isAuthenticated, token, logout])

  // Initialize the correct dir on mount
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    if (i18n.language === 'ar') {
      document.body.classList.add('rtl')
    } else {
      document.body.classList.remove('rtl')
    }
  }, [i18n.language])

  return (
    <div className={`min-h-screen bg-background font-sans antialiased flex flex-col relative`}>
      <AnimatedBackground />
      <header className="sticky top-0 z-50 w-full border-b border-border glass-panel">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display font-bold sm:inline-block text-xl text-gradient-gold">
              {t('common.agencyName')}
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground">{t('common.home')}</Link>
            <Link to="/about" className="transition-colors hover:text-foreground">{t('common.about', 'About')}</Link>
            <Link to="/services" className="transition-colors hover:text-foreground">{t('common.services', 'Services')}</Link>
            <Link to="/visas/schengen" className="transition-colors hover:text-foreground">Schengen Visas</Link>
            <Link to="/blog" className="transition-colors hover:text-foreground">Blog</Link>
            <Link to="/contact" className="transition-colors hover:text-foreground">{t('common.contact', 'Contact')}</Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">Toggle language</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-card border-border">
                <DropdownMenuItem onClick={() => changeLanguage('en')} className="text-foreground hover:bg-foreground/5 cursor-pointer">
                  🇬🇧 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('fr')} className="text-foreground hover:bg-foreground/5 cursor-pointer">
                  🇫🇷 Français
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('es')} className="text-foreground hover:bg-foreground/5 cursor-pointer">
                  🇪🇸 Español
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('ar')} className="text-foreground hover:bg-foreground/5 cursor-pointer">
                  🇲🇦 العربية
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link to="/apply">{t('common.applyNow')}</Link>
            </Button>
            
            {isAuthenticated ? (
              <Button variant="ghost" onClick={logout} className="hidden md:flex text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            ) : (
              <Button asChild className="hidden md:flex bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link to="/login"><User className="h-4 w-4 mr-2" /> Login</Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border p-4 flex flex-col space-y-4 bg-background">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('common.home')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('common.about', 'About')}</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>{t('common.services', 'Services')}</Link>
            <Link to="/visas/schengen" onClick={() => setIsMenuOpen(false)}>Schengen Visas</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t('common.contact', 'Contact')}</Link>
            
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {isAuthenticated ? (
                <Button variant="outline" onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              ) : (
                <Button asChild variant="outline" className="w-full glass text-foreground hover:bg-foreground/5">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)}><User className="h-4 w-4 mr-2" /> Login</Link>
                </Button>
              )}
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/apply" onClick={() => setIsMenuOpen(false)}>{t('common.applyNow')}</Link>
              </Button>
            </div>
          </div>
        )}
      </header>
      <main className="flex-1 shrink-0">{children}</main>
      <Footer />
      <PrivacyPopup />
    </div>
  )
}

function AuthGuard({ children, requireAdmin }: { children: React.ReactNode, requireAdmin?: boolean }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (requireAdmin && user?.role !== 'ADMIN' && user?.role !== 'AGENT') {
    return <Navigate to="/portal" replace />
  }

  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="visaplus-theme">
      <Router>
        <Layout>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visas/schengen" element={<Schengen />} />
              <Route path="/visas/:country" element={<CountryVisa />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/apply" element={<Apply />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/portal" element={
                <AuthGuard>
                  <Portal />
                </AuthGuard>
              } />
              <Route path="/admin" element={
                <AuthGuard requireAdmin>
                  <Admin />
                </AuthGuard>
              } />
            </Routes>
          </Suspense>
          <Chatbot />
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
