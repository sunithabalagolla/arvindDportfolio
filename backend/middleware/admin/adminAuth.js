const jwt = require('jsonwebtoken');
const { errorResponse, forbiddenResponse, unauthorizedResponse } = require('../../utils/helpers/responseFormatter');

/**
 * Admin Authentication Middleware
 * Verifies that the authenticated user has admin privileges
 * Must be used AFTER the regular auth middleware
 */
const isAdmin = async (req, res, next) => {
  try {
    // Check if user is authenticated (should be set by auth.js middleware)
    if (!req.user) {
      return unauthorizedResponse(res, 'Authentication required. Please login first.');
    }

    // Check if user has admin role (case-insensitive)
    if (req.user.role?.toLowerCase() !== 'admin') {
      return forbiddenResponse(res, 'Access denied. Admin privileges required.');
    }

    // User is admin, proceed to next middleware/controller
    console.log(`✅ Admin access granted: ${req.user.email || req.user.id}`);
    next();
  } catch (error) {
    console.error('❌ Admin auth middleware error:', error);
    return errorResponse(res, 500, 'Error verifying admin status', error);
  }
};

/**
 * Combined Auth + Admin Check Middleware
 * Use this when you don't want to chain auth.js and adminAuth.js
 */
const adminAuthFull = async (req, res, next) => {
  try {
    // Get token from header (multiple header options)
    const token = req.header('Authorization')?.replace('Bearer ', '') || 
                  req.header('x-auth-token');

    if (!token) {
      return unauthorizedResponse(res, 'No authentication token provided');
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check if user has admin role (case-insensitive)
    if (decoded.role?.toLowerCase() !== 'admin') {
      return forbiddenResponse(res, 'Access denied. Admin privileges required.');
    }

    // Attach user to request
    req.user = decoded;
    
    console.log(`✅ Admin authenticated: ${req.user.email || req.user.id}`);
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return unauthorizedResponse(res, 'Invalid authentication token');
    }
    if (error.name === 'TokenExpiredError') {
      return unauthorizedResponse(res, 'Authentication token expired. Please login again.');
    }
    
    console.error('❌ Admin auth error:', error);
    return errorResponse(res, 500, 'Error during authentication', error);
  }
};

module.exports = { isAdmin, adminAuthFull };