import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add this import
import { handleError, handleSuccess, handleWarning } from '../utils/utils';
import axios from 'axios';
import Cookies from 'js-cookie';    
import { AuthContext } from '../utils/context';
import {Alert} from 'antd';
const Login = () => {
    const {isLoggedIn,setIsLoggedIn,protectedRouteHit,setProtectedRouteHit}=useContext(AuthContext);
    const navigate=useNavigate();
    const [loginInfo,setLoginInfo]=useState({
        email:'',
        password:''
    })
    
    

    const handleChange = (e)=>{
        const {name,value}=e.target;
        const copyLoginInfo = {...loginInfo}
        copyLoginInfo[name]=value;
        setLoginInfo(copyLoginInfo);
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { email, password } = loginInfo;
      if (!email || !password) {
        handleError('All fields are required');
        return;
      }
      try {
        const url = `${process.env.REACT_APP_URL}/login`;// Ensure correct usage of environment variable
        const response = await axios.post(url, loginInfo, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        localStorage.setItem("token", response?.data?.token);
        Cookies.set("_id", response?.data?.token, { expires: 7 });
        if (response.status === 200) {
          setIsLoggedIn(true);
          handleSuccess('User logged in successfully');
          navigate('/');
        }
      } catch (error) {
        console.error('Error details:', error.response || error.message); // More detailed error logging
        handleError('Login failed');
      }
    };
    
    return (
        <>

        <form onSubmit={handleSubmit} action="">
        <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
         <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-lg w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
            <div className="md:flex w-full">
              <div className="hidden md:block w-1/2  bg-gray-800 py-10 px-10">
                {/* SVG illustration */}
                
              </div>
              <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                <div className="text-center mb-10">
                  <h1 className="font-bold text-3xl text-gray-900">Login</h1>
                  <p>Enter your information to Login</p>
                </div>
                <div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-5">
                      <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                        </div>
                        <input onChange={handleChange} value={loginInfo.email} name='email' type="email" id="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Email" />
                      </div>
                    </div>
                  </div>
                  <div className="flex -mx-3">
                    <div className="w-full px-3 mb-12">
                      <label htmlFor="password" className="text-xs font-semibold px-1">Password</label>
                      <div className="flex">
                        <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                          <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                        </div>
                        <input onChange={handleChange} value={loginInfo.password}  name='password'  type="password" id="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                        </div>
                    </div>
                  </div>
                  <div className="flex-col  -mx-3">
                    <div className="w-full px-3 mb-5">
                      <button type='submit' className="block w-full max-w-xs mx-auto  bg-gray-800 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-lg px-3 py-3 font-semibold">Login</button>
                    </div>
                    <span className="">
                      Don't  have an account ?<Link to="/signup">SignUp</Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </div>
        </form>
        </>
      );
    }
    
    export default Login;
    

