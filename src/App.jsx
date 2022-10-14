import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'

function App() {

  return (
   <>
    <div className="App">
      <Hero />
      <About />
    </div>
   </>
  )
}

export default App
