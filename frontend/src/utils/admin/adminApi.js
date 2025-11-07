// Base API URL - safe for Vercel + Render
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : 'http://localhost:5000/api';

// Get token from localStorage
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Handle API responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
};

// ============================================
// AUTH
// ============================================

// Admin Login
export const adminLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await handleResponse(response);

  const user = data.data?.user || data.user;
  const token = data.data?.token || data.token;

  if (!user) throw new Error('Invalid response from server');
  if (user.role !== 'admin') throw new Error('Admin access required');

  return { user, token };
};

export const adminLogout = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUser');
};

export const verifyAdminToken = () => {
  const token = localStorage.getItem('adminToken');
  const user = JSON.parse(localStorage.getItem('adminUser') || '{}');
  return !!(token && user.role === 'admin');
};

export const getCurrentAdmin = () => {
  const admin = localStorage.getItem('adminUser');
  return admin ? JSON.parse(admin) : null;
};

// ============================================
// DASHBOARD APIs
// ============================================

export const getDashboardStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/stats`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await handleResponse(response);
};

export const getRecentActivities = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/activities/recent`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await handleResponse(response);
};

export const getWeeklyStats = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/stats/weekly`, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
  return await handleResponse(response);
};
