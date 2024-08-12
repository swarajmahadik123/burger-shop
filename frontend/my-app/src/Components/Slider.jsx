import React, { useState, useEffect, useRef } from 'react';
import '../App.css'; 

const slides = [
  {
    title: 'Burger Bite',
    content: 'Delight in our mouthwatering selection of pizzas, burgers, pastas, and fries! Freshly made, bursting with flavor, and perfect for any craving. Satisfy your hunger with every bite at our irresistible eatery. Taste the difference!',
  },
  {
    title: 'Burger Bite',
    content: 'Delight in our mouthwatering selection of pizzas, burgers, pastas, and fries! Freshly made, bursting with flavor, and perfect for any craving. Satisfy your hunger with every bite at our irresistible eatery. Taste the difference!',
  },
  {
    title: 'Burger Bite',
    content: 'Delight in our mouthwatering selection of pizzas, burgers, pastas, and fries! Freshly made, bursting with flavor, and perfect for any craving. Satisfy your hunger with every bite at our irresistible eatery. Taste the difference!',
  },
];

const Slider = ({ foodSectionRef }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleClick = () => {
    if (foodSectionRef.current) {
      foodSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length); // Loop back to the first slide
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]); 

  return (
    <section className="absolute inset-0 flex items-center justify-center z-20 bg-transparent">
      <div className="relative w-[90vw] sm:w-[80vw] md:w-[70vw] lg:w-[60vw] h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-[60vh] overflow-hidden">
        <div
          className="carousel-inner flex transition-transform duration-700"
          style={{ transform: `translateX(-${currentSlide * 100}%)`, backgroundColor: 'transparent' }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="carousel-item flex-shrink-0 w-full h-full flex items-center p-4 sm:p-6 bg-transparent text-white">
              <div className="flex flex-col gap-4 detail-box w-full max-w-md">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-2 sm:mb-4 dancing-script">{slide.title}</h1>
                <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-4">{slide.content}</p>
                <div className="btn-box">
                  <a onClick={handleClick} href="#" className="inline-block py-2 px-4 sm:py-3 sm:px-6 bg-yellow-400 text-white rounded-full hover:bg-yellow-500 transition">
                    Order Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full cursor-pointer ${index === currentSlide ? 'bg-yellow-400' : 'bg-white'}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slider;
