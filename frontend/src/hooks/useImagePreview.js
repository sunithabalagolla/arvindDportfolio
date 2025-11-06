// hooks/useImagePreview.js
import { useState, useCallback } from 'react';

const useImagePreview = () => {
  const [preview, setPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const handleImageSelect = useCallback((file) => {
    if (file && file.type.startsWith('image/')) {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // Store file
      setImageFile(file);
    }
  }, []);

  const clearPreview = useCallback(() => {
    setPreview(null);
    setImageFile(null);
  }, []);

  const setExistingImage = useCallback((imageUrl) => {
    setPreview(imageUrl);
    setImageFile(null); // No file for existing images
  }, []);

  return {
    preview,
    imageFile,
    handleImageSelect,
    clearPreview,
    setExistingImage
  };
};

export default useImagePreview;