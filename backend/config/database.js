const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Modern MongoDB connection options (removed deprecated options)
        const options = {
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferCommands: false, // Disable mongoose buffering
            // Removed deprecated options:
            // - bufferMaxEntries (not supported in current MongoDB driver)
            // - useNewUrlParser (deprecated, now default)
            // - useUnifiedTopology (deprecated, now default)
        };
        
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        
        console.log(`
✅ MongoDB Connected Successfully!
🏠 Host: ${conn.connection.host}
📊 Database: ${conn.connection.name}
🔌 Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}
🌍 Node Environment: ${process.env.NODE_ENV || 'development'}
⏰ Connected At: ${new Date().toISOString()}
----------------------------------------`);
        
        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('🔗 Mongoose connected to MongoDB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('❌ MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('🔌 Mongoose disconnected from MongoDB');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('🔄 Mongoose reconnected to MongoDB');
        });
        
        // Handle MongoDB connection warnings
        mongoose.connection.on('warning', (warning) => {
            console.warn('⚠️ MongoDB Warning:', warning);
        });
        
    } catch (error) {
        console.error('❌ Database Connection Failed!');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        console.error('💡 Check your MONGODB_URI in .env file');
        process.exit(1);
    }
};

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    
    try {
        await mongoose.connection.close();
        console.log('✅ MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('❌ Error closing MongoDB connection:', err);
        process.exit(1);
    }
};

// Handle different termination signals
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGUSR2', () => gracefulShutdown('SIGUSR2')); // For nodemon restarts

// Handle uncaught exceptions related to database
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    // Close server & exit process
    gracefulShutdown('UNHANDLED_REJECTION');
});

module.exports = connectDB;