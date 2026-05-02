import { BrowserRouter as Router, Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Globe, Menu, X, LogOut } from 'lucide-react'
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
import ScrollUpButton from './components/ScrollUpButton'

// Lazy-loaded routes for performance optimization
const Home = lazy(() => import('./pages/Home'))
const Portal = lazy(() => import('./pages/Portal'))
const Admin = lazy(() => import('./pages/Admin'))
const Visas = lazy(() => import('./pages/visas/Visas'))
const Contact = lazy(() => import('./pages/company/Contact'))
const About = lazy(() => import('./pages/company/About'))
const Privacy = lazy(() => import('./pages/company/Privacy'))
const BlogList = lazy(() => import('./pages/blog/BlogList'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))
const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))

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
    <div className={`min-h-screen overflow-x-hidden bg-background font-sans antialiased flex flex-col relative`}>
      <AnimatedBackground />
      <header className="sticky top-0 z-50 w-full border-b border-border glass-panel">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-display font-bold sm:inline-block text-xl text-gradient-gold">
              {t('common.agencyName')}
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link to="/" className="transition-colors hover:text-foreground">{t('common.home')}</Link>
            <Link to="/visas" className="transition-colors hover:text-foreground">{t('common.visas', 'Visas')}</Link>
            <Link to="/blog" className="transition-colors hover:text-foreground">{t('common.blog', 'Blog')}</Link>
            <Link to="/contact" className="transition-colors hover:text-foreground">{t('common.contact', 'Contact')}</Link>
            <Link to="/about" className="transition-colors hover:text-foreground">{t('common.about', 'About')}</Link>
          </nav>
          <div className="flex items-center gap-2">
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
              <Link to="/contact">{t('common.contact')}</Link>
            </Button>
            
            {isAuthenticated ? (
              <Button variant="ghost" onClick={logout} className="hidden md:flex text-red-400 hover:text-red-300 hover:bg-red-400/10">
                <LogOut className="h-4 w-4 mr-2" /> Logout
              </Button>
            ) : null}

            <Button variant="ghost" size="icon" className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border p-4 flex flex-col gap-4 bg-background">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>{t('common.home')}</Link>
            <Link to="/visas" onClick={() => setIsMenuOpen(false)}>{t('common.visas', 'Visas')}</Link>
            <Link to="/blog" onClick={() => setIsMenuOpen(false)}>{t('common.blog', 'Blog')}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t('common.contact', 'Contact')}</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>{t('common.about', 'About')}</Link>
            
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              {isAuthenticated ? (
                <Button variant="outline" onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full border-red-500/50 text-red-400 hover:text-red-300 hover:bg-red-400/10">
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              ) : null}
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>{t('common.contact')}</Link>
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

function TrackPageViews() {
  const location = useLocation()
  useEffect(() => {
    // If Facebook Pixel is loaded
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView')
    }
    // If Google Analytics (gtag.js) is loaded
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_path: location.pathname + location.search
      })
    }
  }, [location])
  return null
}

function GlobalTracker() {
  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json() as any)
      .then(data => {
        if (data.success && data.data) {
          const { metaPixel, googleAnalytics, googleTagManager } = data.data
          
          if (metaPixel) {
            const fbScript = document.createElement('script')
            fbScript.innerHTML = `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${metaPixel}');
            `
            document.head.appendChild(fbScript)
          }

          if (googleAnalytics) {
            const gaScript = document.createElement('script')
            gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${googleAnalytics}`
            gaScript.async = true
            document.head.appendChild(gaScript)

            const gaInit = document.createElement('script')
            gaInit.innerHTML = `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalytics}');
            `
            document.head.appendChild(gaInit)
          }

          if (googleTagManager) {
            const gtmScript = document.createElement('script')
            gtmScript.innerHTML = `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManager}');
            `
            document.head.appendChild(gtmScript)
            
            const gtmNoScript = document.createElement('noscript')
            gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${googleTagManager}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
            document.body.insertBefore(gtmNoScript, document.body.firstChild)
          }
        }
      })
      .catch(console.error)
  }, [])
  return null
}

function SecurityGate({ children }: { children: React.ReactNode }) {
  const [isBlocked, setIsBlocked] = useState(false)

  useEffect(() => {
    try {
      const VISITS_LIMIT = 5
      const TIME_WINDOW_MS = 60000 // 1 minute
      const BLOCK_TIME_MS = 15 * 60000 // 15 minutes

      // Parse cookies
      const cookies = document.cookie.split('; ').reduce((acc, current) => {
        const [name, value] = current.split('=')
        acc[name] = value
        return acc
      }, {} as Record<string, string>)

      const now = Date.now()

      // Check if currently blocked
      if (cookies['security_block'] && parseInt(cookies['security_block']) > now) {
        setIsBlocked(true)
        return
      }

      let visitCount = 1
      let firstVisitTime = now

      if (cookies['visit_data']) {
        const data = JSON.parse(decodeURIComponent(cookies['visit_data']))
        if (now - data.firstVisitTime < TIME_WINDOW_MS) {
          visitCount = data.visitCount + 1
          firstVisitTime = data.firstVisitTime
        }
      }

      if (visitCount > VISITS_LIMIT) {
        // Block the user
        document.cookie = `security_block=${now + BLOCK_TIME_MS}; path=/; max-age=${BLOCK_TIME_MS / 1000}`
        setIsBlocked(true)
      } else {
        // Update visit data
        const dataStr = encodeURIComponent(JSON.stringify({ visitCount, firstVisitTime }))
        document.cookie = `visit_data=${dataStr}; path=/; max-age=${TIME_WINDOW_MS / 1000}`
      }
    } catch (err) {
      console.error('Security check failed:', err)
    }
  }, [])

  if (isBlocked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground flex-col gap-6 p-4 text-center">
        <div className="text-red-500 text-7xl">🛡️</div>
        <h1 className="text-4xl md:text-5xl font-bold font-display">Access Blocked</h1>
        <p className="text-muted-foreground max-w-lg text-lg">
          Our security systems have detected an unusually high number of requests from your device in a short period of time.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Your access has been temporarily restricted to protect our services. Please wait 15 minutes before trying again.
        </p>
      </div>
    )
  }

  return <>{children}</>
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="e-visaschengen-theme">
      <SecurityGate>
        <Router>
          <GlobalTracker />
          <TrackPageViews />
          <Layout>
          <ScrollToTop />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/visas" element={<Visas />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Navigate to="/" replace />} />
              <Route path="/blog" element={<BlogList />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/apply" element={<Navigate to="/" replace />} />
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
          <ScrollUpButton />
        </Layout>
      </Router>
      </SecurityGate>
    </ThemeProvider>
  )
}

export default App
