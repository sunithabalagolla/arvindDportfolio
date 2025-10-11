import axios from 'axios';

// Base API URL - Update this to match your backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests if it exists
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

// Handle response errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('token');
            // Optionally redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

/**
 * Submit a concern
 * @param {string} message - The concern message
 * @param {string} email - Optional email for anonymous users
 * @returns {Promise} Response from server
 */
export const submitConcern = async (message, email = null) => {
    try {
        const payload = { message };
        
        // If user is not logged in and provides email
        if (email) {
            payload.email = email;
        }
        
        const response = await api.post('/feedback/concern', payload);
        return response.data;
    } catch (error) {
        console.error('Error submitting concern:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Failed to submit concern. Please try again.' 
        };
    }
};

/**
 * Submit general feedback
 * @param {string} message - The feedback message
 * @param {string} email - Optional email for anonymous users
 * @returns {Promise} Response from server
 */
export const submitFeedback = async (message, email = null) => {
    try {
        const payload = { message };
        
        // If user is not logged in and provides email
        if (email) {
            payload.email = email;
        }
        
        const response = await api.post('/feedback/feedback', payload);
        return response.data;
    } catch (error) {
        console.error('Error submitting feedback:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Failed to submit feedback. Please try again.' 
        };
    }
};

/**
 * Get all feedback (Admin only)
 * @param {Object} params - Query parameters (type, status, page, limit)
 * @returns {Promise} Response from server
 */
export const getAllFeedback = async (params = {}) => {
    try {
        const response = await api.get('/feedback/all', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching feedback:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Failed to fetch feedback.' 
        };
    }
};

/**
 * Update feedback status (Admin only)
 * @param {string} id - Feedback ID
 * @param {Object} updates - Updates to apply (status, priority, adminNotes)
 * @returns {Promise} Response from server
 */
export const updateFeedback = async (id, updates) => {
    try {
        const response = await api.patch(`/feedback/${id}`, updates);
        return response.data;
    } catch (error) {
        console.error('Error updating feedback:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Failed to update feedback.' 
        };
    }
};

/**
 * Delete feedback (Admin only)
 * @param {string} id - Feedback ID
 * @returns {Promise} Response from server
 */
export const deleteFeedback = async (id) => {
    try {
        const response = await api.delete(`/feedback/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting feedback:', error);
        throw error.response?.data || { 
            success: false, 
            message: 'Failed to delete feedback.' 
        };
    }
};

export default {
    submitConcern,
    submitFeedback,
    getAllFeedback,
    updateFeedback,
    deleteFeedback
};