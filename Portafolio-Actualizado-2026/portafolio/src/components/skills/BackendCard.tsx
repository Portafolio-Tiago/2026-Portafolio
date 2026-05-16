import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skillCategories, terminalCommands } from '../../data/skills'
import BentoCard from './BentoCard'

const backendSkills = skillCategories.find(c => c.id === 'backend')!

export default function BackendCard() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const command = terminalCommands[currentCommand]
    let charIndex = 0
    
    if (isTyping) {
      // Typing effect
      const typeInterval = setInterval(() => {
        if (charIndex <= command.length) {
          setDisplayText(command.slice(0, charIndex))
          charIndex++
        } else {
          clearInterval(typeInterval)
          // Wait before clearing
          setTimeout(() => {
            setIsTyping(false)
          }, 1500)
        }
      }, 80)
      
      return () => clearInterval(typeInterval)
    } else {
      // Move to next command
      setTimeout(() => {
        setCurrentCommand((prev) => (prev + 1) % terminalCommands.length)
        setDisplayText('')
        setIsTyping(true)
      }, 500)
    }
  }, [currentCommand, isTyping])

  return (
    <BentoCard title="Backend" className="bento-card--backend" gridArea="backend">
      {/* Terminal window */}
      <div className="terminal">
        <div className="terminal__header">
          <div className="terminal__dots">
            <span className="terminal__dot terminal__dot--red" />
            <span className="terminal__dot terminal__dot--yellow" />
            <span className="terminal__dot terminal__dot--green" />
          </div>
          <span className="terminal__title">terminal</span>
        </div>
        
        <div className="terminal__body">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCommand}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="terminal__line"
            >
              <span className="terminal__prompt">~</span>
              <span className="terminal__text">{displayText}</span>
              <motion.span
                className="terminal__cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                |
              </motion.span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Skills tags */}
      <div className="backend-skills">
        {backendSkills.skills.map((skill, i) => {
          const Icon = skill.icon
          return (
            <motion.div
              key={skill.name}
              className="backend-skill"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Icon size={14} strokeWidth={2} />
              <span>{skill.name}</span>
            </motion.div>
          )
        })}
      </div>
    </BentoCard>
  )
}
