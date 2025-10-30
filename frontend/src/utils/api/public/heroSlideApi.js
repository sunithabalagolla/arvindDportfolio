// Base API URL
const API_BASE_URL = 'http://localhost:5000/api';

/**
 * Public API service for hero slides
 * No authentication required - for frontend carousel
 */

/**
 * Get all active hero slides for carousel
 * @returns {Promise} Array of active slides
 */
export const getActiveSlides = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides`);
    
    if (!response.ok) {
      throw new Error('Failed to load hero slides');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    throw new Error('Failed to load hero slides');
  }
};

/**
 * Get slides statistics to show like this in admin dashboard // Shows: Total Slides: 5, Active: 3, Inactive: 2
 * @returns {Promise} Slides count data
 */
export const getSlidesCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides/count`);
    
    if (!response.ok) {
      throw new Error('Failed to load slides statistics');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching slides count:', error);
    throw new Error('Failed to load slides statistics');
  }
};

/**
 * Health check for hero slides service
 * @returns {Promise} Health status
 */
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides/health`);
    
    if (!response.ok) {
      throw new Error('Hero slides service unavailable');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking hero slides health:', error);
    throw new Error('Hero slides service unavailable');
  }
};

export default {
  getActiveSlides,
  getSlidesCount,
  checkHealth,
};