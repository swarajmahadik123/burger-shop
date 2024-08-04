import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Contact Us Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-4">
              <a href="#" className="flex items-center text-gray-400 hover:text-white">
                <i className="fa fa-map-marker mr-2" aria-hidden="true"></i>
                <span>Location</span>
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-white">
                <i className="fa fa-phone mr-2" aria-hidden="true"></i>
                <span>Call +01 1234567890</span>
              </a>
              <a href="#" className="flex items-center text-gray-400 hover:text-white">
                <i className="fa fa-envelope mr-2" aria-hidden="true"></i>
                <span>demo@gmail.com</span>
              </a>
            </div>
          </div>

          {/* About Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <a href="#" className="text-2xl font-bold mb-4 block">Feane</a>
            <p className="text-gray-400 mb-4">
              Necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-facebook" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-twitter" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-linkedin" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-instagram" aria-hidden="true"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <i className="fa fa-pinterest" aria-hidden="true"></i>
              </a>
            </div>
          </div>

          {/* Opening Hours Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-semibold mb-4">Opening Hours</h4>
            <p className="text-gray-400 mb-2">Everyday</p>
            <p className="text-gray-400">10:00 AM - 10:00 PM</p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="text-center text-gray-400 mt-8">
          <p>
            &copy; <span id="displayYear">{new Date().getFullYear()}</span> All Rights Reserved By
            <a href="https://html.design/" className="text-white hover:underline">Free Html Templates</a><br /><br />
            &copy; <span id="displayYear">{new Date().getFullYear()}</span> Distributed By
            <a href="https://themewagon.com/" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">ThemeWagon</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
