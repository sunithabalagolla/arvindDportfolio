const cron = require('node-cron');
const EventNotification = require('../models/EventNotification');
const { sendNotificationEmail } = require('./sendEmail');

const startNotificationScheduler = () => {
    cron.schedule('0 * * * *', async () => {
        console.log('🔍 Checking for pending notifications...');
        try {
            const now = new Date();
            const pendingNotifications = await EventNotification.find({
                isSent: false,
                status: 'pending',
                reminderDate: { $lte: now }
            }).populate('event');
            
            console.log(`📨 Found ${pendingNotifications.length} notifications to send`);
            
            for (const notification of pendingNotifications) {
                try {
                    const event = notification.event;
                    await sendNotificationEmail({
                        to: notification.userEmail,
                        subject: `🔔 Reminder: ${event.title}`,
                        type: 'reminder',
                        data: {
                            userName: notification.userName,
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
                    
                    console.log(`✅ Notification sent to ${notification.userEmail}`);
                } catch (error) {
                    console.error(`❌ Failed:`, error);
                    notification.status = 'failed';
                    await notification.save();
                }
            }
        } catch (error) {
            console.error('❌ Scheduler error:', error);
        }
    });
    console.log('✅ Notification scheduler started');
};

module.exports = { startNotificationScheduler };