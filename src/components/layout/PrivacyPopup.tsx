import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function PrivacyPopup() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem('cookie-consent')
    if (!hasConsented) {
      // Small delay before showing
      const timer = setTimeout(() => setIsVisible(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true')
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] z-50 p-6 glass-panel rounded-2xl border border-border shadow-2xl"
        >
          <h3 className="font-display font-bold text-lg text-foreground mb-2">We value your privacy</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
          <div className="flex gap-3">
            <Button onClick={accept} className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              Accept All
            </Button>
            <Button variant="outline" onClick={accept} className="flex-1 glass text-foreground border-border hover:bg-foreground/5">
              Preferences
            </Button>
          </div>
          <p className="text-xs text-muted-foreground text-center mt-4">
            Read our <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}