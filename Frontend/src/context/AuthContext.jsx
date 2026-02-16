import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { registerUser, loginUser, getUserProfile, logoutUser } from '../services/auth';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // location is not used here but kept since you included it
    const location = useLocation(); 
    
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Initialized state is good for preventing double-fetch on strict mode mounts.
    const [initialized, setInitialized] = useState(false); 

    const register = async (userData) => {
        setLoading(true);
        setError(null);

        try {
            const res = await registerUser(userData);
            return { success: true, message: res.message };
        } catch (error) {
            console.error('Registration failed:', error);
            const message = error.response?.data?.message || 'Registration failed. Please try again.';
            setError(message);
            return { success: false, message };
        } finally {
            setLoading(false);
        }

    };

    const login = async ({ email, password }) => {
        setLoading(true);
        setError(null);
        try {
            const data = await loginUser({ email, password });

            if (data.token && data.user) {
                localStorage.setItem('token', data.token);
                // 🌟 SUCCESS: Set user object directly on successful login
                setUser(data.user);
            }
            return data.user; 
        } catch (error) {
            console.error('Login failed:', error);
            setError(error.response?.data?.message || 'Login failed');
            return { success: false, message: error.response?.data?.message || 'Login failed' };            
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            localStorage.removeItem('token'); 
            setUser(null);
        }
    };

    const fetchProfile = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            setLoading(false);
            setInitialized(true);
            return;
        }

        setLoading(true);
        try {
            const profile = await getUserProfile(); 
            setUser(profile);
        } catch (error) {
            console.error("Failed to fetch profile. Token invalid or expired.", error);
            localStorage.removeItem("token");
            setUser(null);
        } finally {
            setLoading(false);
            setInitialized(true);
        }
    }, []);

    // --- Fetch profile once on mount ---
    useEffect(() => {
        // Run fetchProfile only once
        if (!initialized) {
            fetchProfile();
        }
    }, [initialized, fetchProfile]);

    const value = {
        user,
        loading,
        error,
        register,
        login,
        logout,
        // Removed setTokenAndFetchUser from value
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthContext;