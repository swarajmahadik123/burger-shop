import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../utils/context';
import Cookies from 'js-cookie';
import { FaHamburger } from "react-icons/fa";
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      // Remove the cookie
      Cookies.remove('_id');
      
      // Update the state to reflect logout
      setIsLoggedIn(false);
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleAuth = async () => {
    try {
      const token = Cookies.get('_id');
      
      if (token) {
        const response = await axios.get('http://localhost:8080/auth', {
          withCredentials: true,
        });
        if (response.data.message === 'Valid token') {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <header className="inset-x-0 fixed top-0 z-30 mx-auto w-full max-w-screen-md bg-transparent py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <a aria-current="page" className="flex items-center" href="/">
              
              <FaHamburger className='h-7 w-auto' alt="Logo" />
              <p className="sr-only">Website Title</p>
            </a>
          </div>
          {isLoggedIn && (
            <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
              <a
                aria-current="page"
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-yellow-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/"
              >
                Home
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-yellow-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/about"
              >
                About Us
              </a>
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm font-medium text-yellow-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                href="/yourOrder"
              >
                Your Orders
              </a>
            </div>
          )}
          <div className="flex items-center justify-end gap-3">
            {!isLoggedIn ? (
              <>
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  href="/signup"
                >
                  Sign Up
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-150 hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                  href="/login"
                >
                  Login
                </a>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
