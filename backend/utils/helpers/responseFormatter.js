/**
 * Standardized API Response Formatter
 * Ensures consistent response structure across all endpoints
 */

/**
 * Success Response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code (200, 201, etc.)
 * @param {string} message - Success message
 * @param {Object} data - Response data
 */
const successResponse = (res, statusCode = 200, message = 'Success', data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString()
  });
};

/**
 * Error Response
 * @param {Response} res - Express response object
 * @param {number} statusCode - HTTP status code (400, 404, 500, etc.)
 * @param {string} message - Error message
 * @param {Object} error - Error details (optional, only in dev mode)
 */
const errorResponse = (res, statusCode = 500, message = 'Internal Server Error', error = null) => {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  };

  // Include error details only in development
  if (process.env.NODE_ENV === 'development' && error) {
    response.error = {
      details: error.message || error,
      stack: error.stack
    };
  }

  return res.status(statusCode).json(response);
};

/**
 * Created Response (for POST requests)
 */
const createdResponse = (res, message = 'Resource created successfully', data = null) => {
  return successResponse(res, 201, message, data);
};

/**
 * Not Found Response
 */
const notFoundResponse = (res, message = 'Resource not found') => {
  return errorResponse(res, 404, message);
};

/**
 * Validation Error Response
 */
const validationErrorResponse = (res, message = 'Validation failed', errors = []) => {
  return res.status(400).json({
    success: false,
    message,
    errors,
    timestamp: new Date().toISOString()
  });
};

/**
 * Unauthorized Response
 */
const unauthorizedResponse = (res, message = 'Unauthorized access') => {
  return errorResponse(res, 401, message);
};

/**
 * Forbidden Response
 */
const forbiddenResponse = (res, message = 'Access forbidden') => {
  return errorResponse(res, 403, message);
};

module.exports = {
  successResponse,
  errorResponse,
  createdResponse,
  notFoundResponse,
  validationErrorResponse,
  unauthorizedResponse,
  forbiddenResponse
};