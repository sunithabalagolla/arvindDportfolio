// components/admin/heroSlide/HeroSlideForm.jsx
import React, { useState, useEffect } from 'react';
import ImageUpload from '../common/ImageUpload';

const HeroSlideForm = ({ slide, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    heading: '',
    subtitle: '',
    paragraph: '',
    buttonText: 'Know More',
    buttonLink: '#',
    isActive: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (slide) {
      setFormData({
        heading: slide.heading || '',
        subtitle: slide.subtitle || '',
        paragraph: slide.paragraph || '',
        buttonText: slide.buttonText || 'Know More',
        buttonLink: slide.buttonLink || '#',
        isActive: slide.isActive !== undefined ? slide.isActive : true
      });
    }
  }, [slide]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageSelect = (file) => {
    setImageFile(file);
    setError(''); // Clear error when image is selected
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Validate image for new slides
      if (!slide && !imageFile) {
        setError('Please select an image');
        setLoading(false);
        return;
      }

      // Create FormData
      const submitData = new FormData();
      
      // Append all form fields - USE ACTUAL FORM DATA, NOT TEST VALUES!
      submitData.append('heading', formData.heading);
      submitData.append('paragraph', formData.paragraph);
      submitData.append('buttonText', formData.buttonText);
      submitData.append('buttonLink', formData.buttonLink);
      submitData.append('isActive', formData.isActive);
      
      // Add subtitle if provided
      if (formData.subtitle) {
        submitData.append('subtitle', formData.subtitle);
      }
      
      // Add image if selected
      if (imageFile) {
        submitData.append('image', imageFile);
        console.log('✅ Image added:', imageFile.name, imageFile.size, 'bytes');
      }

      // Debug: Log FormData contents
      console.log('📦 Submitting FormData:');
      for (let [key, value] of submitData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}:`, value.name, `(${value.size} bytes)`);
        } else {
          console.log(`  ${key}:`, value);
        }
      }

      // Call parent submit handler
      await onSubmit(slide?._id, submitData);
      
    } catch (error) {
      console.error('Submit error:', error);
      setError(error.message || 'Failed to submit form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          {slide ? 'Edit Slide' : 'Create New Slide'}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Slide Image {!slide && <span className="text-red-500">*</span>}
          </label>
          <ImageUpload
            onImageSelect={handleImageSelect}
            currentImage={slide?.imageUrl}
          />
          <p className="text-xs text-gray-500 mt-1">
            Recommended size: 1920x1080px. Max 5MB.
          </p>
        </div>

        {/* Heading */}
        <div>
          <label htmlFor="heading" className="block text-sm font-medium text-gray-700 mb-2">
            Heading <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="heading"
            name="heading"
            value={formData.heading}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter main heading"
          />
        </div>

        {/* Subtitle */}
        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
            Subtitle
          </label>
          <input
            type="text"
            id="subtitle"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter subtitle (optional)"
          />
        </div>

        {/* Paragraph */}
        <div>
          <label htmlFor="paragraph" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="paragraph"
            name="paragraph"
            value={formData.paragraph}
            onChange={handleInputChange}
            required
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter slide description"
          />
        </div>

        {/* Button Text */}
        <div>
          <label htmlFor="buttonText" className="block text-sm font-medium text-gray-700 mb-2">
            Button Text
          </label>
          <input
            type="text"
            id="buttonText"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Button text"
          />
        </div>

        {/* Button Link */}
        <div>
          <label htmlFor="buttonLink" className="block text-sm font-medium text-gray-700 mb-2">
            Button Link
          </label>
          <input
            type="text"
            id="buttonLink"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="https://example.com or #"
          />
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
            Active Slide (visible in carousel)
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              slide ? 'Update Slide' : 'Create Slide'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HeroSlideForm;