// backend/utils/scheduler.js

const cron = require('node-cron');
const Event = require('../models/Event');
const EventNotification = require('../models/EventNotification');
const { sendNotificationEmail } = require('./sendEmail');

/**
 * Complete Scheduler System
 * 
 * This file contains all automated tasks:
 * 1. Send event notifications
 * 2. Mark events as completed
 * 3. Archive old events
 * 4. Clean old notifications
 */

// ===== JOB 1: SEND EVENT NOTIFICATIONS =====
/**
 * Runs every hour at minute 0
 * Checks for pending notifications and sends emails
 */
const notificationJob = cron.schedule('0 * * * *', async () => {
    console.log('\n' + '='.repeat(50));
    console.log('🔍 [NOTIFICATION JOB] Starting...');
    console.log('Time:', new Date().toLocaleString());
    console.log('='.repeat(50));
    
    try {
        const now = new Date();
        
        // Find pending notifications that are due
        const pendingNotifications = await EventNotification.find({
            isSent: false,
            status: 'pending',
            reminderDate: { $lte: now }
        })
        .populate('event', 'title date time location')
        .populate('user', 'firstName email');
        
        console.log(`📨 Found ${pendingNotifications.length} notification(s) to send`);
        
        if (pendingNotifications.length === 0) {
            console.log('✅ No notifications to send at this time\n');
            return;
        }
        
        let sentCount = 0;
        let failedCount = 0;
        
        for (const notification of pendingNotifications) {
            try {
                const event = notification.event;
                const userName = notification.user?.firstName || notification.userName || 'User';
                
                console.log(`\n📧 Sending to: ${notification.userEmail}`);
                console.log(`   Event: ${event.title}`);
                console.log(`   User: ${userName}`);
                
                await sendNotificationEmail({
                    to: notification.userEmail,
                    subject: `🔔 Reminder: ${event.title}`,
                    type: 'reminder',
                    data: {
                        userName: userName,
                        eventTitle: event.title,
                        eventDate: event.date,
                        eventTime: event.time,
                        eventLocation: event.location
                    }
                });
                
                notification.isSent = true;
                notification.status = 'sent';
                notification.sentAt = new Date();
                await notification.save();
                
                sentCount++;
                console.log(`   ✅ Sent successfully`);
                
            } catch (error) {
                console.error(`   ❌ Failed to send to ${notification.userEmail}:`, error.message);
                notification.status = 'failed';
                await notification.save();
                failedCount++;
            }
        }
        
        console.log('\n' + '-'.repeat(50));
        console.log(`📊 Summary: ${sentCount} sent, ${failedCount} failed`);
        console.log('='.repeat(50) + '\n');
        
    } catch (error) {
        console.error('❌ [NOTIFICATION JOB] Error:', error);
    }
}, {
    scheduled: false // Don't start automatically, we'll start it manually
});

// ===== JOB 2: MARK EVENTS AS COMPLETED =====
/**
 * Runs daily at 2:00 AM
 * Marks events that have passed as "completed"
 */
const completeEventsJob = cron.schedule('0 2 * * *', async () => {
    console.log('\n' + '='.repeat(50));
    console.log('✅ [COMPLETE EVENTS JOB] Starting...');
    console.log('Time:', new Date().toLocaleString());
    console.log('='.repeat(50));
    
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        yesterday.setHours(23, 59, 59, 999);
        
        const result = await Event.updateMany(
            {
                date: { $lt: yesterday },
                status: 'published'
            },
            {
                $set: { status: 'completed' }
            }
        );
        
        console.log(`✅ Marked ${result.modifiedCount} event(s) as completed`);
        console.log('='.repeat(50) + '\n');
        
    } catch (error) {
        console.error('❌ [COMPLETE EVENTS JOB] Error:', error);
    }
}, {
    scheduled: false
});

// ===== JOB 3: ARCHIVE OLD EVENTS =====
/**
 * Runs monthly on the 1st at 3:00 AM
 * Archives events older than 6 months
 */
const archiveEventsJob = cron.schedule('0 3 1 * *', async () => {
    console.log('\n' + '='.repeat(50));
    console.log('📦 [ARCHIVE EVENTS JOB] Starting...');
    console.log('Time:', new Date().toLocaleString());
    console.log('='.repeat(50));
    
    try {
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
        
        const result = await Event.updateMany(
            {
                date: { $lt: sixMonthsAgo },
                status: 'completed',
                isArchived: false
            },
            {
                $set: {
                    isArchived: true,
                    archivedAt: new Date()
                }
            }
        );
        
        console.log(`📦 Archived ${result.modifiedCount} old event(s)`);
        console.log('='.repeat(50) + '\n');
        
    } catch (error) {
        console.error('❌ [ARCHIVE EVENTS JOB] Error:', error);
    }
}, {
    scheduled: false
});

// ===== JOB 4: CLEAN OLD NOTIFICATIONS =====
/**
 * Runs monthly on the 1st at 4:00 AM
 * Deletes sent notifications older than 3 months
 */
const cleanNotificationsJob = cron.schedule('0 4 1 * *', async () => {
    console.log('\n' + '='.repeat(50));
    console.log('🗑️  [CLEAN NOTIFICATIONS JOB] Starting...');
    console.log('Time:', new Date().toLocaleString());
    console.log('='.repeat(50));
    
    try {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
        
        const result = await EventNotification.deleteMany({
            isSent: true,
            sentAt: { $lt: threeMonthsAgo }
        });
        
        console.log(`🗑️  Deleted ${result.deletedCount} old notification(s)`);
        console.log('='.repeat(50) + '\n');
        
    } catch (error) {
        console.error('❌ [CLEAN NOTIFICATIONS JOB] Error:', error);
    }
}, {
    scheduled: false
});

// ===== START ALL JOBS =====
/**
 * Start all cron jobs
 * Call this function from your server.js
 */
const startScheduler = () => {
    console.log('\n' + '🚀'.repeat(25));
    console.log('🚀 STARTING AUTOMATED SCHEDULER SYSTEM 🚀');
    console.log('🚀'.repeat(25) + '\n');
    
    // Start all jobs
    notificationJob.start();
    completeEventsJob.start();
    archiveEventsJob.start();
    cleanNotificationsJob.start();
    
    console.log('✅ Job 1: Send Notifications     → Every hour');
    console.log('✅ Job 2: Complete Events        → Daily at 2:00 AM');
    console.log('✅ Job 3: Archive Old Events     → Monthly on 1st at 3:00 AM');
    console.log('✅ Job 4: Clean Notifications    → Monthly on 1st at 4:00 AM');
    
    console.log('\n' + '='.repeat(50));
    console.log('🎉 All scheduled jobs are now running!');
    console.log('='.repeat(50) + '\n');
};

// ===== STOP ALL JOBS =====
/**
 * Stop all cron jobs (for graceful shutdown)
 */
const stopScheduler = () => {
    console.log('\n🛑 Stopping all scheduled jobs...');
    
    notificationJob.stop();
    completeEventsJob.stop();
    archiveEventsJob.stop();
    cleanNotificationsJob.stop();
    
    console.log('✅ All scheduled jobs stopped\n');
};

// ===== MANUAL TRIGGERS (for testing) =====
/**
 * Manually trigger jobs for testing
 */
const manualTriggers = {
    async sendNotifications() {
        console.log('⚡ Manually triggering notification job...');
        await notificationJob._task();
    },
    
    async completeEvents() {
        console.log('⚡ Manually triggering complete events job...');
        await completeEventsJob._task();
    },
    
    async archiveEvents() {
        console.log('⚡ Manually triggering archive events job...');
        await archiveEventsJob._task();
    },
    
    async cleanNotifications() {
        console.log('⚡ Manually triggering clean notifications job...');
        await cleanNotificationsJob._task();
    }
};

// ===== GET JOB STATUS =====
/**
 * Get status of all jobs
 */
const getJobStatus = () => {
    return {
        notificationJob: {
            running: notificationJob.options.scheduled,
            schedule: 'Every hour at minute 0',
            nextRun: 'Every hour'
        },
        completeEventsJob: {
            running: completeEventsJob.options.scheduled,
            schedule: 'Daily at 2:00 AM',
            nextRun: 'Daily'
        },
        archiveEventsJob: {
            running: archiveEventsJob.options.scheduled,
            schedule: 'Monthly on 1st at 3:00 AM',
            nextRun: 'Monthly'
        },
        cleanNotificationsJob: {
            running: cleanNotificationsJob.options.scheduled,
            schedule: 'Monthly on 1st at 4:00 AM',
            nextRun: 'Monthly'
        }
    };
};

module.exports = {
    startScheduler,
    stopScheduler,
    manualTriggers,
    getJobStatus
};

// Cron Jobs (Automated Schedulers)
// What Will These Do?

// ✅ Auto-complete events - Mark past events as "completed" every day
// ✅ Auto-archive old events - Archive events older than 6 months
// ✅ Send notifications - Send email reminders (you already have this)
// ✅ Clean old notifications - Delete sent notifications after 3 months