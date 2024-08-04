import React from 'react';
import aboutImg from '../assets/about-img.png'; // Adjust path as needed

const About = () => {
  return (
    <section className="about_section py-16 bg-gray-800">
      <div className=" py-16 container mx-auto px-4 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src={aboutImg} alt="About Us" className="w-full h-[60vh] object-contain  rounded-lg " />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <div className="heading_container mb-4">
              <h2 className="text-3xl font-bold text-gray-900">We Are Feane</h2>
            </div>
            <p className="text-gray-700 mb-6">
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration
              in some form, by injected humour, or randomised words which don't look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in
              the middle of text. All
            </p>
            <a href="#" className="text-yellow-500 hover:text-yellow-600 font-semibold">Read More</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
