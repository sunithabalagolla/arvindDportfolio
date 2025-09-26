const nodemailer = require('nodemailer');

// Create email transporter configuration
const createTransporter = () => {
    // Gmail SMTP configuration
    const transporterConfig = {
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.EMAIL_PORT) || 587,
        secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS // App password, not regular password
        },
        tls: {
            rejectUnauthorized: false // For development only
        }
    };

    return nodemailer.createTransport(transporterConfig);
};

// Verify email configuration
const verifyEmailConfig = async () => {
    try {
        const transporter = createTransporter();
        await transporter.verify();
        
        console.log('✅ Email configuration verified successfully');
        console.log(`📧 Email Host: ${process.env.EMAIL_HOST}`);
        console.log(`📬 Email User: ${process.env.EMAIL_USER}`);
        console.log(`🔒 Email Security: ${process.env.EMAIL_SECURE === 'true' ? 'Secure (SSL)' : 'TLS'}`);
        
        return true;
    } catch (error) {
        console.error('❌ Email configuration verification failed:');
        console.error('Error:', error.message);
        console.error('Please check your EMAIL_* environment variables in .env file');
        
        // Don't exit process, just log the error
        return false;
    }
};

// Email templates
const emailTemplates = {
    // OTP Email Template
    otpEmail: (otpCode, purpose, expiryMinutes, firstName = '') => {
        const purposeText = {
            'signup': 'Account Registration',
            'login': 'Login Verification',
            'password-reset': 'Password Reset',
            'email-change': 'Email Change Verification'
        };

        const greeting = firstName ? `Hi ${firstName},` : 'Hello,';
        const purposeTitle = purposeText[purpose] || 'Verification';

        return {
            subject: `Your OTP for ${purposeTitle}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification</title>
                    <style>
                        body {
                            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                            line-height: 1.6;
                            color: #333;
                            max-width: 600px;
                            margin: 0 auto;
                            padding: 20px;
                            background-color: #f4f4f4;
                        }
                        .container {
                            background: white;
                            padding: 30px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0,0,0,0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 30px;
                        }
                        .logo {
                            font-size: 24px;
                            font-weight: bold;
                            color: #2c3e50;
                            margin-bottom: 10px;
                        }
                        .otp-code {
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            color: white;
                            font-size: 32px;
                            font-weight: bold;
                            text-align: center;
                            padding: 20px;
                            margin: 25px 0;
                            border-radius: 8px;
                            letter-spacing: 8px;
                            font-family: 'Courier New', monospace;
                        }
                        .warning {
                            background: #fff3cd;
                            border: 1px solid #ffeaa7;
                            color: #856404;
                            padding: 15px;
                            border-radius: 5px;
                            margin: 20px 0;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 30px;
                            font-size: 12px;
                            color: #666;
                            border-top: 1px solid #eee;
                            padding-top: 20px;
                        }
                        .purpose {
                            background: #e3f2fd;
                            padding: 15px;
                            border-radius: 5px;
                            margin: 15px 0;
                            border-left: 4px solid #2196f3;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <div class="logo">🔐 OTP Verification</div>
                            <h1>Verification Required</h1>
                        </div>

                        <p>${greeting}</p>
                        
                        <div class="purpose">
                            <strong>Purpose:</strong> ${purposeTitle}
                        </div>

                        <p>Please use the following One-Time Password (OTP) to complete your ${purpose === 'signup' ? 'registration' : purpose.replace('-', ' ')}:</p>

                        <div class="otp-code">${otpCode}</div>

                        <div class="warning">
                            <strong>⚠️ Important:</strong>
                            <ul>
                                <li>This OTP will expire in <strong>${expiryMinutes} minutes</strong></li>
                                <li>Do not share this code with anyone</li>
                                <li>If you didn't request this OTP, please ignore this email</li>
                                <li>For security reasons, this code can only be used once</li>
                            </ul>
                        </div>

                        <p>If you're having trouble, you can request a new OTP or contact our support team.</p>

                        <div class="footer">
                            <p>This is an automated message, please do not reply to this email.</p>
                            <p>&copy; ${new Date().getFullYear()} ${process.env.EMAIL_FROM_NAME || 'OTP Authentication System'}. All rights reserved.</p>
                            <p>Sent at: ${new Date().toLocaleString()}</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            text: `
${greeting}

Your OTP for ${purposeTitle}: ${otpCode}

This code will expire in ${expiryMinutes} minutes.
Please do not share this code with anyone.

If you didn't request this OTP, please ignore this email.

This is an automated message, please do not reply.
            `
        };
    },

    // Welcome Email Template (after successful signup)
    welcomeEmail: (firstName, email) => ({
        subject: 'Welcome! Your account has been created successfully',
        html: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Welcome</title>
                <style>
                    body {
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #f4f4f4;
                    }
                    .container {
                        background: white;
                        padding: 30px;
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    }
                    .success {
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        color: white;
                        text-align: center;
                        padding: 20px;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    .footer {
                        text-align: center;
                        margin-top: 30px;
                        font-size: 12px;
                        color: #666;
                        border-top: 1px solid #eee;
                        padding-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🎉 Welcome ${firstName}!</h1>
                    
                    <div class="success">
                        <h2>Account Created Successfully</h2>
                        <p>Your email has been verified</p>
                    </div>

                    <p>Thank you for joining us! Your account has been created and verified successfully.</p>
                    
                    <p><strong>Account Details:</strong></p>
                    <ul>
                        <li>Name: ${firstName}</li>
                        <li>Email: ${email}</li>
                        <li>Account Status: Verified ✅</li>
                        <li>Created: ${new Date().toLocaleString()}</li>
                    </ul>

                    <p>You can now access all features of your account. If you have any questions, feel free to contact our support team.</p>

                    <div class="footer">
                        <p>&copy; ${new Date().getFullYear()} ${process.env.EMAIL_FROM_NAME || 'Authentication System'}. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>
        `,
        text: `
Welcome ${firstName}!

Your account has been created and verified successfully.

Account Details:
- Name: ${firstName}
- Email: ${email}
- Status: Verified
- Created: ${new Date().toLocaleString()}

Thank you for joining us!
        `
    })
};

// Export email configuration and templates
module.exports = {
    createTransporter,
    verifyEmailConfig,
    emailTemplates
};

// This email configuration includes:
// ✅ Gmail SMTP setup with proper authentication
// ✅ Beautiful HTML email templates for OTP and welcome emails
// ✅ Email verification to check configuration
// ✅ Multiple email types (OTP, welcome, etc.)
// ✅ Professional styling with gradients and responsive design
// ✅ Security warnings and expiry information