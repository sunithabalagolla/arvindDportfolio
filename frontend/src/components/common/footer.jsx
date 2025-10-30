import React, { useState } from 'react';
import { Facebook, MessageCircle, Instagram, Twitter, MapPin, Mail, Phone, Send, ArrowRight } from 'lucide-react';
import logo from '../../assets/logo/logo.png';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [hoveredSocial, setHoveredSocial] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);

  const handleSubscribe = () => {
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'My View', path: '/view/Quotes' },
    { name: 'About', path: '/about/timeline' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Newsletter', path: '/newsletter/Recent' },
    { name: 'Get in Touch', path: '/getintouch/contact' },
    { name: 'Press', path: '/news' }
  ];

  return (
    <footer className="bg-gradient-to-br from-orange-50 via-orange-50 to-orange-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12 relative overflow-hidden">
      
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200 rounded-full opacity-10 blur-3xl -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-300 rounded-full opacity-10 blur-3xl -ml-32 -mb-32"></div>

      {/* Header Section with Logo and Social Media */}
      <div className="max-w-7xl mx-auto mb-6 sm:mb-8 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 mb-4 sm:mb-6">
          
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 group">
            <img 
              src={logo} 
              alt="Arvind Dharmapuri Logo" 
              className="h-12 sm:h-16 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          
          {/* Social Media Icons */}
          <div className="flex space-x-2 sm:space-x-3">
            <a
              href="#"
              onMouseEnter={() => setHoveredSocial('facebook')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
                hoveredSocial === 'facebook' ? 'bg-blue-700 scale-110 shadow-xl -translate-y-1' : 'hover:bg-blue-700'
              }`}
            >
              <Facebook size={18} className="sm:size-5 text-white" />
            </a>
            
            <a
              href="#"
              onMouseEnter={() => setHoveredSocial('whatsapp')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-green-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
                hoveredSocial === 'whatsapp' ? 'bg-green-600 scale-110 shadow-xl -translate-y-1' : 'hover:bg-green-600'
              }`}
            >
              <MessageCircle size={18} className="sm:size-5 text-white" />
            </a>
            
            <a
              href="#"
              onMouseEnter={() => setHoveredSocial('instagram')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-pink-500 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
                hoveredSocial === 'instagram' ? 'bg-pink-600 scale-110 shadow-xl -translate-y-1' : 'hover:bg-pink-600'
              }`}
            >
              <Instagram size={18} className="sm:size-5 text-white" />
            </a>
            
            <a
              href="#"
              onMouseEnter={() => setHoveredSocial('twitter')}
              onMouseLeave={() => setHoveredSocial(null)}
              className={`w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md ${
                hoveredSocial === 'twitter' ? 'bg-blue-500 scale-110 shadow-xl -translate-y-1' : 'hover:bg-blue-500'
              }`}
            >
              <Twitter size={18} className="sm:size-5 text-white" />
            </a>
          </div>
        </div>
        
        {/* Divider */}
        <div className="h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          
          {/* Quick Links */}
          <div className="order-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500 rounded"></span>
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.path}
                  onMouseEnter={() => setHoveredLink(index)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="flex items-center text-gray-600 hover:text-orange-600 transition-all duration-300 text-sm sm:text-base group"
                >
                  <ArrowRight 
                    size={16} 
                    className={`mr-2 text-orange-500 transition-all duration-300 ${
                      hoveredLink === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                    }`}
                  />
                  <span className={`${hoveredLink === index ? 'translate-x-1' : ''} transition-transform duration-300`}>
                    {link.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div className="order-2">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500 rounded"></span>
            </h3>
            <div className="space-y-4 sm:space-y-5">
              
              {/* Address */}
              <div className="flex items-start space-x-3 group hover:bg-white/60 p-2 rounded-lg transition-all duration-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={18} className="sm:size-5 text-white" />
                </div>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed font-medium">
                  #6-18285/2, New NGOs Colony,<br />
                  Near geetanjali School,<br />
                  NIZAMABAD-503002.
                </p>
              </div>
              
              {/* Email */}
              <div className="flex items-start space-x-3 group hover:bg-white/60 p-2 rounded-lg transition-all duration-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Mail size={18} className="sm:size-5 text-white" />
                </div>
                <div className="text-xs sm:text-sm space-y-1">
                  <a href="mailto:officeofarvindd@gmail.com" className="text-gray-700 hover:text-orange-600 transition-colors block break-all font-medium">
                    officeofarvindd@gmail.com
                  </a>
                  <a href="mailto:arvind.dharmapuri@sansad.nic.in" className="text-gray-700 hover:text-orange-600 transition-colors block break-all font-medium">
                    arvind.dharmapuri@sansad.nic.in
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-center space-x-3 group hover:bg-white/60 p-2 rounded-lg transition-all duration-300">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300">
                  <Phone size={18} className="sm:size-5 text-white" />
                </div>
                <a 
                  href="tel:18001036166"
                  className="text-gray-700 text-xs sm:text-sm font-semibold hover:text-orange-600 transition-colors"
                >
                  1800 1036166
                </a>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="order-3 md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 sm:mb-6 relative inline-block">
              Newsletter
              <span className="absolute bottom-0 left-0 w-12 h-1 bg-orange-500 rounded"></span>
            </h3>
            <div className="space-y-3 sm:space-y-4 max-w-sm md:max-w-md lg:max-w-none">
              <p className="text-gray-600 text-xs sm:text-sm">
                Subscribe to get the latest updates and news!
              </p>
              
              {/* Email Input */}
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
                  className="w-full px-4 py-2.5 sm:py-3 pr-10 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-gray-700 placeholder-gray-400 text-sm sm:text-base transition-all duration-300 bg-white shadow-sm hover:shadow-md"
                />
                <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
              
              {/* Subscribe Button */}
              <button
                onClick={handleSubscribe}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-2.5 sm:py-3 px-6 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 outline-none text-sm sm:text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
              >
                <span>Subscribe Now</span>
                <Send size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              {/* Privacy Badge */}
              <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                <span className="text-green-500">🔒</span>
                <span>We respect your privacy</span>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t-2 border-gray-300">
          <div className="text-center space-y-3">
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              © 2025 <span className="text-orange-600 font-bold">Arvind Dharmapuri</span>. All rights reserved.
            </p>
            <div className="flex justify-center flex-wrap gap-4 text-xs sm:text-sm text-gray-500">
              <a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-orange-600 transition-colors">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-orange-600 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;