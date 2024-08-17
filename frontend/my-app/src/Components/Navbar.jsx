import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../utils/context";
import Cookies from "js-cookie";
import { FaHamburger, FaTimes } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      Cookies.remove("_id");
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      navigate('/login');

    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleAuth = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await axios.post(`${process.env.REACT_APP_URL}/auth`, {
          withCredentials: true,
          token:token,
        });
        if (response.data.message === "Valid token") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-30 bg-transparent py-3 shadow backdrop-blur-lg md:top-6 mx-auto md:rounded-3xl lg:max-w-screen-lg">
      <div className="flex items-center justify-between px-4">
        <div className={!isLoggedIn ? "w-[50%]" : ""}>
          <a aria-current="page" className="flex items-center" href="/">
           <FaHamburger className="h-7 w-auto text-yellow-500" alt="Logo" />
            <p className="sr-only">Website Title</p>
          </a>
        </div>
        <div className="z-50">
        <button
              onClick={() => (window.location.href = "/cart")}
              className="text-yellow-400 md:hidden  hover:text-yellow-500  transition-colors  focus:outline-none"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 456.029 456.029"
                style={{ enableBackground: "new 0 0 456.029 456.029" }}
                xmlSpace="preserve"
                className="w-6 h-6"
              >
                <g>
                  <path
                    d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                      c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                  />
                  <path
                    d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                      C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                      c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                      C457.728,97.71,450.56,86.958,439.296,84.91z"
                  />
                  <path
                    d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                      c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                  />
                </g>
              </svg>
            </button>
            <button
          onClick={(e) => {
            setIsMenuOpen(!isMenuOpen);
            e.preventDefault();
          }}
          className="md:hidden p-2 " // Ensure button stays on top
        >
          {isMenuOpen ? <FaTimes size={24} /> : <GiHamburgerMenu size={24} />}
        </button> 
        </div>
        

        <div
          className={`fixed h-[100vh] justify-between inset-0 z-40 bg-gray-800 bg-opacity-80 transition-transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            } md:relative md:mx-auto md:flex md:items-center md:justify-between md:bg-transparent md:opacity-100 md:translate-x-0 md:top-0 md:w-auto md:h-auto`}
        >
          <div className="flex flex-col md:flex-row md:gap-5 px-4 py-12 md:py-0">
            {isLoggedIn && (
              <div className="flex flex-col md:flex-row md:gap-5">
                <a
                  aria-current="page"
                  className="inline-block rounded-lg px-2 py-1 text-sm md:w-20 font-medium text-yellow-500 transition-all duration-200 hover:text-gray-900"
                  href="/"
                >
                  Home
                </a>
                <a
                  className="inline-block rounded-lg px-2 py-1 text-sm md:w-20 font-medium text-yellow-500 transition-all duration-200 hover:text-gray-900"
                  href="/about"
                >
                  About Us
                </a>
                <a
                  className="inline-block rounded-lg px-2 py-1 text-sm md:w-40 font-medium text-yellow-500 transition-all duration-200 hover:text-gray-900"
                  href="/yourorders"
                >
                  Your Orders
                </a>
                <a
                  className="inline-block md:hidden rounded-lg px-2 py-1 text-sm md:w-20 font-medium text-yellow-500 transition-all duration-200 hover:text-gray-900"
                  href="/profile"
                >
                  Profile
                </a>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center md:hidden w-32 justify-center rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <div className="flex  justify-self-end items-center gap-3 mt-4 md:mt-0 md:pl-[10%] lg:pl-[40%]">
           
            {!isLoggedIn ? (
              <>
                <a
                  className="inline-flex md:w-[100px] items-center justify-center rounded-xl bg-white px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                  href="/signup"
                >
                  Sign Up
                </a>
                <a
                  className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-gray-900 shadow-sm transition-all duration-150 hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
                  href="/login"
                >
                  Login
                </a>
              </>
            ) : (
              <>
            <button
              onClick={() => (window.location.href = "/cart")}
              className="text-yellow-400 hidden sm:block hover:text-yellow-500 transition-colors focus:outline-none"
            >
              <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 456.029 456.029"
                style={{ enableBackground: "new 0 0 456.029 456.029" }}
                xmlSpace="preserve"
                className="w-6 h-6"
              >
                <g>
                  <path
                    d="M345.6,338.862c-29.184,0-53.248,23.552-53.248,53.248c0,29.184,23.552,53.248,53.248,53.248
                      c29.184,0,53.248-23.552,53.248-53.248C398.336,362.926,374.784,338.862,345.6,338.862z"
                  />
                  <path
                    d="M439.296,84.91c-1.024,0-2.56-0.512-4.096-0.512H112.64l-5.12-34.304C104.448,27.566,84.992,10.67,61.952,10.67H20.48
                      C9.216,10.67,0,19.886,0,31.15c0,11.264,9.216,20.48,20.48,20.48h41.472c2.56,0,4.608,2.048,5.12,4.608l31.744,216.064
                      c4.096,27.136,27.648,47.616,55.296,47.616h212.992c26.624,0,49.664-18.944,55.296-45.056l33.28-166.4
                      C457.728,97.71,450.56,86.958,439.296,84.91z"
                  />
                  <path
                    d="M215.04,389.55c-1.024-28.16-24.576-50.688-52.736-50.688c-29.696,1.536-52.224,26.112-51.2,55.296
                      c1.024,28.16,24.064,50.688,52.224,50.688h1.024C193.536,443.31,216.576,418.734,215.04,389.55z"
                  />
                </g>
              </svg>
            </button>
              <div className="relative hidden sm:block">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500 text-white focus:outline-none"
                >
                  <span className="sr-only">Open user menu</span>
                  {/* Profile Icon */}
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://api.multiavatar.com/:seed.svg " // Replace with actual user profile image
                    alt="Profile"
                  />
                </button>
                

                {isProfileOpen && (
                  <div className="flex flex-col justify-center absolute right-0 mt-2   md:w-[8vw] rounded-md shadow-lg  hover:bg-opacity- ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-white"
                      >
                        Profile
                      </a>
                      <button
                        onClick={handleLogout}
                        className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
              </>
            )}


          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
