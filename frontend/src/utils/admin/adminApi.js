// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to get auth headers with token
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// ============================================
// AUTHENTICATION APIs
// ============================================

/**
 * Admin Login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise<{user, token}>}
 */
export const adminLogin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await handleResponse(response);

    // Extract user and token from response
    const user = data.data?.user || data.user;
    const token = data.data?.token || data.token;

    if (!user) {
      throw new Error('Invalid response from server');
    }

    // Check if user is admin
    if (user.role !== 'admin') {
      throw new Error('Access denied. Admin privileges required.');
    }

    return { user, token };
  } catch (error) {
    throw error;
  }
};

/**
 * Admin Logout (clear local storage)
 */
export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

/**
 * Verify Admin Token
 * @returns {boolean}
 */
export const verifyAdminToken = () => {
  const token = localStorage.getItem('adminToken');
  const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
  
  return !!(token && adminUser.role === 'admin');
};

/**
 * Get current admin user from localStorage
 * @returns {object|null}
 */
export const getCurrentAdmin = () => {
  const adminUser = localStorage.getItem('adminUser');
  return adminUser ? JSON.parse(adminUser) : null;
};

// ============================================
// DASHBOARD APIs (Coming Soon)
// ============================================

/**
 * Get Dashboard Statistics
 * @returns {Promise<object>}
 */
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

/**
 * Get Recent Activities
 * @returns {Promise<array>}
 */
export const getRecentActivities = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/activities/recent`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};

/**
 * Get Weekly Statistics
 * @returns {Promise<object>}
 */
export const getWeeklyStats = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/stats/weekly`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    return await handleResponse(response);
  } catch (error) {
    throw error;
  }
};