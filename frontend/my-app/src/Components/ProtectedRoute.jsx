import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { AuthContext } from '../utils/context';

const ProtectedRoute = ({ element: Component }) => {
    
    const loginCookie = Cookies.get('_id');

    const handleProtected = async () => {
        if (loginCookie) {
          try {
            const response = await axios.post("http://localhost:8080/protectedroute", {
                _id: loginCookie
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true // Important for cookies and credentials
            });

            // console.log(response.data);
        } catch (error) {
            console.log("Error occurred in protected route:", error);
        }
        }
        else{
          
          return
        }
    };

    useEffect(() => {
        handleProtected();
    }, []);

    return loginCookie ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
