// ✅ Base API URL
const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : "http://localhost:5000/api";

// ✅ Token helper
const getAuthHeaders = () => {
  const token = localStorage.getItem("adminToken");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ✅ FormData headers for image uploads
const getAuthHeadersFormData = () => {
  const token = localStorage.getItem("adminToken");
  return {
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// =============================
// ✅ ADMIN HERO SLIDE API
// =============================

// Get all slides
export const getAllSlides = async () => {
  const response = await fetch(`${API_BASE_URL}/admin/hero-slides`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to fetch slides");
  return await response.json();
};

// Create slide
export const createSlide = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/admin/hero-slides`, {
    method: "POST",
    headers: getAuthHeadersFormData(),
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to create slide");
  return await response.json();
};

// Update slide
export const updateSlide = async (id, formData) => {
  const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}`, {
    method: "PUT",
    headers: getAuthHeadersFormData(),
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update slide");
  return await response.json();
};

// Delete slide
export const deleteSlide = async (id) => {
  const response = await fetch(`${API_BASE_URL}/admin/hero-slides/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) throw new Error("Failed to delete slide");
  return await response.json();
};

// Toggle slide status
export const toggleSlideStatus = async (id) => {
  const response = await fetch(
    `${API_BASE_URL}/admin/hero-slides/${id}/toggle`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) throw new Error("Failed to toggle slide");
  return await response.json();
};

export default {
  getAllSlides,
  createSlide,
  updateSlide,
  deleteSlide,
  toggleSlideStatus,
};
