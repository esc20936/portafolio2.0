import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'

function App() {

  return (
   <>
    <div className="App">
      <Hero />
      <About />
      <Projects />
      <Projects />
    </div>
   </>
  )
}

export default App
