import provexDesktopVideo from '../assets/provex/video-provexx-desktop-optimized.mp4'
import provexMobileVideo from '../assets/provex/video-provexx-mobile-optimized.mp4'
import politonDesktopVideo from '../assets/politon/grabacion-politon-desktop-optimized.mp4'
import politonMobileVideo from '../assets/politon/grabacion-politon-mobile-optimized.mp4'

export interface ShowcaseProject {
  id: string
  title: string
  titleEn: string
  eyebrow: string
  eyebrowEn: string
  description: string
  descriptionEn: string
  tags: string[]
  accent: string
  desktopVideo?: string
  mobileVideo?: string
  url?: string
}

export const showcaseProjects: ShowcaseProject[] = [
  {
    id: 'provex',
    title: 'Provex',
    titleEn: 'Provex',
    eyebrow: 'Sitio corporativo',
    eyebrowEn: 'Corporate website',
    description: 'Página institucional con foco en servicios, preguntas frecuentes y una navegación clara para usuarios nuevos.',
    descriptionEn: 'Institutional website focused on services, FAQs and clear navigation for new users.',
    tags: ['React', 'Branding', 'Frontend'],
    accent: '#2980b9',
    desktopVideo: provexDesktopVideo,
    mobileVideo: provexMobileVideo,
    url: 'https://provexx.vercel.app/',
  },
  {
    id: 'politon',
    title: 'Politon',
    titleEn: 'Politon',
    eyebrow: 'Hackathon',
    eyebrowEn: 'Hackathon',
    description: 'Landing page para la hackathon de mi colegio, con links a formulario e información del evento.',
    descriptionEn: 'Landing page for my school hackathon, with links to the registration form and event info.',
    tags: ['Landing', 'Animations', 'Responsive'],
    accent: '#27ae60',
    desktopVideo: politonDesktopVideo,
    mobileVideo: politonMobileVideo,
    url: 'https://politon.ipm.edu.ar',
  },
]
