const { createTransporter, emailTemplates } = require('../config/email');

/**
 * Send email using configured transporter
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content
 * @param {string} options.from - Sender email (optional)
 * @returns {Promise<Object>} Email send result
 */
const sendEmail = async (options) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: options.from || `${process.env.EMAIL_FROM_NAME || 'OTP System'} <${process.env.EMAIL_USER}>`,
            to: options.to,
            subject: options.subject,
            html: options.html,
            text: options.text,
            // Add some additional headers for better deliverability
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
                'Importance': 'high'
            }
        };

        console.log(`📧 Sending email to: ${options.to}`);
        console.log(`📝 Subject: ${options.subject}`);
        
        const result = await transporter.sendMail(mailOptions);
        
        console.log(`✅ Email sent successfully to ${options.to}`);
        console.log(`📮 Message ID: ${result.messageId}`);
        
        return {
            success: true,
            messageId: result.messageId,
            response: result.response,
            envelope: result.envelope
        };
        
    } catch (error) {
        console.error('❌ Email sending failed:');
        console.error('Error:', error.message);
        console.error('Recipient:', options.to);
        console.error('Subject:', options.subject);
        
        // Log specific error types
        if (error.code === 'EAUTH') {
            console.error('🔐 Authentication failed - Check EMAIL_USER and EMAIL_PASS in .env file');
        } else if (error.code === 'EENVELOPE') {
            console.error('📬 Invalid email address format');
        } else if (error.code === 'ECONNECTION') {
            console.error('🌐 Connection failed - Check EMAIL_HOST and EMAIL_PORT in .env file');
        }
        
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

/**
 * Send OTP email to user
 * @param {string} email - Recipient email
 * @param {string} otpCode - OTP code
 * @param {string} purpose - Purpose of OTP (signup, login, etc.)
 * @param {string} firstName - User's first name (optional)
 * @returns {Promise<Object>} Email send result
 */
const sendOTPEmail = async (email, otpCode, purpose = 'signup', firstName = '') => {
    try {
        const expiryMinutes = parseInt(process.env.OTP_EXPIRES_IN) || 10;
        const template = emailTemplates.otpEmail(otpCode, purpose, expiryMinutes, firstName);
        
        const result = await sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
            text: template.text
        });
        
        console.log(`🔢 OTP email sent for ${purpose} to ${email}`);
        
        return result;
        
    } catch (error) {
        console.error(`❌ Failed to send OTP email for ${purpose} to ${email}:`, error.message);
        throw error;
    }
};

/**
 * Send welcome email after successful registration
 * @param {string} email - Recipient email
 * @param {string} firstName - User's first name
 * @returns {Promise<Object>} Email send result
 */
const sendWelcomeEmail = async (email, firstName) => {
    try {
        const template = emailTemplates.welcomeEmail(firstName, email);
        
        const result = await sendEmail({
            to: email,
            subject: template.subject,
            html: template.html,
            text: template.text
        });
        
        console.log(`🎉 Welcome email sent to ${email}`);
        
        return result;
        
    } catch (error) {
        console.error(`❌ Failed to send welcome email to ${email}:`, error.message);
        throw error;
    }
};

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} otpCode - Password reset OTP
 * @param {string} firstName - User's first name
 * @returns {Promise<Object>} Email send result
 */
const sendPasswordResetEmail = async (email, otpCode, firstName = '') => {
    try {
        const result = await sendOTPEmail(email, otpCode, 'password-reset', firstName);
        
        console.log(`🔒 Password reset email sent to ${email}`);
        
        return result;
        
    } catch (error) {
        console.error(`❌ Failed to send password reset email to ${email}:`, error.message);
        throw error;
    }
};

/**
 * Send login verification email
 * @param {string} email - Recipient email
 * @param {string} otpCode - Login OTP
 * @param {string} firstName - User's first name
 * @returns {Promise<Object>} Email send result
 */
const sendLoginOTPEmail = async (email, otpCode, firstName = '') => {
    try {
        const result = await sendOTPEmail(email, otpCode, 'login', firstName);
        
        console.log(`🔐 Login OTP email sent to ${email}`);
        
        return result;
        
    } catch (error) {
        console.error(`❌ Failed to send login OTP email to ${email}:`, error.message);
        throw error;
    }
};

/**
 * Send bulk emails (for newsletters, announcements, etc.)
 * @param {Array} recipients - Array of email addresses
 * @param {string} subject - Email subject
 * @param {string} html - HTML content
 * @param {string} text - Plain text content
 * @returns {Promise<Array>} Array of send results
 */
const sendBulkEmails = async (recipients, subject, html, text) => {
    const results = [];
    const batchSize = 10; // Send in batches to avoid rate limiting
    
    try {
        console.log(`📬 Sending bulk emails to ${recipients.length} recipients`);
        
        for (let i = 0; i < recipients.length; i += batchSize) {
            const batch = recipients.slice(i, i + batchSize);
            const batchPromises = batch.map(email => 
                sendEmail({ to: email, subject, html, text })
                    .catch(error => {
                        console.error(`Failed to send to ${email}:`, error.message);
                        return { success: false, email, error: error.message };
                    })
            );
            
            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);
            
            // Add delay between batches to avoid rate limiting
            if (i + batchSize < recipients.length) {
                await new Promise(resolve => setTimeout(resolve, 1000)); // 1 second delay
            }
        }
        
        const successCount = results.filter(r => r.success).length;
        const failCount = results.length - successCount;
        
        console.log(`✅ Bulk email completed: ${successCount} sent, ${failCount} failed`);
        
        return {
            total: recipients.length,
            successful: successCount,
            failed: failCount,
            results
        };
        
    } catch (error) {
        console.error('❌ Bulk email sending failed:', error.message);
        throw error;
    }
};

/**
 * Test email configuration by sending a test email
 * @param {string} testEmail - Test recipient email
 * @returns {Promise<Object>} Test result
 */
const testEmailConfig = async (testEmail = process.env.EMAIL_USER) => {
    try {
        console.log('Testing email configuration...');
        
        const testResult = await sendEmail({
            to: testEmail,
            subject: 'Test Email - Configuration Check',
            html: `
                <h2>Email Configuration Test</h2>
                <p>If you receive this email, your email configuration is working correctly!</p>
                <p><strong>Test Details:</strong></p>
                <ul>
                    <li>Time: ${new Date().toISOString()}</li>
                    <li>Host: ${process.env.EMAIL_HOST}</li>
                    <li>Port: ${process.env.EMAIL_PORT}</li>
                    <li>User: ${process.env.EMAIL_USER}</li>
                </ul>
                <p>🎉 Your email service is ready to use!</p>
            `,
            text: `
Email Configuration Test

If you receive this email, your configuration is working correctly!

Test Time: ${new Date().toISOString()}
Host: ${process.env.EMAIL_HOST}
Port: ${process.env.EMAIL_PORT}
User: ${process.env.EMAIL_USER}

Your email service is ready to use!
            `
        });
        
        console.log('✅ Email configuration test passed!');
        
        return {
            success: true,
            message: 'Email configuration is working correctly',
            testEmail,
            messageId: testResult.messageId
        };
        
    } catch (error) {
        console.error('❌ Email configuration test failed:', error.message);
        
        return {
            success: false,
            message: 'Email configuration test failed',
            error: error.message,
            testEmail
        };
    }
};

/**
 * Format email address with name
 * @param {string} email - Email address
 * @param {string} name - Display name
 * @returns {string} Formatted email address
 */
const formatEmailAddress = (email, name = '') => {
    if (name) {
        return `${name} <${email}>`;
    }
    return email;
};

/**
 * Validate email address format
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

/**
 * Get email sending statistics (for monitoring)
 * @returns {Object} Email statistics
 */
const getEmailStats = () => {
    // This would typically connect to a database or cache
    // For now, returning basic info
    return {
        configured: !!(process.env.EMAIL_USER && process.env.EMAIL_PASS),
        host: process.env.EMAIL_HOST || 'Not configured',
        user: process.env.EMAIL_USER || 'Not configured',
        lastTest: new Date().toISOString()
    };
};

module.exports = {
    sendEmail,
    sendOTPEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    sendLoginOTPEmail,
    sendBulkEmails,
    testEmailConfig,
    formatEmailAddress,
    isValidEmail,
    getEmailStats
};

// This email utility includes:
// ✅ Multiple email types (OTP, welcome, password reset, login)
// ✅ Bulk email support with rate limiting
// ✅ Error handling with detailed logging
// ✅ Email validation and formatting
// ✅ Test functionality to verify configuration
// ✅ Professional templates with HTML and text versions
// ✅ Batch processing to avoid spam filters