import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { adminLogout, getCurrentAdmin } from '../../utils/admin/adminApi';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    'Home Management': false,
    'News & Press': false,
    'Events': false,
    'My View': false,
    'Gallery': false,
    'Newsletter': false,
    'Shop': false,
    'About': false,
    'Feedback & Messages': false,
    'Users': false
  });

  const adminUser = getCurrentAdmin() || {}; // ✅ Use utility function

 const handleLogout = () => {
  adminLogout(); // ✅ Use utility function
  navigate('/admin/login');
};

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const menuSections = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      single: true,
      badge: '5'
    },
    {
      name: 'Home Management',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      subItems: [
        { name: 'Hero Carousel', path: '/admin/home/hero-carousel', icon: '🎠' },
        { name: 'News Carousel', path: '/admin/home/news-carousel', icon: '📰' },
        { name: 'Gallery Preview', path: '/admin/home/gallery-preview', icon: '🖼️' },
        { name: 'Volunteer Carousel', path: '/admin/home/volunteer-carousel', icon: '🤝' },
        { name: 'Events Section', path: '/admin/home/events-section', icon: '📅' },
        { name: 'Foundation Carousels', path: '/admin/home/foundation-carousel', icon: '🏛️' },
        { name: 'Full Width Images', path: '/admin/home/full-width-images', icon: '🖼️' },
        { name: 'Promises Section', path: '/admin/home/promises', icon: '✨' },
        { name: 'Social Section', path: '/admin/home/social', icon: '💬' }
      ]
    },
    {
      name: 'News & Press',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      ),
      subItems: [
        { name: 'All News', path: '/admin/news', icon: '📢' },
        { name: 'Press Releases', path: '/admin/news/press-releases', icon: '📋' },
        { name: 'News Coverage', path: '/admin/news/coverage', icon: '📺' },
        { name: 'Interviews', path: '/admin/news/interviews', icon: '🎤' },
        { name: 'Announcements', path: '/admin/news/announcements', icon: '📣' }
      ],
      badge: '3'
    },
    {
      name: 'Events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      subItems: [
        { name: 'All Events', path: '/admin/events', icon: '🎉' },
        { name: 'Create Event', path: '/admin/events/create', icon: '➕' },
        { name: 'Volunteer Opportunities', path: '/admin/events/volunteer-opportunities', icon: '🙋' }
      ]
    },
    {
      name: 'My View',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      subItems: [
        { name: 'Quotes', path: '/admin/myview/quotes', icon: '💭' },
        { name: 'Articles', path: '/admin/myview/articles', icon: '📝' },
        { name: 'Blogs', path: '/admin/myview/blogs', icon: '✍️' }
      ]
    },
    {
      name: 'Gallery',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      subItems: [
        { name: 'Images', path: '/admin/gallery/images', icon: '🖼️' },
        { name: 'Videos', path: '/admin/gallery/videos', icon: '🎥' }
      ]
    },
    {
      name: 'Newsletter',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      subItems: [
        { name: 'Recent', path: '/admin/newsletter/recent', icon: '🆕' },
        { name: 'Archives', path: '/admin/newsletter/archives', icon: '📚' },
        { name: 'Create Newsletter', path: '/admin/newsletter/create', icon: '✏️' },
        { name: 'Subscribers', path: '/admin/newsletter/subscribers', icon: '👥' }
      ]
    },
    {
      name: 'Shop',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
      subItems: [
        { name: 'Products', path: '/admin/shop/products', icon: '📦' },
        { name: 'Orders', path: '/admin/shop/orders', icon: '🛒' },
        { name: 'Inventory', path: '/admin/shop/inventory', icon: '📊' }
      ],
      badge: '12'
    },
    {
      name: 'About',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      subItems: [
        { name: 'Timeline', path: '/admin/about/timeline', icon: '⏳' },
        { name: 'Foundation Info', path: '/admin/about/foundation', icon: 'ℹ️' }
      ]
    },
    {
      name: 'Feedback & Messages',
      shortName: 'Feedback',
      icon: (
        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
      subItems: [
        { name: 'User Feedback', path: '/admin/feedback/user', icon: '⭐' },
        { name: 'Contact Messages', path: '/admin/feedback/contact', icon: '✉️' },
        { name: 'Write to AR', path: '/admin/feedback/write-to-ar', icon: '✍️' }
      ],
      badge: '8'
    },
    {
      name: 'Users',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      subItems: [
        { name: 'All Users', path: '/admin/users', icon: '👨‍👩‍👧‍👦' },
        { name: 'Volunteers', path: '/admin/users/volunteers', icon: '🤝' },
        { name: 'Admins', path: '/admin/users/admins', icon: '👑' }
      ]
    },
    {
      name: 'Settings',
      path: '/admin/settings',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      single: true
    }
  ];

  // Filter menu based on search
  const filteredSections = menuSections.filter(section => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const matchesName = section.name.toLowerCase().includes(query);
    const matchesSubItems = section.subItems?.some(item => 
      item.name.toLowerCase().includes(query)
    );
    return matchesName || matchesSubItems;
  });

  const isPathActive = (path) => location.pathname === path;
  const isSectionActive = (section) => {
    if (section.single) return location.pathname === section.path;
    return section.subItems?.some(item => location.pathname === item.path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/20 to-gray-50">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/5 rounded-full blur-3xl"></div>
      </div>

      {/* ========== ENHANCED TOP HEADER ========== */}
      <header className="bg-white/95 backdrop-blur-2xl shadow-xl fixed w-full top-0 z-40 border-b-2 border-orange-100">
        {/* Top Gradient Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FB8B35] via-orange-500 to-[#E67A24]"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between px-6 py-3">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {/* Toggle Sidebar Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="group relative p-2.5 text-gray-600 hover:text-[#FB8B35] transition-all duration-300 hover:bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm hover:shadow-lg"
              >
                <svg 
                  className={`w-6 h-6 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <div className="absolute inset-0 rounded-xl bg-orange-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </button>
              
              {/* Logo Section */}
              <div className="flex items-center space-x-3">
                <div className="relative group cursor-pointer">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FB8B35] to-[#E67A24] rounded-2xl blur-md opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  {/* Logo */}
                  <div className="relative w-11 h-11 bg-gradient-to-br from-[#FB8B35] via-orange-500 to-[#E67A24] rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-105 transition-all duration-300">
                    <span className="text-white font-bold text-xl">A</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-lg font-bold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">
                    Admin Panel
                  </h1>
                  <p className="text-xs text-gray-500 font-medium">Content Management System</p>
                </div>
              </div>
            </div>

            {/* Center - Enhanced Search Bar (Desktop) */}
            <div className="hidden lg:block flex-1 max-w-xl mx-8">
              <div className={`relative transition-all duration-300 ${searchFocused ? 'scale-105' : ''}`}>
                {/* Search Icon */}
                <div className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${searchFocused ? 'text-[#FB8B35]' : 'text-gray-400'}`}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                
                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search anything... (Ctrl + K)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className={`w-full pl-12 pr-12 py-3 bg-gradient-to-r from-gray-50 to-orange-50 border-2 rounded-2xl text-sm font-medium text-gray-700 placeholder-gray-400 
                    focus:outline-none focus:bg-white transition-all duration-300 shadow-sm
                    ${searchFocused 
                      ? 'border-orange-300 shadow-lg shadow-orange-100' 
                      : 'border-gray-200 hover:border-orange-200'
                    }`}
                />
                
                {/* Clear Button / Shortcut Badge */}
                {searchQuery ? (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                ) : (
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 hidden xl:block">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-white border border-gray-200 rounded-lg text-xs font-semibold text-gray-500">
                      <span>⌘</span>
                      <span>K</span>
                    </div>
                  </div>
                )}

                {/* Search glow effect */}
                {searchFocused && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 opacity-10 blur-xl -z-10"></div>
                )}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Quick Search (Mobile) */}
              <button className="lg:hidden p-2.5 text-gray-600 hover:text-[#FB8B35] hover:bg-orange-50 rounded-xl transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Notifications */}
              <div className="relative group">
                <button className="p-2.5 text-gray-600 hover:text-[#FB8B35] hover:bg-orange-50 rounded-xl transition-all duration-300 relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {/* Badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center border-2 border-white shadow-lg">
                    3
                  </span>
                </button>
              </div>

              {/* User Profile */}
              <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-gradient-to-br from-gray-50 via-orange-50 to-gray-50 rounded-xl border-2 border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className="relative">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#FB8B35] via-orange-500 to-[#E67A24] rounded-full flex items-center justify-center shadow-lg ring-2 ring-orange-100 group-hover:ring-4 transition-all">
                    <span className="text-white font-bold text-sm">
                      {adminUser.name?.charAt(0)?.toUpperCase() || 'A'}
                    </span>
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm"></span>
                </div>
                <div className="max-w-[150px]">
                  <p className="text-sm font-bold text-gray-800 truncate">{adminUser.name || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 truncate">{adminUser.email || 'admin@example.com'}</p>
                </div>
                <svg className="w-4 h-4 text-gray-400 group-hover:text-[#FB8B35] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="group flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden sm:inline font-semibold text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========== BEAUTIFULLY ALIGNED SIDEBAR ========== */}
      <aside
        className={`fixed left-0 top-[73px] h-[calc(100vh-73px)] bg-white/95 backdrop-blur-2xl shadow-2xl transition-all duration-500 ease-in-out z-30 border-r-2 border-orange-100 ${
          sidebarOpen ? 'w-80' : 'w-0'
        } overflow-hidden`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Search */}
          <div className="flex-shrink-0 p-4 border-b-2 border-orange-100 bg-gradient-to-r from-orange-50/50 via-transparent to-orange-50/30">
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-[#FB8B35] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 transition-all shadow-sm hover:shadow-md font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Menu Navigation - ENHANCED ALIGNMENT */}
          <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1.5">
            {filteredSections.length > 0 ? (
              filteredSections.map((section, index) => (
                <div key={index} className="relative">
                  {section.single ? (
                    // Single Item - Perfect Alignment
                    <Link
                      to={section.path}
                      className={`group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-300 ${
                        isPathActive(section.path)
                          ? 'bg-gradient-to-r from-[#FB8B35] to-[#E67A24] text-white shadow-lg shadow-orange-200'
                          : 'text-gray-700 hover:bg-gradient-to-r hover:from-orange-50 hover:to-orange-100 hover:text-[#FB8B35]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0 flex-1">
                        <div className={`flex-shrink-0 ${isPathActive(section.path) ? '' : 'text-gray-500'}`}>
                          {section.icon}
                        </div>
                        <span className="font-semibold text-sm truncate">
                          {section.name}
                        </span>
                      </div>
                      {section.badge && (
                        <span className={`flex-shrink-0 ml-2 px-2 py-0.5 rounded-full text-xs font-bold ${
                          isPathActive(section.path)
                            ? 'bg-white text-orange-600'
                            : 'bg-orange-500 text-white'
                        }`}>
                          {section.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    // Expandable Section - Perfect Alignment
                    <div>
                      <button
                        onClick={() => toggleSection(section.name)}
                        className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-300 ${
                          isSectionActive(section)
                            ? 'bg-orange-50 text-[#FB8B35] shadow-sm border-2 border-orange-200'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-3 min-w-0 flex-1">
                          <div className={`flex-shrink-0 ${isSectionActive(section) ? 'text-[#FB8B35]' : 'text-gray-500'}`}>
                            {section.icon}
                          </div>
                          <span className="font-semibold text-sm truncate">
                            {section.name}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1.5 flex-shrink-0 ml-2">
                          {section.badge && (
                            <span className="px-2 py-0.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full text-xs font-bold">
                              {section.badge}
                            </span>
                          )}
                          <svg
                            className={`w-4 h-4 transition-transform duration-300 ${
                              expandedSections[section.name] ? 'rotate-180 text-[#FB8B35]' : 'text-gray-400'
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>
                      
                      {/* Sub-items - Beautiful Design */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          expandedSections[section.name] ? 'max-h-[600px] opacity-100 mt-1.5' : 'max-h-0 opacity-0'
                        }`}
                      >
                        <div className="ml-3 pl-3 border-l-2 border-orange-200 space-y-0.5 py-1">
                          {section.subItems?.map((item, subIndex) => (
                            <Link
                              key={subIndex}
                              to={item.path}
                              className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-lg text-sm transition-all duration-300 ${
                                isPathActive(item.path)
                                  ? 'bg-gradient-to-r from-[#FB8B35] to-[#E67A24] text-white shadow-md font-semibold transform scale-[1.02]'
                                  : 'text-gray-600 hover:bg-orange-50 hover:text-[#FB8B35] hover:translate-x-1'
                              }`}
                            >
                              <span className="text-base flex-shrink-0">{item.icon}</span>
                              <span className="flex-1 truncate">{item.name}</span>
                              {isPathActive(item.path) && (
                                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-300 text-5xl mb-3">🔍</div>
                <p className="text-gray-500 text-sm font-semibold">No results found</p>
                <p className="text-gray-400 text-xs mt-1">Try different keywords</p>
              </div>
            )}
          </nav>
          
          {/* Sidebar Footer */}
          <div className="flex-shrink-0 p-4 border-t-2 border-orange-100 bg-gradient-to-r from-orange-50/30 via-transparent to-orange-50/30">
            <div className="bg-gradient-to-br from-orange-100 via-orange-50 to-white rounded-xl p-4 border-2 border-orange-200 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-bold text-gray-800">Need Help?</p>
              </div>
              <p className="text-xs text-gray-600 mb-3">Check comprehensive documentation</p>
              <button className="w-full bg-gradient-to-r from-[#FB8B35] to-[#E67A24] text-white text-sm font-bold py-2.5 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2">
                <span>📚</span>
                <span>View Documentation</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-[73px] transition-all duration-500 ${
          sidebarOpen ? 'ml-80' : 'ml-0'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>

      {/* Custom Scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #FFF7ED;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #FB8B35, #E67A24);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #E67A24, #D66A14);
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;