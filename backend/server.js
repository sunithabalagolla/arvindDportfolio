const express = require('express');
const cors = require('cors'); 
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const eventRoutes = require('./routes/events');
const { startNotificationScheduler } = require('./utils/notificationScheduler');
const feedbackRoutes = require('./routes/feedback');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to MongoDB (ASYNC - so we need to wait for it)
connectDB().then(() => {
    // ✅ Start scheduler AFTER database is connected
    startNotificationScheduler();
    console.log('✅ Event notification scheduler initialized');
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

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server is running successfully',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/otp', require('./routes/otp'));
app.use('/api/volunteer', require('./routes/volunteer'));
app.use('/api', eventRoutes); // ✅ Event routes
app.use('/api/feedback', feedbackRoutes);


// Global Error Handler
app.use((err, req, res, next) => {
    console.error('Error Stack:', err.stack);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
🚀 Server is running in ${process.env.NODE_ENV || 'development'} mode
📡 Port: ${PORT}
🌐 URL: http://localhost:${PORT}
📊 Health Check: http://localhost:${PORT}/api/health
📅 Event Notification Scheduler: Active
⏰ Started at: ${new Date().toISOString()}
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log('Unhandled Promise Rejection:', err.message);
    process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception:', err.message);
    process.exit(1);
});