// backend/server.js
const express = require('express');
const cors = require('cors'); 
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const { startScheduler, stopScheduler } = require('./utils/scheduler');
const feedbackRoutes = require('./routes/feedback');
const { sanitizeInput } = require('./middleware/validation');


// admin HERO SLIDES IMPORTS
// ==============================================

const adminHeroRoutes = require('./routes/admin/heroSlide');
const publicHeroRoutes = require('./routes/public/heroSlides');


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB (ASYNC - so we need to wait for it)
connectDB().then(() => {
    // Start unified scheduler AFTER database is connected
    startScheduler();
    console.log('✅ All automated schedulers initialized');
}).catch(err => {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
});

// Security Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        error: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// CORS Configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize inputs
app.use(sanitizeInput);

// Request logging middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running successfully',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ===== API ROUTES =====

// Existing routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/otp', require('./routes/otp'));
app.use('/api/volunteer', require('./routes/volunteer'));
app.use('/api/feedback', feedbackRoutes);
app.use('/api/events', require('./routes/events'));

// NEW SHOP ROUTES
// Product routes (public access for browsing)
app.use('/api/products', require('./routes/products'));

// Cart routes (requires authentication)
app.use('/api/cart', require('./routes/cart'));

// Wishlist routes (requires authentication)
app.use('/api/wishlist', require('./routes/wishlist'));

// ADD THIS LINE FOR DONATIONS ↓↓↓
app.use('/api/donations', require('./routes/donations'));



// Admin hero slides routes (protected)
app.use('/api/admin/hero-slides', adminHeroRoutes);

// Public hero slides routes (frontend access)
app.use('/api/hero-slides', publicHeroRoutes);



const path = require('path');  

// Serve uploaded files (receipts)
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); //

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Global Error Handler (must be last)
app.use((err, req, res, next) => {
    console.error('❌ Error Stack:', err.stack);
    
    // Mongoose validation error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(e => e.message);
        return res.status(400).json({
            success: false,
            message: 'Validation error',
            errors: messages
        });
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(400).json({
            success: false,
            message: `${field} already exists`
        });
    }

    // JWT errors
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token expired'
        });
    }

    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`
🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode
📡 Port: ${PORT}
🌐 URL: http://localhost:${PORT}
📊 Health Check: http://localhost:${PORT}/api/health

API Endpoints:
  🔐 Auth: http://localhost:${PORT}/api/auth
    🖼️  Hero Slides: http://localhost:${PORT}/api/hero-slides
  👑 Admin Hero: http://localhost:${PORT}/api/admin/hero-slides
  🛍️  Products: http://localhost:${PORT}/api/products
  🛒 Cart: http://localhost:${PORT}/api/cart
  ❤️  Wishlist: http://localhost:${PORT}/api/wishlist
  📧 Feedback: http://localhost:${PORT}/api/feedback
  🎪 Events: http://localhost:${PORT}/api/events
  🤝 Volunteer: http://localhost:${PORT}/api/volunteer
  💰 Donations: http://localhost:${PORT}/api/donations

🤖 Automated Schedulers: Active
   ├─ 📧 Notifications: Every hour
   ├─ ✅ Complete Events: Daily at 2 AM
   ├─ 📦 Archive Events: Monthly
   └─ 🗑️  Clean Notifications: Monthly

⏰ Started at: ${new Date().toISOString()}
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\n🛑 SIGTERM received, shutting down gracefully...');
    stopScheduler();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n🛑 SIGINT received (Ctrl+C), shutting down gracefully...');
    stopScheduler();
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log('❌ Unhandled Promise Rejection:', err.message);
    stopScheduler();
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('❌ Uncaught Exception:', err.message);
    stopScheduler();
    process.exit(1);
});



module.exports = app;