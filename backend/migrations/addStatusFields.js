// backend/migrations/addStatusFields.js

const mongoose = require('mongoose');
const Event = require('../models/Event');
require('dotenv').config();

/**
 * Migration Script: Add status fields to existing events
 * 
 * This script:
 * 1. Connects to MongoDB
 * 2. Finds all events without status fields
 * 3. Adds status, isArchived, and archivedAt fields based on event date
 * 4. Updates all events in the database
 * 
 * Run this ONCE after updating the Event model
 */

const migrateEvents = async () => {
    try {
        console.log('🚀 Starting Event Migration...\n');
        
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB\n');
        
        // Get current date for comparison
        const now = new Date();
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        // Find all events
        const allEvents = await Event.find({});
        console.log(`📊 Found ${allEvents.length} total events in database\n`);
        
        if (allEvents.length === 0) {
            console.log('⚠️  No events found in database. Run seed script first!');
            process.exit(0);
        }
        
        // Counters for statistics
        let updatedCount = 0;
        let skippedCount = 0;
        let upcomingCount = 0;
        let completedCount = 0;
        let archivedCount = 0;
        
        // Process each event
        for (const event of allEvents) {
            // Skip if already has status field (already migrated)
            if (event.status) {
                console.log(`⏭️  Skipped: ${event.title} (already has status)`);
                skippedCount++;
                continue;
            }
            
            // Determine status based on event date
            let status;
            let isArchived = false;
            let archivedAt = null;
            
            if (event.date >= now) {
                // Future event → published
                status = 'published';
                upcomingCount++;
                console.log(`📅 ${event.title} → PUBLISHED (Future event)`);
            } else if (event.date < sixMonthsAgo) {
                // Very old event → completed + archived
                status = 'completed';
                isArchived = true;
                archivedAt = new Date();
                archivedCount++;
                console.log(`📦 ${event.title} → COMPLETED & ARCHIVED (6+ months old)`);
            } else {
                // Past event (< 6 months) → completed
                status = 'completed';
                completedCount++;
                console.log(`✅ ${event.title} → COMPLETED (Past event)`);
            }
            
            // Update the event
            event.status = status;
            event.isArchived = isArchived;
            event.archivedAt = archivedAt;
            
            await event.save();
            updatedCount++;
        }
        
        // Print summary
        console.log('\n' + '='.repeat(50));
        console.log('📊 MIGRATION SUMMARY');
        console.log('='.repeat(50));
        console.log(`Total Events:        ${allEvents.length}`);
        console.log(`Updated:             ${updatedCount}`);
        console.log(`Skipped:             ${skippedCount}`);
        console.log('\nBreakdown:');
        console.log(`  📅 Published:      ${upcomingCount}`);
        console.log(`  ✅ Completed:      ${completedCount}`);
        console.log(`  📦 Archived:       ${archivedCount}`);
        console.log('='.repeat(50));
        console.log('\n✅ Migration completed successfully!\n');
        
        // Close connection
        await mongoose.connection.close();
        console.log('🔌 MongoDB connection closed');
        
        process.exit(0);
        
    } catch (error) {
        console.error('\n❌ Migration failed:');
        console.error(error);
        
        await mongoose.connection.close();
        process.exit(1);
    }
};

// Run the migration
migrateEvents();

// What is a Migration Script?
// A migration script is a one-time script that updates your existing database records to match your new schema.
// Find all events in your database
// Add the new fields (status, isArchived, archivedAt)
// Smart logic:

// If event date is in the future → status = "published"
// If event date is in the past → status = "completed"
// If event is very old (6+ months) → isArchived = true


// Update all events in one go