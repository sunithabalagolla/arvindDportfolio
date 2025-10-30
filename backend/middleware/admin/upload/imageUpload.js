const multer = require('multer');
const { errorResponse, validationErrorResponse } = require('../../../utils/helpers/responseFormatter');

/**
 * Multer Configuration for Image Upload
 * Uses memory storage (files stored in RAM as Buffer)
 * Better for direct Cloudinary upload
 */

// Configure memory storage
const storage = multer.memoryStorage();

// File filter - only allow images
const fileFilter = (req, file, cb) => {
  // Allowed image types
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true); // Accept file
  } else {
    cb(
      new Error(
        `Invalid file type: ${file.mimetype}. Only JPG, PNG, WebP, and GIF are allowed.`
      ),
      false
    );
  }
};

// Multer instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 1 // Maximum 1 file per request
  }
});

/**
 * Single Image Upload Middleware
 * Use: upload.single('image')
 * File will be available as req.file
 */
const uploadSingleImage = upload.single('image');

/**
 * Multiple Images Upload Middleware
 * Use: upload.array('images', 5)
 * Files will be available as req.files array
 */
const uploadMultipleImages = upload.array('images', 10); // Max 10 images

/**
 * Error Handler for Multer Errors
 * Catches upload errors and formats them properly
 */
const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    if (err.code === 'LIMIT_FILE_SIZE') {
      return validationErrorResponse(
        res,
        'File too large. Maximum size is 5MB.',
        [{ field: 'image', message: 'File exceeds 5MB limit' }]
      );
    }
    
    if (err.code === 'LIMIT_FILE_COUNT') {
      return validationErrorResponse(
        res,
        'Too many files. Maximum is 10 files.',
        [{ field: 'images', message: 'Too many files uploaded' }]
      );
    }

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return validationErrorResponse(
        res,
        'Unexpected field name in upload.',
        [{ field: 'image', message: 'Invalid field name' }]
      );
    }

    return validationErrorResponse(res, err.message, [{ field: 'upload', message: err.message }]);
  }

  if (err) {
    // Custom file filter error
    return validationErrorResponse(
      res,
      err.message || 'File upload failed',
      [{ field: 'image', message: err.message }]
    );
  }

  next();
};

/**
 * Validate Image Upload
 * Checks if file exists in request after multer processing
 */
const validateImageUpload = (req, res, next) => {
  if (!req.file && !req.files) {
    return validationErrorResponse(
      res,
      'Image file is required',
      [{ field: 'image', message: 'No image file provided' }]
    );
  }

  // Log upload info
  if (req.file) {
    console.log(`📤 File uploaded: ${req.file.originalname} (${(req.file.size / 1024).toFixed(2)} KB)`);
  }
  
  if (req.files && req.files.length > 0) {
    console.log(`📤 ${req.files.length} files uploaded`);
  }

  next();
};

module.exports = {
  uploadSingleImage,
  uploadMultipleImages,
  handleUploadError,
  validateImageUpload
};