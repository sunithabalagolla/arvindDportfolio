// pages/admin/home/HeroCarouselManagement.jsx
import React, { useState, useEffect } from 'react';
import HeroSlideList from '../../../components/admin/heroSlide/HeroSlideList';
import HeroSlideForm from '../../../components/admin/heroSlide/HeroSlideForm';
import { getAllSlides, createSlide, updateSlide, deleteSlide, toggleSlideStatus } from '../../../utils/api/admin/heroSlideApi';
import Toast from '../../../components/admin/common/Toast';
import LoadingSpinner from '../../../components/admin/common/LoadingSpinner';
import AdminLayout from '../../../components/admin/AdminLayout';

const HeroCarouselManagement = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const safeSlides = Array.isArray(slides) ? slides : [];

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const fetchSlides = async () => {
    try {
      setLoading(true);
      const response = await getAllSlides();
      
      console.log('📡 API Response:', response);
      
      // Handle different response structures
      let slidesData = [];
      
      if (response.data?.slides && Array.isArray(response.data.slides)) {
        slidesData = response.data.slides;
      } else if (Array.isArray(response.data)) {
        slidesData = response.data;
      } else if (Array.isArray(response.slides)) {
        slidesData = response.slides;
      } else if (Array.isArray(response)) {
        slidesData = response;
      }
      
      console.log('✅ Slides loaded:', slidesData.length);
      setSlides(slidesData);
      
    } catch (error) {
      console.error('❌ Error fetching slides:', error);
      showToast('Failed to load slides', 'error');
      setSlides([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlides();
  }, []);

  const handleCreateSlide = async (_, formData) => {
    try {
      console.log('📤 Creating slide...');
      const response = await createSlide(formData);
      console.log('✅ Slide created:', response);
      
      showToast('Slide created successfully!');
      setShowForm(false);
      fetchSlides();
    } catch (error) {
      console.error('❌ Create error:', error);
      showToast(error.message || 'Failed to create slide', 'error');
    }
  };

  const handleUpdateSlide = async (id, formData) => {
    try {
      console.log('📤 Updating slide:', id);
      const response = await updateSlide(id, formData);
      console.log('✅ Slide updated:', response);
      
      showToast('Slide updated successfully!');
      setShowForm(false);
      setEditingSlide(null);
      fetchSlides();
    } catch (error) {
      console.error('❌ Update error:', error);
      showToast(error.message || 'Failed to update slide', 'error');
    }
  };

  const handleDeleteSlide = async (id) => {
    if (!window.confirm('Are you sure you want to delete this slide?')) {
      return;
    }

    try {
      await deleteSlide(id);
      showToast('Slide deleted successfully!');
      fetchSlides();
    } catch (error) {
      console.error('❌ Delete error:', error);
      showToast('Failed to delete slide', 'error');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      await toggleSlideStatus(id);
      showToast('Slide status updated!');
      fetchSlides();
    } catch (error) {
      console.error('❌ Toggle error:', error);
      showToast('Failed to update status', 'error');
    }
  };

  const handleEdit = (slide) => {
    setEditingSlide(slide);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSlide(null);
  };

  if (loading) {
    return (
      <AdminLayout>
        <LoadingSpinner text="Loading slides..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Hero Carousel Management</h1>
            <p className="text-gray-600 mt-2">Manage your website's hero section slides</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Total Slides</h3>
              <p className="text-3xl font-bold text-blue-600 mt-2">{safeSlides.length}</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Active Slides</h3>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {safeSlides.filter(slide => slide.isActive).length}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Inactive Slides</h3>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {safeSlides.filter(slide => !slide.isActive).length}
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow mb-6 p-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Slides List</h2>
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add New Slide
              </button>
            </div>
          </div>

          {/* Slides List */}
          {safeSlides.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No slides yet</h3>
              <p className="text-gray-500 mb-4">Get started by creating your first hero slide</p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Create First Slide
              </button>
            </div>
          ) : (
            <HeroSlideList
              slides={safeSlides}
              onEdit={handleEdit}
              onDelete={handleDeleteSlide}
              onToggleStatus={handleToggleStatus}
            />
          )}

          {/* Slide Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <HeroSlideForm
                  slide={editingSlide}
                  onSubmit={editingSlide ? handleUpdateSlide : handleCreateSlide}
                  onClose={handleFormClose}
                />
              </div>
            </div>
          )}

          {/* Toast Notification */}
          {toast.show && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ ...toast, show: false })}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default HeroCarouselManagement;