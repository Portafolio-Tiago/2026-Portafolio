import { LanguageProvider } from './context/LanguageContext'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
  return (
    <LanguageProvider>
      <CustomCursor />
      <Sidebar />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Skills />
        <Contact />
      </main>
    </LanguageProvider>
  )
}

export default App
