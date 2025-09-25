const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // MongoDB connection options
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
            bufferMaxEntries: 0, // Disable mongoose buffering
            bufferCommands: false, // Disable mongoose buffering
        };
        
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);
        
        console.log('MongoDB Connected Successfully!');
        console.log(`Host: ${conn.connection.host}`);
        console.log(`Database: ${conn.connection.name}`);
        console.log(`Connection State: ${conn.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
        console.log(`Node Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`Connected At: ${new Date().toISOString()}`);
        console.log('----------------------------------------');
        
        // Connection event listeners
        mongoose.connection.on('connected', () => {
            console.log('Mongoose connected to MongoDB');
        });
        
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose disconnected from MongoDB');
        });
        
        mongoose.connection.on('reconnected', () => {
            console.log('Mongoose reconnected to MongoDB');
        });
        
        // Handle MongoDB connection warnings
        mongoose.connection.on('warning', (warning) => {
            console.warn('MongoDB Warning:', warning);
        });
        
    } catch (error) {
        console.error('Database Connection Failed!');
        console.error('Error:', error.message);
        console.error('Stack:', error.stack);
        console.error('Check your MONGODB_URI in .env file');
        process.exit(1);
    }
};

// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
    console.log(`\n${signal} received. Shutting down gracefully...`);
    
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed through app termination');
        process.exit(0);
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
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


// Ensures that when the app is stopping, all MongoDB connections are closed properly.

// Prevents data corruption or leaving open connections.
// Nodemon sends SIGUSR2 when restarting the app automatically.

// Allows MongoDB to close connections before restart, preventing issues.
// Triggered when the OS or hosting service stops your process.

// Ensures MongoDB disconnects cleanly.
// Nodemon sends SIGUSR2 when restarting the app automatically.

// Allows MongoDB to close connections before restart, preventing issues.
// Captures errors from unhandled promises (like DB errors).

// Logs the error and shuts down the app gracefully to prevent crashes or stuck connections.
// Makes the function usable in other files, like server.js.

// Keeps your database connection code modular and organized.