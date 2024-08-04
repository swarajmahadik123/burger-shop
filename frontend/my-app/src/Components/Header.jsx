import React from 'react';
import Navbar from './Navbar';
import bg from '../assets/hero-bg.jpg'; 
import Slider from './Slider';

const Header = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
   
      <Slider />
    </div>
  );
};

export default Header;
