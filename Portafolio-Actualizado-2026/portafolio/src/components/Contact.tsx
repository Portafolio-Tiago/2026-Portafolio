import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import BlurText from './core/BlurText'
import { ease } from '../lib/easing'
import { useLang } from '../context/LanguageContext'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLang()

  return (
    <section id="contacto" className="contact" ref={ref}>
      <div className="contact__top">
        <motion.span
          className="section-label contact__label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('contact.label')}
        </motion.span>

        <h2 className="contact__cta">
          <BlurText
            text={t('contact.cta1')}
            animateBy="words"
            direction="top"
            delay={120}
            stepDuration={0.5}
            threshold={0.2}
            className="contact__cta-line"
          />
          <BlurText
            text={t('contact.cta2')}
            animateBy="words"
            direction="top"
            delay={400}
            stepDuration={0.5}
            threshold={0.2}
            className="contact__cta-line accent"
          />
        </h2>

        <motion.div
          className="contact__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
        >
          <a href="mailto:tiagodavila08@gmail.com" className="pill-btn pill-btn--accent">
            Mail ↗
          </a>
          <a
            href="https://www.linkedin.com/in/tiago-davila-895b51231/"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn--secondary"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/Tiago-Davila"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn pill-btn--secondary"
          >
            GitHub ↗
          </a>
        </motion.div>
      </div>

      <motion.footer
        className="footer"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <span className="footer__left">T.</span>
        <span className="footer__copy">{t('footer.copy')}</span>
        <nav className="footer__links">
          <a href="https://github.com/Tiago-Davila" target="_blank" rel="noopener noreferrer" className="footer__link">GitHub</a>
          <a href="https://www.linkedin.com/in/tiago-davila-895b51231/" target="_blank" rel="noopener noreferrer" className="footer__link">LinkedIn</a>
          <a href="mailto:tiagodavila08@gmail.com" className="footer__link">Email</a>
        </nav>
      </motion.footer>
    </section>
  )
}
