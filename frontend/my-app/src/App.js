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
import ProductDetail from './Components/ProductDetail';
import YourOrders from './Components/YourOrders';
import ProtectedRoute from './Components/ProtectedRoute';
import Cart from './Components/Cart';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/about' element={<ProtectedRoute element={<About />} />} />
          <Route path='/productdetail/:id' element={<ProtectedRoute element={<ProductDetail />} />} />
          <Route path='/yourorders' element={<ProtectedRoute element={<YourOrders />} />} />
          <Route path='/cart' element={<ProtectedRoute element={<Cart  />} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
