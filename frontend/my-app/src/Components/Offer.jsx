import React from 'react';
import o1 from '../assets/o1.jpg';
import o2 from '../assets/o2.jpg';
import '../App.css'; 

const Offer = ({foodSectionRef}) => {
  const handleClick = () => {
    if (foodSectionRef.current) {
      foodSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="pt-24 h-auto flex items-center justify-center">
      <div className="container mx-auto my-auto p-4 md:p-9 flex flex-col md:flex-row justify-center gap-8">
        <div className="bg-[#222831] w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-sm rounded-none overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
          <div className="flex justify-center mt-4 relative">
            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden flex items-center justify-center">
              <img className="h-full w-full object-cover scale-hover" src={o1} alt="Aloe Cactus" />
            </div>
          </div>
          <div className="p-5 text-center">
            <h1 className="text-lg sm:text-xl md:text-3xl font-semibold dancing-script text-white">Tasty Thursdays</h1>
            <p className="mt-2 text-sm sm:text-base md:text-lg dancing-script text-white">20% off</p>
            <div className="flex justify-center mt-4">
              <div className="btn-box">
                <a  onClick={handleClick} className="inline-block py-2 px-4 sm:py-3 sm:px-6 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition">
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#222831] w-full sm:w-[60vw] md:w-[40vw] lg:w-[30vw] max-w-sm rounded-none overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
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
        </div>
      </div>
    </div>
  );
}

export default Offer;
