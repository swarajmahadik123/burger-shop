import React, { useContext, useRef } from 'react';
import Header from './Header';
import Slider from './Slider';
import Offer from './Offer';
import FoodSection from './FoodSection';
import Footer from './Footer';
import { AuthContext } from '../utils/context'; // Use AuthContext instead of AuthProvider


const Home = () => {
  const { isLoggedIn } = useContext(AuthContext); // Use AuthContext here
  const foodSectionRef = useRef(null); // Create ref for FoodSection
  // console.log('is logged in in home ->',isLoggedIn);
  return (
    <div>
      <Header />
      <Slider foodSectionRef={foodSectionRef} /> {/* Pass ref to Slider */}
      {isLoggedIn && (
        <>
          <Offer foodSectionRef={foodSectionRef} />
          <div ref={foodSectionRef}>
            <FoodSection />
          </div>
        </>
      )}
      
      <Footer />
    </div>
  );
};

export default Home;
