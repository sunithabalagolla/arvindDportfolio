import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { otpAPI } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import logo from '../../assets/logo/logo.png';

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { loginAfterOTP } = useAuth();

    // Get email and purpose from navigation state
    const email = location.state?.email || '';
    const purpose = location.state?.purpose || 'signup';
    const firstName = location.state?.firstName || '';

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [timer, setTimer] = useState(600); // 10 minutes in seconds
    const [canResend, setCanResend] = useState(false);
    const [resending, setResending] = useState(false);

    const inputRefs = useRef([]);

    // Redirect if no email provided
    useEffect(() => {
        if (!email) {
            navigate('/auth/signup');
        }
    }, [email, navigate]);

    // Timer countdown
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    // Format timer display
    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Handle OTP input change
    const handleChange = (index, value) => {
        // Only allow numbers
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Handle backspace
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    // Handle paste
    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        while (newOtp.length < 6) newOtp.push('');
        
        setOtp(newOtp);
        setError('');
        
        // Focus last filled input
        const lastFilledIndex = pastedData.length - 1;
        if (lastFilledIndex < 5) {
            inputRefs.current[lastFilledIndex + 1]?.focus();
        }
    };

    // Handle OTP verification
    const handleVerify = async () => {
        const otpCode = otp.join('');
        
        if (otpCode.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await otpAPI.verifyOTP({
                email,
                otpCode,
                purpose
            });

            if (response.success) {
                setSuccess(response.message);
                
                // Login user with token
                const { user, token } = response.data;
                loginAfterOTP(user, token);

                // Navigate based on purpose
                setTimeout(() => {
                    if (purpose === 'signup') {
                        navigate('/', { replace: true });
                    } else if (purpose === 'login') {
                        navigate('/', { replace: true });
                    }
                }, 1500);
            }
        } catch (err) {
            setError(err || 'Invalid OTP. Please try again.');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    // Handle resend OTP
    const handleResend = async () => {
        setResending(true);
        setError('');
        setSuccess('');

        try {
            const response = await otpAPI.resendOTP({
                email,
                purpose
            });

            if (response.success) {
                setSuccess('New OTP sent to your email!');
                setTimer(600); // Reset timer
                setCanResend(false);
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (err) {
            setError(err || 'Failed to resend OTP. Please try again.');
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-green-50">
            {/* Background Decorations */}
            <div className="absolute inset-0">
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-400/30 rounded-full blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-8">
                {/* Logo */}
                <div className="mb-8">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
                    />
                </div>

                {/* OTP Card */}
                <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/40">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Verify Your Email
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            We've sent a 6-digit code to
                        </p>
                        <p className="text-orange-600 font-semibold mt-1">{email}</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-green-600 text-sm text-center">{success}</p>
                        </div>
                    )}

                    {/* OTP Input */}
                    <div className="mb-8">
                        <div className="flex justify-center gap-2 md:gap-3">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="w-12 h-12 md:w-14 md:h-14 text-center text-xl md:text-2xl font-bold
                                             border-2 border-gray-300 rounded-lg
                                             focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none
                                             transition-all duration-200
                                             bg-white/80 backdrop-blur-sm"
                                    disabled={loading}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Timer */}
                    <div className="text-center mb-6">
                        <p className="text-gray-600 text-sm">
                            {timer > 0 ? (
                                <>
                                    Code expires in{' '}
                                    <span className="font-semibold text-orange-600">
                                        {formatTime(timer)}
                                    </span>
                                </>
                            ) : (
                                <span className="text-red-600 font-semibold">Code expired</span>
                            )}
                        </p>
                    </div>

                    {/* Verify Button */}
                    <button
                        onClick={handleVerify}
                        disabled={loading || otp.join('').length !== 6}
                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700
                                 text-white font-semibold py-3 md:py-4 rounded-lg
                                 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                                 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                                 focus:ring-4 focus:ring-orange-300"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            'Verify OTP'
                        )}
                    </button>

                    {/* Resend OTP */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-600 text-sm mb-2">
                            Didn't receive the code?
                        </p>
                        <button
                            onClick={handleResend}
                            disabled={!canResend || resending}
                            className="text-orange-600 hover:text-orange-700 font-semibold text-sm
                                     disabled:opacity-50 disabled:cursor-not-allowed
                                     transition-colors duration-200"
                        >
                            {resending ? 'Sending...' : 'Resend OTP'}
                        </button>
                    </div>

                    {/* Back Link */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
                        >
                            ← Back to {purpose === 'signup' ? 'Signup' : 'Login'}
                        </button>
                    </div>
                </div>

                {/* Footer Text */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>
                        By verifying, you agree to our{' '}
                        <a href="/terms" className="text-orange-600 hover:text-orange-700 underline">
                            Terms of Service
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;