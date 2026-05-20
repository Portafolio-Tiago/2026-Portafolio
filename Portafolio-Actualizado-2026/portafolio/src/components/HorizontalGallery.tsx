import { useRef, useEffect, useCallback, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { galleryItems, type GalleryItem } from '../data/projects'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalGallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const { t, lang } = useLang()

  const updateProgress = useCallback((progress: number) => {
    // Actualizar progress bar directamente via DOM (sin re-render)
    if (progressBarRef.current) {
      const activeIndex = Math.min(
        Math.floor(progress * galleryItems.length),
        galleryItems.length - 1
      )
      const color = galleryItems[activeIndex]?.color || '#00ffc8'
      progressBarRef.current.style.width = `${progress * 100}%`
      progressBarRef.current.style.background = color
    }
    
    // Actualizar counter
    if (counterRef.current) {
      const activeIndex = Math.min(
        Math.floor(progress * galleryItems.length),
        galleryItems.length - 1
      )
      counterRef.current.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(galleryItems.length).padStart(2, '0')}`
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    // En mobile: progress via scroll nativo del track
    if (window.innerWidth <= 900) {
      const handleScroll = () => {
        const maxScroll = track.scrollWidth - track.clientWidth
        if (maxScroll <= 0) return
        updateProgress(track.scrollLeft / maxScroll)
      }
      track.addEventListener('scroll', handleScroll, { passive: true })
      return () => track.removeEventListener('scroll', handleScroll)
    }

    // Calcular el ancho total del scroll
    const getScrollWidth = () => track.scrollWidth - window.innerWidth

    // Crear el ScrollTrigger con pin
    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => -getScrollWidth(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getScrollWidth()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            updateProgress(self.progress)
          },
        },
      })
    }, section)

    return () => ctx.revert()
  }, [updateProgress])

  return (
    <section className="hgallery" ref={sectionRef} id="trabajo">
      {/* Header fijo */}
      <div className="hgallery__header">
        <span className="section-label">{t('gallery.label')}</span>
        <h2 className="hgallery__title">
          {t('gallery.title')}<span className="accent">.</span>
        </h2>
      </div>

      {/* Gallery Track */}
      <div className="hgallery__track" ref={trackRef}>
        {galleryItems.map((item, index) => (
          <GalleryCard
            key={item.id}
            item={item}
            index={index}
            lang={lang}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="hgallery__progress">
        <div className="hgallery__progress-track">
          <div
            ref={progressBarRef}
            className="hgallery__progress-bar"
          />
        </div>
        <span ref={counterRef} className="hgallery__counter">
          01 / {String(galleryItems.length).padStart(2, '0')}
        </span>
      </div>
    </section>
  )
}

interface GalleryCardProps {
  item: GalleryItem
  index: number
  lang: string
}

function GalleryCard({ item, lang }: GalleryCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Play/pause video on hover
  useEffect(() => {
    if (item.type !== 'video' || !videoRef.current) return

    if (isHovered) {
      videoRef.current.play().catch(() => {})
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, item.type])

  // Parallax tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5

    cardRef.current.style.transform = `
      perspective(1000px)
      rotateY(${x * 8}deg)
      rotateX(${-y * 8}deg)
      scale(1.02)
    `
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (cardRef.current) {
      cardRef.current.style.transform = ''
    }
  }

  return (
    <div
      ref={cardRef}
      className="hgallery__card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ '--card-color': item.color } as React.CSSProperties}
    >
      {/* Media */}
      <div className="hgallery__card-media">
        {item.type === 'video' ? (
          <video
            ref={videoRef}
            src={item.src}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : (
          <img src={item.src} alt={`${item.project} - ${item.label}`} />
        )}

        {/* Overlay gradient */}
        <div className="hgallery__card-overlay" />
      </div>

      {/* Info */}
      <div className="hgallery__card-info">
        <span className="hgallery__card-project" style={{ color: item.color }}>
          {item.project}
        </span>
        <span className="hgallery__card-label">{lang === 'en' ? item.labelEn : item.label}</span>
      </div>

      {/* Video indicator */}
      {item.type === 'video' && (
        <div className="hgallery__card-video-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      )}

      {/* Glow effect on hover */}
      <div
        className="hgallery__card-glow"
        style={{
          background: `radial-gradient(circle at center, ${item.color}22 0%, transparent 70%)`,
        }}
      />
    </div>
  )
}
