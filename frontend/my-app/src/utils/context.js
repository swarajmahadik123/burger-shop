// src/context/AuthContext.js

import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [protectedRouteHit,setProtectedRouteHit] =useState(true);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn ,protectedRouteHit,setProtectedRouteHit}}>
            {children}
        </AuthContext.Provider>
    );
};
