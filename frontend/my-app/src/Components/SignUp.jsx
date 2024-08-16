import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Add this import
import { handleError, handleSuccess } from '../utils/utils';
import axios from 'axios';


const SignUp = () => {
    const navigate = useNavigate();
    const [signInInfo, setSignInInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const copySignInInfo = { ...signInInfo };
        copySignInInfo[name] = value;
        setSignInInfo(copySignInInfo);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form from reloading the page
        const { firstName, lastName, email, password } = signInInfo;

        if (!firstName || !lastName || !email || !password) {
            handleError('All fields are required');
        } else if (password.length < 6) {
            handleError('Password must be of 6 characters');
        } else {
            try {
                const url = `${process.env.REACT_APP_URL}/signup`;
                const response = await axios.post(url, signInInfo, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (response.status === 201) {
                    handleSuccess('User signed in successfully');
                    navigate('/login');
                }
            } catch (error) {
                if (error.response.status === 409 && error.response) {
                    handleError('Email already exists, please login');
                    navigate('/login');
                } else {
                    handleError('An error occurred, please try again');
                    console.log(error);
                }
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
                <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-lg w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
                    <div className="md:flex w-full">
                        <div className="hidden md:block w-1/2 bg-gray-800 py-10 px-10">
                            {/* SVG illustration */}
                        </div>
                        <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">Sign up</h1>
                                <p>Enter your information to Sign up</p>
                            </div>
                            <div>
                                <div className="flex -mx-3">
                                    <div className="w-1/2 px-3 mb-5">
                                        <label htmlFor="firstName" className="text-xs font-semibold px-1">First name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input onChange={handleChange} value={signInInfo.firstName} name='firstName' type="text" id="firstName" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="First name" />
                                        </div>
                                    </div>
                                    <div className="w-1/2 px-3 mb-5">
                                        <label htmlFor="lastName" className="text-xs font-semibold px-1">Last name</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-account-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input onChange={handleChange} value={signInInfo.lastName} name='lastName' type="text" id="lastName" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Last name" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <label htmlFor="email" className="text-xs font-semibold px-1">Email</label>
                                        <div className="flex">
                                            <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                                <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                                            </div>
                                            <input onChange={handleChange} value={signInInfo.email} name='email' type="email" id="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="Email" />
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
                                            <input onChange={handleChange} value={signInInfo.password} name='password' type="password" id="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex -mx-3">
                                    <div className="w-full px-3 mb-5">
                                        <button onSubmit={handleSubmit} type='submit' className="block w-full max-w-xs mx-auto bg-gray-800 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-lg px-3 py-3 font-semibold">Sign up</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-end justify-end fixed bottom-0 right-0 mb-4 mr-4 z-10">
                    <div>
                        <a title="Buy me a coffee" href="https://www.buymeacoffee.com/scottwindon" target="_blank" rel="noopener noreferrer" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12">
                            <img className="object-cover object-center w-full h-full rounded-full" src="https://i.pinimg.com/originals/60/fd/e8/60fde811b6be57094e0abc69d9c2622a.jpg" alt="Buy me a coffee" />
                        </a>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </form>
    );
};

export default SignUp;
