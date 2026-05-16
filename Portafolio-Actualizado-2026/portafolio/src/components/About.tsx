import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ease } from '../lib/easing'

const services = [
  {
    num: '01',
    title: 'Desarrollo Frontend',
    desc: 'Interfaces con React, animaciones fluidas con GSAP y framer motion.',
  },
  {
    num: '02',
    title: 'Desarrollo Backend',
    desc: 'APIs REST con Node.js, Java y Spring Boot. Bases de datos relacionales y NoSQL.',
  },
  {
    num: '03',
    title: 'Diseño UI/UX',
    desc: 'Diseño de interfaces en Figma con foco en la experiencia de usuario, jerarquía visual y sistemas de diseño.',
  },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

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
          Sobre mí
        </motion.span>
        <motion.h2
          className="about__heading"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          Lo que<br /><span className="accent">hago</span>
        </motion.h2>
      </div>

      {/* Right */}
      <motion.div
        className="about__right"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <p className="about__bio">
          Soy <strong>Tiago Dávila</strong>, desarrollador full-stack. Diseño y desarrollo aplicaciones, utilizando mis conocimientos de back y frontend, con proyectos que van desde sitios web normales hasta APIs con springboot.
          <br /><br />
          Actualmente estudio en el <strong>Instituto Politécnico Modelo</strong>, donde estoy cursando mi ultimo año, sigo ampliando mis conocimientos en desarrollo de aplicaciones web. Me enfoco en la intersección entre el diseño visual y el uso de herramientas backend.
        </p>

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
