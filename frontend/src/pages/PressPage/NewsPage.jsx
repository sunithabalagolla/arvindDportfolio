import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NewsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('allnews');
  
  // Route to tab mapping
  const routeToTabMapping = {
    '/news/AllNews': 'allnews',
    '/news/PressRelease': 'pressrelease', 
    '/news/NewsCoverage': 'newscoverage',
    '/news/Interviews': 'interviews',
    '/news/Announcements': 'announcements',
    '/news': 'allnews' // Default fallback
  };

  // Tab configuration with proper routes
  const tabs = [
    { id: 'allnews', label: 'All News', count: '4', route: '/news/AllNews' },
    { id: 'pressrelease', label: 'Press Release', count: '3', route: '/news/PressRelease' },
    { id: 'newscoverage', label: 'News Coverage', count: '6', route: '/news/NewsCoverage' },
    { id: 'interviews', label: 'Interviews', count: '1', route: '/news/Interviews' },
    { id: 'announcements', label: 'Announcements', count: '8', route: '/news/Announcements' }
  ];
  
  // Enhanced URL-based tab detection with fallback handling
  useEffect(() => {
    const currentPath = location.pathname;
    const mappedTab = routeToTabMapping[currentPath];
    
    if (mappedTab) {
      setActiveTab(mappedTab);
    } else if (currentPath.startsWith('/news/')) {
      // Handle any other /news/* paths by defaulting to allnews
      setActiveTab('allnews');
      navigate('/news/AllNews', { replace: true });
    } else if (currentPath === '/news') {
      // Handle base /news path
      navigate('/news/AllNews', { replace: true });
    }
  }, [location.pathname, navigate]);

  // Fixed navigation handler - use routes instead of direct tab setting
  const handleTabClick = (route) => {
    if (location.pathname !== route) {
      navigate(route);
    }
  };

  // Sample news content data
  const allNewsContent = [
    {
      id: 1,
      title: "Skill India: Empowering Over 20 Million and Counting",
      excerpt: "A decade of systematic skill development across industries creating employment opportunities and transforming lives through comprehensive training programs.",
      date: "December 18, 2024",
      category: "Press Release",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Digital Infrastructure Revolution: Connecting Rural India",
      excerpt: "Major breakthrough in digital connectivity reaching remote villages through innovative infrastructure development and technology integration.",
      date: "December 15, 2024",
      category: "News Coverage",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Healthcare Accessibility: New Medical Colleges Inaugurated",
      excerpt: "Expanding medical education infrastructure to address healthcare workforce shortage and improve accessibility in underserved regions.",
      date: "December 12, 2024",
      category: "Announcement",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Exclusive Interview: Vision for Economic Growth",
      excerpt: "In-depth discussion on economic policies, development strategies, and future roadmap for sustainable growth and prosperity.",
      date: "December 10, 2024",
      category: "Interview",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop"
    }
  ];

  const pressReleaseContent = [
    {
      id: 1,
      title: "Skill India: Empowering Over 20 Million and Counting",
      excerpt: "A decade of systematic skill development across industries creating employment opportunities and transforming lives through comprehensive training programs nationwide.",
      date: "December 18, 2024",
      category: "Press Release",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "National Education Policy: Transforming Learning Landscape",
      excerpt: "Comprehensive reforms in education system focusing on holistic development, skill-based learning, and preparing students for future challenges.",
      date: "December 14, 2024",
      category: "Press Release",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Infrastructure Development: Connecting Every Corner",
      excerpt: "Massive infrastructure projects including highways, railways, and digital connectivity transforming the nation's development trajectory.",
      date: "December 11, 2024",
      category: "Press Release",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop"
    }
  ];

  const newsCoverageContent = [
    {
      id: 1,
      title: "Economic Growth Reaches New Milestones",
      excerpt: "Leading financial publications highlight India's economic resilience and growth trajectory amidst global challenges and market volatility.",
      date: "December 17, 2024",
      category: "News Coverage",
      source: "Economic Times",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Digital Infrastructure Revolution Coverage",
      excerpt: "Major news outlets report on the transformative impact of digital initiatives on rural development and technological advancement.",
      date: "December 15, 2024",
      category: "News Coverage",
      source: "The Hindu",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Healthcare Reforms Making Headlines",
      excerpt: "National and international media coverage of healthcare system improvements and accessibility initiatives across the country.",
      date: "December 13, 2024",
      category: "News Coverage",
      source: "Times of India",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Environmental Initiatives Gain Global Recognition",
      excerpt: "International media highlights India's commitment to environmental sustainability and climate change mitigation efforts.",
      date: "December 11, 2024",
      category: "News Coverage",
      source: "BBC News",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Technology Innovation in Governance",
      excerpt: "Tech publications cover the digital transformation in government services and citizen engagement platforms.",
      date: "December 9, 2024",
      category: "News Coverage",
      source: "Tech Crunch",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Rural Development Success Stories",
      excerpt: "Agricultural magazines and rural development publications highlight successful community transformation projects.",
      date: "December 7, 2024",
      category: "News Coverage",
      source: "Rural Voice",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop"
    }
  ];

  const interviewContent = [
    {
      id: 1,
      title: "Exclusive Interview: Vision for Economic Growth and Development",
      excerpt: "Comprehensive discussion on economic policies, development strategies, future roadmap for sustainable growth, and addressing key national priorities.",
      date: "December 10, 2024",
      category: "Interview",
      duration: "45 minutes",
      interviewer: "Rajdeep Sardesai",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop"
    }
  ];

  const announcementContent = [
    {
      id: 1,
      title: "New Medical Colleges to Open Across 15 States",
      excerpt: "Announcement of new medical education infrastructure to address healthcare workforce shortage and improve medical education accessibility.",
      date: "December 19, 2024",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Launch of National Digital Literacy Program",
      excerpt: "Comprehensive digital literacy initiative targeting rural communities and elderly population to bridge the digital divide.",
      date: "December 16, 2024",
      category: "Education",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "Green Energy Initiative: Solar Parks Expansion",
      excerpt: "Major expansion of solar energy infrastructure with new solar parks across multiple states to achieve renewable energy targets.",
      date: "December 14, 2024",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Startup India Program Reaches New Milestones",
      excerpt: "Celebration of entrepreneurship ecosystem growth with record number of startups and successful funding achievements.",
      date: "December 12, 2024",
      category: "Economy",
      image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Infrastructure Development: Metro Rail Extensions",
      excerpt: "Announcement of metro rail network expansion in tier-2 cities to improve urban transportation and connectivity.",
      date: "December 8, 2024",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Agricultural Technology Centers Establishment",
      excerpt: "Setting up of modern agricultural technology centers to support farmers with latest farming techniques and equipment.",
      date: "December 6, 2024",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=300&fit=crop"
    },
    {
      id: 7,
      title: "National Water Conservation Mission Launch",
      excerpt: "Comprehensive water conservation program addressing water scarcity and promoting sustainable water management practices.",
      date: "December 4, 2024",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop"
    },
    {
      id: 8,
      title: "Women Empowerment Scheme Extended",
      excerpt: "Extension of women empowerment initiatives with increased funding and expanded scope to reach more beneficiaries.",
      date: "December 2, 2024",
      category: "Social Welfare",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
    }
  ];

  const getCurrentContent = () => {
    switch (activeTab) {
      case 'allnews':
        return allNewsContent;
      case 'pressrelease':
        return pressReleaseContent;
      case 'newscoverage':
        return newsCoverageContent;
      case 'interviews':
        return interviewContent;
      case 'announcements':
        return announcementContent;
      default:
        return allNewsContent;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'allnews':
        return 'All News';
      case 'pressrelease':
        return 'Press Releases';
      case 'newscoverage':
        return 'News Coverage';
      case 'interviews':
        return 'Interviews';
      case 'announcements':
        return 'Announcements';
      default:
        return 'All News';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Press Release':
        return 'bg-blue-600';
      case 'News Coverage':
        return 'bg-green-600';
      case 'Interview':
        return 'bg-purple-600';
      case 'Announcement':
      case 'Healthcare':
      case 'Education':
      case 'Environment':
      case 'Economy':
      case 'Infrastructure':
      case 'Agriculture':
      case 'Social Welfare':
        return 'bg-orange-600';
      default:
        return 'bg-gray-600';
    }
  };

  const renderContent = () => {
    const content = getCurrentContent();

    return (
      <div className="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {content.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 transform hover:scale-105"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 sm:h-52 lg:h-56 object-cover transition-transform duration-300 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                <div className={`${getCategoryColor(item.category)} text-white px-2 py-1 sm:px-3 rounded-full text-xs font-medium`}>
                  {item.category}
                </div>
              </div>
              {item.source && (
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <div className="bg-white/90 text-gray-800 px-2 py-1 sm:px-3 rounded-full text-xs font-medium">
                    {item.source}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 sm:p-5 lg:p-6">
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3 line-clamp-2 hover:text-orange-600 transition-colors duration-200">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed">
                {item.excerpt}
              </p>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-500 mb-3 sm:mb-4 gap-1 sm:gap-0">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {item.date}
                </span>
                {item.duration && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item.duration}
                  </span>
                )}
              </div>
              {item.interviewer && (
                <div className="mb-3 sm:mb-4">
                  <span className="text-sm text-gray-600 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Interviewer: {item.interviewer}
                  </span>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl text-sm sm:text-base">
                  Read Full Article
                </button>
                <button className="sm:w-12 sm:h-12 h-10 w-10 mx-auto sm:mx-0 flex items-center justify-center border border-gray-300 rounded-lg sm:rounded-xl hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Fully responsive */}
      <div className="relative h-screen bg-gradient-to-r from-gray-800 to-gray-900 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=1080&fit=crop)'
          }}
        ></div>
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Hero Content - Responsive positioning */}
        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-white max-w-4xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight">
                News
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 leading-relaxed mb-6 sm:mb-8 max-w-2xl">
                Stay updated with the latest press releases, media coverage, exclusive interviews, and important announcements.
              </p>
              
              {/* CTA Button - Responsive sizing */}
              <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105">
                Explore Latest News
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Section Title - Responsive typography */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            {getPageTitle()}
          </h2>
          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Tab Navigation - Fixed navigation handler */}
        <div className="mb-8 sm:mb-12">
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex justify-center min-w-max mx-auto">
              <div className="bg-gray-200 rounded-full p-1 flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.route)} // ✅ Fixed: Use route instead of tab.id
                    className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? 'bg-white text-gray-800 shadow-lg'
                        : 'text-gray-600 hover:text-gray-800 hover:bg-white/50'
                    }`}
                  >
                    <span className="hidden sm:inline">{tab.label} ({tab.count})</span>
                    <span className="sm:hidden">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid - Responsive layout */}
        <div className="transition-all duration-300">
          {renderContent()}
        </div>

        {/* Load More Button - Responsive positioning */}
        <div className="flex justify-center mt-8 sm:mt-12">
          <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 sm:px-8 py-3 rounded-lg sm:rounded-xl font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl text-sm sm:text-base">
            Load More {getPageTitle()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsPage;