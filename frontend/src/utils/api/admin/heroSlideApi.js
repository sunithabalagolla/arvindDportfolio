// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Admin API service for hero slides management
 * Requires admin authentication
 */

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { 
      'Authorization': `Bearer ${token}`
     
    })
  };
};

// Helper for form data (image upload)
const getAuthHeadersFormData = () => {
  const token = localStorage.getItem('adminToken');
  return {
    ...(token && { 
      'Authorization': `Bearer ${token}`
     
    })
  };
};

/**
 * Get all slides (admin - includes inactive)
 */
export const getAllSlides = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/hero-slides`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch slides');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching slides:', error);
    throw error;
  }
};

/**
 * Create new slide with image
 */
export const createSlide = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/hero-slides`, {
      method: 'POST',
      headers: getAuthHeadersFormData(),
      body: formData, // FormData with image file
    });

    if (!response.ok) {
      throw new Error('Failed to create slide');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating slide:', error);
    throw error;
  }
};

/**
 * Update slide
 */
export const updateSlide = async (id, formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}`, {
      method: 'PUT',
      headers: getAuthHeadersFormData(),
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to update slide');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating slide:', error);
    throw error;
  }
};

/**
 * Delete slide
 */
export const deleteSlide = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to delete slide');
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting slide:', error);
    throw error;
  }
};

/**
 * Toggle slide active status
 */
export const toggleSlideStatus = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}/toggle`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to toggle slide status');
    }

    return await response.json();
  } catch (error) {
    console.error('Error toggling slide status:', error);
    throw error;
  }
};

export default {
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
  toggleSlideStatus,
};