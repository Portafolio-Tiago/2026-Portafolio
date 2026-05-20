import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ease } from '../lib/easing'
import { useLang } from '../context/LanguageContext'

const navIds = [
  { id: 'inicio' },
  { id: 'trabajo' },
  { id: 'sobre-mi' },
  { id: 'habilidades' },
  { id: 'contacto' },
]

const projectItems = [
  { name: 'Tango Argentino', color: '#c0392b' },
  { name: 'Provex', color: '#2980b9' },
  { name: 'Kiosco El Abuelo', color: '#27ae60' },
]

export default function Navbar() {
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const { lang, toggleLang, t } = useLang()

  useEffect(() => {
    const locale = lang === 'es' ? 'es-AR' : 'en-US'
    const update = () => {
      setTime(new Date().toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [lang])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className="navbar">
        <div className="navbar__logo" onClick={() => scrollTo('inicio')} style={{ cursor: 'none' }}>T.</div>
        <div className="navbar__time">{time}</div>
        <div className="navbar__right">
          <button
            className="pill-btn pill-btn--lang"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
          <a href="mailto:tiagodavila08@gmail.com" className="pill-btn pill-btn--primary">{t('nav.contact')}</a>
          <button className="pill-btn pill-btn--secondary" onClick={() => setMenuOpen(true)}>{t('nav.menu')}</button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="menu-close" onClick={() => setMenuOpen(false)}>✕</button>
            <nav className="menu-nav">
              <div className="menu-section">
                <span className="section-label">{t('nav.sitemap')}</span>
                {navIds.map((item, i) => (
                  <motion.button
                    key={item.id}
                    className="menu-link"
                    onClick={() => scrollTo(item.id)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.1, ease }}
                  >
                    {t(`section.${item.id}`)}
                  </motion.button>
                ))}
              </div>
              <div className="menu-section">
                <span className="section-label">{t('nav.projects')}</span>
                {projectItems.map((p, i) => (
                  <motion.button
                    key={p.name}
                    className="menu-link menu-link--dim"
                    onClick={() => scrollTo('trabajo')}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.45, ease }}
                    style={{ color: p.color }}
                  >
                    {p.name}
                  </motion.button>
                ))}
              </div>
              <div className="menu-section">
                <span className="section-label">{t('nav.follow')}</span>
                {[
                  { label: 'GitHub', href: 'https://github.com/portafoliotiago' },
                  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/tiago-davila-895b51231/' },
                  { label: 'Email', href: 'mailto:tiagodavila08@gmail.com' },
                ].map((s, i) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    className="menu-link menu-link--sm"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 + 0.75, ease }}
                    onClick={() => setMenuOpen(false)}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
