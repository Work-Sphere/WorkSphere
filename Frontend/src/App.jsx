import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Home from './pages/Home';  // Add Home import
import Login from './pages/Login';
import Register from './pages/Register';  // Add Register import
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <div className="app-container">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Fixed path */}
          </Routes>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;
