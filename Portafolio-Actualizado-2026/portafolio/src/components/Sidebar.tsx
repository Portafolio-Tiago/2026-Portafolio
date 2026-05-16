import { useState, useEffect } from 'react'

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'trabajo', label: 'Trabajo' },
  { id: 'sobre-mi', label: 'Sobre mí' },
  { id: 'habilidades', label: 'Habilidades' },
  { id: 'contacto', label: 'Contacto' },
]

export default function Sidebar() {
  const [active, setActive] = useState('inicio')

  useEffect(() => {
    const observers = sections.map(({ id }) => {
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
        {sections.map(({ id, label }) => (
          <button
            key={id}
            className={`sidebar__dot ${active === id ? 'sidebar__dot--active' : ''}`}
            onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
            title={label}
          />
        ))}
      </div>
    </aside>
  )
}
