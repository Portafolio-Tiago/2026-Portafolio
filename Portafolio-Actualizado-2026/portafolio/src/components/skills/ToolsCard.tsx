import { motion } from 'framer-motion'
import { skillCategories } from '../../data/skills'
import BentoCard from './BentoCard'

const toolsSkills = skillCategories.find(c => c.id === 'tools')!

// Duplicate skills for seamless loop
const duplicatedSkills = [...toolsSkills.skills, ...toolsSkills.skills]

export default function ToolsCard() {
  return (
    <BentoCard title="Tools" className="bento-card--tools" gridArea="tools">
      <div className="marquee-container">
        <motion.div
          className="marquee-track"
          animate={{
            x: ['0%', '-50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {duplicatedSkills.map((skill, i) => {
            const Icon = skill.icon
            return (
              <div key={`${skill.name}-${i}`} className="marquee-item">
                <div className="marquee-item__icon">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="marquee-item__name">{skill.name}</span>
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Gradient masks for smooth edges */}
      <div className="marquee-mask marquee-mask--left" />
      <div className="marquee-mask marquee-mask--right" />
    </BentoCard>
  )
}
