// components/admin/heroSlide/HeroSlidePreview.jsx
import React from 'react';

const HeroSlidePreview = ({ slide, onClose }) => {
  if (!slide) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Slide Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Preview Content */}
        <div className="p-6">
          {/* Image Preview */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Image Preview</h3>
            <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={slide.imageUrl}
                alt={slide.heading}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Content Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Heading</label>
                  <p className="mt-1 text-lg font-bold text-gray-900">{slide.heading}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitles</label>
                  <p className="mt-1 text-gray-600">{slide.subtitle || 'No subtitle'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-gray-600">{slide.paragraph}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Button & Status</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Text</label>
                  <p className="mt-1 text-gray-900">{slide.buttonText || 'Know More'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Button Link</label>
                  <p className="mt-1 text-blue-600 break-all">{slide.buttonLink || '#'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Status</label>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${
                      slide.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {slide.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Created</label>
                  <p className="mt-1 text-gray-600">
                    {new Date(slide.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSlidePreview;