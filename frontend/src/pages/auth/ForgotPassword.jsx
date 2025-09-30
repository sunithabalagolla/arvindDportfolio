import React, { useState } from 'react';
import { Mail, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../utils/api';
import logo from '../../assets/logo/logo.png';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await authAPI.forgotPassword(email);

            if (response.success) {
                // Navigate to reset password page with email
                navigate('/auth/reset-password', {
                    state: {
                        email: email,
                        fromForgotPassword: true
                    }
                });
            }
        } catch (err) {
            setError(err || 'Failed to send reset code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToLogin = () => {
        navigate('/auth/login');
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-white"></div>
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-400/60 rounded-full blur-3xl"></div>
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-400/60 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img
                            src={logo}
                            alt="Logo"
                            className="h-16 md:h-20 w-auto object-contain drop-shadow-lg"
                        />
                    </div>

                    {/* Forgot Password Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white/40">
                        {/* Icon */}
                        <div className="flex justify-center mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full">
                                <Mail className="w-8 h-8 text-white" />
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                                Forgot Password?
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base">
                                No worries! Enter your email and we'll send you a reset code.
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm text-center">{error}</p>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-6">
                                {/* Email Input */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        EMAIL ADDRESS
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError('');
                                            }}
                                            placeholder="johndoe@example.com"
                                            className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg 
                                            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                                            transition-all duration-300 bg-white/80 backdrop-blur-sm
                                            placeholder-gray-500"
                                            required
                                            disabled={loading}
                                        />
                                    </div>
                                </div>

                                {/* Send Reset Code Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 
                                    hover:from-orange-600 hover:to-orange-700
                                    text-white font-semibold py-4 px-4 rounded-lg 
                                    transition-all duration-300 hover:shadow-lg hover:scale-[1.02] 
                                    active:scale-[0.98] focus:ring-4 focus:ring-orange-300
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Reset Code'
                                    )}
                                </button>

                                {/* Back to Login */}
                                <button
                                    type="button"
                                    onClick={handleBackToLogin}
                                    className="w-full flex items-center justify-center gap-2 
                                    text-gray-600 hover:text-gray-800 font-medium
                                    py-3 transition-colors duration-200"
                                    disabled={loading}
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Login
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-6 text-sm text-gray-600">
                        <p>
                            Remember your password?{' '}
                            <button
                                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 underline"
                                onClick={handleBackToLogin}
                                disabled={loading}
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;