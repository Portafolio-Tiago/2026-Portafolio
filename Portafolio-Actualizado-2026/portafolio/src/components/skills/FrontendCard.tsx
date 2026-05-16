import { motion, type Variants } from 'framer-motion'
import { skillCategories } from '../../data/skills'
import BentoCard from './BentoCard'

const frontendSkills = skillCategories.find(c => c.id === 'frontend')!

// Floating animation variants for each icon
const floatVariants: Variants = {
  animate: (i: number) => ({
    y: [0, -12, 0],
    x: [0, i % 2 === 0 ? 5 : -5, 0],
    rotate: [0, i % 2 === 0 ? 5 : -5, 0],
    transition: {
      duration: 3 + i * 0.5,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: i * 0.2,
    },
  }),
}

// Glow pulse animation
const glowVariants: Variants = {
  animate: (i: number) => ({
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.1, 1],
    transition: {
      duration: 2 + i * 0.3,
      repeat: Infinity,
      ease: 'easeInOut' as const,
      delay: i * 0.15,
    },
  }),
}

export default function FrontendCard() {
  return (
    <BentoCard title="Frontend" className="bento-card--frontend" gridArea="frontend">
      <div className="frontend-grid">
        {frontendSkills.skills.map((skill, i) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              className="frontend-skill"
              custom={i}
              variants={floatVariants}
              animate="animate"
            >
              {/* Glow effect behind icon */}
              <motion.div
                className="frontend-skill__glow"
                custom={i}
                variants={glowVariants}
                animate="animate"
              />
              
              {/* Icon */}
              <div className="frontend-skill__icon">
                <Icon size={28} strokeWidth={1.5} />
              </div>
              
              {/* Label */}
              <span className="frontend-skill__name">{skill.name}</span>
            </motion.div>
          )
        })}
      </div>
    </BentoCard>
  )
}
