import React, {createContext, useState, useContext, useEffect} from 'react';
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isLoading, setIsLoading] = useState(true)
    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (isAuthenticated) {
            axios.get('http://localhost:3000/api/user/profile', {withCredentials: true})
                .then(response => {
                    setUserData({
                        name: response.data.name,
                        lastName: response.data.lastName,
                        email: response.data.email,
                        role: response.data.role
                    })

                })
                .catch(err => {
                    setUserData({})
                    // console.log(err)
                })
        }
    }, [isAuthenticated]);


    useEffect(() => {
        const loggedIn = localStorage.getItem("isAuthenticated") === "true";
        setIsAuthenticated(loggedIn);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        localStorage.setItem("isAuthenticated", isAuthenticated);
    }, [isAuthenticated]);

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserData({});
        localStorage.removeItem("isAuthenticated");
    };

    return (
        <AuthContext.Provider value={{ userData, setUserData, isAuthenticated, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
