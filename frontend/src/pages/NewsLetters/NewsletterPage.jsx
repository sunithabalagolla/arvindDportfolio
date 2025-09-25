// NewsletterPage.jsx - Fixed with proper navigation
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const NewsletterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('recent');
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Route to tab mapping
  const routeToTabMapping = {
    '/newsletter/Recent': 'recent',
    '/newsletter/Archives': 'archives', 
    '/newsletter/Subscriptions': 'subscriptions',
    '/newsletter/Create': 'create',
    '/newsletter': 'recent' // Default fallback
  };

  // Tab configuration with proper routes
  const tabs = [
    { id: 'recent', label: 'Recent Issues', route: '/newsletter/Recent' },
    { id: 'archives', label: 'Archives', route: '/newsletter/Archives' },
    { id: 'subscriptions', label: 'Subscriptions', route: '/newsletter/Subscriptions' },
    { id: 'create', label: 'Create', route: '/newsletter/Create' }
  ];

  // Enhanced URL-based tab detection with fallback handling
  useEffect(() => {
    const currentPath = location.pathname;
    const mappedTab = routeToTabMapping[currentPath];
    
    if (mappedTab) {
      setActiveTab(mappedTab);
    } else if (currentPath.startsWith('/newsletter/')) {
      // Handle any other /newsletter/* paths by defaulting to recent
      setActiveTab('recent');
      navigate('/newsletter/Recent', { replace: true });
    } else if (currentPath === '/newsletter') {
      // Handle base /newsletter path
      navigate('/newsletter/Recent', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Fixed navigation handler - use routes instead of direct tab setting
  const handleTabClick = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  // Newsletter statistics
  const stats = [
    {
      value: '20K',
      label: 'Subscribers',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.196-2.121L17 20zM9 12a4 4 0 008 0m-8 0a4 4 0 118 0m-8 0v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        </svg>
      )
    },
    {
      value: '67%',
      label: 'Avg Open Rate',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      value: '56%',
      label: 'Avg Click Rate',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      )
    },
    {
      value: '32%',
      label: 'Active Rate',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  // Recent newsletters data
  const recentIssues = [
    {
      id: 1,
      title: "Digital Governance Initiatives - Monthly Update",
      date: "December 2024",
      issue: "Issue #47",
      description: "Latest updates on digital transformation in governance, new technology implementations, and citizen engagement platforms.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Healthcare Accessibility Report",
      date: "November 2024",
      issue: "Issue #46",
      description: "Comprehensive report on healthcare infrastructure development and accessibility improvements across rural areas.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Education & Skill Development Progress",
      date: "November 2024",
      issue: "Issue #45",
      description: "Updates on skill development programs, educational reforms, and youth empowerment initiatives across the region.",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      readTime: "6 min read"
    }
  ];

  // Archives data
  const archiveIssues = [
    {
      id: 1,
      title: "Q3 2024 Development Review",
      date: "September 2024",
      issue: "Issue #44",
      description: "Quarterly review of major development projects and their impact on local communities.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Infrastructure Milestones Report",
      date: "August 2024", 
      issue: "Issue #43",
      description: "Major infrastructure achievements and upcoming projects for sustainable development.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Rural Development Success Stories",
      date: "July 2024",
      issue: "Issue #42",
      description: "Highlighting successful rural development initiatives and their transformative impact.",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Technology in Governance",
      date: "June 2024",
      issue: "Issue #41",
      description: "How technology is reshaping governance and improving citizen services delivery.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'recent':
        return recentIssues;
      case 'archives':
        return archiveIssues;
      case 'subscriptions':
        return [];
      default:
        return recentIssues;
    }
  };

  const renderContent = () => {
    if (activeTab === 'subscriptions') {
      return (
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-[#FB8B35] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Subscribe to Our Newsletter</h3>
              <p className="text-gray-600">Get the latest updates, news, and insights delivered straight to your inbox.</p>
            </div>

            {isSubscribed ? (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="text-green-600 font-semibold text-lg"
              >
                Thank you for subscribing! Check your email for confirmation.
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Subscribe Now
                </button>
              </form>
            )}

            <div className="mt-8 text-sm text-gray-500">
              <p>• Weekly updates on government initiatives</p>
              <p>• Exclusive insights and announcements</p>
              <p>• No spam, unsubscribe anytime</p>
            </div>
          </motion.div>
        </div>
      );
    }

    if (activeTab === 'create') {
      return (
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <svg className="w-16 h-16 mx-auto text-[#FB8B35] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <h3 className="text-3xl font-bold text-gray-800 mb-2">Create New Newsletter</h3>
              <p className="text-gray-600">Design and publish your newsletter to keep subscribers informed.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Title *</label>
                  <input
                    type="text"
                    placeholder="Enter newsletter title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Number</label>
                  <input
                    type="text"
                    placeholder="e.g., Issue #48"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#FB8B35] transition-colors duration-200">
                  <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-600">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Newsletter Content *</label>
                <textarea
                  rows={10}
                  placeholder="Write your newsletter content here..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200 resize-vertical"
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200">
                    <option>Government Updates</option>
                    <option>Health & Welfare</option>
                    <option>Education</option>
                    <option>Infrastructure</option>
                    <option>Technology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Publish Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#FB8B35] focus:border-transparent transition-all duration-200">
                    <option>Draft</option>
                    <option>Ready to Publish</option>
                    <option>Scheduled</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Preview Newsletter
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white py-3 px-6 rounded-xl font-semibold hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Publish Newsletter
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      );
    }

    const content = getCurrentContent();
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {content.map((item, index) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-[#FB8B35] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {item.issue}
                </div>
              </div>
              {item.readTime && (
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                    {item.readTime}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-500">{item.date}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-[#FB8B35] transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {item.description}
              </p>
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white py-3 px-4 rounded-xl hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                  Read Newsletter
                </button>
                <button className="flex items-center justify-center w-12 h-12 border border-gray-300 rounded-xl hover:border-[#FB8B35] hover:text-[#FB8B35] transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating email icons */}
          <div className="absolute top-20 right-20 opacity-20">
            <svg className="w-24 h-24 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute top-40 left-20 opacity-15">
            <svg className="w-32 h-32 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="absolute bottom-32 right-32 opacity-10">
            <svg className="w-28 h-28 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl mt-20">
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              NewsLetter
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Stay connected with us through our newsletter feature, designed to bring the latest updates, news, and insights straight to your inbox. By subscribing, you'll receive regular highlights on events, announcements, and exclusive content, ensuring you never miss out on important information.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => handleTabClick('/newsletter/Subscriptions')} // ✅ Fixed: Use route navigation
                className="bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Subscribe Now
              </button>
              <button 
                onClick={() => handleTabClick('/newsletter/Create')} // ✅ Fixed: Use route navigation
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Create Newsletter
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-[#FB8B35] mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tab Navigation - Fixed navigation handler */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 rounded-full p-1 flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.route)} // ✅ Fixed: Use route instead of setActiveTab
                className={`px-8 py-4 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-800 shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NewsletterPage;