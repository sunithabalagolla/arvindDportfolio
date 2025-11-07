// ✅ Base API URL for Vercel + Render
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:5000/api";

// ✅ PUBLIC HERO SLIDE API (carousel)

// Get all active slides
export const getActiveSlides = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides`);

    if (!response.ok) {
      throw new Error("Failed to load hero slides");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching hero slides:", error);
    throw error;
  }
};

// Get count for admin dashboard
export const getSlidesCount = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides/count`);

    if (!response.ok) {
      throw new Error("Failed to load slides stats");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching slides count:", error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/hero-slides/health`);

    if (!response.ok) {
      throw new Error("Service unavailable");
    }

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export default {
  getActiveSlides,
  getSlidesCount,
  checkHealth,
};
