import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ease } from '../lib/easing'
import { useLang } from '../context/LanguageContext'

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { t } = useLang()

  const services = [
    { num: '01', title: t('about.s1.title'), desc: t('about.s1.desc') },
    { num: '02', title: t('about.s2.title'), desc: t('about.s2.desc') },
    { num: '03', title: t('about.s3.title'), desc: t('about.s3.desc') },
  ]

  return (
    <section id="sobre-mi" className="about" ref={ref}>
      {/* Left */}
      <div className="about__left">
        <motion.span
          className="section-label about__label"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {t('about.label')}
        </motion.span>
        <motion.h2
          className="about__heading"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          {t('about.heading1')}<br /><span className="accent">{t('about.heading2')}</span>
        </motion.h2>
      </div>

      {/* Right */}
      <motion.div
        className="about__right"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <p
          className="about__bio"
          dangerouslySetInnerHTML={{ __html: t('about.bio') }}
        />

        <div className="about__services">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              className="service-item"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease, delay: 0.3 + i * 0.1 }}
            >
              <span className="service-num">{s.num}</span>
              <div className="service-content">
                <h4 className="service-title">{s.title}</h4>
                <p className="service-desc">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
