import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get auth token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('authToken');
};

// Get all events
export const getAllEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`);
        return response.data;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error;
    }
};

// Get single event by ID
export const getEventById = async (eventId) => {
    try {
        const response = await axios.get(`${API_URL}/events/${eventId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching event:', error);
        throw error;
    }
};

// Set event notification
export const setEventNotification = async (eventId, reminderDays) => {
    try {
        const token = getAuthToken();
        const response = await axios.post(
            `${API_URL}/notifications/set`,
            {
                eventId,
                reminderDays
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error setting notification:', error);
        throw error;
    }
};

// Get user's notifications
export const getMyNotifications = async () => {
    try {
        const token = getAuthToken();
        const response = await axios.get(
            `${API_URL}/notifications/my-notifications`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching notifications:', error);
        throw error;
    }
};

// Cancel notification
export const cancelNotification = async (notificationId) => {
    try {
        const token = getAuthToken();
        const response = await axios.delete(
            `${API_URL}/notifications/${notificationId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error cancelling notification:', error);
        throw error;
    }
};