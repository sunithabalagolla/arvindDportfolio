import React, { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI, otpAPI } from '../../utils/api';
import logo from '../../assets/logo/logo.png';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const email = location.state?.email || '';
    const fromForgotPassword = location.state?.fromForgotPassword || false;

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [timer, setTimer] = useState(600); // 10 minutes
    const [canResend, setCanResend] = useState(false);

    const inputRefs = useRef([]);

    // Redirect if no email
    useEffect(() => {
        if (!email) {
            navigate('/auth/forgot-password');
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

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // OTP handling functions
    const handleOTPChange = (index, value) => {
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').slice(0, 6);
        
        if (!/^\d+$/.test(pastedData)) return;

        const newOtp = pastedData.split('');
        while (newOtp.length < 6) newOtp.push('');
        
        setOtp(newOtp);
        setError('');
    };

    const handleResendOTP = async () => {
        setLoading(true);
        setError('');

        try {
            await otpAPI.resendOTP({
                email,
                purpose: 'password-reset'
            });

            setTimer(600);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (err) {
            setError(err || 'Failed to resend OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const otpCode = otp.join('');
        
        if (otpCode.length !== 6) {
            setError('Please enter complete 6-digit OTP');
            return;
        }

        if (!newPassword) {
            setError('Please enter new password');
            return;
        }

        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authAPI.resetPassword({
                email,
                otpCode,
                newPassword
            });

            if (response.success) {
                setSuccess(true);
                
                // Redirect to login after 2 seconds
                setTimeout(() => {
                    navigate('/auth/login', {
                        state: { message: 'Password reset successful! Please login with your new password.' }
                    });
                }, 2000);
            }
        } catch (err) {
            setError(err || 'Failed to reset password. Please try again.');
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Password Reset Successful!</h2>
                    <p className="text-gray-600 mb-4">Redirecting to login...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                </div>
            </div>
        );
    }

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

                {/* Reset Password Card */}
                <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/40">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                            Reset Password
                        </h1>
                        <p className="text-gray-600 text-sm md:text-base">
                            Enter the 6-digit code sent to
                        </p>
                        <p className="text-orange-600 font-semibold mt-1">{email}</p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-600 text-sm text-center">{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit}>
                        {/* OTP Input */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                VERIFICATION CODE
                            </label>
                            <div className="flex justify-center gap-2">
                                {otp.map((digit, index) => (
                                    <input
                                        key={index}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        type="text"
                                        inputMode="numeric"
                                        maxLength={1}
                                        value={digit}
                                        onChange={(e) => handleOTPChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(index, e)}
                                        onPaste={handlePaste}
                                        className="w-12 h-12 md:w-14 md:h-14 text-center text-xl font-bold
                                                 border-2 border-gray-300 rounded-lg
                                                 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 focus:outline-none
                                                 transition-all duration-200 bg-white/80"
                                        disabled={loading}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Timer */}
                        <div className="text-center mb-6">
                            <p className="text-gray-600 text-sm">
                                {timer > 0 ? (
                                    <>Code expires in <span className="font-semibold text-orange-600">{formatTime(timer)}</span></>
                                ) : (
                                    <span className="text-red-600 font-semibold">Code expired</span>
                                )}
                            </p>
                        </div>

                        {/* New Password */}
                        <div className="mb-4">
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                NEW PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="newPassword"
                                    value={newPassword}
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter new password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                                    transition-all duration-300 bg-white/80"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={loading}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                CONFIRM PASSWORD
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    value={confirmPassword}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Confirm new password"
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg 
                                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                                    transition-all duration-300 bg-white/80"
                                    required
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    disabled={loading}
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Reset Button */}
                        <button
                            type="submit"
                            disabled={loading || otp.join('').length !== 6}
                            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 
                            hover:from-orange-600 hover:to-orange-700
                            text-white font-semibold py-4 rounded-lg
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
                                    Resetting...
                                </span>
                            ) : (
                                'Reset Password'
                            )}
                        </button>

                        {/* Resend OTP */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-600 text-sm mb-2">
                                Didn't receive the code?
                            </p>
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={!canResend || loading}
                                className="text-orange-600 hover:text-orange-700 font-semibold text-sm
                                         disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                            >
                                Resend Code
                            </button>
                        </div>
                    </form>

                    {/* Back Link */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/auth/forgot-password')}
                            className="text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200"
                        >
                            ← Back to Forgot Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;