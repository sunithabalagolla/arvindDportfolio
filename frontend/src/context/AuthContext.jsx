import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, setAuthToken, removeAuthToken, getAuthToken } from '../utils/api';

// Create Auth Context
const AuthContext = createContext(null);

// Custom hook to use auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Check if user is already logged in on mount
    useEffect(() => {
        checkAuth();
    }, []);

    // Check authentication status
    const checkAuth = async () => {
        try {
            const token = getAuthToken();
            const savedUser = localStorage.getItem('user');

            if (token && savedUser) {
                // Verify token is still valid
                const response = await authAPI.verifyToken();
                
                if (response.success) {
                    setUser(JSON.parse(savedUser));
                    setIsAuthenticated(true);
                    setAuthToken(token);
                }
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            // Clear invalid auth data
            removeAuthToken();
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    // Register new user
    const register = async (userData) => {
        try {
            setError(null);
            const response = await authAPI.register(userData);
            
            return {
                success: true,
                data: response.data,
                message: response.message
            };
        } catch (error) {
            setError(error);
            throw error;
        }
    };

    // Login with credentials
    const login = async (credentials) => {
        try {
            setError(null);
            const response = await authAPI.login(credentials);

            if (response.success) {
                const { user: userData, token } = response.data;
                
                // Save token and user data
                setAuthToken(token);
                localStorage.setItem('user', JSON.stringify(userData));
                
                setUser(userData);
                setIsAuthenticated(true);

                return {
                    success: true,
                    user: userData,
                    message: response.message
                };
            }
        } catch (error) {
            setError(error);
            throw error;
        }
    };

    // Login after OTP verification
    const loginAfterOTP = (userData, token) => {
        try {
            setAuthToken(token);
            localStorage.setItem('user', JSON.stringify(userData));
            
            setUser(userData);
            setIsAuthenticated(true);
            setError(null);

            return { success: true };
        } catch (error) {
            setError(error);
            throw error;
        }
    };

    // Logout
    const logout = async () => {
        try {
            // Call backend logout API
            await authAPI.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local state regardless of API call success
            removeAuthToken();
            setUser(null);
            setIsAuthenticated(false);
            setError(null);
        }
    };

    // Update user profile in context
    const updateUser = (updatedData) => {
        const updatedUser = { ...user, ...updatedData };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        isAuthenticated,
        isLoading,
        error,
        register,
        login,
        loginAfterOTP,
        logout,
        updateUser,
        clearError,
        checkAuth
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;