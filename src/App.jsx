import AboutBeyt from './components/aboutBeytComponent/AboutBeyt.jsx'
import DolphinSafari from './components/dolphinSafariComponent/DolphinSafari.jsx'
import Experiences from './components/experiencesComponent/Experiences.jsx'
import Gallery from './components/galleryComponent/Gallery.jsx'
import Hero from './components/heroComponent/Hero.jsx'
import HowToReach from './components/howToReachComponent/HowToReach.jsx'
import Packages from './components/packagesComponent/Packages.jsx'
import './App.css'

function App() {
  return (
    <main>
      <Hero />
      <AboutBeyt />
      <DolphinSafari />
      <Packages />
      <Experiences />
      <Gallery />
      {/* <HowToReach /> */}
    </main>
  )
}

export default App
