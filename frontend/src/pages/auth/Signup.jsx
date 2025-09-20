import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        password: '',
        agree: false,
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agree) {
            alert('Please agree to the Terms of Service and Privacy Policy before signing up.');
            return;
        }
        console.log('Signup attempt:', formData);
        // Handle signup logic here
    };

    const handleSocialSignup = (provider) => {
        console.log(`Signup with ${provider}`);
    };

    const navigate = useNavigate();
    const handleLoginNavigation = () => {
        navigate('/login');
    };

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-white"></div>

                {/* Top-left orange blob */}
                <div className="absolute -top-20 -left-20 w-96 h-96 bg-orange-400/60 rounded-full blur-3xl"></div>

                {/* Top-right green blob */}
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-green-400/60 rounded-full blur-3xl"></div>
            </div>

            {/* Header with Logo and Login */}
            <div className="relative z-10 flex justify-between items-center p-4 md:p-6 lg:p-8">
                 <img
                                    src={logo}
                                    alt="Logo"
                                    className="h-8 md:h-12 lg:h-14 w-auto object-contain drop-shadow-md"
                                />

                {/* Login Button */}
                <button
                    className="px-4 py-2 md:px-6 md:py-2.5 border-2 border-gray-700 text-gray-700 
            rounded-lg font-medium text-sm md:text-base hover:bg-[#FB8B35] hover:text-white 
            transition-all duration-300 hover:scale-105 active:scale-95"
                    onClick={handleLoginNavigation}
                >
                    LOGIN
                </button>

               
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)] px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-lg">
                    
                    {/* Signup Form Card */}
                    <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 lg:p-10 border border-white/40">
                        {/* Header */}
                        <div className="text-center mb-6 md:mb-8">
                            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                               Sign Up
                            </h1>
                            <p className="text-gray-600 text-sm md:text-base">
                               Sign in to your account or create a new one to get started
                            </p>
                        </div>

                        {/* Signup Form */}
                        <div className="space-y-4 md:space-y-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                                    FIRST NAME
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                  transition-all duration-300 bg-white/80 backdrop-blur-sm
                  placeholder-gray-500"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    EMAIL ADDRESS
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="johndoe@example.com"
                                    className="w-full px-4 py-3 md:py-4 text-base border border-gray-300 rounded-lg 
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                  transition-all duration-300 bg-white/80 backdrop-blur-sm
                  placeholder-gray-500"
                                    required
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    PASSWORD
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 md:py-4 pr-12 text-base border border-gray-300 rounded-lg 
                    focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent
                    transition-all duration-300 bg-white/80 backdrop-blur-sm
                    placeholder-gray-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 
                    text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Agree to Terms */}
                            <div className="flex items-start space-x-2 text-sm">
                                <input
                                    type="checkbox"
                                    name="agree"
                                    checked={formData.agree}
                                    onChange={handleChange}
                                    className="w-4 h-4 mt-1 text-orange-600 bg-gray-100 border-gray-300 rounded 
                  focus:ring-orange-500 focus:ring-2"
                                />
                                <span className="text-gray-700">
                                    I agree to the{' '}
                                    <a href="/terms" className="text-orange-600 hover:text-orange-700 underline">
                                        Terms of Service
                                    </a>{' '}
                                    and{' '}
                                    <a href="/privacy" className="text-orange-600 hover:text-orange-700 underline">
                                        Privacy Policy
                                    </a>
                                </span>
                            </div>

                            {/* Create Account Button */}
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold 
                py-3 md:py-4 px-4 rounded-lg transition-all duration-300 
                hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]
                focus:ring-4 focus:ring-gray-300"
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="my-6 md:my-8">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500">Or</span>
                                </div>
                            </div>
                        </div>

                        {/* Social Signup */}
                        {/* Social Login Buttons */}
                        <div className="space-y-3 md:space-y-4">
                            <div className="flex justify-center space-x-4 md:space-x-6 mt-4">
                                {/* Google */}
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Google')}
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded-full 
                                    hover:border-gray-400 hover:bg-gray-50 transition-all duration-300
                                    hover:scale-[1.05] active:scale-[0.95]"
                                >
                                    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </button>

                                {/* Apple */}
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Apple')}
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded-full 
                                    hover:border-gray-400 hover:bg-gray-50 transition-all duration-300
                                    hover:scale-[1.05] active:scale-[0.95]"
                                >
                                    <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                </button>

                                {/* Facebook */}
                                <button
                                    type="button"
                                    onClick={() => handleSocialLogin('Facebook')}
                                    className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 border-2 border-gray-300 rounded-full 
                                    hover:border-gray-400 hover:bg-gray-50 transition-all duration-300
                                    hover:scale-[1.05] active:scale-[0.95]"
                                >
                                    <svg className="w-6 h-6 md:w-7 md:h-7" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <div className="text-center mt-6 text-sm text-gray-600">
                        <p>
                            Already have an account?{' '}
                            <button
                                className="text-orange-600 hover:text-orange-700 font-semibold transition-colors duration-200 underline"
                                onClick={handleLoginNavigation}
                            >
                                Login here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
