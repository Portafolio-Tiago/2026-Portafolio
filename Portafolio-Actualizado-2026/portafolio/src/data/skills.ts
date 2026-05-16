import {
  Atom,
  FileCode2,
  Braces,
  Code2,
  Sparkles,
  Wind,
  Server,
  Coffee,
  Leaf,
  Database,
  HardDrive,
  GitBranch,
  Container,
  AppWindow,
  Link,
  Triangle,
  PenTool,
  Palette,
  Layers,
  Globe,
  Terminal,
  GitFork,
  type LucideIcon,
} from 'lucide-react'

export interface Skill {
  name: string
  icon: LucideIcon
}

export interface SkillCategory {
  id: string
  title: string
  skills: Skill[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    skills: [
      { name: 'React', icon: Atom },
      { name: 'TypeScript', icon: FileCode2 },
      { name: 'JavaScript', icon: Braces },
      { name: 'HTML & CSS', icon: Code2 },
      { name: 'GSAP', icon: Sparkles },
      { name: 'Tailwind', icon: Wind },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    skills: [
      { name: 'Java', icon: Coffee },
      { name: 'Spring Boot', icon: Leaf },
      { name: 'MongoDB', icon: HardDrive },
      { name: 'Supabase', icon: Database },
      { name: 'Nginx', icon: Globe },
      { name: 'Apache', icon: Globe },
    ],
  },
  {
    id: 'tools',
    title: 'Tools',
    skills: [
      { name: 'Git', icon: GitBranch },
      { name: 'GitHub', icon: GitFork },
      { name: 'Linux', icon: Terminal },
      { name: 'Docker', icon: Container },
      { name: 'VS Code', icon: AppWindow },
      { name: 'REST APIs', icon: Link },
      { name: 'Vercel', icon: Triangle },
    ],
  },
  {
    id: 'design',
    title: 'Design',
    skills: [
      { name: 'Figma', icon: Layers },
      { name: 'UI/UX', icon: Palette },
      { name: 'Prototyping', icon: PenTool },
    ],
  },
]

// Terminal commands for backend animation
export const terminalCommands = [
  '$ ./gradlew bootRun',
  '$ docker run godot',
  '$ sudo nginx -t',
  '$ sudo systemctl start apache2',
  '$ git switch -c develop'
]
