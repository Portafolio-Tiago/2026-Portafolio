import { motion } from 'framer-motion'
import { skillCategories } from '../../data/skills'
import BentoCard from './BentoCard'

const designSkills = skillCategories.find(c => c.id === 'design')!

// SVG path for drawing animation
const drawPath = "M 20 80 Q 50 20, 80 50 T 140 40 Q 160 60, 180 30"

export default function DesignCard() {
  return (
    <BentoCard title="Design" className="bento-card--design" gridArea="design">
      {/* Animated drawing canvas */}
      <div className="design-canvas">
        <svg viewBox="0 0 200 100" className="design-svg">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Animated path */}
          <motion.path
            d={drawPath}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 1, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.4, 0.6, 1],
            }}
          />

          {/* Cursor following the path */}
          <motion.g
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            style={{
              offsetPath: `path("${drawPath}")`,
            }}
          >
            <circle r="4" fill="var(--accent)" />
            <circle r="8" fill="var(--accent)" opacity="0.3" />
          </motion.g>
        </svg>
      </div>

      {/* Design skills */}
      <div className="design-skills">
        {designSkills.skills.map((skill, i) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              className="design-skill"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.1 }}
            >
              <Icon size={18} strokeWidth={1.5} />
              <span>{skill.name}</span>
            </motion.div>
          )
        })}
      </div>
    </BentoCard>
  )
}
