<<<<<<< HEAD
<<<<<<< HEAD

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
=======
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
import Footer from './components/Footer';
import Home from './pages/Home';  // Add Home import
import Login from './pages/Login';
<<<<<<< HEAD
import Register from './pages/Register';
=======
import Register from './pages/Register';  // Add Register import
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
import ForgotPassword from './pages/ForgotPassword';

function App() {
  return (
    <>
      <div className="app-container">
<<<<<<< HEAD

       <Router>
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/home" element={<Home />} />
         <Route path="/login" element={<Login />} />
         <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Footer />
       </Router>

    </div>
=======
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
>>>>>>> 51d3d022c4b594d44842d1264134c195eb7180c7
    </>
=======
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
>>>>>>> parent of f44ebf5 (Merge branch 'Tejas' of https://github.com/Work-Sphere/WorkSphere)
  );
}

export default App;
