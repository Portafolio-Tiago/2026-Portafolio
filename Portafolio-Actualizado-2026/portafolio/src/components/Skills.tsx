import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ease } from '../lib/easing'
import FrontendCard from './skills/FrontendCard'
import BackendCard from './skills/BackendCard'
import ToolsCard from './skills/ToolsCard'
import DesignCard from './skills/DesignCard'

export default function Skills() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="habilidades" className="skills" ref={ref}>
      <div className="skills__header">
        <div>
          <span className="section-label" style={{ display: 'block', marginBottom: 16 }}>
            Stack tecnico
          </span>
          <motion.h2
            className="skills__title"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            Habilidades
          </motion.h2>
        </div>
      </div>

      <motion.div
        className="skills-bento"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease, delay: 0.2 }}
      >
        <FrontendCard />
        <BackendCard />
        <ToolsCard />
        <DesignCard />
      </motion.div>
    </section>
  )
}
