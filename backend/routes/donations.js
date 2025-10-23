// backend/routes/donations.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Import controllers
const {
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
} = require('../controllers/donationController');

// Import middleware
const { authenticate } = require('../middleware/auth');

// ==========================================
// FILE UPLOAD CONFIGURATION (Local Storage)
// ==========================================

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, '../uploads/receipts');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log('✅ Created uploads/receipts directory');
}

// Configure local storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir); // ✅ FIXED: Use uploadDir
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'receipt-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Configure multer upload
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only images (JPEG, JPG, PNG) and PDF files are allowed!'));
        }
    }
});

// ==========================================
// USER ROUTES
// ==========================================

router.post('/create', authenticate, createDonation);

router.get('/my-donations', authenticate, getMyDonations);

router.get('/stats', authenticate, getDonationStats);

router.get('/:donationId', authenticate, getDonation);

router.post('/upload-receipt/:donationId', authenticate, upload.single('receipt'), uploadReceipt);

router.patch('/:donationId', authenticate, updateDonation);

router.delete('/:donationId', authenticate, deleteDonation);

// ==========================================
// ADMIN ROUTES (For Future Admin Panel)
// ==========================================

// router.get('/admin/all', authenticate, isAdmin, getAllDonations);
// router.get('/admin/statistics', authenticate, isAdmin, getAdminStatistics);
// router.patch('/admin/verify/:donationId', authenticate, isAdmin, verifyDonation);

// ==========================================
// ERROR HANDLING MIDDLEWARE FOR MULTER
// ==========================================
router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                success: false,
                message: 'File size is too large. Maximum size is 5MB.'
            });
        }
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
    
    next();
});

console.log('✅ Donation routes initialized');

module.exports = router;