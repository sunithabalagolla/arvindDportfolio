import React, { useState } from 'react';
import { Facebook, MessageCircle, Instagram, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import logo from '../../assets/logo/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-orange-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      {/* Header Section with Logo and Social Media */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
          {/* Logo Section */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Lotus Logo */}
             <img src={logo}></img>
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-2 sm:space-x-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
              <Facebook size={14} className="sm:size-4 lg:size-5 text-white" />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-green-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-green-600 transition-colors">
              <MessageCircle size={14} className="sm:size-4 lg:size-5 text-white" />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-600 transition-colors">
              <Instagram size={14} className="sm:size-4 lg:size-5 text-white" />
            </div>
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
              <Twitter size={14} className="sm:size-4 lg:size-5 text-white" />
            </div>
          </div>
        </div>
        
        {/* Black Line */}
        <div className="border-t-2 border-black"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Quick Links */}
          <div className="order-1 lg:order-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 sm:gap-3">
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Home</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">My View</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">About</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Gallery</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Newsletter</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Get in Touch</a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors text-sm sm:text-base">Press</a>
            </div>
          </div>

          {/* Contact Us */}
          <div className="order-2 lg:order-2">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Contact Us</h3>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="sm:size-5 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    #6-18285/2, New NGOs Colony,<br />
                    Near geetanjali School,<br />
                    NIZAMABAD-503002.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail size={18} className="sm:size-5 text-orange-500 mt-1 flex-shrink-0" />
                <div className="text-xs sm:text-sm">
                  <p className="text-gray-600 break-all">officeofarvindd@gmail.com,</p>
                  <p className="text-gray-600 break-all">arvind.dharmapuri@sansad.nic.in</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="sm:size-5 text-orange-500 flex-shrink-0" />
                <p className="text-gray-600 text-xs sm:text-sm underline cursor-pointer hover:text-orange-500">
                  1800 1036166
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="order-3 lg:order-3 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">Newsletter Subscription</h3>
            <div className="space-y-3 sm:space-y-4 max-w-sm md:max-w-md lg:max-w-none">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                onClick={handleSubscribe}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none text-sm sm:text-base"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Section - Optional */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              © 2025 Arvind Dharmapuri. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;