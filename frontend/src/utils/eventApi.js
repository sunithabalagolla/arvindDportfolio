// src/utils/eventApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

// ===== PUBLIC ENDPOINTS =====

export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

export const getPastEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events/past`);
        return response.data;
    } catch (error) {
        console.error('Error fetching past events:', error);
        throw error;
    }
};

export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
};

// ===== PROTECTED ENDPOINTS (Require Auth) =====

export const setEventNotification = async (eventId, reminderDays) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(
            `${API_URL}/events/notify`,  // ✅ FIXED
            { eventId, reminderDays },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error setting notification:', error);
        throw error;
    }
};

export const getMyNotifications = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
            `${API_URL}/events/notifications/my`,  // ✅ FIXED
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

export const cancelNotification = async (notificationId) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
            `${API_URL}/events/notifications/${notificationId}`,  // ✅ FIXED
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (error) {
        console.error('Error cancelling notification:', error);
        throw error;
    }
};