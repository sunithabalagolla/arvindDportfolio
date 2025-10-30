const cloudinary = require('cloudinary').v2;
require('dotenv').config();

/**
 * Cloudinary Configuration
 * Professional setup for image management
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true // Force HTTPS for security
});

/**
 * Test Cloudinary Connection
 * Verifies credentials and connectivity
 */
const testCloudinaryConnection = async () => {
  try {
    await cloudinary.api.ping();
    console.log('✅ Cloudinary: Connection successful');
    console.log(`📁 Base Folder: ${process.env.CLOUDINARY_FOLDER || 'Not set'}`);
    return { success: true, message: 'Cloudinary connected successfully' };
  } catch (error) {
    console.error('❌ Cloudinary: Connection failed -', error.message);
    return { 
      success: false, 
      error: 'Cloudinary configuration error - check environment variables' 
    };
  }
};

/**
 * Get Cloudinary Configuration Info (for debugging)
 */
const getCloudinaryConfig = () => {
  return {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ? '***' + process.env.CLOUDINARY_API_KEY.slice(-4) : 'Not set',
    folder: process.env.CLOUDINARY_FOLDER || 'Not set',
    secure: true
  };
};

// Export for use in other files
module.exports = {
  cloudinary,
  testCloudinaryConnection,
  getCloudinaryConfig
};