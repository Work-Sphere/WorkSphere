import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'

function App() {
  return (
    <>
      <div className="app-container">
      <Navbar />
      
      <Home />

      <Footer />
    </div>
    </>
  )
}

export default App
