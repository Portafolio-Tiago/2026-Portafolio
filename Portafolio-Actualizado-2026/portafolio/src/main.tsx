import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import Lenis from 'lenis'
import './index.css'
import App from './App.tsx'

// Smooth scroll
const lenis = new Lenis({ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })
function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf) }
requestAnimationFrame(raf)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>,
)
