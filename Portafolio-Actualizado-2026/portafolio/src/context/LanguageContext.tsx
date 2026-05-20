import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'es' | 'en'

interface LanguageContextType {
  lang: Language
  toggleLang: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

export const translations = {
  es: {
    // Navbar
    'nav.contact': 'Contacto',
    'nav.menu': 'Menú',
    'nav.sitemap': 'Sitemap',
    'nav.projects': 'Proyectos',
    'nav.follow': 'Sígueme',

    // Sidebar sections
    'section.inicio': 'Inicio',
    'section.trabajo': 'Trabajo',
    'section.sobre-mi': 'Sobre mí',
    'section.habilidades': 'Habilidades',
    'section.contacto': 'Contacto',

    // Hero
    'hero.available': 'Disponible para proyectos',
    'hero.greeting': 'Hola, soy',
    'hero.line1': 'Diseño &',
    'hero.line2': 'Desarrollo',
    'hero.bio': 'Desarrollador de aplicaciones full-stack con foco en interfaces modernas, con atención al detalle y desarrollo backend funcional.',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.about': 'Sobre mí',
    'hero.scroll': 'Scroll',

    // About
    'about.label': 'Sobre mí',
    'about.heading1': 'Lo que',
    'about.heading2': 'hago',
    'about.bio': 'Soy <strong>Tiago Dávila</strong>, desarrollador full-stack. Diseño y desarrollo aplicaciones, utilizando mis conocimientos de back y frontend, con proyectos que van desde sitios web normales hasta APIs con springboot.<br/><br/>Actualmente estudio en el <strong>Instituto Politécnico Modelo</strong>, donde estoy cursando mi ultimo año, sigo ampliando mis conocimientos en desarrollo de aplicaciones web. Me enfoco en la intersección entre el diseño visual y el uso de herramientas backend.',
    'about.s1.title': 'Desarrollo Frontend',
    'about.s1.desc': 'Interfaces con React, animaciones fluidas con GSAP y framer motion.',
    'about.s2.title': 'Desarrollo Backend',
    'about.s2.desc': 'APIs REST con Node.js, Java y Spring Boot. Bases de datos relacionales y NoSQL.',
    'about.s3.title': 'Diseño UI/UX',
    'about.s3.desc': 'Diseño de interfaces en Figma con foco en la experiencia de usuario, jerarquía visual y sistemas de diseño.',

    // Skills
    'skills.label': 'Stack tecnico',
    'skills.title': 'Habilidades',

    // Work / Gallery
    'gallery.label': 'Proyectos Seleccionados',
    'gallery.title': 'Proyectos',

    // Contact
    'contact.label': '¿Tenés un proyecto?',
    'contact.cta1': 'Construyamos',
    'contact.cta2': 'algo juntos',
    'footer.copy': '© 2026 Tiago Dávila. Todos los derechos reservados.',
  },
  en: {
    // Navbar
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.sitemap': 'Sitemap',
    'nav.projects': 'Projects',
    'nav.follow': 'Follow me',

    // Sidebar sections
    'section.inicio': 'Home',
    'section.trabajo': 'Work',
    'section.sobre-mi': 'About',
    'section.habilidades': 'Skills',
    'section.contacto': 'Contact',

    // Hero
    'hero.available': 'Available for projects',
    'hero.greeting': 'Hi, I\'m',
    'hero.line1': 'Design &',
    'hero.line2': 'Development',
    'hero.bio': 'Full-stack application developer focused on modern interfaces, with attention to detail and functional backend development.',
    'hero.cta.projects': 'View projects',
    'hero.cta.about': 'About me',
    'hero.scroll': 'Scroll',

    // About
    'about.label': 'About me',
    'about.heading1': 'What I',
    'about.heading2': 'do',
    'about.bio': 'I\'m <strong>Tiago Dávila</strong>, a full-stack developer. I design and develop applications using my knowledge of both frontend and backend, with projects ranging from regular websites to Spring Boot APIs.<br/><br/>I\'m currently studying at <strong>Instituto Politécnico Modelo</strong>, in my final year, continuously expanding my knowledge in web application development. I focus on the intersection of visual design and backend tooling.',
    'about.s1.title': 'Frontend Development',
    'about.s1.desc': 'Interfaces with React, smooth animations with GSAP and Framer Motion.',
    'about.s2.title': 'Backend Development',
    'about.s2.desc': 'REST APIs with Node.js, Java and Spring Boot. Relational and NoSQL databases.',
    'about.s3.title': 'UI/UX Design',
    'about.s3.desc': 'Interface design in Figma with focus on user experience, visual hierarchy and design systems.',

    // Skills
    'skills.label': 'Tech stack',
    'skills.title': 'Skills',

    // Work / Gallery
    'gallery.label': 'Selected Projects',
    'gallery.title': 'Projects',

    // Contact
    'contact.label': 'Got a project?',
    'contact.cta1': "Let's build",
    'contact.cta2': 'something together',
    'footer.copy': '© 2026 Tiago Dávila. All rights reserved.',
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const stored = localStorage.getItem('lang')
    return (stored === 'en' || stored === 'es') ? stored : 'es'
  })

  const toggleLang = () => setLang(prev => {
    const next: Language = prev === 'es' ? 'en' : 'es'
    localStorage.setItem('lang', next)
    return next
  })

  const t = (key: string): string => {
    const dict = translations[lang] as Record<string, string>
    return dict[key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
