import axios from 'axios';

// Get API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

console.log('🔗 API Connected to:', API_URL); // Debug log

// Create axios instance with base configuration
const api = axios.create({
    baseURL: `${API_URL}/api`, // Add /api prefix here
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
    withCredentials: true, // Important for CORS
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
    (response) => {
        return response.data; // Return only data part
    },
    (error) => {
        // Handle different error types
        if (error.response) {
            // Server responded with error status
            const { status, data } = error.response;

            if (status === 401) {
                // Unauthorized - clear token and redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/auth/login';
            }

            // Return error message from server
            return Promise.reject(data?.message || data?.error || 'An error occurred');
        } else if (error.request) {
            // Request made but no response
            console.error('Network Error:', error.message);
            return Promise.reject('Network error. Please check your connection.');
        } else {
            // Something else happened
            return Promise.reject('An unexpected error occurred');
        }
    }
);

// Auth API calls
export const authAPI = {
    // Register new user
    register: async (userData) => {
        return await api.post('/auth/signup', userData);
    },

    // Login with email and password
    login: async (credentials) => {
        return await api.post('/auth/login', credentials);
    },

    // Request OTP for login
    loginWithOTP: async (email) => {
        return await api.post('/auth/login-otp', { email });
    },

    // Logout
    logout: async () => {
        return await api.post('/auth/logout');
    },

    // Get user profile
    getProfile: async () => {
        return await api.get('/auth/profile');
    },

    // Update user profile
    updateProfile: async (profileData) => {
        return await api.put('/auth/profile', profileData);
    },

    // Change password
    changePassword: async (passwordData) => {
        return await api.put('/auth/change-password', passwordData);
    },

    // Request password reset
    forgotPassword: async (email) => {
        return await api.post('/auth/forgot-password', { email });
    },

    // Reset password with OTP
    resetPassword: async (resetData) => {
        return await api.post('/auth/reset-password', resetData);
    },

    // Verify token
    verifyToken: async () => {
        return await api.get('/auth/verify-token');
    },
};

// OTP API calls
export const otpAPI = {
    // Verify OTP
    verifyOTP: async (otpData) => {
        return await api.post('/otp/verify', otpData);
    },

    // Resend OTP
    resendOTP: async (resendData) => {
        return await api.post('/otp/resend', resendData);
    },

    // Get OTP status (development only)
    getOTPStatus: async (email, purpose = 'signup') => {
        return await api.get(`/otp/status/${email}?purpose=${purpose}`);
    },
};

// Volunteer API calls
export const volunteerAPI = {
    // Join an event
    joinEvent: async (eventId, eventData) => {
        return await api.post(`/volunteer/join-event/${eventId}`, eventData);
    },
    
    // Get user's joined events
    getMyEvents: async () => {
        return await api.get('/volunteer/my-events');
    },

    // Leave an event
    leaveEvent: async (eventId) => {
        return await api.delete(`/volunteer/leave-event/${eventId}`);
    }
};

// Helper functions
export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        delete api.defaults.headers.common['Authorization'];
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const removeAuthToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers.common['Authorization'];
};

export default api;
