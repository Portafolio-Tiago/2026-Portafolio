import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface BentoCardProps {
  children: ReactNode
  className?: string
  title: string
  gridArea?: string
}

export default function BentoCard({ children, className = '', title, gridArea }: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Motion values for mouse position
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Spring config for smooth animation
  const springConfig = { stiffness: 150, damping: 20 }
  
  // Smooth spring values
  const x = useSpring(mouseX, springConfig)
  const y = useSpring(mouseY, springConfig)
  
  // Transform mouse position to rotation (subtle tilt)
  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8])
  
  // Spotlight gradient position
  const spotlightX = useTransform(x, [-0.5, 0.5], [0, 100])
  const spotlightY = useTransform(y, [-0.5, 0.5], [0, 100])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Normalize to -0.5 to 0.5
    const normalizedX = (e.clientX - centerX) / rect.width
    const normalizedY = (e.clientY - centerY) / rect.height
    
    mouseX.set(normalizedX)
    mouseY.set(normalizedY)
  }

  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`bento-card ${className}`}
      style={{
        gridArea,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ scale: { duration: 0.2 } }}
    >
      {/* Spotlight gradient overlay */}
      <motion.div
        className="bento-card__spotlight"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => 
              `radial-gradient(circle at ${x}% ${y}%, rgba(0, 255, 200, 0.15) 0%, transparent 50%)`
          ),
        }}
      />
      
      {/* Inner border glow */}
      <div className="bento-card__glow" />
      
      {/* Content */}
      <div className="bento-card__content" style={{ transform: 'translateZ(20px)' }}>
        <span className="bento-card__title">{title}</span>
        {children}
      </div>
    </motion.div>
  )
}
