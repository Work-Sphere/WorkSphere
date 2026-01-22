<<<<<<< HEAD
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
=======
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
>>>>>>> 5d1693d49d8fd454287765d51f1b4eae842c8de4
}

export default App;
