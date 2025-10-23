import React, { useState } from 'react';
import { X, Info, Heart, TrendingUp, Shield, FileText, CheckCircle, Users, Award, ArrowRight } from 'lucide-react';
import image1 from '../../assets/images/Donation/sampleright.jpeg';
import image2 from '../../assets/images/Donation/sampleleft.jpeg';
import image3 from '../../assets/images/Donation/donationCenter.png';
import { createDonation } from '../../utils/donationApi';

const DonationSection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showKnowMoreModal, setShowKnowMoreModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [donationForm, setDonationForm] = useState({
    name: '',
    email: '',
    phone: '',
    amount: '',
    fundType: 'PM Cares Fund'
  });

  const fundOptions = [
    'PM Cares Fund',
    'BJP Relief Fund',
    'Education Fund',
    'Healthcare Fund',
    'Disaster Relief Fund'
  ];

  const handleInputChange = (e) => {
    setDonationForm({
      ...donationForm,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateForm = () => {
    if (!donationForm.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!donationForm.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donationForm.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!donationForm.phone.trim() || !/^[0-9]{10}$/.test(donationForm.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!donationForm.amount || donationForm.amount < 100) {
      setError('Minimum donation amount is ₹100');
      return false;
    }
    if (donationForm.amount > 500000) {
      setError('Maximum donation amount is ₹5,00,000');
      return false;
    }
    return true;
  };

  const handleDonateSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) return;

  setLoading(true);
  setError('');
  setSuccess('');

  try {
    // ✅ REAL API CALL - Save donation to database
    const result = await createDonation(donationForm);

    if (result.success) {
      const donationId = result.data.donationId;
      console.log('✅ Donation created successfully:', donationId);

      setSuccess('Donation saved! Redirecting to payment...');
      
      // Wait 1.5 seconds then redirect
      setTimeout(() => {
        // Redirect to respective fund website
        const redirectUrls = {
          'PM Cares Fund': 'https://pmcares.gov.in/en/web/contribution/donate_india',
          'BJP Relief Fund': 'https://www.bjp.org/en/donation',
          'Education Fund': 'https://pmcares.gov.in/en/web/contribution/donate_india',
          'Healthcare Fund': 'https://pmcares.gov.in/en/web/contribution/donate_india',
          'Disaster Relief Fund': 'https://pmcares.gov.in/en/web/contribution/donate_india'
        };
        
        const url = redirectUrls[donationForm.fundType] || 'https://pmcares.gov.in/en/web/contribution/donate_india';
        
        // Open payment page in new tab
        window.open(url, '_blank');
        
        // Show instruction alert
        alert(`✅ Donation intent saved!\n\n📝 Donation ID: ${donationId}\n\nPlease:\n1. Complete payment on the opened page\n2. Save your transaction ID\n3. Return to your dashboard\n4. Upload payment receipt\n\nThank you for your contribution!`);
        
        // Close modal and reset form
        setShowDonationModal(false);
        setDonationForm({
          name: '',
          email: '',
          phone: '',
          amount: '',
          fundType: 'PM Cares Fund'
        });
        setSuccess('');
      }, 1500);
    }

  } catch (error) {
    setError(error || 'Failed to create donation. Please try again.');
    console.error('Donation error:', error);
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <div className="py-8 md:py-16 lg:py-20 bg-gradient-to-br from-orange-50 via-white to-pink-50 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            
            {/* Text Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 px-2 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-orange-500 to-pink-500 animate-gradient">
                Donations
              </h2>
              
              <p className="text-lg md:text-xl text-gray-700 mb-8 lg:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Support the BJP by contributing your donation to help strengthen its mission
                and activities for the nation's progress.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {/* Donate Now Button */}
                <button 
                  onClick={() => setShowDonationModal(true)}
                  className="group relative w-[140px] sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 
                    bg-[#FB8B35] text-white text-xs sm:text-sm md:text-base font-semibold 
                    rounded-lg border-2 border-[#FB8B35]
                    hover:bg-white hover:text-[#FB8B35]
                    shadow-md sm:shadow-lg hover:shadow-2xl hover:shadow-[#FB8B35]/30
                    transform hover:-translate-y-1 active:translate-y-0
                    transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 
                    overflow-hidden cursor-pointer"
                >
                  <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="relative z-10 font-bold">Donate Now</span>
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Know More Button */}
                <button 
                  onClick={() => setShowKnowMoreModal(true)}
                  className="group relative w-[140px] sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3.5 border-2 border-gray-300 text-gray-700 
                    text-xs sm:text-sm md:text-base font-semibold rounded-lg 
                    hover:border-orange-500 hover:text-orange-600 
                    shadow-md sm:shadow-lg hover:shadow-xl transition-all duration-300 
                    flex items-center justify-center gap-1.5 sm:gap-2 overflow-hidden bg-white cursor-pointer"
                >
                  <span className="absolute inset-0 bg-orange-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2 font-bold">
                    Know More 
                    <svg 
                      className="w-3 h-3 sm:w-4 sm:h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-1/2 relative">
              {/* Mobile Layout (Single Image) */}
              <div className="block md:hidden">
                <div className="relative mx-auto w-64 h-80">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl blur-xl opacity-30"></div>
                  <img
                    src={image3}
                    alt="Main Person"
                    className="relative w-full h-full object-cover rounded-2xl shadow-2xl ring-4 ring-white"
                  />
                </div>
              </div>

              {/* Tablet Layout (2 Images) */}
              <div className="hidden md:block lg:hidden">
                <div className="relative flex items-center justify-center gap-8">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <img
                      src={image1}
                      alt="Left Person"
                      className="relative w-40 h-52 object-cover rounded-2xl shadow-xl transform rotate-3 hover:rotate-1 hover:scale-105 transition-all duration-500 ring-2 ring-white"
                    />
                  </div>
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl blur-2xl opacity-40"></div>
                    <img
                      src={image3}
                      alt="Main Person"
                      className="relative w-48 h-60 object-cover rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500 ring-4 ring-white"
                    />
                  </div>
                </div>
              </div>

              {/* Desktop Layout (3D Stack) */}
              <div 
                className="hidden lg:block"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="relative flex items-center justify-center h-96" style={{ perspective: '1200px' }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-96 h-96 bg-gradient-to-br from-orange-400 via-pink-400 to-yellow-400 rounded-full blur-3xl opacity-20 transition-all duration-1000 ${
                      isHovered ? 'scale-110 opacity-30' : 'scale-100'
                    }`}></div>
                  </div>

                  <div 
                    className="absolute transition-all duration-700 ease-out group"
                    style={{
                      transform: isHovered 
                        ? 'translateX(-8rem) rotateY(15deg) rotateX(-8deg) scale(0.95)'
                        : 'translateX(-6rem) rotateY(25deg) rotateX(-12deg) scale(0.9)',
                      transformStyle: 'preserve-3d',
                      zIndex: 1
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <img
                      src={image1}
                      alt="Left Person"
                      className="relative w-52 h-72 object-cover rounded-3xl shadow-2xl ring-4 ring-white/50"
                    />
                  </div>

                  <div 
                    className={`relative z-10 transition-all duration-700 ease-out group ${
                      isHovered ? 'transform -translate-y-4 scale-105' : ''
                    }`}
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-500 to-orange-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
                      <img
                        src={image3}
                        alt="Main Person"
                        className="relative w-64 h-80 object-cover rounded-3xl shadow-2xl ring-4 ring-white"
                      />
                    </div>
                  </div>

                  <div 
                    className="absolute transition-all duration-700 ease-out group"
                    style={{
                      transform: isHovered 
                        ? 'translateX(8rem) rotateY(-15deg) rotateX(-8deg) scale(0.95)'
                        : 'translateX(6rem) rotateY(-25deg) rotateX(-12deg) scale(0.9)',
                      transformStyle: 'preserve-3d',
                      zIndex: 1
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-pink-400 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <img
                      src={image2}
                      alt="Right Person"
                      className="relative w-52 h-72 object-cover rounded-3xl shadow-2xl ring-4 ring-white/50"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes blob {
            0%, 100% { transform: translate(0, 0) scale(1); }
            25% { transform: translate(20px, -30px) scale(1.1); }
            50% { transform: translate(-20px, 20px) scale(0.9); }
            75% { transform: translate(30px, 10px) scale(1.05); }
          }
          
          @keyframes gradient {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
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
          
          .animate-gradient {
            background-size: 200% 200%;
            animation: gradient 3s ease infinite;
          }
        `}</style>
      </div>

      {/* Donation Modal */}
      {showDonationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Heart className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">Make a Donation</h3>
                </div>
                <button
                  onClick={() => {
                    setShowDonationModal(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <form onSubmit={handleDonateSubmit} className="p-6 space-y-4">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                  <p className="text-red-600 text-sm font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                  <p className="text-green-600 text-sm font-medium">{success}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={donationForm.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={donationForm.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={donationForm.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Donation Amount (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="amount"
                  value={donationForm.amount}
                  onChange={handleInputChange}
                  placeholder="Minimum ₹100"
                  min="100"
                  max="500000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">Min: ₹100 | Max: ₹5,00,000</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Select Fund <span className="text-red-500">*</span>
                </label>
                <select
                  name="fundType"
                  value={donationForm.fundType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                >
                  {fundOptions.map(fund => (
                    <option key={fund} value={fund}>{fund}</option>
                  ))}
                </select>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-semibold mb-1">Important Note:</p>
                    <p>After clicking "Proceed to Donate", you'll be redirected to the secure payment page. Please complete your donation there and upload the receipt in your dashboard.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowDonationModal(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Donate
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Know More Modal */}
      {showKnowMoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp">
            <div className="sticky top-0 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Info className="w-6 h-6" />
                  <h3 className="text-2xl font-bold">About Donations</h3>
                </div>
                <button
                  onClick={() => setShowKnowMoreModal(false)}
                  className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* What Your Donation Supports */}
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Heart className="w-8 h-8 text-orange-600" />
                  <h4 className="text-xl font-bold text-gray-900">What Your Donation Supports</h4>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Your generous contribution helps fund critical initiatives including infrastructure development, 
                  social welfare programs, disaster relief efforts, educational scholarships, and healthcare facilities 
                  across the nation.
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Community development programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Emergency relief and disaster management</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Educational initiatives and skill development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Healthcare and medical assistance</span>
                  </li>
                </ul>
              </div>

              {/* Transparency & Impact */}
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-8 h-8 text-blue-600" />
                  <h4 className="text-xl font-bold text-gray-900">Transparency & Accountability</h4>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We maintain complete transparency in fund utilization. All donations are tracked, 
                  and detailed reports are made available to ensure accountability and trust.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">10M+</p>
                    <p className="text-sm text-gray-600">People Helped</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-sm text-gray-600">Projects Funded</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 text-center">
                    <Award className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-gray-900">100%</p>
                    <p className="text-sm text-gray-600">Transparent</p>
                  </div>
                </div>
              </div>

              {/* Tax Benefits */}
              <div className="bg-green-50 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-8 h-8 text-green-600" />
                  <h4 className="text-xl font-bold text-gray-900">Tax Benefits</h4>
                </div>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Donations to PM Cares Fund and other eligible funds qualify for tax deductions under 
                  Section 80G of the Income Tax Act. You'll receive a donation certificate for tax filing purposes.
                </p>
                <div className="bg-white rounded-lg p-4 border-l-4 border-green-600">
                  <p className="font-semibold text-gray-900 mb-2">💰 Save up to 100% on taxes</p>
                  <p className="text-sm text-gray-600">
                    Get 80G certificate instantly after verification of your donation
                  </p>
                </div>
              </div>

              {/* How It Works */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">How It Works</h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                    <div>
                      <p className="font-semibold text-gray-900">Fill the Donation Form</p>
                      <p className="text-sm text-gray-600">Enter your details and choose the fund you wish to support</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                    <div>
                      <p className="font-semibold text-gray-900">Complete Payment</p>
                      <p className="text-sm text-gray-600">You'll be redirected to secure payment gateway</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                    <div>
                      <p className="font-semibold text-gray-900">Upload Receipt</p>
                      <p className="text-sm text-gray-600">Return to your dashboard and upload payment proof</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                    <div>
                      <p className="font-semibold text-gray-900">Get Certificate</p>
                      <p className="text-sm text-gray-600">Download your donation certificate for tax benefits</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQs */}
              <div className="bg-white border border-gray-200 rounded-xl p-6">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h4>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Is my donation secure?</p>
                    <p className="text-sm text-gray-600">Yes, all transactions are processed through secure government-approved payment gateways with end-to-end encryption.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Will I receive a receipt?</p>
                    <p className="text-sm text-gray-600">After uploading your payment proof, you'll receive a verified donation certificate that can be used for tax purposes.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">What is the minimum donation amount?</p>
                    <p className="text-sm text-gray-600">The minimum donation amount is ₹100, and maximum is ₹5,00,000 per transaction.</p>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Can I track my donation?</p>
                    <p className="text-sm text-gray-600">Yes, you can view all your donations and their status in your personal dashboard.</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="text-center pt-4">
                <button
                  onClick={() => {
                    setShowKnowMoreModal(false);
                    setShowDonationModal(true);
                  }}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Heart className="w-5 h-5" />
                  Make a Donation Now
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default DonationSection;