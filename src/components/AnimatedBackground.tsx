import { motion } from 'framer-motion'
import { Plane, Globe2, Briefcase, FileText, MapPin, Stamp, Book } from 'lucide-react'
import { useEffect, useState } from 'react'

// Defining a set of travel and visa related icons
const icons = [Plane, Globe2, Briefcase, FileText, MapPin, Stamp, Book]

export default function AnimatedBackground() {
  const [elements, setElements] = useState<Array<{
    id: number
    Icon: any
    xStart: number
    yStart: number
    xEnd: number
    yEnd: number
    duration: number
    delay: number
    scale: number
    rotation: number
  }>>([])

  useEffect(() => {
    // Generate random positions and animations only on the client side
    // to avoid hydration mismatches if we ever use SSR
    const generatedElements = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      Icon: icons[Math.floor(Math.random() * icons.length)],
      xStart: Math.random() * 100, // percentage
      yStart: Math.random() * 100, // percentage
      xEnd: (Math.random() - 0.5) * 40 + Math.random() * 100, // random drift
      yEnd: (Math.random() - 0.5) * 40 + Math.random() * 100, // random drift
      duration: 40 + Math.random() * 40, // 40-80s (very slow and subtle)
      delay: Math.random() * -40, // negative delay so they start already moving
      scale: 0.5 + Math.random() * 1.5, // sizes between 0.5 and 2
      rotation: Math.random() * 360
    }))
    
    setElements(generatedElements)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[2px]" />
      {elements.map((el) => {
        const { Icon } = el
        return (
          <motion.div
            key={el.id}
            initial={{ 
              x: `${el.xStart}vw`, 
              y: `${el.yStart}vh`, 
              rotate: el.rotation,
              opacity: 0 
            }}
            animate={{ 
              x: [`${el.xStart}vw`, `${el.xEnd}vw`, `${el.xStart}vw`],
              y: [`${el.yStart}vh`, `${el.yEnd}vh`, `${el.yStart}vh`],
              rotate: [el.rotation, el.rotation + 180, el.rotation + 360],
              opacity: [0.03, 0.06, 0.03] // Extremely subtle opacity
            }}
            transition={{
              duration: el.duration,
              delay: el.delay,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute text-foreground"
            style={{ transform: `scale(${el.scale})` }}
          >
            <Icon strokeWidth={1} className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-primary/40 dark:text-primary/20" />
          </motion.div>
        )
      })}
    </div>
  )
}