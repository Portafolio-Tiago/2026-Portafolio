// Asset imports - Tango Argentino
import tangoHero from '../assets/tango-arg/hero.png'
import tangoContact from '../assets/tango-arg/contact.png'
import tangoPersonal from '../assets/tango-arg/personalfno.png'
import tangoCronometer from '../assets/tango-arg/cronometer.png'
import tangoPreview from '../assets/tango-arg/preview.mp4'

// Asset imports - Provex
import provexHero from '../assets/provex/hero.png'
import provexQuestions from '../assets/provex/questions.png'
import provexServices from '../assets/provex/services.png'
import provexHowWeWork from '../assets/provex/how_we_work.png'

// Asset imports - Kiosco El Abuelo
import kioscoHero from '../assets/kiosco_elabuelo/hero.png'
import kioscoDashboard from '../assets/kiosco_elabuelo/dashboard.png'
import kioscoProductos from '../assets/kiosco_elabuelo/productos.png'
import kioscoNewVenta from '../assets/kiosco_elabuelo/new_venta.png'
import kioscoDashboardVideo from '../assets/kiosco_elabuelo/dashBoard.mp4'

export interface GalleryItem {
  id: string
  src: string
  type: 'image' | 'video'
  project: string
  label: string
  labelEn: string
  color: string
}

export const galleryItems: GalleryItem[] = [
  // Tango Argentino
  { id: 'tango-1', src: tangoHero, type: 'image', project: 'Tango Argentino', label: 'Hero', labelEn: 'Hero', color: '#c0392b' },
  { id: 'tango-2', src: tangoContact, type: 'image', project: 'Tango Argentino', label: 'Contacto', labelEn: 'Contact', color: '#c0392b' },
  { id: 'tango-3', src: tangoPersonal, type: 'image', project: 'Tango Argentino', label: 'Equipo', labelEn: 'Team', color: '#c0392b' },
  { id: 'tango-4', src: tangoCronometer, type: 'image', project: 'Tango Argentino', label: 'Clases', labelEn: 'Classes', color: '#c0392b' },
  { id: 'tango-5', src: tangoPreview, type: 'video', project: 'Tango Argentino', label: 'Preview', labelEn: 'Preview', color: '#c0392b' },
  
  // Provex
  { id: 'provex-1', src: provexHero, type: 'image', project: 'Provex', label: 'Hero', labelEn: 'Hero', color: '#2980b9' },
  { id: 'provex-2', src: provexQuestions, type: 'image', project: 'Provex', label: 'FAQ', labelEn: 'FAQ', color: '#2980b9' },
  { id: 'provex-3', src: provexServices, type: 'image', project: 'Provex', label: 'Servicios', labelEn: 'Services', color: '#2980b9' },
  { id: 'provex-4', src: provexHowWeWork, type: 'image', project: 'Provex', label: 'Proceso', labelEn: 'Process', color: '#2980b9' },
  
  // Kiosco El Abuelo
  { id: 'kiosco-1', src: kioscoHero, type: 'image', project: 'Kiosco El Abuelo', label: 'Login', labelEn: 'Login', color: '#27ae60' },
  { id: 'kiosco-2', src: kioscoDashboard, type: 'image', project: 'Kiosco El Abuelo', label: 'Dashboard', labelEn: 'Dashboard', color: '#27ae60' },
  { id: 'kiosco-3', src: kioscoProductos, type: 'image', project: 'Kiosco El Abuelo', label: 'Productos', labelEn: 'Products', color: '#27ae60' },
  { id: 'kiosco-4', src: kioscoNewVenta, type: 'image', project: 'Kiosco El Abuelo', label: 'Ventas', labelEn: 'Sales', color: '#27ae60' },
  { id: 'kiosco-5', src: kioscoDashboardVideo, type: 'video', project: 'Kiosco El Abuelo', label: 'Demo', labelEn: 'Demo', color: '#27ae60' },
]
