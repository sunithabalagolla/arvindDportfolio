// MyViewPage.jsx - Fixed version with proper hero section spacing
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const MyViewPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('quotes');

  // Determine active tab from URL
  useEffect(() => {
    if (location.pathname === '/view/Quotes') {
      setActiveTab('quotes');
    } else if (location.pathname === '/view/Articles') {
      setActiveTab('articles');
    } else if (location.pathname === '/view/Blogs') {
      setActiveTab('blogs');
    }
  }, [location.pathname]);

  const tabs = [
    { id: 'quotes', label: 'Quotes', route: '/view/Quotes' },
    { id: 'articles', label: 'ARTICLES', route: '/view/Articles' },
    { id: 'blogs', label: 'Blogs', route: '/view/Blogs' }
  ];

  const handleTabClick = (route) => {
    navigate(route);
  };

  // Sample content data
  const quotesContent = [
    {
      id: 1,
      quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
      author: "Winston Churchill",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop"
    },
    {
      id: 2,
      quote: "The only way to do great work is to love what you do.",
      author: "Steve Jobs",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    },
    {
      id: 3,
      quote: "Innovation distinguishes between a leader and a follower.",
      author: "Steve Jobs",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop"
    },
    {
      id: 4,
      quote: "Leadership is not about being in charge. It's about taking care of those in your charge.",
      author: "Simon Sinek",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop"
    },
    {
      id: 5,
      quote: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
    },
    {
      id: 6,
      quote: "Change is the end result of all true learning.",
      author: "Ralph Waldo Emerson",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop"
    }
  ];

  const articlesContent = [
    {
      id: 1,
      title: "Digital Transformation in Government",
      excerpt: "How technology is reshaping public services and citizen engagement in the digital age. Exploring innovative approaches to modernize governance.",
      author: "Policy Team",
      date: "2 days ago",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Sustainable Development Goals Progress",
      excerpt: "Comprehensive progress update on achieving sustainable development goals in our region. Measuring impact and future strategies.",
      author: "Development Team",
      date: "1 week ago",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Economic Growth Strategies for 2024",
      excerpt: "Comprehensive analysis of economic policies and their impact on local communities. Strategic planning for sustainable growth.",
      author: "Economic Team",
      date: "2 weeks ago",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Infrastructure Development Updates",
      excerpt: "Latest updates on major infrastructure projects and their timeline. Building for the future of our communities.",
      author: "Infrastructure Team",
      date: "3 weeks ago",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Education System Reforms",
      excerpt: "Transforming education through innovative policies and technology integration. Preparing students for tomorrow's challenges.",
      author: "Education Team",
      date: "1 month ago",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Healthcare Accessibility Initiative",
      excerpt: "Expanding healthcare services to underserved areas. Making quality healthcare accessible to all citizens.",
      author: "Healthcare Team",
      date: "1 month ago",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
    }
  ];

  const blogsContent = [
    {
      id: 1,
      title: "Community Development: A Grassroots Approach",
      excerpt: "Exploring grassroots programs that are making a real difference in local communities. Stories of transformation and hope.",
      date: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Youth Empowerment Through Education",
      excerpt: "How we're investing in the next generation through comprehensive education and skill development programs.",
      date: "January 12, 2024",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Making Healthcare Accessible for All",
      excerpt: "Improving healthcare services and making them accessible to all citizens. Breaking down barriers to quality care.",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=200&fit=crop"
    },
    {
      id: 4,
      title: "Digital Literacy: Bridging the Gap",
      excerpt: "Initiatives to improve digital literacy across all age groups. Ensuring no one is left behind in the digital revolution.",
      date: "January 8, 2024",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=300&h=200&fit=crop"
    },
    {
      id: 5,
      title: "Environmental Conservation Efforts",
      excerpt: "Our commitment to environmental sustainability and conservation. Protecting our planet for future generations.",
      date: "January 5, 2024",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop"
    },
    {
      id: 6,
      title: "Rural Development Success Stories",
      excerpt: "Highlighting successful rural development projects and their impact on farming communities. Building stronger rural economies.",
      date: "January 3, 2024",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=300&h=200&fit=crop"
    }
  ];

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'quotes':
        return quotesContent;
      case 'articles':
        return articlesContent;
      case 'blogs':
        return blogsContent;
      default:
        return blogsContent;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'quotes':
        return 'Quotes';
      case 'articles':
        return 'Articles';
      case 'blogs':
        return 'Blogs';
      default:
        return 'Blogs';
    }
  };

  const renderContent = () => {
    const content = getCurrentContent();

    if (activeTab === 'quotes') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">{item.author}</h4>
                    <p className="text-gray-500 text-sm">Author</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 italic text-lg leading-relaxed mb-6 min-h-[80px]">
                  "{item.quote}"
                </blockquote>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <button className="flex items-center space-x-2 text-[#FB8B35] hover:text-[#e67e22] font-medium transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors duration-200">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-[#FB8B35] text-white px-3 py-1 rounded-full text-xs font-medium">
                  {activeTab === 'articles' ? 'Article' : 'Blog'}
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2 hover:text-[#FB8B35] transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                {activeTab === 'articles' && (
                  <>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {item.author}
                    </span>
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {item.date}
                    </span>
                  </>
                )}
                {activeTab === 'blogs' && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Published: {item.date}
                  </span>
                )}
              </div>
              <button className="w-full bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white py-3 px-4 rounded-xl hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105">
                {activeTab === 'articles' ? 'Read Full Article' : 'Continue Reading'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Fixed to show full image */}
      <div className="relative h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
        {/* Full background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Content positioned to avoid header overlap */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="text-white max-w-2xl mt-20"> {/* Added top margin to avoid header */}
            <motion.h2 
              className="text-xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              My View
            </motion.h2>
            <motion.p 
              className="text-xl md:text-2xl opacity-90 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Discover a collection of personal blogs, inspiring quotes, and thought-provoking articles — a space where perspectives meet reflection.
            </motion.p>
            
            {/* Call to action button */}
            <motion.button
              className="bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore Content
            </motion.button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <motion.div
            className="w-6 h-10 border-2 border-white rounded-full flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <motion.div
              className="w-1 h-3 bg-white rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Page Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          {getPageTitle()}
        </h2>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-200 rounded-full p-1 flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.route)}
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

        {/* Content Grid with AnimatePresence for smooth tab transitions */}
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

        {/* Load More Button */}
        <div className="flex justify-center mt-12">
          <motion.button
            className="bg-gradient-to-r from-[#FB8B35] to-[#e67e22] text-white px-8 py-3 rounded-xl font-medium hover:from-[#e67e22] hover:to-[#d35400] transition-all duration-300 shadow-lg hover:shadow-xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Load More {getPageTitle()}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default MyViewPage;