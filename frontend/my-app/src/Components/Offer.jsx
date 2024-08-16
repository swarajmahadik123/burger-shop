import React from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import o1 from '../assets/o1.jpg';
import o2 from '../assets/o2.jpg';
import '../App.css'; 

const Offer = ({ foodSectionRef }) => {
  const handleClick = () => {
    if (foodSectionRef.current) {
      foodSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Define animation variants for the right side and left side
  const rightVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut' } }
  };

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeInOut' } }
  };

  return (
    <div className="pt-24 h-auto flex items-center justify-center">
      <div className="container mx-auto my-auto p-4 md:p-9 flex flex-col md:flex-row justify-center gap-8">
        {/* Animated Div from the right */}
        <motion.div
          className="bg-[#222831] w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-sm rounded-none overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
          variants={leftVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-center mt-4 relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden flex items-center justify-center">
              <img className="h-full w-full object-cover scale-hover" src={o1} alt="Tasty Thursdays" />
            </div>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-lg sm:text-xl md:text-3xl font-semibold dancing-script text-white">Tasty Thursdays</h1>
            <p className="mt-2 text-sm sm:text-base md:text-lg dancing-script text-white">20% off</p>
            <div className="flex justify-center mt-4">
              <div className="btn-box">
                <a onClick={handleClick} className="inline-block py-2 px-4 sm:py-3 sm:px-6 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Animated Div from the left */}
        <motion.div
          className="bg-[#222831] w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-sm rounded-none overflow-hidden shadow-xl hover:shadow-2xl transition duration-300"
          variants={rightVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex justify-center mt-4 relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden flex items-center justify-center">
              <img className="h-full w-full object-cover scale-hover" src={o2} alt="Aloe Cactus" />
            </div>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-lg sm:text-xl md:text-3xl font-semibold dancing-script text-white">Aloe Cactus</h1>
            <p className="mt-2 text-sm sm:text-base md:text-lg dancing-script text-white">30% off</p>
            <div className="flex justify-center mt-4">
              <div className="btn-box">
                <a onClick={handleClick} className="inline-block py-2 px-4 sm:py-3 sm:px-6 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Offer;
