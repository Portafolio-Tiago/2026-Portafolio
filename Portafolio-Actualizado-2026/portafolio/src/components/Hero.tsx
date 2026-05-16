import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { ease } from '../lib/easing'
import BotScene from './BotScene'

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.25 } },
}
const lineAnim = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.85, ease } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="container hero__inner">
        {/* Left — Content */}
        <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
          <motion.div className="hero__badge" variants={fadeUp}>
            <span className="hero__badge-dot" />
            <span className="hero__badge-text">Disponible para proyectos</span>
          </motion.div>

          <motion.div className="hero__text" variants={fadeUp}>
            <div className="hero__line">
              <motion.span className="hero__line-inner" style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 300, color: 'var(--text-muted)' }} variants={lineAnim} initial="hidden" animate="show">
                Hola, soy
              </motion.span>
            </div>
            <div className="hero__line">
              <motion.span className="hero__line-inner" variants={lineAnim} initial="hidden" animate="show" transition={{ delay: 0.1, duration: 0.85, ease }}>
                Tiago<span className="accent">.</span>
              </motion.span>
            </div>
            <div className="hero__line">
              <motion.span className="hero__line-inner hero__sub" variants={lineAnim} initial="hidden" animate="show" transition={{ delay: 0.2, duration: 0.85, ease }}>
                Diseño &amp;
              </motion.span>
            </div>
            <div className="hero__line">
              <motion.span className="hero__line-inner hero__sub" variants={lineAnim} initial="hidden" animate="show" transition={{ delay: 0.3, duration: 0.85, ease }}>
                Desarrollo 
              </motion.span>
            </div>
          </motion.div>

          <motion.p className="hero__bio" variants={fadeUp}>
            Desarrollador de aplicaciones full-stack con foco en interfaces modernas, con atención al detalle y desarrollo backend funcional.
          </motion.p>

          <motion.div className="hero__actions" variants={fadeUp}>
            <a href="#trabajo" className="pill-btn pill-btn--accent">Ver proyectos</a>
            <a href="#sobre-mi" className="pill-btn pill-btn--secondary">Sobre mí</a>
          </motion.div>
        </motion.div>

        {/* Right — 3D Bot */}
        <motion.div
          className="hero__visual hero__bot-canvas"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 1.1, ease }}
        >
          <Suspense fallback={<div className="hero__bot-fallback" />}>
            <BotScene />
          </Suspense>
          {/* Ambient glow behind bot */}
          <div className="hero__bot-glow" />
        </motion.div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
