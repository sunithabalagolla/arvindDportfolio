// src/utils/donationApi.js

const API_URL = 'http://localhost:5000/api/donations';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function to handle API errors
const handleResponse = async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }
    
    return data;
};

// ==========================================
// CREATE DONATION
// ==========================================
export const createDonation = async (donationData) => {
    try {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(donationData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Create donation error:', error);
        throw error.message || 'Failed to create donation';
    }
};

// ==========================================
// GET MY DONATIONS
// ==========================================
export const getMyDonations = async () => {
    try {
        const response = await fetch(`${API_URL}/my-donations`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get donations error:', error);
        throw error.message || 'Failed to fetch donations';
    }
};

// ==========================================
// GET SINGLE DONATION
// ==========================================
export const getDonation = async (donationId) => {
    try {
        const response = await fetch(`${API_URL}/${donationId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get donation error:', error);
        throw error.message || 'Failed to fetch donation';
    }
};

// ==========================================
// UPLOAD RECEIPT
// ==========================================
export const uploadReceipt = async (donationId, receiptFile, transactionId) => {
    try {
        const formData = new FormData();
        
        if (receiptFile) {
            formData.append('receipt', receiptFile);
        }
        
        if (transactionId) {
            formData.append('transactionId', transactionId);
        } 

        const response = await fetch(`${API_URL}/upload-receipt/${donationId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
                // Note: Don't set Content-Type for FormData, browser will set it automatically
            },
            body: formData
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Upload receipt error:', error);
        throw error.message || 'Failed to upload receipt';
    }
};

// ==========================================
// UPDATE DONATION
// ==========================================
export const updateDonation = async (donationId, updateData) => {
    try {
        const response = await fetch(`${API_URL}/${donationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify(updateData)
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Update donation error:', error);
        throw error.message || 'Failed to update donation';
    }
};

// ==========================================
// DELETE DONATION
// ==========================================
export const deleteDonation = async (donationId) => {
    try {
        const response = await fetch(`${API_URL}/${donationId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Delete donation error:', error);
        throw error.message || 'Failed to delete donation';
    }
};

// ==========================================
// GET DONATION STATISTICS
// ==========================================
export const getDonationStats = async () => {
    try {
        const response = await fetch(`${API_URL}/stats`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get donation stats error:', error);
        throw error.message || 'Failed to fetch donation statistics';
    }
};

// ==========================================
// ADMIN FUNCTIONS (For Future Use)
// ==========================================

// Get all donations (Admin only)
export const getAllDonations = async (status = '', page = 1, limit = 20) => {
    try {
        const queryParams = new URLSearchParams();
        if (status) queryParams.append('status', status);
        queryParams.append('page', page);
        queryParams.append('limit', limit);

        const response = await fetch(`${API_URL}/admin/all?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get all donations error:', error);
        throw error.message || 'Failed to fetch all donations';
    }
};

// Verify donation (Admin only)
export const verifyDonation = async (donationId, status, rejectionReason = '') => {
    try {
        const response = await fetch(`${API_URL}/admin/verify/${donationId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getAuthToken()}`
            },
            body: JSON.stringify({ status, rejectionReason })
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Verify donation error:', error);
        throw error.message || 'Failed to verify donation';
    }
};

// Get admin statistics (Admin only)
export const getAdminStatistics = async () => {
    try {
        const response = await fetch(`${API_URL}/admin/statistics`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getAuthToken()}`
            }
        });

        return await handleResponse(response);
    } catch (error) {
        console.error('Get admin statistics error:', error);
        throw error.message || 'Failed to fetch admin statistics';
    }
};

// Export all functions as default object as well
export default {
    createDonation,
    getMyDonations,
    getDonation,
    uploadReceipt,
    updateDonation,
    deleteDonation,
    getDonationStats,
    getAllDonations,
    verifyDonation,
    getAdminStatistics
};