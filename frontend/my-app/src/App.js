import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './App.css'; // Import your CSS file

import Header from './Components/Header';
import Footer from './Components/Footer'; 
import Home from './Components/Home'; 
import About from './Components/About';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Signup from './Components/SignUp';
import { AuthProvider } from './utils/context';



function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        
      </Routes>
      <Footer />
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
