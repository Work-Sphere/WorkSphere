
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <>
      <div className="app-container">
     
       <Router>
         <Navbar />
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/login" element={<Login />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
         {/* <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        </Routes>
        <Footer />
       </Router>
      
    </div>
    </>
  )

}



export default App;
