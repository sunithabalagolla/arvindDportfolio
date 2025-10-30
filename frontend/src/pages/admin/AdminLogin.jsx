import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../../utils/admin/adminApi';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    // ✅ Use the utility function
    const { user, token } = await adminLogin(formData.email, formData.password);

    // Save token and user data
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminUser', JSON.stringify(user));

    // Redirect to admin dashboard
    navigate('/admin/dashboard');
    
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/30 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        {/* Logo/Header - Enhanced */}
        <div className="text-center mb-8 animate-fade-in-down">
          <div className="relative inline-block mb-6">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35] to-[#E67A24] rounded-3xl blur-2xl opacity-50 animate-pulse"></div>
            
            {/* Logo container */}
            <div className="relative bg-gradient-to-br from-[#FB8B35] via-orange-500 to-[#E67A24] w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500 cursor-pointer">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent mb-2 animate-fade-in">
            Admin Portal
          </h1>
          <p className="text-gray-600 font-medium animate-fade-in animation-delay-200">
            Sign in to manage your content 🚀
          </p>
        </div>

        {/* Login Card - Enhanced */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 animate-fade-in-up animation-delay-300 transform hover:scale-[1.02] transition-all duration-500">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message - Animated */}
            {error && (
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-xl flex items-center animate-shake shadow-lg">
                <div className="bg-red-500 rounded-full p-1 mr-3">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="font-semibold">{error}</span>
              </div>
            )}

            {/* Email Field - Enhanced */}
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`block text-sm font-bold mb-2 transition-all duration-300 ${
                  focusedField === 'email' ? 'text-[#FB8B35]' : 'text-gray-700'
                }`}
              >
                📧 Email Address
              </label>
              <div className="relative group">
                {/* Icon */}
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                  focusedField === 'email' ? 'text-[#FB8B35] scale-110' : 'text-gray-400'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField('')}
                  required
                  className={`w-full pl-12 pr-4 py-3.5 border-2 rounded-xl font-medium transition-all duration-300 
                    ${focusedField === 'email' 
                      ? 'border-[#FB8B35] ring-4 ring-orange-100 shadow-lg' 
                      : 'border-gray-300 hover:border-orange-300'
                    }
                    focus:outline-none bg-white`}
                  placeholder="admin@example.com"
                />
                
                {/* Floating label effect */}
                {focusedField === 'email' && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-5 pointer-events-none"></div>
                )}
              </div>
            </div>

            {/* Password Field - Enhanced */}
            <div className="relative">
              <label 
                htmlFor="password" 
                className={`block text-sm font-bold mb-2 transition-all duration-300 ${
                  focusedField === 'password' ? 'text-[#FB8B35]' : 'text-gray-700'
                }`}
              >
                🔒 Password
              </label>
              <div className="relative group">
                {/* Lock Icon */}
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
                  focusedField === 'password' ? 'text-[#FB8B35] scale-110' : 'text-gray-400'
                }`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField('')}
                  required
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-xl font-medium transition-all duration-300
                    ${focusedField === 'password' 
                      ? 'border-[#FB8B35] ring-4 ring-orange-100 shadow-lg' 
                      : 'border-gray-300 hover:border-orange-300'
                    }
                    focus:outline-none bg-white`}
                  placeholder="••••••••"
                />
                
                {/* Show/Hide Password Button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-[#FB8B35] transition-all duration-300 hover:scale-110"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>

                {/* Floating label effect */}
                {focusedField === 'password' && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-5 pointer-events-none"></div>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-2 focus:ring-orange-300 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-[#FB8B35] transition-colors">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-sm font-semibold text-[#FB8B35] hover:text-[#E67A24] transition-colors hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button - Enhanced with Animation */}
            <button
              type="submit"
              disabled={loading}
              className="relative w-full bg-gradient-to-r from-[#FB8B35] via-orange-500 to-[#E67A24] text-white py-4 rounded-xl font-bold text-lg
                shadow-lg shadow-orange-300/50 hover:shadow-xl hover:shadow-orange-400/60 
                transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                overflow-hidden group"
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
              
              {/* Button content */}
              <span className="relative flex items-center justify-center">
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="animate-pulse">Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Footer - Enhanced */}
          <div className="mt-8 pt-6 border-t-2 border-gray-100">
            <div className="flex items-center justify-center space-x-2 text-sm">
              <div className="flex items-center space-x-1 text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-semibold">Protected Admin Area</span>
              </div>
            </div>
            
            {/* Security badges */}
            <div className="flex items-center justify-center space-x-4 mt-4">
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Secure Connection</span>
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>256-bit Encryption</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home - Enhanced */}
        <div className="text-center mt-8 animate-fade-in animation-delay-500">
          <button
            onClick={() => navigate('/')}
            className="group inline-flex items-center space-x-2 px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl font-semibold 
              hover:bg-white hover:text-[#FB8B35] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Website</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact{' '}
            <a href="mailto:support@admin.com" className="text-[#FB8B35] hover:text-[#E67A24] font-semibold hover:underline">
              support@admin.com
            </a>
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
        }

        .animation-delay-500 {
          animation-delay: 0.5s;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(251, 139, 53, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(251, 139, 53, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default AdminLogin;