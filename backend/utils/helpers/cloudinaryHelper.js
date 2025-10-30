const { cloudinary } = require('../../config/cloudinary');

/**
 * Upload image to Cloudinary
 * @param {Buffer} fileBuffer - Image file buffer from multer
 * @param {string} folder - Subfolder in Cloudinary (e.g., 'hero-slides')
 * @param {string} fileName - Optional custom filename
 * @returns {Promise<Object>} - Upload result with URL and public_id
 */
const uploadToCloudinary = async (fileBuffer, folder = 'hero-slides', fileName = null) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadOptions = {
        folder: `${process.env.CLOUDINARY_FOLDER}/${folder}`,
        resource_type: 'auto',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
        transformation: [
          { width: 1920, height: 1080, crop: 'limit' }, // Max dimensions
          { quality: 'auto:good' }, // Auto quality optimization
          { fetch_format: 'auto' } // Auto format (WebP when supported)
        ]
      };

      // Add custom filename if provided
      if (fileName) {
        uploadOptions.public_id = fileName;
      }

      // Upload from buffer using upload_stream
      const uploadStream = cloudinary.uploader.upload_stream(
        uploadOptions,
        (error, result) => {
          if (error) {
            console.error('❌ Cloudinary upload error:', error);
            reject(new Error('Failed to upload image to Cloudinary'));
          } else {
            console.log('✅ Image uploaded:', result.public_id);
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes
            });
          }
        }
      );

      // Write buffer to stream
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error('❌ Upload helper error:', error);
    throw error;
  }
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Cloudinary public_id of image
 * @returns {Promise<Object>} - Deletion result
 */
const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) {
      throw new Error('Public ID is required for deletion');
    }

    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log('✅ Image deleted:', publicId);
      return { success: true, message: 'Image deleted successfully' };
    } else {
      console.warn('⚠️ Image not found or already deleted:', publicId);
      return { success: false, message: 'Image not found' };
    }
  } catch (error) {
    console.error('❌ Cloudinary deletion error:', error);
    throw new Error('Failed to delete image from Cloudinary');
  }
};

/**
 * Delete multiple images from Cloudinary
 * @param {Array<string>} publicIds - Array of Cloudinary public_ids
 * @returns {Promise<Object>} - Deletion results
 */
const deleteMultipleFromCloudinary = async (publicIds) => {
  try {
    if (!publicIds || publicIds.length === 0) {
      throw new Error('No public IDs provided for deletion');
    }

    const result = await cloudinary.api.delete_resources(publicIds);
    
    console.log(`✅ Deleted ${Object.keys(result.deleted).length} images`);
    return { 
      success: true, 
      deleted: result.deleted,
      failed: result.deleted_counts 
    };
  } catch (error) {
    console.error('❌ Bulk deletion error:', error);
    throw new Error('Failed to delete images from Cloudinary');
  }
};

/**
 * Get image details from Cloudinary
 * @param {string} publicId - Cloudinary public_id
 * @returns {Promise<Object>} - Image details
 */
const getImageDetails = async (publicId) => {
  try {
    const result = await cloudinary.api.resource(publicId);
    return {
      url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      createdAt: result.created_at
    };
  } catch (error) {
    console.error('❌ Failed to get image details:', error);
    throw new Error('Image not found in Cloudinary');
  }
};

module.exports = {
  uploadToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
  getImageDetails
};