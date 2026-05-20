import { useState, useEffect } from 'react'
import { useLang } from '../context/LanguageContext'

const sectionIds = ['inicio', 'trabajo', 'sobre-mi', 'habilidades', 'contacto']

export default function Sidebar() {
  const [active, setActive] = useState('inicio')
  const { t } = useLang()

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      observer.observe(el)
      return observer
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [])

  return (
    <aside className="sidebar">
      <span className="sidebar__name">TIAGO DÁVILA</span>
      <div className="sidebar__dots">
        {sectionIds.map((id) => (
          <button
            key={id}
            className={`sidebar__dot ${active === id ? 'sidebar__dot--active' : ''}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={t(`section.${id}`)}
          />
        ))}
      </div>
    </aside>
  )
}
