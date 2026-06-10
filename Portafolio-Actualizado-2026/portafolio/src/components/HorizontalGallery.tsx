import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus } from 'lucide-react'
import { showcaseProjects, type ShowcaseProject } from '../data/projects'
import { useLang } from '../context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalGallery() {
  const pinRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const panelsRef = useRef<HTMLDivElement[]>([])
  const progressRef = useRef<HTMLDivElement>(null)
  const counterRef = useRef<HTMLSpanElement>(null)
  const activeVideoIndexRef = useRef<number | null>(null)
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const { t, lang } = useLang()

  useEffect(() => {
    const section = pinRef.current
    const stage = stageRef.current
    const panels = panelsRef.current
    if (!section || !stage || panels.length === 0) return

    const isMobile = window.matchMedia('(max-width: 900px)').matches

    const syncPanelVideos = (activeIndex: number) => {
      if (activeVideoIndexRef.current === activeIndex) return
      activeVideoIndexRef.current = activeIndex

      panels.forEach((panel, index) => {
        panel.querySelectorAll('video').forEach((video) => {
          if (index === activeIndex) {
            video.play().catch(() => {})
          } else {
            video.pause()
          }
        })
      })
    }

    if (isMobile) {
      panels.forEach((panel) => {
        panel.querySelectorAll('video').forEach((video) => {
          video.play().catch(() => {})
        })
      })

      return () => {
        document.body.classList.remove('project-hover')
      }
    }

    const ctx = gsap.context(() => {
      gsap.set(panels, { autoAlpha: 0, y: 36, scale: 0.985 })
      gsap.set(panels[0], { autoAlpha: 1, y: 0, scale: 1 })
      syncPanelVideos(0)

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${window.innerHeight * (showcaseProjects.length - 1)}`,
          pin: stage,
          scrub: 0.85,
          snap: {
            snapTo: 1 / (showcaseProjects.length - 1),
            duration: { min: 0.18, max: 0.45 },
            ease: 'power2.out',
          },
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const activeIndex = Math.min(
              Math.round(self.progress * (showcaseProjects.length - 1)),
              showcaseProjects.length - 1
            )

            if (progressRef.current) {
              progressRef.current.style.height = `${((activeIndex + 1) / showcaseProjects.length) * 100}%`
              progressRef.current.style.background = showcaseProjects[activeIndex].accent
            }

            if (counterRef.current) {
              counterRef.current.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(showcaseProjects.length).padStart(2, '0')}`
            }

            syncPanelVideos(activeIndex)
          },
        },
      })

      panels.forEach((panel, index) => {
        if (index === 0) return

        timeline
          .to(panels[index - 1], {
            autoAlpha: 0,
            y: -36,
            scale: 0.985,
            duration: 0.42,
            ease: 'power2.inOut',
          })
          .to(panel, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.42,
            ease: 'power2.inOut',
          }, '<0.12')
      })
    }, section)

    return () => {
      document.body.classList.remove('project-hover')
      ctx.revert()
    }
  }, [])

  const handlePanelMouseMove = (event: MouseEvent, project: ShowcaseProject) => {
    if (!project.url) return

    document.body.classList.add('project-hover')
    setHoveredProjectId(project.id)
    setCursorPosition({ x: event.clientX, y: event.clientY })
  }

  const handlePanelMouseLeave = () => {
    document.body.classList.remove('project-hover')
    setHoveredProjectId(null)
  }

  return (
    <section className="project-showcase" id="trabajo">
      <div className="project-showcase__header">
        <span className="section-label">{t('gallery.label')}</span>
        <h2 className="project-showcase__title">
          {t('gallery.title')}<span className="accent">.</span>
        </h2>
      </div>

      <div
        className="project-showcase__pin"
        ref={pinRef}
        style={{ height: `${showcaseProjects.length * 100}vh` }}
      >
        <div className="project-showcase__stage" ref={stageRef}>
        <div className="project-showcase__panels">
          {showcaseProjects.map((project, index) => (
            <ProjectPanel
              key={project.id}
              project={project}
              lang={lang}
              onMouseMove={handlePanelMouseMove}
              onMouseLeave={handlePanelMouseLeave}
              setRef={(node) => {
                if (node) panelsRef.current[index] = node
              }}
            />
          ))}
        </div>

        <div className="project-showcase__progress" aria-hidden="true">
          <div className="project-showcase__progress-track">
            <div ref={progressRef} className="project-showcase__progress-bar" />
          </div>
          <span ref={counterRef} className="project-showcase__counter">
            01 / {String(showcaseProjects.length).padStart(2, '0')}
          </span>
        </div>
        </div>
      </div>

      <div
        className={`project-showcase__hover-cursor ${hoveredProjectId ? 'project-showcase__hover-cursor--visible' : ''}`}
        style={{
          transform: `translate3d(${cursorPosition.x}px, ${cursorPosition.y}px, 0) translate(-50%, -50%)`,
        }}
        aria-hidden="true"
      >
        <span>{lang === 'en' ? 'More' : 'Ver'}</span>
        <Plus size={14} strokeWidth={2} />
      </div>
    </section>
  )
}

interface ProjectPanelProps {
  project: ShowcaseProject
  lang: string
  onMouseMove: (event: MouseEvent, project: ShowcaseProject) => void
  onMouseLeave: () => void
  setRef: (node: HTMLDivElement | null) => void
}

function ProjectPanel({ project, lang, onMouseMove, onMouseLeave, setRef }: ProjectPanelProps) {
  const title = lang === 'en' ? project.titleEn : project.title
  const eyebrow = lang === 'en' ? project.eyebrowEn : project.eyebrow
  const description = lang === 'en' ? project.descriptionEn : project.description
  const ProjectShell = project.url ? 'a' : 'div'

  return (
    <div
      ref={setRef}
      className="project-showcase__panel"
      style={{ '--project-accent': project.accent } as CSSProperties}
    >
      <ProjectShell
        className={`project-showcase__desktop ${project.url ? 'project-showcase__desktop--link' : ''}`}
        href={project.url}
        target={project.url ? '_blank' : undefined}
        rel={project.url ? 'noreferrer' : undefined}
        onMouseMove={(event) => onMouseMove(event, project)}
        onMouseLeave={onMouseLeave}
      >
        {project.desktopVideo ? (
          <video
            className="project-showcase__video project-showcase__video--desktop"
            src={project.desktopVideo}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={`${title} desktop preview`}
          />
        ) : (
          <div className="project-showcase__placeholder" aria-hidden="true">
            <span>{title}</span>
          </div>
        )}

        {project.mobileVideo && (
          <video
            className="project-showcase__video project-showcase__video--mobile"
            src={project.mobileVideo}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            aria-label={`${title} mobile preview`}
          />
        )}

        <div className="project-showcase__info">
          <span className="project-showcase__eyebrow">{eyebrow}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="project-showcase__tags">
            {project.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </div>

        <div className="project-showcase__phone" aria-label={`${title} mobile preview`}>
          <div className="project-showcase__phone-speaker" />
          <div className="project-showcase__phone-screen">
            {project.mobileVideo ? (
              <video
                className="project-showcase__video"
                src={project.mobileVideo}
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
            ) : (
              <div className="project-showcase__phone-placeholder" aria-hidden="true" />
            )}
          </div>
          <div className="project-showcase__phone-home" />
        </div>
      </ProjectShell>
    </div>
  )
}
